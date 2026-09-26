// Appointments are booked by phone call or text message — there is no online
// scheduler. These helpers build the links for BookButton and the header.

/**
 * The href an editor puts on a section button in Sanity to make it a booking
 * button. It renders as "Text to Book" on phones and the phone number on
 * desktop, whatever label is set.
 */
export const BOOK_HREF = '#book';

// Section buttons in Sanity used to link straight to the old scheduler. Treating
// those links as booking buttons keeps them working until the content is
// migrated to BOOK_HREF (sanity/migrations/replace-scheduler-links.mjs).
const LEGACY_SCHEDULER_HOSTS = ['profileaestheticmanagement.com', 'hydreight.com'];

export function isBookingHref(href?: string): boolean {
  if (!href) return false;
  if (href.trim() === BOOK_HREF) return true;
  try {
    const { hostname } = new URL(href);
    return LEGACY_SCHEDULER_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
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
