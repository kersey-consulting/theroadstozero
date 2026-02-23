import {getGaAccessToken} from '../utils/gaAuth';
import {requireAdminAuth} from '../utils/adminAuth';
import type {EventContext, KVNamespace} from "@cloudflare/workers-types";

interface Env {
    GA_PROPERTY_ID: string;
    GA_CLIENT_EMAIL: string;
    GA_PRIVATE_KEY: string;
    ADMIN_USER: string;
    ADMIN_PASSWORD: string;
    FORM_BACKUP_KV: KVNamespace;
}

interface GaDimensionValue {
    value: string;
}

interface GaMetricValue {
    value: string;
}

interface GaRow {
    dimensionValues?: GaDimensionValue[];
    metricValues?: GaMetricValue[];
}

interface GaReportResponse {
    rows?: GaRow[];
}

const analyticsCache: Record<string, { data: string; expiresAt: number }> = {};

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function fetchSummaryMetrics(accessToken: string, propertyId: string, startDate: string) {
    const res = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dateRanges: [{startDate, endDate: 'today'}],
                metrics: [
                    {name: 'activeUsers'},
                    {name: 'sessions'},
                    {name: 'screenPageViews'},
                ],
                dimensionFilter: {
                    filter: {
                        fieldName: 'hostName',
                        stringFilter: {
                            matchType: 'EXACT',
                            value: 'www.cjforsenate.com',
                        },
                    },
                },
            }),
        }
    );

    if (!res.ok) throw new Error(await res.text());

    const json = (await res.json()) as GaReportResponse;
    const metrics = json.rows?.[0]?.metricValues ?? [];

    return {
        users: Number(metrics[0]?.value ?? 0),
        sessions: Number(metrics[1]?.value ?? 0),
        pageViews: Number(metrics[2]?.value ?? 0),
    };
}

async function fetchTopPages(accessToken: string, propertyId: string, startDate: string) {
    const res = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dateRanges: [{startDate, endDate: 'today'}],
                dimensions: [{name: 'pagePath'}],
                metrics: [{name: 'screenPageViews'}],
                dimensionFilter: {
                    filter: {
                        fieldName: 'hostName',
                        stringFilter: {
                            matchType: 'EXACT',
                            value: 'www.cjforsenate.com',
                        },
                    },
                },
                orderBys: [{metric: {metricName: 'screenPageViews'}, desc: true}],
                limit: 5,
            }),
        }
    );

    if (!res.ok) throw new Error(await res.text());

    const json = (await res.json()) as GaReportResponse;

    return (json.rows ?? []).map(row => ({
        path: row.dimensionValues?.[0]?.value ?? '/',
        views: Number(row.metricValues?.[0]?.value ?? 0),
    }));
}

async function fetchTrafficSources(accessToken: string, propertyId: string, startDate: string) {
    const res = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dateRanges: [{startDate, endDate: 'today'}],
                dimensions: [{name: 'sessionDefaultChannelGroup'}],
                metrics: [{name: 'sessions'}],
                dimensionFilter: {
                    filter: {
                        fieldName: 'hostName',
                        stringFilter: {
                            matchType: 'EXACT',
                            value: 'www.cjforsenate.com',
                        },
                    },
                },
            }),
        }
    );

    if (!res.ok) throw new Error(await res.text());

    const json = (await res.json()) as GaReportResponse;

    return (json.rows ?? []).map(row => ({
        channel: row.dimensionValues?.[0]?.value ?? 'Unknown',
        sessions: Number(row.metricValues?.[0]?.value ?? 0),
    }));
}

async function fetchDeviceBreakdown(accessToken: string, propertyId: string, startDate: string) {
    const res = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dateRanges: [{startDate, endDate: 'today'}],
                dimensions: [{name: 'deviceCategory'}],
                metrics: [{name: 'sessions'}],
                dimensionFilter: {
                    filter: {
                        fieldName: 'hostName',
                        stringFilter: {
                            matchType: 'EXACT',
                            value: 'www.cjforsenate.com',
                        },
                    },
                },
            }),
        }
    );
    if (!res.ok) throw new Error(await res.text());
    const json = (await res.json()) as GaReportResponse;
    return (json.rows ?? []).map(row => ({
        device: row.dimensionValues?.[0]?.value ?? 'unknown',
        sessions: Number(row.metricValues?.[0]?.value ?? 0),
    }));
}

async function fetchActiveUsersByCity(
    accessToken: string,
    propertyId: string,
    startDate: string
) {
    const res = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dateRanges: [{startDate, endDate: 'today'}],
                dimensions: [{name: 'city'}],
                metrics: [{name: 'activeUsers'}],
                dimensionFilter: {
                    filter: {
                        fieldName: 'hostName',
                        stringFilter: {
                            matchType: 'EXACT',
                            value: 'www.cjforsenate.com',
                        },
                    },
                },
                orderBys: [{metric: {metricName: 'activeUsers'}, desc: true}],
                limit: 10,
            }),
        }
    );

    if (!res.ok) throw new Error(await res.text());

    const json = (await res.json()) as GaReportResponse;

    return (json.rows ?? [])
        .map(row => ({
            city: row.dimensionValues?.[0]?.value ?? 'Unknown',
            users: Number(row.metricValues?.[0]?.value ?? 0),
        }))
        .filter(r => r.city !== '(not set)');
}

