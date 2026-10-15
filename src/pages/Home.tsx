import { Link } from 'react-router-dom';

import { 

  Heart, GraduationCap, Award, BookOpen, Stethoscope, Activity, Dumbbell,

  Library, Monitor, Accessibility, Brain, Microscope, Trophy, Users,

  FlaskConical, ArrowRight, Calendar, MapPin, Phone, Mail, ChevronRight,

  Target, Eye, HandHeart, ShieldCheck, Lightbulb, Building2,

} from 'lucide-react';

import HeroSlider from '@/components/HeroSlider';

import SectionTitle from '@/components/SectionTitle';

import ScrollReveal from '@/components/ScrollReveal';

import { courses, departments, facilities, galleryItems, newsItems, heroSlides } from '@/data/content';

import { useState } from 'react';

import NewsEventsLiveCard from '@/components/NewsEventsLiveCard';

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

                src={heroSlides[0].image}

                alt="Physiotherapy education"

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



      {/* Vision & Mission preview \*/}

<ScrollReveal direction="right" as="section" className="section-padding bg-white">

        <div className="container-mcp">

          <SectionTitle

            eyebrow="Our Direction"

            title="Vision & Mission"

            description="Guided by clear principles that shape every aspect of our educational approach — from classroom teaching to clinical practice."

          />

          <div className="grid md:grid-cols-2 gap-6">

            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">

              <img

                src="https://images.pexels.com/photos/20860610/pexels-photo-20860610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"

                alt="Our Vision"

                className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-700"

              />

              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/95 to-forest-900/40" />

              <div className="absolute bottom-0 p-8">

                <Eye className="w-10 h-10 text-gold-500 mb-4" />

                <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>

                <p className="text-gray-200 leading-relaxed text-sm">

                  To be a center of excellence in physiotherapy education, producing skilled

                  professionals who advance rehabilitation science and serve communities with

                  evidence-based, compassionate care.

                </p>

                <Link to="/vision-mission" className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold mt-4 hover:gap-3 transition-all">

                  Read More <ArrowRight className="w-4 h-4" />

                </Link>

              </div>

            </div>



            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">

              <img

                src="https://images.pexels.com/photos/20860596/pexels-photo-20860596.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"

                alt="Our Mission"

                className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-700"

              />

              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/95 to-forest-900/40" />

              <div className="absolute bottom-0 p-8">

                <Target className="w-10 h-10 text-gold-500 mb-4" />

                <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>

                <p className="text-gray-200 leading-relaxed text-sm">

                  To deliver quality physiotherapy education through evidence-based curriculum,

                  hands-on clinical training, and a commitment to ethical practice and compassionate

                  patient care.

                </p>

                <Link to="/vision-mission" className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold mt-4 hover:gap-3 transition-all">

                  Read More <ArrowRight className="w-4 h-4" />

                </Link>

              </div>

            </div>

          </div>

        </div>

      </ScrollReveal>



      {/* Madha Group preview \*/}

<ScrollReveal direction="left" as="section" className="section-padding bg-forest-700">

        <div className="container-mcp grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <SectionTitle

              eyebrow="Our Heritage"

              title="Madha Educational Group"

              description="Madha College of Physiotherapy is part of the Madha Educational Group, an established educational group serving communities through a range of institutions."

              center={false}

              light

            />

            <p className="text-gray-300 leading-relaxed mb-6">

              The Madha Educational Group encompasses multiple institutions dedicated to quality

              education across professional disciplines. The group's commitment to accessible,

              value-based education provides the foundation upon which the College of Physiotherapy

              builds its specialized programs.

            </p>

            <p className="text-gray-300 leading-relaxed mb-8">

              Students benefit from the shared infrastructure, experienced faculty, and institutional

              culture of excellence that the group has cultivated across its educational initiatives.

            </p>

            <Link to="/madha-group" className="btn-primary">

              About Madha Group <ArrowRight className="w-4 h-4" />

            </Link>

          </div>

          <div className="relative">

            <div className="rounded-2xl overflow-hidden shadow-2xl">

              <img

                src="https://images.pexels.com/photos/19554793/pexels-photo-19554793.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"

                alt="Madha Educational Group campus"

                className="w-full h-[350px] object-cover"

              />

            </div>

            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-6 shadow-xl hidden md:block">

              <Building2 className="w-8 h-8 text-forest-700 mb-2" />

              <p className="text-sm font-bold text-forest-800">Educational Group</p>

              <p className="text-xs text-gray-500">Multiple institutions, one commitment</p>

            </div>

          </div>

        </div>

      </ScrollReveal>



      {/* Featured Courses \*/}

