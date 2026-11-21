import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, BookOpen, ArrowRight, CheckCircle2, Clock, User, ChevronDown, Briefcase } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionTitle from '@/components/SectionTitle';
import { courses, mptSpecializations } from '@/data/content';
import ScrollReveal from '@/components/ScrollReveal';

interface CoursesProps {
  onEnquiryClick: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Award, BookOpen,
};

/* Flip panel: front = green card with icon + title, back = image only */
function CourseFlipPanel({
  name,
  image,
  Icon,
}: {
  name: string;
  image?: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const [flipped, setFlipped] = useState(false);

  const faceStyle: React.CSSProperties = {
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  };

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      style={{ perspective: '1000px' }}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setFlipped(false)}
      onClick={() => setFlipped((f) => !f)} // tap to flip on touch screens
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-forest-700 p-8 flex flex-col justify-center items-center text-center"
          style={faceStyle}
        >
          <div className="w-20 h-20 rounded-2xl bg-gold-500 flex items-center justify-center mb-5">
            <Icon className="w-10 h-10 text-forest-900" />
          </div>

          <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-2">
            Program
          </p>

          <h3 className="text-xl font-bold text-white leading-snug">{name}</h3>
        </div>

        {/* BACK: image only */}
        <div
          className="absolute inset-0 bg-forest-700 overflow-hidden"
          style={{ ...faceStyle, transform: 'rotateY(180deg)' }}
        >
          {image && (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Courses({ onEnquiryClick }: CoursesProps) {
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<string | null>(null);

  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle="Comprehensive physiotherapy programs designed to build competent, confident, and compassionate professionals."
        image="https://images.pexels.com/photos/8197553/pexels-photo-8197553.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        breadcrumbs={[{ label: 'Courses' }]}
      />

      {/* Course cards */}
      <section className="section-padding bg-white">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="Programs Offered"
            title="Our Physiotherapy Programs"
            description="From undergraduate foundations to advanced specialization and doctoral research, our programs cover the full spectrum of physiotherapy education."
          />

          <div className="space-y-8">
            {courses.map((course, index) => {
              const Icon = iconMap[course.icon] ?? BookOpen;
              const isEven = index % 2 === 0;

              return (
                <ScrollReveal
                  key={course.id}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  className="w-full"
                >
                  <div className="grid lg:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    {/* Left: Flip card panel */}
                    <div
                      className={`relative min-h-[320px] bg-forest-700 ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <CourseFlipPanel
                        name={course.name}
                        image={course.image}
                        Icon={Icon}
                      />
                    </div>

                    {/* Right: Details */}
                    <div
                      className={`lg:col-span-2 p-8 bg-white ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {course.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-forest-50">
                          <Clock className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-forest-700 uppercase tracking-wide">
                              Duration
                            </p>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {course.duration}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-xl bg-forest-50">
                          <User className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-forest-700 uppercase tracking-wide">
                              Eligibility
                            </p>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {course.eligibility}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm font-semibold text-forest-800 mb-3">
                          Program Highlights
                        </p>

                        <div className="grid sm:grid-cols-2 gap-2">
                          {course.highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      <button onClick={onEnquiryClick} className="btn-primary">
                        Apply for Admission <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

 {/* MPT Specializations */}
<section className="section-padding bg-forest-700">
  <div className="container-mcp">
    <div className="[&_h2]:text-white [&_p:last-of-type]:text-gray-300">
      <SectionTitle
        eyebrow="MPT Specializations"
        title="Areas of Specialization"
        description="Explore our postgraduate specialization areas designed to develop advanced clinical knowledge, research skills and professional expertise."
      />
      </div>

          {/* Specialization Buttons - 2 x 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto mb-10">
{mptSpecializations.map((spec) => {
                const isSelected = selectedSpecialization === spec.id;

              return (
                <button
                  key={spec.id}
                  onClick={() =>
                    setSelectedSpecialization(isSelected ? null : spec.id)
                  }
                  aria-pressed={isSelected}
                  className={`group relative overflow-hidden rounded-2xl p-6 md:p-8 text-left border-2 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-500/40 ${
  isSelected
    ? 'bg-gradient-to-br from-forest-800 to-forest-900 text-white border-gold-500 shadow-2xl -translate-y-1'
    : 'bg-white text-forest-800 border-gray-100 shadow-md hover:border-gold-500 hover:shadow-xl hover:-translate-y-1'
}`}
                >
                  {/* Decorative corner circle */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full transition-all duration-500 group-hover:scale-125 ${
                      isSelected ? 'bg-gold-500/20' : 'bg-forest-50'
                    }`}
                  />

                
                  {/* Content */}
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 mb-5 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 ${
                        isSelected
                          ? 'bg-gold-500'
                          : 'bg-forest-50 group-hover:bg-gold-500'
                      }`}
                    >
                      <Award
                        className={`w-6 h-6 md:w-7 md:h-7 transition-colors ${
                          isSelected
                            ? 'text-forest-900'
                            : 'text-forest-700 group-hover:text-forest-900'
                        }`}
                      />
                    </div>

                    <h3 className="text-base md:text-xl font-bold leading-snug mb-4">
                      {spec.name}
                    </h3>

                    <div
                      className={`inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold ${
                        isSelected ? 'text-gold-400' : 'text-forest-700'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'View Details'}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isSelected ? 'rotate-180' : 'group-hover:translate-y-0.5'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Animated bottom accent bar */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 h-1 bg-gold-500 transition-all duration-500 ${
                      isSelected ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                  
                </button>
              );
            })}
          </div>

          {/* Selected Specialization Details */}
          {selectedSpecialization && (
            <div className="max-w-5xl mx-auto animate-fade-in">
              {mptSpecializations
                .filter((spec) => spec.id === selectedSpecialization)
                .map((spec) => {
                  const mptCourse = courses.find(
                    (course) => course.id === 'mpt'
                  );

                  return (
                    <div
                      key={spec.id}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 border-t-4 border-t-gold-500"
                    >
                      {/* Card Header */}
                      <div className="relative overflow-hidden bg-gradient-to-r from-forest-700 to-forest-900 p-6 md:p-8 flex items-center gap-4">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-gold-500/15"
                        />
                        <div className="relative w-14 h-14 rounded-xl bg-gold-500 flex items-center justify-center shrink-0 shadow-lg">
                          <Award className="w-8 h-8 text-forest-900" />
                        </div>

                        <div className="relative">
                          <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1">
                            MPT Specialization
                          </p>

                          <h3 className="text-xl md:text-2xl font-bold text-white">
                            {spec.name}
                          </h3>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 md:p-8">
                        {/* Description */}
                        <div className="mb-7">
                          <h4 className="text-lg font-bold text-forest-800 mb-3">
                            Course Description
                          </h4>

                          <p className="text-gray-600 text-sm leading-relaxed">
                            {spec.description}
                          </p>
                        </div>

                        {/* Duration and Eligibility */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-7">
                          <div className="bg-forest-50 rounded-xl p-5 flex items-start gap-3">
                            <Clock className="w-6 h-6 text-forest-700 shrink-0" />

                            <div>
                              <p className="text-xs uppercase tracking-wide font-bold text-forest-700 mb-2">
                                Duration
                              </p>

                              <p className="text-sm text-gray-600">
                                {mptCourse?.duration}
                              </p>
                            </div>
                          </div>

                          <div className="bg-forest-50 rounded-xl p-5 flex items-start gap-3">
                            <User className="w-6 h-6 text-forest-700 shrink-0" />

                            <div>
                              <p className="text-xs uppercase tracking-wide font-bold text-forest-700 mb-2">
                                Eligibility
                              </p>

                              <p className="text-sm text-gray-600">
                                {mptCourse?.eligibility}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Program Highlights */}
                        <div>
                          <h4 className="text-lg font-bold text-forest-800 mb-4">
                            Program Highlights
                          </h4>

                          <div className="grid sm:grid-cols-2 gap-3">
                            {spec.highlights.map((highlight) => (
                              <div
                                key={highlight}
                                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border-l-4 border-gold-500 hover:bg-forest-50 hover:translate-x-1 transition-all duration-200"
                              >
                                <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />

                                <span className="text-sm text-gray-600 leading-relaxed">
                                  {highlight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Career Opportunities */}
{spec.careers && spec.careers.length > 0 && (
  <div className="mt-7">
    <h4 className="text-lg font-bold text-forest-800 mb-4">
      Career Opportunities
    </h4>

    <div className="flex flex-wrap gap-3">
      {spec.careers.map((career) => (
        <span
          key={career}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-50 border border-forest-700/10 text-sm font-medium text-forest-800 hover:bg-forest-700 hover:text-white hover:border-forest-700 transition-colors duration-200"
        >
          <Briefcase className="w-4 h-4 text-gold-500 shrink-0" />
          {career}
        </span>
      ))}
    </div>
  </div>
)}

{/* Close Button */}

                        {/* Close Button */}
                        <div className="text-right mt-7">
                          <button
                            onClick={() => setSelectedSpecialization(null)}
                            className="px-6 py-3 rounded-lg bg-forest-700 text-white text-sm font-semibold hover:bg-forest-800 transition-colors"
                          >
                            Close Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>

      {/* Admission process */}
      <section className="section-padding bg-white">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="How to Join"
            title="Admission Process"
            description="A clear, structured process to guide prospective students from application to enrollment."
          />
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Submit Enquiry', desc: 'Express your interest through our admission enquiry form or contact the admissions office directly.' },
              { step: '02', title: 'Verify Eligibility', desc: 'Our team will verify that you meet the eligibility criteria for your chosen program.' },
              { step: '03', title: 'Entrance Assessment', desc: 'Participate in the entrance assessment and personal interview as part of the selection process.' },
              { step: '04', title: 'Enrollment', desc: 'Complete the enrollment formalities and begin your journey in physiotherapy education.' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-forest-50 rounded-2xl p-7 h-full hover:shadow-lg transition-all duration-300 group">
                  <div className="text-4xl font-bold text-gold-500/50 group-hover:text-gold-500 transition-colors mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-forest-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={onEnquiryClick} className="btn-primary">
              Start Your Application <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-700 py-16">
        <div className="container-mcp text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Have Questions About Our Programs?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            Our admissions team is ready to help you find the right program and guide you through the application process.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Admissions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}