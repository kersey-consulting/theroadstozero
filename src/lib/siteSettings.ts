import { getSanityClient, queries } from './sanity';

// One siteSettings fetch per request, shared by every component that asks for
// it. Keyed on the request's `locals` object, so it can't leak across requests.
const cache = new WeakMap<object, Promise<any>>();

export function getSiteSettings(locals: App.Locals): Promise<any> {
  let settings = cache.get(locals);
  if (!settings) {
    settings = getSanityClient((locals as any).runtime?.env)
      .fetch(queries.siteSettings)
      .catch(() => null);
    cache.set(locals, settings);
  }
  return settings;
}
