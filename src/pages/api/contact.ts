import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

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
    const host = getEnv(runtimeEnv, 'ZOHO_SMTP_HOST') || 'smtp.zoho.com';
    const port = Number(getEnv(runtimeEnv, 'ZOHO_SMTP_PORT') || '465');
    const user = getEnv(runtimeEnv, 'ZOHO_SMTP_USER');
    const pass = getEnv(runtimeEnv, 'ZOHO_SMTP_PASS');
    const from = getEnv(runtimeEnv, 'CONTACT_FROM_EMAIL') || user;
    const to = getEnv(runtimeEnv, 'CONTACT_TO_EMAIL') || 'info@theroadstozero.com';

    if (!user || !pass || !from || !to) {
      console.error('Missing contact form email configuration');
      return redirect('/contact?contact=error', 303);
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `New website contact from ${firstName} ${lastName}`,
      text: [
        `First Name: ${firstName}`,
        `Last Name: ${lastName}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    return redirect('/contact?contact=success', 303);
  } catch (error) {
    console.error('Contact form send failed', error);
    return redirect('/contact?contact=error', 303);
  }
};
