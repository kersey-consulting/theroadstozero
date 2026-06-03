import type { APIRoute } from 'astro';

const getEnv = (localsEnv: Record<string, any> | undefined, key: string) => {
  if (localsEnv && typeof localsEnv[key] !== 'undefined') return String(localsEnv[key]);
  return import.meta.env[key as keyof ImportMetaEnv] ? String(import.meta.env[key as keyof ImportMetaEnv]) : '';
};

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
    const apiUrl = getEnv(runtimeEnv, 'CONTACT_MAIL_API_URL');
    const apiKey = getEnv(runtimeEnv, 'CONTACT_MAIL_API_KEY');
    const from = getEnv(runtimeEnv, 'CONTACT_FROM_EMAIL');
    const to = getEnv(runtimeEnv, 'CONTACT_TO_EMAIL') || 'info@theroadstozero.com';

    if (!apiUrl || !apiKey || !from || !to) {
      console.error('Missing contact form mail API configuration');
      return redirect('/contact?contact=error', 303);
    }

    const subject = `New website contact from ${firstName} ${lastName}`;
    const text = [
      `First Name: ${firstName}`,
      `Last Name: ${lastName}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n');
    const html = `
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br />')}</p>
    `;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        replyTo: email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('Contact form mail API request failed', response.status, errorText);
      return redirect('/contact?contact=error', 303);
    }

    return redirect('/contact?contact=success', 303);
  } catch (error) {
    console.error('Contact form send failed', error);
    return redirect('/contact?contact=error', 303);
  }
};
