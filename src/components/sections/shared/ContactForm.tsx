'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Field = 'name' | 'email' | 'phone' | 'subject' | 'message';

/**
 * Contact form — full validation UI, NO submission (front-end only).
 * TODO: wire to the client's email endpoint / CRM.
 */
export function ContactForm() {
  const t = useTranslations('form');
  const [values, setValues] = useState<Record<Field, string>>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const e: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) e.name = t('errors.nameRequired');
    if (!values.email.trim()) e.email = t('errors.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = t('errors.emailInvalid');
    if (!values.phone.trim()) e.phone = t('errors.phoneRequired');
    if (!values.subject.trim()) e.subject = t('errors.subjectRequired');
    if (!values.message.trim()) e.message = t('errors.messageRequired');
    else if (values.message.trim().length < 10) e.message = t('errors.messageShort');
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setServerError(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
        }

        setSubmitted(true);
        setValues({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } catch (err: unknown) {
        setServerError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const set = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const fieldClass = (field: Field) =>
    cn(
      'w-full rounded-[3px] border bg-white px-4 py-3.5 text-[15px] text-textc outline-none transition-colors placeholder:text-textc-muted/50 focus:border-steel',
      errors[field] ? 'border-red-500/70' : 'border-ink/12'
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-[12px] font-medium uppercase tracking-wider text-textc-muted">
            {t('name')} <span className="text-gold">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            className={fieldClass('name')}
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block text-[12px] font-medium uppercase tracking-wider text-textc-muted">
            {t('email')} <span className="text-gold">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            dir="ltr"
            className={fieldClass('email')}
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-[12px] font-medium uppercase tracking-wider text-textc-muted">
            {t('phone')} <span className="text-gold">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            dir="ltr"
            className={fieldClass('phone')}
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
          />
          {errors.phone && (
            <p id="contact-phone-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-2 block text-[12px] font-medium uppercase tracking-wider text-textc-muted">
            {t('subject')} <span className="text-gold">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            className={fieldClass('subject')}
            value={values.subject}
            onChange={(e) => set('subject', e.target.value)}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          />
          {errors.subject && (
            <p id="contact-subject-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden />
              {errors.subject}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-[12px] font-medium uppercase tracking-wider text-textc-muted">
          {t('message')} <span className="text-gold">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={6}
          className={cn(fieldClass('message'), 'resize-y')}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden />
            {errors.message}
          </p>
        )}
      </div>

      {serverError && (
        <p className="flex items-start gap-2.5 rounded-[3px] border border-red-500/40 bg-red-50 px-4 py-3.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden />
          {serverError}
        </p>
      )}

      {submitted && (
        <p className="flex items-start gap-2.5 rounded-[3px] border border-steel/40 bg-steel/10 px-4 py-3.5 text-sm text-ink">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-steel-shade" aria-hidden />
          {t('success')}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? '...' : t('submit')}
      </Button>
    </form>
  );
}
