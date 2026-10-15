import { useEffect, useState } from 'react';
import { X, CheckCircle2, Send, User, Mail, Phone, MessageSquare } from 'lucide-react';

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

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[\d\s+\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }
    if (!formData.message.trim()) newErrors.message = 'Please enter your message';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setFormData(initialData);
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest-900/80 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="p-8 md:p-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-forest-50 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-forest-700" />
            </div>
            <h3 className="text-2xl font-bold text-forest-800 mb-3">Thank You!</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Your admission enquiry has been received. Our admissions team will contact you shortly
              with further information about the program you're interested in.
            </p>
            <button onClick={handleClose} className="btn-primary w-full">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-forest-800">Admission Enquiry</h3>
                <p className="text-sm text-gray-500 mt-1">Fill in your details and we'll get back to you.</p>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
                aria-label="Close enquiry form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      errors.name ? 'border-red-400' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      errors.email ? 'border-red-400' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      errors.phone ? 'border-red-400' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors`}
                    placeholder="+91 98765 43210"
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Program of Interest</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors bg-white"
                >
                  <option>Bachelor of Physiotherapy (BPT)</option>
                  <option>Master of Physiotherapy (MPT)</option>
                  <option>Ph.D. in Physiotherapy</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      errors.message ? 'border-red-400' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors resize-none`}
                    placeholder="Tell us about your interest in the program..."
                  />
                </div>
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button type="submit" className="btn-primary w-full">
                Submit Enquiry <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
