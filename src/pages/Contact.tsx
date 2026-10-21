
import { useEffect, useRef, useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Clock,
  Send,
  GraduationCap,
} from 'lucide-react';

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
};

const initialForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  course: '',
  message: '',
};

const contactCards = [
  {
    title: 'Visit Us',
    description: 'Visit our campus for admissions and enquiries.',
    detail: 'Madha College of Physiotherapy',
    icon: MapPin,
    href: undefined,
  },
  {
    title: 'Call Us',
    description: 'Speak with our team for assistance.',
    detail: '+91 91576 51234',
    icon: Phone,
    href: 'tel:+919157651234',
  },
  {
    title: 'Email Us',
    description: 'Send us your questions and enquiries.',
    detail: 'Contact our college office',
    icon: Mail,
    href: undefined,
  },
];

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const revealRef = useRef<HTMLElement | null>(null);

  // Reveal sections gradually as they enter the viewport.
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      '.contact-reveal'
    );

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => {
        element.classList.add('contact-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('contact-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -35px 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const updateField = (
    field: keyof ContactForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setFormError('');
    setSubmitted(false);
  };

  
const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  setFormError('');
  setSubmitted(false);

  if (
    !form.name.trim() ||
    !form.email.trim() ||
    !form.message.trim()
  ) {
    setFormError('Please complete your name, email and message.');
    return;
  }

  setSubmitting(true);

  try {
    const response = await fetch(
      'http://localhost:5196/api/admission-enquiry',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || 'Not provided',
          course: form.course || 'General Enquiry',
          message: form.message.trim(),
        }),
      }
    );

    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success !== true) {
      throw new Error(
        result?.message ||
          'Unable to submit your enquiry. Please try again.'
      );
    }

    setSubmitted(true);
    setForm(initialForm);
  } catch (error) {
    console.error('Contact enquiry submission failed:', error);

    setFormError(
      error instanceof Error
        ? error.message
        : 'Unable to submit your enquiry. Please try again.'
    );
  } finally {
    setSubmitting(false);
  }
};
;

  return (
    <main className="contact-page">
      <style>{`
        .contact-page {
          --contact-green: #103d2e;
          --contact-deep: #082b20;
          --contact-green-light: #17634a;
          --contact-gold: #d8b54c;
          --contact-gold-bright: #f1cf62;
          --contact-text: #183a2f;
          --contact-muted: #687a70;
          --contact-border: #e0e9e2;
          width: 100%;
          overflow: clip;
          background: #fff;
          color: var(--contact-text);
          font-family: inherit;
        }

        .contact-page *,
        .contact-page *::before,
        .contact-page *::after {
          box-sizing: border-box;
        }

        .contact-container {
          width: min(1180px, 92%);
          margin-inline: auto;
        }

        /* HERO */

        .contact-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 88px 0 84px;
          color: #fff;
          background:
            radial-gradient(
              circle at 85% 15%,
              rgba(216,181,76,.18),
              transparent 30%
            ),
            linear-gradient(
              120deg,
              #082b20 0%,
              #103d2e 58%,
              #174b39 100%
            );
        }

        .contact-hero::before,
        .contact-hero::after {
          position: absolute;
          z-index: -1;
          content: "";
          width: 320px;
          height: 320px;
          border: 1px solid rgba(241,207,98,.2);
          border-radius: 50%;
          pointer-events: none;
        }

        .contact-hero::before {
          top: -210px;
          right: 12%;
        }

        .contact-hero::after {
          right: -190px;
          bottom: -220px;
          width: 470px;
          height: 470px;
        }

        .contact-eyebrow {
          margin: 0 0 14px;
          color: var(--contact-gold-bright);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
        }

        .contact-hero h1 {
          margin: 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(38px, 5vw, 60px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -.8px;
        }

        .contact-gold-line {
          width: 64px;
          height: 4px;
          margin: 22px 0;
          border-radius: 10px;
          background: var(--contact-gold-bright);
          box-shadow: 0 0 16px rgba(241,207,98,.25);
        }

        .contact-hero-description {
          max-width: 610px;
          margin: 0;
          color: #d9e7de;
          font-size: 15px;
          line-height: 1.9;
        }

        /* SLOW LEFT/RIGHT SCROLL REVEALS */

        .contact-reveal {
          opacity: 0;
          transition:
            opacity 1.15s ease,
            transform 1.35s cubic-bezier(.2,.7,.2,1);
          transition-delay: var(--reveal-delay, 0ms);
          will-change: opacity, transform;
        }

        .contact-from-left {
          transform: translate3d(-65px, 12px, 0);
        }

        .contact-from-right {
          transform: translate3d(65px, 12px, 0);
        }

        .contact-from-bottom {
          transform: translate3d(0, 35px, 0);
        }

        .contact-reveal.contact-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          will-change: auto;
        }

        /* INTRO */

        .contact-intro {
          padding: 64px 0 22px;
        }

        .contact-section-heading {
          margin: 0 0 12px;
          color: var(--contact-green);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(27px, 3vw, 35px);
          line-height: 1.3;
        }

        .contact-section-description {
          max-width: 690px;
          margin: 0;
          color: var(--contact-muted);
          font-size: 15px;
          line-height: 1.9;
        }

        /* CONTACT CARDS */

        .contact-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          padding: 24px 0 62px;
        }

        .contact-info-card {
          position: relative;
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: flex-start;
          padding: 29px 25px;
          overflow-wrap: anywhere;
          border: 1px solid var(--contact-border);
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 5px 18px rgba(16,61,46,.045);
          transition:
            transform .4s cubic-bezier(.2,.7,.2,1),
            box-shadow .4s ease,
            border-color .35s ease;
        }

        .contact-info-card:hover {
          transform: translateY(-8px);
          border-color: var(--contact-gold);
          box-shadow:
            0 18px 40px rgba(16,61,46,.12),
            0 4px 15px rgba(216,181,76,.13);
        }

        .contact-info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 55px;
          height: 55px;
          margin-bottom: 20px;
          flex-shrink: 0;
          border: 1px solid rgba(216,181,76,.35);
          border-radius: 15px;
          background: var(--contact-green);
          color: var(--contact-gold-bright);
          transition:
            transform .35s ease,
            background .35s ease,
            box-shadow .35s ease;
        }

        .contact-info-card:hover .contact-info-icon {
          transform: translateY(-3px) rotate(-5deg);
          background: var(--contact-deep);
          box-shadow: 0 7px 18px rgba(16,61,46,.18);
        }

        .contact-info-card h3 {
          margin: 0 0 9px;
          color: var(--contact-green);
          font-size: 19px;
          font-weight: 700;
        }

        .contact-info-card p {
          margin: 0 0 16px;
          color: var(--contact-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .contact-info-detail {
          margin-top: auto;
          color: var(--contact-green);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.8;
          text-decoration: none;
          overflow-wrap: anywhere;
        }

        a.contact-info-detail:hover {
          color: #9b761b;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        /* FORM + MAP */

        .contact-main-section {
          padding: 15px 0 76px;
          background: #f7f9f6;
          border-top: 1px solid #edf1ed;
          border-bottom: 1px solid #edf1ed;
        }

        .contact-main-grid {
          display: grid;
          grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
          gap: 32px;
          align-items: start;
        }

        .contact-form-box {
          min-width: 0;
          padding: 35px;
          border: 1px solid #e3e9e2;
          border-radius: 20px;
          background: #fff;
          box-shadow:
            0 15px 45px rgba(16,61,46,.09),
            0 2px 8px rgba(16,61,46,.025);
          transition:
            box-shadow .4s ease,
            border-color .4s ease;
        }

        .contact-form-box:hover {
          border-color: rgba(216,181,76,.7);
          box-shadow:
            0 22px 55px rgba(16,61,46,.13),
            0 0 0 1px rgba(216,181,76,.12);
        }

        .contact-form-heading {
          margin: 0 0 10px;
          color: var(--contact-green);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 28px;
          line-height: 1.3;
        }

        .contact-form-subtitle {
          margin: 0 0 26px;
          color: var(--contact-muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .contact-form {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 19px;
        }

        .contact-field {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 8px;
        }

        .contact-field-full {
          grid-column: 1 / -1;
        }

        .contact-field label {
          color: var(--contact-green);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .2px;
        }

        .contact-field input,
        .contact-field select,
        .contact-field textarea {
          display: block;
          width: 100%;
          min-width: 0;
          padding: 13px 14px;
          border: 1px solid #dce5dd;
          border-radius: 9px;
          outline: none;
          background: #fafcf9;
          color: var(--contact-green);
          font: inherit;
          font-size: 14px;
          transition:
            border-color .3s ease,
            box-shadow .3s ease,
            background .3s ease;
        }

        .contact-field input,
        .contact-field select {
          min-height: 48px;
        }

        .contact-field textarea {
          min-height: 125px;
          resize: vertical;
        }

        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color: #98a79d;
        }

        .contact-field input:focus,
        .contact-field select:focus,
        .contact-field textarea:focus {
          border-color: var(--contact-gold);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(216,181,76,.16);
        }

        .contact-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 50px;
          padding: 13px 20px;
          border: 1px solid var(--contact-gold);
          border-radius: 9px;
          background: linear-gradient(120deg, #d8b54c, #f1cf62);
          color: var(--contact-deep);
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition:
            transform .3s ease,
            box-shadow .3s ease,
            filter .3s ease;
        }

        .contact-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          filter: saturate(1.08);
          box-shadow: 0 10px 24px rgba(216,181,76,.3);
        }

        .contact-submit:disabled {
          opacity: .65;
          cursor: wait;
        }

        .contact-submit:focus-visible,
        .contact-info-detail:focus-visible {
          outline: 3px solid rgba(216,181,76,.8);
          outline-offset: 4px;
        }

        .contact-form-message {
          grid-column: 1 / -1;
          margin: 0;
          padding: 12px 14px;
          border-radius: 9px;
          font-size: 13px;
          line-height: 1.6;
        }

        .contact-form-success {
          border: 1px solid #b9e4cb;
          background: #effaf3;
          color: #17623d;
        }

        .contact-form-error {
          border: 1px solid #f2c6c6;
          background: #fff4f4;
          color: #a52a2a;
        }

        /* LOCATION PANEL */

        .contact-location-panel {
          min-width: 0;
          padding: 30px;
          border: 1px solid var(--contact-border);
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 12px 35px rgba(16,61,46,.07);
          transition:
            box-shadow .4s ease,
            border-color .4s ease;
        }

        .contact-location-panel:hover {
          border-color: rgba(216,181,76,.75);
          box-shadow: 0 20px 46px rgba(16,61,46,.12);
        }

        .contact-location-heading {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 20px;
        }

        .contact-location-heading .contact-info-icon {
          width: 46px;
          height: 46px;
          margin: 0;
          border-radius: 12px;
        }

        .contact-location-heading h3 {
          margin: 0 0 7px;
          color: var(--contact-green);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 24px;
        }

        .contact-location-heading p {
          margin: 0;
          color: var(--contact-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .contact-map {
          position: relative;
          overflow: hidden;
          min-height: 360px;
          border: 1px solid #dfe8df;
          border-radius: 13px;
          background: #edf2ed;
          box-shadow: 0 5px 16px rgba(16,61,46,.05);
        }

        .contact-map iframe {
          display: block;
          width: 100%;
          height: 360px;
          border: 0;
        }

        .contact-location-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 18px;
          padding: 15px;
          border-radius: 10px;
          background: #f4f8f3;
          color: var(--contact-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .contact-location-note svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--contact-green-light);
        }

        .contact-bottom-space {
          height: 12px;
        }

        /* TABLET */

        @media (max-width: 900px) {
          .contact-hero {
            padding: 70px 0;
          }

          .contact-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .contact-main-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .contact-location-panel {
            width: 100%;
          }
        }

        /* MOBILE */

        @media (max-width: 560px) {
          .contact-container {
            width: min(100% - 32px, 1180px);
          }

          .contact-hero {
            padding: 52px 0 56px;
          }

          .contact-hero h1 {
            font-size: 39px;
          }

          .contact-hero-description {
            font-size: 14px;
          }

          .contact-intro {
            padding-top: 42px;
          }

          .contact-cards-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 15px;
            padding-bottom: 45px;
          }

          .contact-info-card {
            padding: 23px;
          }

          .contact-main-section {
            padding: 42px 0 48px;
          }

          .contact-main-grid {
            gap: 22px;
          }

          .contact-form-box,
          .contact-location-panel {
            padding: 23px 18px;
            border-radius: 15px;
          }

          .contact-form {
            grid-template-columns: minmax(0, 1fr);
            gap: 17px;
          }

          .contact-field-full {
            grid-column: auto;
          }

          .contact-form-heading {
            font-size: 25px;
          }

          .contact-map,
          .contact-map iframe {
            min-height: 280px;
            height: 280px;
          }

          /* Keep mobile motion subtle and avoid sideways overflow. */
          .contact-from-left {
            transform: translate3d(-22px, 8px, 0);
          }

          .contact-from-right {
            transform: translate3d(22px, 8px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-page *,
          .contact-page *::before,
          .contact-page *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }

          .contact-reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-container contact-reveal contact-from-left">
          <p className="contact-eyebrow">
            Madha College of Physiotherapy
          </p>
          <h1>Contact Us</h1>
          <div className="contact-gold-line" />
          <p className="contact-hero-description">
            We are here to help you take the next step in your
            physiotherapy education. Reach out to our team for
            admissions, course information and general enquiries.
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="contact-intro">
        <div className="contact-container contact-reveal contact-from-left">
          <h2 className="contact-section-heading">
            We Would Love to Hear From You
          </h2>
          <div className="contact-gold-line" />
          <p className="contact-section-description">
            Have a question about our programmes or admissions?
            Contact us using the details below, or send an enquiry
            through our contact form.
          </p>
        </div>
      </section>

      {/* CONTACT INFORMATION CARDS */}
      <section className="contact-container">
        <div className="contact-cards-grid">
          {contactCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                className={`contact-info-card contact-reveal ${
                  index % 2 === 0
                    ? 'contact-from-left'
                    : 'contact-from-right'
                }`}
                style={
                  {
                    '--reveal-delay': `${index * 130}ms`,
                  } as React.CSSProperties
                }
                key={card.title}
              >
                <div className="contact-info-icon">
                  <Icon size={24} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                {card.href ? (
                  <a
                    className="contact-info-detail"
                    href={card.href}
                  >
                    {card.detail}
                  </a>
                ) : (
                  <span className="contact-info-detail">
                    {card.detail}
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* ENQUIRY FORM AND LOCATION */}
      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-main-grid">
            {/* FORM */}
            <div
              ref={revealRef as React.RefObject<HTMLDivElement>}
              className="contact-form-box contact-reveal contact-from-left"
            >
              <p className="contact-eyebrow" style={{ color: '#9b761b' }}>
                GET IN TOUCH
              </p>
              <h2 className="contact-form-heading">
                Admission Enquiry
              </h2>
              <p className="contact-form-subtitle">
                Fill in the details below and let us know how we can
                assist you.
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-field">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(event) =>
                      updateField('name', event.target.value)
                    }
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) =>
                      updateField('email', event.target.value)
                    }
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-phone">Phone Number</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={(event) =>
                      updateField('phone', event.target.value)
                    }
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-course">
                    Course / Programme
                  </label>
                  <select
                    id="contact-course"
                    name="course"
                    value={form.course}
                    onChange={(event) =>
                      updateField('course', event.target.value)
                    }
                  >
                    <option value="">Select a programme</option>
                    <option value="BPT">
                      Bachelor of Physiotherapy (BPT)
                    </option>
                    <option value="MPT">
                      Master of Physiotherapy (MPT)
                    </option>
                    <option value="Other">Other Enquiry</option>
                  </select>
                </div>

                <div className="contact-field contact-field-full">
                  <label htmlFor="contact-message">Your Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={(event) =>
                      updateField('message', event.target.value)
                    }
                    required
                  />
                </div>

                {formError && (
                  <p
                    className="contact-form-message contact-form-error"
                    role="alert"
                  >
                    {formError}
                  </p>
                )}

                
{submitted && (
  <p
    className="contact-form-message contact-form-success"
    role="status"
  >
    <CheckCircle2
      size={17}
      style={{
        verticalAlign: 'middle',
        marginRight: 7,
      }}
    />
    Your enquiry has been submitted successfully.
    The college has received your enquiry.
  </p>
)}


                <div className="contact-field-full">
                  <button
                    className="contact-submit"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Please wait...' : 'Send Enquiry'}
                    <Send size={17} />
                  </button>
                </div>
              </form>
            </div>

            {/* MAP AND ADDRESS */}
            <div className="contact-location-panel contact-reveal contact-from-right">
              <div className="contact-location-heading">
                <div className="contact-info-icon">
                  <GraduationCap size={23} />
                </div>
                <div>
                  <h3>Visit Our Campus</h3>
                  <p>
                    We look forward to welcoming you to our college.
                  </p>
                </div>
              </div>

              <div className="contact-map">
                <iframe
                  title="Madha College of Physiotherapy location map"
                  src="https://www.google.com/maps?q=Madha%20College%20of%20Physiotherapy&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="contact-location-note">
                <MapPin size={19} />
                <span>
                  Madha College of Physiotherapy. Please check the
                  campus location before travelling.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-bottom-space" />
    </main>
  );
}