async function fetchNewVsReturning(accessToken: string, propertyId: string, startDate: string) {
    const res = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dateRanges: [{startDate, endDate: 'today'}],
                dimensions: [{name: 'newVsReturning'}],
                metrics: [{name: 'sessions'}],
                dimensionFilter: {
                    filter: {
                        fieldName: 'hostName',
                        stringFilter: {
                            matchType: 'EXACT',
                            value: 'www.cjforsenate.com',
                        },
                    },
                },
            }),
        }
    );
    if (!res.ok) throw new Error(await res.text());
    const json = (await res.json()) as GaReportResponse;
    const buckets: Record<string, number> = {};

    for (const row of json.rows ?? []) {
        const rawType = row.dimensionValues?.[0]?.value ?? '';
        const normalizedType =
            rawType === '' || rawType === '(not set)' ? 'Unknown' : rawType;

        const sessions = Number(row.metricValues?.[0]?.value ?? 0);
        buckets[normalizedType] = (buckets[normalizedType] ?? 0) + sessions;
    }

    return Object.entries(buckets).map(([type, sessions]) => ({
        type,
        sessions,
    }));
}

async function fetchFormSubmissionCounts(kv: KVNamespace) {
    const list = await kv.list({prefix: 'submission:'});
    let contact = 0;
    let volunteer = 0;

    for (const key of list.keys) {
        if (key.name.startsWith('submission:contact')) contact++;
        if (key.name.startsWith('submission:volunteer')) volunteer++;
    }

    return {contact, volunteer};
}

function getDateRange(window: string) {
    switch (window) {
        case '7d':
            return {label: 'Last 7 days', startDate: '7daysAgo'};
        case '30d':
        default:
            return {label: 'Last 30 days', startDate: '30daysAgo'};
    }
}

async function fetchPageViewsByDay(
    accessToken: string,
    propertyId: string,
    startDate: string
) {
    const res = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dateRanges: [{startDate, endDate: 'today'}],
                dimensions: [{name: 'date'}],
                metrics: [{name: 'screenPageViews'}],
                dimensionFilter: {
                    filter: {
                        fieldName: 'hostName',
                        stringFilter: {
                            matchType: 'EXACT',
                            value: 'www.cjforsenate.com',
                        },
                    },
                },
                orderBys: [{dimension: {dimensionName: 'date'}}],
            }),
        }
    );

    if (!res.ok) throw new Error(await res.text());

    const json = (await res.json()) as GaReportResponse;

    return (json.rows ?? []).map(row => {
        const rawDate = row.dimensionValues?.[0]?.value ?? '';
        const views = Number(row.metricValues?.[0]?.value ?? 0);

        // GA date comes as YYYYMMDD → normalize
        const date =
            rawDate.length === 8
                ? `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`
                : rawDate;

        return {date, views};
    });
}

export const onRequest = async (
    {request, env}: EventContext<Env, string, unknown>
): Promise<Response> => {
    if (!requireAdminAuth(request, env)) {
        return new Response('Unauthorized', {status: 401});
    }

    const url = new URL(request.url);
    const windowParam = url.searchParams.get('window') ?? '30d';
    const {label, startDate} = getDateRange(windowParam);

    const now = Date.now();
    const cacheKey = windowParam;

    if (analyticsCache[cacheKey] && analyticsCache[cacheKey].expiresAt > now) {
        return new Response(analyticsCache[cacheKey].data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Cache': 'HIT',
            },
        });
    }

    const accessToken = await getGaAccessToken(env);

    const [
        summary,
        topPages,
        sources,
        devices,
        newVsReturning,
        cities,
        pageViewsByDay,
        forms,
    ] = await Promise.all([
        fetchSummaryMetrics(accessToken, env.GA_PROPERTY_ID, startDate),
        fetchTopPages(accessToken, env.GA_PROPERTY_ID, startDate),
        fetchTrafficSources(accessToken, env.GA_PROPERTY_ID, startDate),
        fetchDeviceBreakdown(accessToken, env.GA_PROPERTY_ID, startDate),
        fetchNewVsReturning(accessToken, env.GA_PROPERTY_ID, startDate),
        fetchActiveUsersByCity(accessToken, env.GA_PROPERTY_ID, startDate),
        fetchPageViewsByDay(accessToken, env.GA_PROPERTY_ID, startDate),
        fetchFormSubmissionCounts(env.FORM_BACKUP_KV),
    ]);

    const responseBody = JSON.stringify({
        timeWindow: label,
        ...summary,
        forms,
        topPages,
        sources,
        devices,
        newVsReturning,
        cities,
        pageViewsByDay,
    });

    analyticsCache[cacheKey] = {
        data: responseBody,
        expiresAt: now + CACHE_TTL_MS,
    };

    return new Response(responseBody, {
        headers: {
            'Content-Type': 'application/json',
            'X-Cache': 'MISS',
        },
    });
};
