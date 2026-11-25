import { Link } from 'react-router-dom';

import {
  Heart,
  GraduationCap,
  Award,
  BookOpen,
  Stethoscope,
  Activity,
  Dumbbell,
  Library,
  Monitor,
  Accessibility,
  Brain,
  Microscope,
  Trophy,
  Users,
  FlaskConical,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Target,
  Eye,
  HandHeart,
  ShieldCheck,
  Lightbulb,
  Building2,
} from 'lucide-react';

import { useState } from 'react';
import type { ComponentType } from 'react';

import HeroSlider from '@/components/HeroSlider';
import SectionTitle from '@/components/SectionTitle';
import ScrollReveal from '@/components/ScrollReveal';
import FacilitiesHomeDemo from '@/components/FacilitiesHomeDemo';
import NewsEventsLiveCard from '@/components/NewsEventsLiveCard';

import {
  courses,
  departments,
  facilities,
  galleryItems,
} from '@/data/content';

interface HomeProps {

  onEnquiryClick: () => void;

}



const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {

  GraduationCap, Award, BookOpen, Stethoscope, Activity, Dumbbell, Library,

  Monitor, Accessibility, Brain, Microscope,

};



export default function Home({ onEnquiryClick }: HomeProps) {

  const [selectedGallery, setSelectedGallery] = useState<number | null>(null);





  return (

    <div className="overflow-x-hidden">

      {/* Hero \*/}

      <HeroSlider onEnquiryClick={onEnquiryClick} />





      {/* Intro strip \*/}

      <div className="bg-forest-700 text-white py-4 overflow-hidden">

        <div className="flex animate-marquee whitespace-nowrap">

          {[...Array(2)].map((_, i) => (

            <div key={i} className="flex items-center gap-8 px-4">

              <span className="flex items-center gap-2 text-sm"><Trophy className="w-4 h-4 text-gold-500" /> Evidence-Based Curriculum</span>

              <span className="text-gold-500">•</span>

              <span className="flex items-center gap-2 text-sm"><Stethoscope className="w-4 h-4 text-gold-500" /> Hands-On Clinical Training</span>

              <span className="text-gold-500">•</span>

              <span className="flex items-center gap-2 text-sm"><Users className="w-4 h-4 text-gold-500" /> Experienced Faculty</span>

              <span className="text-gold-500">•</span>

              <span className="flex items-center gap-2 text-sm"><Building2 className="w-4 h-4 text-gold-500" /> Part of Madha Educational Group</span>

              <span className="text-gold-500">•</span>

              <span className="flex items-center gap-2 text-sm"><Award className="w-4 h-4 text-gold-500" /> Professional Excellence</span>

              <span className="text-gold-500">•</span>

            </div>

          ))}

        </div>

      </div>



      {/* College Introduction \*/}

<ScrollReveal direction="left" as="section" className="section-padding bg-white">

        <div className="container-mcp grid lg:grid-cols-2 gap-12 items-center">

          <div className="relative">

            <div className="rounded-2xl overflow-hidden shadow-xl">

              
<img
  src="/images/madha physio .png"
  alt="Madha College of Physiotherapy campus"
  className="w-full h-[400px] object-cover"
/>


            </div>

            <div className="absolute -bottom-6 -right-6 bg-gold-500 rounded-2xl p-6 shadow-xl hidden md:block">

              <p className="text-4xl font-bold text-forest-900">BPT</p>

              <p className="text-sm text-forest-800 font-medium mt-1">Flagship Program</p>

              <p className="text-xs text-forest-700 mt-1">4½ Years including internship</p>

            </div>

            <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-forest-100 rounded-2xl hidden md:block" />

          </div>



          <div>

            <SectionTitle

              eyebrow="Welcome"

              title="Madha College of Physiotherapy"

              description="A dedicated institution committed to excellence in physiotherapy education, research, and rehabilitation. We combine a rigorous evidence-based curriculum with extensive clinical training to prepare graduates who are skilled, ethical, and compassionate."

              center={false}

            />

            <p className="text-gray-600 leading-relaxed mb-6">

              As part of the Madha Educational Group, the college draws upon a strong tradition of

              educational service. Our programs are designed to meet the evolving needs of healthcare,

              producing physiotherapists who are ready to serve communities with competence and care.

            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">

              {[

                { icon: Target, label: 'Quality Education', desc: 'Rigorous academic curriculum' },

                { icon: Stethoscope, label: 'Clinical Training', desc: 'Hands-on patient care experience' },

                { icon: ShieldCheck, label: 'Ethical Practice', desc: 'Professional values and integrity' },

                { icon: HandHeart, label: 'Compassion', desc: 'Patient-centered rehabilitation' },

              ].map((item) => (

                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-forest-50 hover:bg-forest-100 transition-colors">

                  <div className="w-10 h-10 rounded-lg bg-forest-700 flex items-center justify-center shrink-0">

                    <item.icon className="w-5 h-5 text-gold-500" />

                  </div>

                  <div>

                    <p className="font-semibold text-sm text-forest-800">{item.label}</p>

                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>

                  </div>

                </div>

              ))}

            </div>

            <Link to="/about" className="btn-secondary">

              Learn More About Us <ArrowRight className="w-4 h-4" />

            </Link>

          </div>

        </div>

      </ScrollReveal>



      {/* About Us preview \*/}

      <ScrollReveal direction="up" as="section" className="section-padding bg-forest-50">

        <div className="container-mcp">

          <SectionTitle

            eyebrow="About Us"

            title="A Tradition of Educational Excellence"

            description="Rooted in the values of the Madha Educational Group, our college blends academic rigor with practical learning to shape the next generation of physiotherapy professionals."

          />

          <div className="grid md:grid-cols-3 gap-6">

            {[

              {

                icon: BookOpen,

                title: 'Academic Excellence',

                desc: 'A structured, evidence-based curriculum aligned with professional standards, delivered by experienced faculty committed to student learning and growth.',

              },

              {

                icon: FlaskConical,

                title: 'Practical Learning',

                desc: 'Students engage in supervised clinical practice from early in the program, developing hands-on skills in real patient care settings under faculty guidance.',

              },

              {

                icon: Heart,

                title: 'Professional Values',

                desc: 'We instill ethical practice, lifelong learning, and a compassionate approach to patient care — qualities essential to a successful physiotherapy career.',

              },

            ].map((card) => (

              <div

                key={card.title}

                className="premium-hover-card bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"

              >

                <div className="w-14 h-14 rounded-xl bg-forest-700 group-hover:bg-gold-500 transition-colors duration-300 flex items-center justify-center mb-5">

                  <card.icon className="w-7 h-7 text-gold-500 group-hover:text-forest-900 transition-colors" />

                </div>

                <h3 className="text-xl font-bold text-forest-800 mb-3">{card.title}</h3>

                <p className="text-gray-600 leading-relaxed text-sm">{card.desc}</p>

              </div>

            ))}

          </div>

          <div className="text-center mt-10">

            <Link to="/about" className="btn-outline">

              Read More <ArrowRight className="w-4 h-4" />

            </Link>

          </div>

        </div>

      </ScrollReveal>



     

      

      


    {/* Featured Courses */}
<ScrollReveal direction="right" as="section" className="section-padding bg-white">
  <div className="container-mcp">
    <SectionTitle
      eyebrow="Programs"
      title="Featured Courses"
      description="Comprehensive physiotherapy programs designed to build competent, confident, and compassionate professionals."
    />

    {/* 2 columns, centered, equal height */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
      {courses.map((course, index) => {
        const Icon = iconMap[course.icon] ?? BookOpen;
        return (
          <ScrollReveal
            key={course.id}
            direction="up"
            delay={index * 120}
            className="h-full"
          >
            <div className="premium-hover-card h-full flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group">
              <div className="h-2 bg-forest-700 group-hover:bg-gold-500 transition-colors" />

              <div className="p-7 flex flex-col flex-1">
                <div className="w-14 h-14 rounded-xl bg-forest-50 group-hover:bg-forest-700 transition-colors duration-300 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-forest-700 group-hover:text-gold-500 transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-forest-800 leading-snug mb-3">
                  {course.name}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="mb-5">
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <Award className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>
                      <span className="font-medium">Duration:</span> {course.duration}
                    </span>
                  </div>
                </div>

                {/* mt-auto pins the link to the bottom so both cards line up */}
                <Link
                  to="/courses"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-gold-600 transition-colors"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>

    <div className="text-center mt-10">
      <Link to="/courses" className="btn-secondary">
        View All Programs <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </div>
</ScrollReveal>



{/* Departments Preview */}

<ScrollReveal
  direction="up"
  as="section"
  className="section-padding bg-forest-50"
>
  <div className="container-mcp">

    <SectionTitle
      eyebrow="Specializations"
      title="Our Departments"
      description="Explore our specialized departments, offering comprehensive physiotherapy education, practical learning and dedicated clinical training."
    />

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {departments.map((dept, index) => (
        <ScrollReveal
          key={dept.id}
          direction="up"
          delay={index * 120}
        >
          <Link
            to="/departments"
            className="department-card group flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
          >

            {/* Department Image */}
            <div className="relative h-48 overflow-hidden">

              <img
                src={dept.image}
                alt={dept.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/30 to-transparent" />

            </div>

            {/* Department Content */}
            <div className="flex flex-1 flex-col p-5">

              <div className="mb-3 h-1 w-12 rounded-full bg-gold-500 transition-all duration-500 group-hover:w-20" />

<h3 className="text-lg font-bold text-forest-800 mb-3 group-hover:text-gold-600 transition-colors">      
            {dept.name}
              </h3>

              <p className="text-sm text-gray-600 leading-7 line-clamp-3">
                {dept.description}
              </p>

              {/* Learn More */}
              <div className="mt-auto pt-5">

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest-700 group-hover:text-gold-600 transition-colors">

                  Learn More

                  <ChevronRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  />

                </span>

              </div>

            </div>

          </Link>
        </ScrollReveal>
      ))}

    </div>

    {/* View All Departments */}
    <div className="text-center mt-10">

      <Link
        to="/departments"
        className="btn-secondary inline-flex items-center gap-2"
      >
        Explore All Departments
        <ArrowRight className="w-4 h-4" />
      </Link>

    </div>

  </div>

  <style>{`
    .department-card {
      transform: translateY(0);
    }

    .department-card:hover {
      transform: translateY(-7px);
    }

    @media (prefers-reduced-motion: reduce) {
      .department-card,
      .department-card * {
        transition: none !important;
      }

      .department-card:hover {
        transform: none;
      }
    }
  `}</style>

</ScrollReveal>




     

{/* Facilities Preview */}
<FacilitiesHomeDemo
  facilities={facilities}
  iconMap={iconMap}
/>






      {/* Admission enquiry CTA \*/}

      <ScrollReveal direction="scale" as="section" className="relative py-20 overflow-hidden">

        <div className="absolute inset-0">

          <img

            src="https://images.pexels.com/photos/8197553/pexels-photo-8197553.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"

            alt="Admission"

            className="w-full h-full object-cover"

          />

          <div className="absolute inset-0 bg-forest-900/90" />

        </div>

        <div className="relative container-mcp text-center">

          <Lightbulb className="w-12 h-12 text-gold-500 mx-auto mb-6" />

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">

            Begin Your Career in Physiotherapy

          </h2>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">

            Take the first step toward a rewarding career in rehabilitation and patient care.

            Our admissions team is ready to guide you through the process.

          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <button onClick={onEnquiryClick} className="btn-primary">

              Admission Enquiry

            </button>

            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:text-forest-700 active:scale-95">

              Contact Us

            </Link>

          </div>

        </div>

      </ScrollReveal>



      {/* Quick contact strip \*/}

      <ScrollReveal direction="up" as="section" className="bg-forest-800 py-12">

        <div className="container-mcp grid md:grid-cols-3 gap-6">

          {[

            { icon: MapPin, title: 'Visit Us', text: 'Madha Educational Group Campus, Chennai, Tamil Nadu, India' },

            { icon: Phone, title: 'Call Us', text: '+91 (Contact office for details)' },

            { icon: Mail, title: 'Email Us', text: 'info@madhaphysiotherapy.edu.in' },

          ].map((item) => (

            <div key={item.title} className="premium-hover-card flex items-start gap-4 p-5 rounded-xl bg-forest-900/50">

              <div className="w-12 h-12 rounded-lg bg-gold-500 flex items-center justify-center shrink-0">

                <item.icon className="w-6 h-6 text-forest-900" />

              </div>

              <div>

                <p className="text-white font-semibold mb-1">{item.title}</p>

                <p className="text-sm text-gray-400">{item.text}</p>

              </div>

            </div>

          ))}

        </div>

      </ScrollReveal>



      {/* Lightbox for gallery preview \*/}

      {selectedGallery !== null && (

        <div

          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-900/90 backdrop-blur-sm p-4 animate-fade-in"

          onClick={() => setSelectedGallery(null)}

        >

          <button

            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"

            onClick={() => setSelectedGallery(null)}

          >

            <span className="text-xl">✕</span>

          </button>

          <img

            src={galleryItems.find((g) => g.id === selectedGallery)?.image}

            alt={galleryItems.find((g) => g.id === selectedGallery)?.title}

            className="max-w-full max-h-full rounded-xl object-contain"

          />

        </div>

        )}

      {/* Live News & Events Card */}
      <NewsEventsLiveCard />
    </div>
  );
}