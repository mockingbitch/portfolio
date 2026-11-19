import { useId, useState, type SubmitEvent } from 'react';

interface Props {
  /** Address the composed message is sent to. */
  email: string;
}

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = 'Please add your name.';
  if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = 'Please add a valid email address.';
  if (fields.message.trim().length < 10) errors.message = 'A sentence or two helps me reply usefully.';
  return errors;
}

const fieldClass =
  'mt-2 block w-full border-0 border-b border-line-strong bg-transparent px-0 py-2.5 text-base text-fg placeholder:text-subtle transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-danger';

/**
 * Static-site friendly contact form: it composes a pre-filled email in the
 * visitor's own mail client, so no backend or third-party service is involved.
 */
export default function ContactForm({ email }: Props) {
  const id = useId();
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState('');

  const update = (key: keyof Fields) => (event: { target: { value: string } }) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as (keyof Fields)[])[0];
    if (firstInvalid) {
      setStatus('Please check the highlighted fields.');
      document.getElementById(`${id}-${firstInvalid}`)?.focus();
      return;
    }

    const subject = `Portfolio enquiry from ${fields.name.trim()}`;
    const body = `${fields.message.trim()}\n\n— ${fields.name.trim()}\n${fields.email.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('Your email client should now open with the message ready to send.');
  };

  const describe = (key: keyof Fields) => (errors[key] ? `${id}-${key}-error` : undefined);

  const error = (key: keyof Fields) =>
    errors[key] ? (
      <p id={`${id}-${key}-error`} className="mt-2 text-sm text-danger">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="label">
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={fields.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe('name')}
            className={fieldClass}
          />
          {error('name')}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="label">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe('email')}
            className={fieldClass}
          />
          {error('email')}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="label">
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          required
          value={fields.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe('message')}
          className={`${fieldClass} resize-y`}
        />
        {error('message')}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          className="inline-flex h-11 items-center rounded-[2px] bg-fg px-5 text-sm font-medium text-bg transition-colors duration-150 hover:bg-accent hover:text-accent-contrast"
        >
          Compose email
        </button>
        <p className="text-sm text-subtle">Opens your email client — nothing is sent from this page.</p>
      </div>

      <p role="status" aria-live="polite" className="min-h-6 text-sm text-muted">
        {status}
      </p>
    </form>
  );
}
