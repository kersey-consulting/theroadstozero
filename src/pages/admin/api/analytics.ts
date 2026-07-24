import type {APIRoute} from 'astro';
import {env as cloudflareEnv} from 'cloudflare:workers';
import {getGaAccessToken} from '@/lib/server/gaAuth';
import {requireAdminAuth, unauthorizedAdminResponse} from '@/lib/server/adminAuth';

export const prerender = false;

interface RuntimeEnv {
  ADMIN_USER?: string;
  ADMIN_PASSWORD?: string;
  BASIC_AUTH_USER?: string;
  BASIC_AUTH_PASS?: string;
  GA_CLIENT_EMAIL?: string;
  GA_PRIVATE_KEY?: string;
  GA_PROPERTY_ID?: string;
  GA_HOSTNAMES?: string;
}

interface GaRow {
  dimensionValues?: {value: string}[];
  metricValues?: {value: string}[];
}

interface GaReportResponse {
  rows?: GaRow[];
}

const analyticsCache: Record<string, {data: string; expiresAt: number}> = {};
const CACHE_TTL_MS = 5 * 60 * 1000;

function getRuntimeEnv(locals: App.Locals): RuntimeEnv {
  let legacyRuntimeEnv: RuntimeEnv = {};
  try {
    legacyRuntimeEnv = (locals as unknown as {runtime?: {env?: RuntimeEnv}}).runtime?.env ?? {};
  } catch {
    // Newer @astrojs/cloudflare versions intentionally throw when reading
    // locals.runtime.env. Runtime bindings are exposed through cloudflare:workers.
  }

  return {
    ADMIN_USER: import.meta.env.ADMIN_USER,
    ADMIN_PASSWORD: import.meta.env.ADMIN_PASSWORD,
    BASIC_AUTH_USER: import.meta.env.BASIC_AUTH_USER,
    BASIC_AUTH_PASS: import.meta.env.BASIC_AUTH_PASS,
    GA_CLIENT_EMAIL: import.meta.env.GA_CLIENT_EMAIL,
    GA_PRIVATE_KEY: import.meta.env.GA_PRIVATE_KEY,
    GA_PROPERTY_ID: import.meta.env.GA_PROPERTY_ID,
    GA_HOSTNAMES: import.meta.env.GA_HOSTNAMES,
    ...legacyRuntimeEnv,
    ...(cloudflareEnv as RuntimeEnv),
  };
}

function getMissingGaConfig(env: RuntimeEnv) {
  return ['GA_PROPERTY_ID', 'GA_CLIENT_EMAIL', 'GA_PRIVATE_KEY'].filter(
    (key) => !env[key as keyof RuntimeEnv],
  );
}

function getHostnames(env: RuntimeEnv) {
  return (env.GA_HOSTNAMES || 'www.theroadstozero.com,theroadstozero.com')
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean);
}

function hostFilter(env: RuntimeEnv) {
  const values = getHostnames(env);
  if (values.length === 1) {
    return {
      filter: {
        fieldName: 'hostName',
        stringFilter: {matchType: 'EXACT', value: values[0]},
      },
    };
  }

  return {
    filter: {
      fieldName: 'hostName',
      inListFilter: {values},
    },
  };
}

async function runReport(accessToken: string, propertyId: string, body: object): Promise<GaReportResponse> {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as GaReportResponse;
}

async function fetchSummaryMetrics(token: string, propertyId: string, startDate: string, env: RuntimeEnv) {
  const json = await runReport(token, propertyId, {
    dateRanges: [{startDate, endDate: 'today'}],
    metrics: [{name: 'activeUsers'}, {name: 'sessions'}, {name: 'screenPageViews'}],
    dimensionFilter: hostFilter(env),
  });
  const metrics = json.rows?.[0]?.metricValues ?? [];
  return {
    users: Number(metrics[0]?.value ?? 0),
    sessions: Number(metrics[1]?.value ?? 0),
    pageViews: Number(metrics[2]?.value ?? 0),
  };
}

