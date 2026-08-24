import { useState, type FormEvent } from 'react';
import type { Property } from '../data/properties';
import { formatWeeklyRent } from '../data/properties';

interface EnquiryFormProps {
  property: Property;
  onSubmitted?: () => void;
}

export default function EnquiryForm({ property, onSubmitted }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [occupants, setOccupants] = useState('1');
  const [hasPets, setHasPets] = useState(false);
  const [isEmployed, setIsEmployed] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    onSubmitted?.();
  };

  if (submitted) {
    return (
      <div className="modal-success">
        <h3>Enquiry sent</h3>
        <p>
          Thanks{name ? `, ${name}` : ''} — we&apos;ve received your enquiry about {property.title} (
          {formatWeeklyRent(property.weeklyRent)}). The property manager will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="enquiry-form-row">
        <label>
          Full Name
          <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
        </label>
        <label>
          Email Address
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Phone Number
          <input
            required
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="0400 000 000"
          />
        </label>
      </div>
      <div className="enquiry-form-row">
        <label>
          Preferred Move-in Date
          <input type="date" value={moveInDate} onChange={(event) => setMoveInDate(event.target.value)} />
        </label>
        <label>
          Number of Occupants
          <select value={occupants} onChange={(event) => setOccupants(event.target.value)}>
            {['1', '2', '3', '4', '5', '6+'].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Message (optional)
        <textarea
          rows={3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us a little about yourself..."
        />
      </label>
      <div className="modal-checkbox-row">
        <label className="modal-checkbox">
          <input type="checkbox" checked={hasPets} onChange={(event) => setHasPets(event.target.checked)} />
          Pets (optional)
        </label>
        <label className="modal-checkbox">
          <input type="checkbox" checked={isEmployed} onChange={(event) => setIsEmployed(event.target.checked)} />
          Employment Status (optional)
        </label>
      </div>
      <button type="submit" className="btn-primary enquiry-form-submit">
        Send Enquiry →
      </button>
      <p className="enquiry-form-note">We&apos;ll be in touch within 24 hours.</p>
    </form>
  );
}
