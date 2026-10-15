import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ArrowUpRight } from 'lucide-react';
import { collegeInfo } from '@/data/content';

const footerSections = [
  {
    title: 'About',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Vision & Mission', path: '/vision-mission' },
      { label: 'Madha Group', path: '/madha-group' },
      { label: 'Courses', path: '/courses' },
    ],
  },
  {
    title: 'Academics',
    links: [
      { label: 'Departments', path: '/departments' },
      { label: 'Facilities', path: '/facilities' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'News & Events', path: '/news-events' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'Admin Login', path: '/admin' },
    ],
  },
];

interface FooterProps {
  onEnquiryClick: () => void;
}

export default function Footer({ onEnquiryClick }: FooterProps) {
  return (
    <footer className="bg-forest-900 text-gray-300">
      {/* CTA band */}
      <div className="bg-forest-800">
        <div className="container-mcp py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-xl font-bold">Ready to begin your journey in physiotherapy?</h3>
            <p className="text-gray-400 text-sm mt-1">Apply today and join a community dedicated to rehabilitation excellence.</p>
          </div>
          <button onClick={onEnquiryClick} className="btn-primary whitespace-nowrap">
            Enquire Now <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-mcp py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
         {/* Brand */}
<div className="lg:col-span-2">
  <div className="flex items-center gap-3 mb-4">
    {/* Madha College Logo */}
    <img
      src="/logos/whitelogo.png"
      alt="Madha College of Physiotherapy Logo"
      className="w-16 h-16 object-contain shrink-0"
    />

    <div>
      <p className="font-serif text-lg font-bold text-white">
        Madha College
      </p>
      <p className="text-xs text-gold-400 font-medium tracking-wide">
        OF PHYSIOTHERAPY
      </p>
    </div>
  </div>

  <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
    A premier institution dedicated to physiotherapy education, combining evidence-based
    curriculum with extensive clinical training to produce skilled, compassionate
    rehabilitation professionals.
  </p>

  <div className="flex items-center gap-3 mt-6">
    {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
      <a
        key={i}
        href="#"
        className="w-10 h-10 rounded-lg bg-forest-800 hover:bg-gold-500 hover:text-forest-900 flex items-center justify-center transition-all duration-300"
        aria-label="Social media link"
      >
        <Icon className="w-4 h-4" />
      </a>
    ))}
  </div>
</div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-8 border-t border-forest-800">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
            <span className="text-sm text-gray-400">{collegeInfo.address}</span>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
            <span className="text-sm text-gray-400">{collegeInfo.phone}</span>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
            <span className="text-sm text-gray-400">{collegeInfo.email}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-800">
        <div className="container-mcp py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Madha College of Physiotherapy. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Part of the Madha Educational Group
          </p>
        </div>
      </div>
    </footer>
  );
}
