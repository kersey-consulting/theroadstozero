import type { APIRoute } from 'astro';

const getEnv = (localsEnv: Record<string, any> | undefined, key: string) => {
  if (localsEnv && typeof localsEnv[key] !== 'undefined') return String(localsEnv[key]);
  return import.meta.env[key as keyof ImportMetaEnv] ? String(import.meta.env[key as keyof ImportMetaEnv]) : '';
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  try {
    const formData = await request.formData();
    const firstName = String(formData.get('firstName') || '').trim();
    const lastName = String(formData.get('lastName') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const company = String(formData.get('company') || '').trim();

    if (company) {
      return redirect('/contact?contact=success', 303);
    }

    if (!firstName || !lastName || !email || !message) {
      return redirect('/contact?contact=error', 303);
    }

    const runtimeEnv = (locals as any)?.runtime?.env;
    const apiUrl = getEnv(runtimeEnv, 'CONTACT_MAIL_API_URL') || 'https://api.zeptomail.com/v1.1/email';
    const apiKey = getEnv(runtimeEnv, 'CONTACT_MAIL_API_KEY');
    const from = getEnv(runtimeEnv, 'CONTACT_FROM_EMAIL');
    const fromName = getEnv(runtimeEnv, 'CONTACT_FROM_NAME') || 'The Road to Zero';
    const to = getEnv(runtimeEnv, 'CONTACT_TO_EMAIL') || 'info@theroadstozero.com';
    const toName = getEnv(runtimeEnv, 'CONTACT_TO_NAME') || 'The Road to Zero';

    if (!apiKey || !from || !to) {
      console.error('Missing ZeptoMail configuration');
      return redirect('/contact?contact=error', 303);
    }

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Zoho-enczapikey ${apiKey}`,
      },
      body: JSON.stringify({
        from: {
          address: from,
          name: fromName,
        },
        to: [
          {
            email_address: {
              address: to,
              name: toName,
            },
          },
        ],
        reply_to: [
          {
            address: email,
            name: `${firstName} ${lastName}`.trim(),
          },
        ],
        subject: `New website contact from ${firstName} ${lastName}`,
        htmlbody: `
          <div>
            <p><strong>First Name:</strong> ${safeFirstName}</p>
            <p><strong>Last Name:</strong> ${safeLastName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('ZeptoMail request failed', response.status, errorText);
      return redirect('/contact?contact=error', 303);
    }

    return redirect('/contact?contact=success', 303);
  } catch (error) {
    console.error('Contact form send failed', error);
    return redirect('/contact?contact=error', 303);
  }
};