async function fetchTopPages(token: string, propertyId: string, startDate: string, env: RuntimeEnv) {
  const json = await runReport(token, propertyId, {
    dateRanges: [{startDate, endDate: 'today'}],
    dimensions: [{name: 'pagePath'}],
    metrics: [{name: 'screenPageViews'}],
    dimensionFilter: hostFilter(env),
    orderBys: [{metric: {metricName: 'screenPageViews'}, desc: true}],
    limit: 8,
  });
  return (json.rows ?? []).map((row) => ({
    path: row.dimensionValues?.[0]?.value ?? '/',
    views: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

async function fetchTrafficSources(token: string, propertyId: string, startDate: string, env: RuntimeEnv) {
  const json = await runReport(token, propertyId, {
    dateRanges: [{startDate, endDate: 'today'}],
    dimensions: [{name: 'sessionDefaultChannelGroup'}],
    metrics: [{name: 'sessions'}],
    dimensionFilter: hostFilter(env),
    orderBys: [{metric: {metricName: 'sessions'}, desc: true}],
  });
  return (json.rows ?? []).map((row) => ({
    channel: row.dimensionValues?.[0]?.value ?? 'Unknown',
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

async function fetchDeviceBreakdown(token: string, propertyId: string, startDate: string, env: RuntimeEnv) {
  const json = await runReport(token, propertyId, {
    dateRanges: [{startDate, endDate: 'today'}],
    dimensions: [{name: 'deviceCategory'}],
    metrics: [{name: 'sessions'}],
    dimensionFilter: hostFilter(env),
  });
  return (json.rows ?? []).map((row) => ({
    device: row.dimensionValues?.[0]?.value ?? 'unknown',
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

async function fetchActiveUsersByCity(token: string, propertyId: string, startDate: string, env: RuntimeEnv) {
  const json = await runReport(token, propertyId, {
    dateRanges: [{startDate, endDate: 'today'}],
    dimensions: [{name: 'city'}],
    metrics: [{name: 'activeUsers'}],
    dimensionFilter: hostFilter(env),
    orderBys: [{metric: {metricName: 'activeUsers'}, desc: true}],
    limit: 10,
  });
  return (json.rows ?? [])
    .map((row) => ({
      city: row.dimensionValues?.[0]?.value ?? 'Unknown',
      users: Number(row.metricValues?.[0]?.value ?? 0),
    }))
    .filter((row) => row.city !== '(not set)');
}

async function fetchPageViewsByDay(token: string, propertyId: string, startDate: string, env: RuntimeEnv) {
  const json = await runReport(token, propertyId, {
    dateRanges: [{startDate, endDate: 'today'}],
    dimensions: [{name: 'date'}],
    metrics: [{name: 'screenPageViews'}],
    dimensionFilter: hostFilter(env),
    orderBys: [{dimension: {dimensionName: 'date'}}],
  });
  return (json.rows ?? []).map((row) => {
    const raw = row.dimensionValues?.[0]?.value ?? '';
    const date = raw.length === 8 ? `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}` : raw;
    return {date, views: Number(row.metricValues?.[0]?.value ?? 0)};
  });
}

function getDateRange(window: string) {
  switch (window) {
    case '7d':
      return {label: 'Last 7 days', startDate: '7daysAgo'};
    case '90d':
      return {label: 'Last 90 days', startDate: '90daysAgo'};
    case '30d':
    default:
      return {label: 'Last 30 days', startDate: '30daysAgo'};
  }
}

const emptyAnalytics = {
  users: 0,
  sessions: 0,
  pageViews: 0,
  topPages: [],
  sources: [],
  devices: [],
  cities: [],
  pageViewsByDay: [],
};

export const GET: APIRoute = async ({request, locals}) => {
  const runtimeEnv = getRuntimeEnv(locals);

  if (!requireAdminAuth(request, runtimeEnv)) {
    return unauthorizedAdminResponse();
  }

  const windowParam = new URL(request.url).searchParams.get('window') ?? '30d';
  const {label, startDate} = getDateRange(windowParam);
  const cacheKey = `${windowParam}:${getHostnames(runtimeEnv).join('|')}`;
  const now = Date.now();

  if (analyticsCache[cacheKey] && analyticsCache[cacheKey].expiresAt > now) {
    return new Response(analyticsCache[cacheKey].data, {
      headers: {'Content-Type': 'application/json', 'X-Cache': 'HIT'},
    });
  }

  let responseBody: string;

  try {
    const missingConfig = getMissingGaConfig(runtimeEnv);
    if (missingConfig.length > 0) {
      throw new Error(`Missing Google Analytics runtime env: ${missingConfig.join(', ')}`);
    }

    const token = await getGaAccessToken(runtimeEnv);
    const [summary, topPages, sources, devices, cities, pageViewsByDay] = await Promise.all([
      fetchSummaryMetrics(token, runtimeEnv.GA_PROPERTY_ID, startDate, runtimeEnv),
      fetchTopPages(token, runtimeEnv.GA_PROPERTY_ID, startDate, runtimeEnv),
      fetchTrafficSources(token, runtimeEnv.GA_PROPERTY_ID, startDate, runtimeEnv),
      fetchDeviceBreakdown(token, runtimeEnv.GA_PROPERTY_ID, startDate, runtimeEnv),
      fetchActiveUsersByCity(token, runtimeEnv.GA_PROPERTY_ID, startDate, runtimeEnv),
      fetchPageViewsByDay(token, runtimeEnv.GA_PROPERTY_ID, startDate, runtimeEnv),
    ]);

    responseBody = JSON.stringify({
      timeWindow: label,
      hostnames: getHostnames(runtimeEnv),
      analyticsUnavailable: false,
      ...summary,
      topPages,
      sources,
      devices,
      cities,
      pageViewsByDay,
    });
    analyticsCache[cacheKey] = {data: responseBody, expiresAt: now + CACHE_TTL_MS};
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown analytics error';
    console.error('Analytics unavailable', message);
    responseBody = JSON.stringify({
      timeWindow: label,
      hostnames: getHostnames(runtimeEnv),
      analyticsUnavailable: true,
      analyticsError: message,
      analyticsConfig: {
        hasPropertyId: Boolean(runtimeEnv.GA_PROPERTY_ID),
        hasClientEmail: Boolean(runtimeEnv.GA_CLIENT_EMAIL),
        hasPrivateKey: Boolean(runtimeEnv.GA_PRIVATE_KEY),
      },
      ...emptyAnalytics,
    });
  }

  return new Response(responseBody, {
    headers: {'Content-Type': 'application/json', 'X-Cache': 'MISS'},
  });
};
