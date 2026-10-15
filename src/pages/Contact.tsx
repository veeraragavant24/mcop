import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, User, MessageSquare } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionTitle from '@/components/SectionTitle';
import { collegeInfo } from '@/data/content';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

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
      newErrors.phone = 'Please enter a valid phone number';
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

  const contactCards = [
    {
      icon: MapPin,
      title: 'Address',
      lines: [collegeInfo.address],
    },
    {
      icon: Phone,
      title: 'Phone',
      lines: [collegeInfo.phone],
    },
    {
      icon: Mail,
      title: 'Email',
      lines: [collegeInfo.email],
    },
    {
      icon: Clock,
      title: 'Office Hours',
      lines: ['Monday – Friday: 9:00 AM – 5:00 PM', 'Saturday: 9:00 AM – 1:00 PM'],
    },
  ];

  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our admissions office for enquiries about programs, admissions, or any other information."
        image="https://images.pexels.com/photos/19554793/pexels-photo-19554793.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      {/* Contact cards */}
      <section className="section-padding bg-white">
        <div className="container-mcp">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="bg-forest-50 rounded-2xl p-7 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-forest-700 group-hover:bg-gold-500 transition-colors duration-300 flex items-center justify-center mb-5">
                  <card.icon className="w-7 h-7 text-gold-500 group-hover:text-forest-900 transition-colors" />
                </div>
                <h3 className="font-bold text-forest-800 mb-2">{card.title}</h3>
                {card.lines.map((line, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto rounded-full bg-forest-50 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-forest-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-forest-800 mb-3">Message Sent!</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Thank you for reaching out. We'll respond to your enquiry as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
                    }}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-forest-800 mb-2">Send Us a Message</h3>
                  <p className="text-sm text-gray-500 mb-6">Fields marked with * are required.</p>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors`}
                            placeholder="Your name"
                          />
                        </div>
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors`}
                            placeholder="you@example.com"
                          />
                        </div>
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${errors.phone ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors`}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors bg-white"
                        >
                          <option>General Enquiry</option>
                          <option>Admission Enquiry</option>
                          <option>Course Information</option>
                          <option>Career Opportunity</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={5}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${errors.message ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors resize-none`}
                          placeholder="Your message..."
                        />
                      </div>
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Send Message <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-forest-800 mb-2">Find Us</h3>
                <p className="text-sm text-gray-500">Madha College of Physiotherapy, Chennai, Tamil Nadu, India</p>
              </div>
              <div className="h-[400px] bg-forest-50">
                <iframe
                  title="College location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=80.15%2C12.92%2C80.30%2C13.10&layer=mapnik&marker=13.01%2C80.22"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
