// Cloudflare exposes secrets through the `cloudflare:workers` virtual module at
// runtime, but that module does not exist under `astro dev`. A static top-level
// import therefore fails to resolve and takes the whole route (or middleware)
// down locally, so load it lazily and fall back to the other env sources.
let workerEnvPromise: Promise<Record<string, unknown>> | null = null;

function loadWorkerEnv() {
  if (!workerEnvPromise) {
    workerEnvPromise = import('cloudflare:workers')
      .then((mod) => (mod.env ?? {}) as Record<string, unknown>)
      .catch(() => ({}));
  }
  return workerEnvPromise;
}

/**
 * Merge every place Cloudflare runtime env can live, lowest precedence first:
 * build-time `import.meta.env` values passed in as `fallback`, then
 * `locals.runtime.env`, then the `cloudflare:workers` bindings.
 */
export async function getRuntimeEnv<T extends Record<string, unknown>>(
  locals: unknown,
  fallback: Partial<T> = {},
): Promise<T> {
  let localsEnv: Record<string, unknown> = {};

  try {
    localsEnv = (locals as {runtime?: {env?: Record<string, unknown>}})?.runtime?.env ?? {};
  } catch {
    // Newer @astrojs/cloudflare versions throw when locals.runtime is absent.
  }

  return {
    ...fallback,
    ...localsEnv,
    ...(await loadWorkerEnv()),
  } as T;
}