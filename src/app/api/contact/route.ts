import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

/**
 * Placeholder contact route handler for Vercel deployment.
 * Validates payload, logs receipt, and returns success response.
 *
 * TODO: Connect to your preferred transactional email service:
 * 1. Resend (https://resend.com):
 *    import { Resend } from 'resend';
 *    const resend = new Resend(process.env.RESEND_API_KEY);
 *    await resend.emails.send({
 *      from: 'Khaled Alfagih Website <notifications@kfoco.com>',
 *      to: ['info@kfoco.com'],
 *      subject: `[Contact Form] ${subject} - ${name}`,
 *      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`,
 *    });
 *
 * 2. Formspree / EmailJS:
 *    Forward request payload to Formspree/EmailJS endpoint.
 *
 * 3. CRM Webhook (HubSpot, Salesforce, Zoho):
 *    POST sanitized lead data to your CRM intake endpoint.
 */
export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json().catch(() => ({}));
    const { name, email, phone, subject, message } = body;

    const errors: Record<string, string> = {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      errors.name = 'Name is required';
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'A valid email address is required';
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: errors
        },
        { status: 400 }
      );
    }

    // Server-side logging for development and demo observability
    console.info('[Contact Inquiry Received]:', {
      timestamp: new Date().toISOString(),
      name: name?.trim(),
      email: email?.trim(),
      phone: phone?.trim(),
      subject: subject?.trim(),
      messageSnippet: message?.trim().slice(0, 80)
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been received successfully. Our team will contact you soon.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while processing your inquiry.'
      },
      { status: 500 }
    );
  }
}
