// Appointments are booked by phone call or text message — there is no online
// scheduler. Booking buttons link to /appointments, which shows the number and,
// on phones, a "Text to Book" link with the message pre-filled.

export const APPOINTMENTS_PATH = '/appointments';

// Section buttons in Sanity used to link straight to the old scheduler. Treating
// those links as booking buttons keeps them working until the content is
// migrated (sanity/migrations/replace-scheduler-links.mjs).
const LEGACY_SCHEDULER_HOSTS = ['profileaestheticmanagement.com', 'hydreight.com'];

/** True for a link to /appointments, or to the retired online scheduler. */
export function isBookingHref(href?: string): boolean {
  if (!href) return false;
  const trimmed = href.trim();
  if (trimmed === APPOINTMENTS_PATH || trimmed.startsWith(`${APPOINTMENTS_PATH}?`)) return true;
  try {
    const { hostname } = new URL(trimmed);
    return LEGACY_SCHEDULER_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

/**
 * /appointments, carrying the service slug so the page can name the service in
 * the text message. The page looks the slug up in Sanity, so only real service
 * names ever reach the message.
 */
export function appointmentsHref(serviceSlug?: string): string {
  return serviceSlug
    ? `${APPOINTMENTS_PATH}?service=${encodeURIComponent(serviceSlug)}`
    : APPOINTMENTS_PATH;
}

/** `(801) 555-1234` → `+18015551234`. Undefined when it isn't a usable number. */
function toE164(phone?: string): string | undefined {
  const digits = (phone ?? '').replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return undefined;
}

export function telHref(phone?: string): string | undefined {
  const number = toE164(phone);
  return number ? `tel:${number}` : undefined;
}

/**
 * An sms: link with the message pre-filled. `?&body=` rather than `?body=`:
 * iOS and Android have historically parsed the query differently, and this
 * form is read correctly by both.
 */
export function smsHref(phone?: string, service?: string): string | undefined {
  const number = toE164(phone);
  if (!number) return undefined;
  const body = service
    ? `Hi! I'd like to book ${service.trim()}.`
    : "Hi! I'd like to book an appointment.";
  return `sms:${number}?&body=${encodeURIComponent(body)}`;
}
