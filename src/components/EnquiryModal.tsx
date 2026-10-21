import { useEffect, useState } from 'react';
import {
  X,
  CheckCircle2,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
} from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const initialData: FormData = {
  name: '',
  email: '',
  phone: '',
  course: 'Bachelor of Physiotherapy (BPT)',
  message: '',
};

export default function EnquiryModal({
  isOpen,
  onClose,
}: EnquiryModalProps) {
const [formData, setFormData] = useState<FormData>(initialData);
const [errors, setErrors] = useState<FormErrors>({});
const [submitted, setSubmitted] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', onEsc);

    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Please enter a valid email address';
    }

    const digits = formData.phone.replace(/\D/g, '');

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (digits.length < 10) {
      newErrors.phone =
        'Please enter a valid phone number (at least 10 digits)';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();
  setSubmitError('');

  if (!validate()) return;

  setIsSubmitting(true);

  try {
    const response = await fetch(
      'http://localhost:5196/api/admission-enquiry',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          course: formData.course,
          message: formData.message.trim(),
        }),
      }
    );

    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false) {
      throw new Error(
        result?.message ||
          'Unable to submit your enquiry. Please try again.'
      );
    }

    setSubmitted(true);
  } catch (error) {
    setSubmitError(
      error instanceof Error
        ? error.message
        : 'Something went wrong. Please try again.'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  const handleClose = () => {
  if (isSubmitting) return;

  setFormData(initialData);
  setErrors({});
  setSubmitted(false);
  setSubmitError('');
  onClose();
};

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  return (
    <>
      <style>{`
        /* ===== MODAL OVERLAY ===== */

        .enquiry-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px;
          overflow-y: auto;
          background: rgba(3, 25, 18, 0.80);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: enquiryFadeIn 0.4s ease both;
        }

        @keyframes enquiryFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ===== MODAL CARD ===== */

        .enquiry-card {
          --enquiry-gold: #d8b54c;
          --enquiry-gold-bright: #ffe99b;
          --enquiry-green: #103d2e;

          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 510px;
          max-height: 90vh;
          overflow: hidden;
          border: 1px solid rgba(216, 181, 76, 0.75);
          border-radius: 19px;
          background: #fff;
          box-shadow:
            0 15px 50px rgba(0, 0, 0, 0.25),
            0 0 12px rgba(216, 181, 76, 0.12);
          animation: enquiryCardEnter 0.65s
            cubic-bezier(.2, .75, .25, 1) both;
          transition:
            box-shadow 0.45s ease,
            border-color 0.45s ease;
        }

        @keyframes enquiryCardEnter {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.975);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Thin animated gold outline */
        .enquiry-card::before {
          content: "";
          position: absolute;
          z-index: 5;
          inset: 0;
          padding: 1.5px;
          border-radius: inherit;
          background: conic-gradient(
            from var(--enquiry-angle, 0deg),
            #9b7824 0deg,
            #d8b54c 65deg,
            #fff8d9 100deg,
            #ffffff 115deg,
            #f1cf62 145deg,
            #a78328 205deg,
            #d8b54c 270deg,
            #fff8d9 310deg,
            #9b7824 360deg
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          animation: enquiryBorderRotate 7s linear infinite;
        }

        @property --enquiry-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes enquiryBorderRotate {
          from { --enquiry-angle: 0deg; }
          to { --enquiry-angle: 360deg; }
        }

        /* White shine travels around the gold border */
        .enquiry-border-shine {
          position: absolute;
          z-index: 6;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
          pointer-events: none;
        }

        .enquiry-border-shine::before {
          content: "";
          position: absolute;
          top: -45%;
          left: -60%;
          width: 45%;
          height: 190%;
          opacity: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            rgba(255, 255, 255, 0.95),
            rgba(255, 248, 210, 0.55),
            transparent
          );
          transform: rotate(25deg);
          animation: enquiryWhiteShine 5s ease-in-out infinite;
        }

        @keyframes enquiryWhiteShine {
          0%, 12% {
            left: -60%;
            opacity: 0;
          }
          22% {
            opacity: 1;
          }
          50% {
            left: 115%;
            opacity: 0.9;
          }
          62%, 100% {
            left: 115%;
            opacity: 0;
          }
        }

        /* Golden glow on hover */
        .enquiry-card:hover {
          border-color: #f1cf62;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.28),
            0 0 8px rgba(255, 233, 155, 0.85),
            0 0 22px rgba(216, 181, 76, 0.58),
            0 0 48px rgba(216, 181, 76, 0.30);
        }

        .enquiry-card:hover::before {
          animation-duration: 3.5s;
        }

        /* Content scrolls inside the card */
        .enquiry-card-content {
          position: relative;
          z-index: 1;
          max-height: 90vh;
          overflow-y: auto;
          overscroll-behavior: contain;
          scrollbar-width: thin;
          scrollbar-color: #d8b54c #f3f5f2;
        }

        .enquiry-card-content::-webkit-scrollbar {
          width: 6px;
        }

        .enquiry-card-content::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #d8b54c;
        }

        /* ===== HEADER ===== */

        .enquiry-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 23px 25px;
          border-bottom: 1px solid #edf0e9;
          background:
            linear-gradient(
              120deg,
              rgba(216,181,76,0.07),
              transparent 75%
            ),
            #fff;
        }

        .enquiry-heading {
          margin: 0;
          color: #103d2e;
          font-size: 21px;
          font-weight: 800;
          line-height: 1.4;
        }

        .enquiry-subtitle {
          margin: 5px 0 0;
          color: #778278;
          font-size: 12px;
          line-height: 1.7;
        }

        .enquiry-close {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 37px;
          height: 37px;
          border: 1px solid #e7eae4;
          border-radius: 10px;
          background: #fff;
          color: #526258;
          cursor: pointer;
          transition:
            color .25s ease,
            background .25s ease,
            border-color .25s ease,
            transform .25s ease,
            box-shadow .25s ease;
        }

        .enquiry-close:hover {
          transform: rotate(90deg);
          border-color: #d8b54c;
          background: #fff9e8;
          color: #103d2e;
          box-shadow: 0 0 13px rgba(216,181,76,.22);
        }

        /* ===== FORM ===== */

        .enquiry-form {
          display: flex;
          flex-direction: column;
          gap: 17px;
          padding: 24px 25px 27px;
        }

        .enquiry-field label {
          display: block;
          margin-bottom: 7px;
          color: #30483b;
          font-size: 12px;
          font-weight: 700;
        }

        .enquiry-input-wrap {
          position: relative;
        }

        .enquiry-input-icon {
          position: absolute;
          top: 50%;
          left: 13px;
          width: 16px;
          height: 16px;
          color: #9aa69b;
          transform: translateY(-50%);
          pointer-events: none;
          transition: color .25s ease;
        }

        .enquiry-input-wrap:focus-within .enquiry-input-icon {
          color: #ad8527;
        }

        .enquiry-input,
        .enquiry-select,
        .enquiry-textarea {
          display: block;
          width: 100%;
          border: 1px solid #e0e6df;
          border-radius: 9px;
          background: #fbfcfa;
          color: #103d2e;
          font: inherit;
          font-size: 13px;
          outline: none;
          transition:
            border-color .3s ease,
            box-shadow .3s ease,
            background .3s ease;
        }

        .enquiry-input {
          min-height: 45px;
          padding: 11px 13px 11px 41px;
        }

        .enquiry-select {
          min-height: 45px;
          padding: 11px 13px;
          cursor: pointer;
        }

        .enquiry-textarea {
          min-height: 92px;
          padding: 12px 13px 12px 41px;
          resize: vertical;
        }

        .enquiry-input::placeholder,
        .enquiry-textarea::placeholder {
          color: #a0aaa2;
        }

        .enquiry-input:focus,
        .enquiry-select:focus,
        .enquiry-textarea:focus {
          border-color: #d8b54c;
          background: #fff;
          box-shadow:
            0 0 0 3px rgba(216,181,76,.14),
            0 3px 12px rgba(216,181,76,.08);
        }

        .enquiry-input.enquiry-invalid,
        .enquiry-textarea.enquiry-invalid {
          border-color: #e58b8b;
        }

        .enquiry-error {
          margin: 5px 0 0;
          color: #c34242;
          font-size: 11px;
          line-height: 1.5;
        }

        /* ===== SUBMIT BUTTON ===== */

        .enquiry-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          min-height: 48px;
          margin-top: 2px;
          padding: 13px 18px;
          border: 1px solid #d8b54c;
          border-radius: 9px;
          background: linear-gradient(110deg, #d8b54c, #f5d977);
          color: #082b20;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition:
            transform .3s ease,
            box-shadow .3s ease,
            filter .3s ease;
        }

        .enquiry-submit:hover {
          transform: translateY(-2px);
          filter: brightness(1.035);
          box-shadow:
            0 7px 20px rgba(216,181,76,.35),
            0 0 10px rgba(255,233,155,.4);
        }

        .enquiry-submit:active {
          transform: translateY(0);
        }

        /* ===== SUCCESS STATE ===== */

        .enquiry-success {
          padding: 38px 30px;
          text-align: center;
        }

        .enquiry-success-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 76px;
          height: 76px;
          margin: 0 auto 22px;
          border: 1px solid rgba(216,181,76,.6);
          border-radius: 50%;
          background: #f8f4e5;
          color: #17634a;
          box-shadow: 0 0 25px rgba(216,181,76,.18);
        }

        .enquiry-success h3 {
          margin: 0 0 12px;
          color: #103d2e;
          font-size: 25px;
          font-weight: 800;
        }

        .enquiry-success p {
          margin: 0 0 25px;
          color: #68766c;
          font-size: 14px;
          line-height: 1.9;
        }

        @keyframes enquirySpin {
          to { transform: rotate(360deg); }
        }

        .enquiry-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* ===== MOBILE ===== */

        @media (max-width: 520px) {
          .enquiry-overlay {
            align-items: center;
            padding: 12px;
          }

          .enquiry-card {
            max-height: 94vh;
            border-radius: 15px;
          }

          .enquiry-card-content {
            max-height: 94vh;
          }

          .enquiry-header {
            padding: 19px 17px;
          }

          .enquiry-heading {
            font-size: 19px;
          }

          .enquiry-form {
            gap: 15px;
            padding: 20px 17px 22px;
          }

          .enquiry-success {
            padding: 30px 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .enquiry-overlay,
          .enquiry-card,
          .enquiry-card::before,
          .enquiry-border-shine::before {
            animation: none !important;
          }

          .enquiry-card,
          .enquiry-card * {
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div
        className="enquiry-overlay"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) handleClose();
        }}
      >
        <div
          className="enquiry-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
        >
          <div className="enquiry-border-shine" />

          <div className="enquiry-card-content">
            {submitted ? (
              <div className="enquiry-success">
                <div className="enquiry-success-icon">
                  <CheckCircle2 size={42} />
                </div>

                <h3>Thank You!</h3>

                <p>
                  Your admission enquiry has been received. Our
                  admissions team will contact you shortly with further
                  information about the programme you are interested in.
                </p>

                <button
                  type="button"
                  onClick={handleClose}
                  className="enquiry-submit"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="enquiry-header">
                  <div>
                    <h3 className="enquiry-heading" id="enquiry-title">
                      Admission Enquiry
                    </h3>
                    <p className="enquiry-subtitle">
                      Fill in your details and we’ll get back to you.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="enquiry-close"
                    aria-label="Close enquiry form"
                  >
                    <X size={19} />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="enquiry-form"
                  noValidate
                >
                  {/* Full name */}
                  <div className="enquiry-field">
                    <label htmlFor="enquiry-name">Full Name *</label>
                    <div className="enquiry-input-wrap">
                      <User className="enquiry-input-icon" />
                      <input
                        id="enquiry-name"
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(event) =>
                          updateField('name', event.target.value)
                        }
                        className={`enquiry-input ${
                          errors.name ? 'enquiry-invalid' : ''
                        }`}
                        placeholder="Enter your full name"
                        aria-invalid={Boolean(errors.name)}
                      />
                    </div>
                    {errors.name && (
                      <p className="enquiry-error">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="enquiry-field">
                    <label htmlFor="enquiry-email">Email Address *</label>
                    <div className="enquiry-input-wrap">
                      <Mail className="enquiry-input-icon" />
                      <input
                        id="enquiry-email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(event) =>
                          updateField('email', event.target.value)
                        }
                        className={`enquiry-input ${
                          errors.email ? 'enquiry-invalid' : ''
                        }`}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                      />
                    </div>
                    {errors.email && (
                      <p className="enquiry-error">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="enquiry-field">
                    <label htmlFor="enquiry-phone">Phone Number *</label>
                    <div className="enquiry-input-wrap">
                      <Phone className="enquiry-input-icon" />
                      <input
                        id="enquiry-phone"
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(event) =>
                          updateField('phone', event.target.value)
                        }
                        className={`enquiry-input ${
                          errors.phone ? 'enquiry-invalid' : ''
                        }`}
                        placeholder="+91 98765 43210"
                        aria-invalid={Boolean(errors.phone)}
                      />
                    </div>
                    {errors.phone && (
                      <p className="enquiry-error">{errors.phone}</p>
                    )}
                  </div>

                  {/* Course */}
                  <div className="enquiry-field">
                    <label htmlFor="enquiry-course">
                      Programme of Interest
                    </label>
                    <select
                      id="enquiry-course"
                      value={formData.course}
                      onChange={(event) =>
                        updateField('course', event.target.value)
                      }
                      className="enquiry-select"
                    >
                      <option>Bachelor of Physiotherapy (BPT)</option>
                      <option>Master of Physiotherapy (MPT)</option>
                      <option>Ph.D. in Physiotherapy</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="enquiry-field">
                    <label htmlFor="enquiry-message">Message *</label>
                    <div className="enquiry-input-wrap">
                      <MessageSquare
                        className="enquiry-input-icon"
                        style={{ top: '20px' }}
                      />
                      <textarea
                        id="enquiry-message"
                        value={formData.message}
                        onChange={(event) =>
                          updateField('message', event.target.value)
                        }
                        rows={3}
                        className={`enquiry-textarea ${
                          errors.message ? 'enquiry-invalid' : ''
                        }`}
                        placeholder="Tell us about your interest in the programme..."
                        aria-invalid={Boolean(errors.message)}
                      />
                    </div>
                    {errors.message && (
                      <p className="enquiry-error">{errors.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        background: '#fff1f1',
                        border: '1px solid #efb4b4',
                        color: '#b42318',
                        fontSize: '13px',
                        lineHeight: 1.6,
                      }}
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="enquiry-submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        Sending Enquiry...
                        <span
                          aria-hidden="true"
                          style={{
                            width: '15px',
                            height: '15px',
                            border: '2px solid rgba(8,43,32,0.3)',
                            borderTopColor: '#082b20',
                            borderRadius: '50%',
                            display: 'inline-block',
                            animation: 'enquirySpin 0.7s linear infinite',
                          }}
                        />
                      </>
                    ) : (
                      <>
                        Submit Enquiry <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