<ScrollReveal direction="right" as="section" className="section-padding bg-white">
  
        <div className="container-mcp">

          <SectionTitle

            eyebrow="Programs"

            title="Featured Courses"

            description="Comprehensive physiotherapy programs designed to build competent, confident, and compassionate professionals."

          />

          <div className="grid md:grid-cols-3 gap-6">

           
{courses.map((course, index) => {
  const Icon = iconMap[course.icon] ?? BookOpen;
  return (
    <ScrollReveal
      key={course.id}
      direction="up"
      delay={index * 120}
    >
      <div
        className="premium-hover-card bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group"
      >


                  <div className="h-2 bg-forest-700 group-hover:bg-gold-500 transition-colors" />

                  <div className="p-7">

                    <div className="w-14 h-14 rounded-xl bg-forest-50 group-hover:bg-forest-700 transition-colors duration-300 flex items-center justify-center mb-5">

                      <Icon className="w-7 h-7 text-forest-700 group-hover:text-gold-500 transition-colors" />

                    </div>

                    <h3 className="text-lg font-bold text-forest-800 leading-snug mb-3">{course.name}</h3>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{course.description}</p>

                    <div className="space-y-2 mb-5">

                      <div className="flex items-center gap-2 text-sm text-gray-500">

                        <Award className="w-4 h-4 text-gold-500 shrink-0" />

                        <span className="font-medium">Duration:</span> {course.duration}

                      </div>

                    </div>

                    <Link

                      to="/courses"

                      className="inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-gold-600 transition-colors"

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



      {/* Departments preview \*/}

      <ScrollReveal direction="up" as="section" className="section-padding bg-forest-50">

        <div className="container-mcp">

          <SectionTitle

            eyebrow="Specializations"

            title="Departments"

            description="Specialized departments covering the full spectrum of physiotherapy practice, each with dedicated faculty and clinical training facilities."

          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            
{departments.map((dept, index) => (
  <ScrollReveal
    key={dept.id}
    direction="up"
    delay={index * 120}
  >
    <Link
      to="/departments"


                className="premium-hover-card group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"

              >

                <div className="relative h-48 overflow-hidden">

                  <img

                    src={dept.image}

                    alt={dept.name}

                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"

                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 to-transparent" />

                  <h3 className="absolute bottom-3 left-4 right-4 text-white font-bold text-lg leading-snug">

                    {dept.name}

                  </h3>

                </div>

                <div className="p-5">

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{dept.description}</p>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-forest-700 mt-3 group-hover:text-gold-600 transition-colors">

                    Learn More <ChevronRight className="w-4 h-4" />

                  </span>

                </div>

                </Link>
  </ScrollReveal>
))}

          </div>

        </div>

      </ScrollReveal>



      {/* Facilities preview \*/}

      <ScrollReveal direction="up" as="section" className="section-padding bg-white">

        <div className="container-mcp">

          <SectionTitle

            eyebrow="Infrastructure"

            title="Facilities"

            description="Modern laboratories, well-equipped training spaces, and a comprehensive library support an immersive, hands-on learning experience."

          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            

{facilities.map((facility, index) => {
  const Icon = iconMap[facility.icon] ?? Monitor;

  return (
    <ScrollReveal
      key={facility.id}
      direction="up"
      delay={index * 120}
    >
    <Link
  to="/facilities"
  className="premium-hover-card group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
>


                  <div className="relative h-48 overflow-hidden">

                    <img

                      src={facility.image}

                      alt={facility.name}

                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"

                    />

                    <div className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">

                      <Icon className="w-5 h-5 text-forest-700" />

                    </div>

                  </div>

                  <div className="p-5">

                    <h3 className="font-bold text-forest-800 mb-2">{facility.name}</h3>

                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{facility.description}</p>

                  </div>

                      </Link>
    </ScrollReveal>
  );
})}

          </div>

          <div className="text-center mt-10">

            <Link to="/facilities" className="btn-outline">

              All Facilities <ArrowRight className="w-4 h-4" />

            </Link>

          </div>

        </div>

      </ScrollReveal>





      {/* News & Events preview \*/}

      <ScrollReveal direction="up" as="section" className="section-padding bg-white">

        <div className="container-mcp">

          <SectionTitle

            eyebrow="Stay Updated"

            title="News & Events"

            description="Announcements, workshops, seminars, and academic activities at Madha College of Physiotherapy."

          />

          <div className="grid md:grid-cols-3 gap-6">

{newsItems.slice(0, 3).map((item, index) => (
  <ScrollReveal
    key={item.id}
    direction="up"
    delay={index * 120}
  >
    <Link
      to="/news-events"


                className="premium-hover-card group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"

              >

                <div className="p-6 border-l-4 border-gold-500">

                  <div className="flex items-center gap-3 mb-3">

                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest-50 text-forest-700">

                      {item.type}

                    </span>

                    <span className="flex items-center gap-1 text-xs text-gray-400">

                      <Calendar className="w-3.5 h-3.5" />

                      {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}

                    </span>

                  </div>

                  <h3 className="font-bold text-forest-800 mb-2 group-hover:text-gold-700 transition-colors leading-snug">

                    {item.title}

                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{item.excerpt}</p>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-forest-700 mt-3 group-hover:text-gold-600 transition-colors">

                    Read More <ArrowRight className="w-4 h-4" />

                  </span>

                </div>

                 </Link>
  </ScrollReveal>
))}

          </div>

          <div className="text-center mt-10">

            <Link to="/news-events" className="btn-outline">

              All News & Events <ArrowRight className="w-4 h-4" />

            </Link>

          </div>

        </div>

      </ScrollReveal>



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