import { useState, type FormEvent } from 'react';
import type { Property } from '../data/properties';
import { formatNightlyRate } from '../data/properties';

interface EnquiryFormProps {
  property: Property;
  onSubmitted?: () => void;
}

export default function EnquiryForm({ property, onSubmitted }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');
  const [hasPets, setHasPets] = useState(false);
  const [message, setMessage] = useState('');

  const guestOptions = Array.from({ length: property.maxGuests }, (_, i) => String(i + 1));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    onSubmitted?.();
  };

  if (submitted) {
    return (
      <div className="modal-success">
        <h3>Booking request sent</h3>
        <p>
          Thanks{name ? `, ${name}` : ''} — we&apos;ve received your request to book {property.title} (
          {formatNightlyRate(property.pricePerNight)}). The host will confirm availability shortly.
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
          Check-in
          <input required type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} />
        </label>
        <label>
          Check-out
          <input required type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} />
        </label>
        <label>
          Guests
          <select value={guests} onChange={(event) => setGuests(event.target.value)}>
            {guestOptions.map((n) => (
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
          placeholder="Tell the host a little about your stay..."
        />
      </label>
      <div className="modal-checkbox-row">
        <label className="modal-checkbox">
          <input type="checkbox" checked={hasPets} onChange={(event) => setHasPets(event.target.checked)} />
          Travelling with pets (optional)
        </label>
      </div>
      <button type="submit" className="btn-primary enquiry-form-submit">
        Request to Book →
      </button>
      <p className="enquiry-form-note">We&apos;ll be in touch within 24 hours.</p>
    </form>
  );
}
