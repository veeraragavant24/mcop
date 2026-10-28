import { Link } from 'react-router-dom';
import { GraduationCap, Award, BookOpen, ArrowRight, CheckCircle2, Clock, User } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionTitle from '@/components/SectionTitle';
import { courses, courseSpecializations } from '@/data/content';
import ScrollReveal from '@/components/ScrollReveal';
interface CoursesProps {
  onEnquiryClick: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Award, BookOpen,
};

export default function Courses({ onEnquiryClick }: CoursesProps) {
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
        <div
          className={`grid lg:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 ${
            isEven ? '' : 'lg:flex-row-reverse'
          }`}
        >
          {/* Left: Icon panel */}
          <div
            className={`bg-forest-700 p-8 flex flex-col justify-center items-center text-center ${
              isEven ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <div className="w-20 h-20 rounded-2xl bg-gold-500 flex items-center justify-center mb-5">
              <Icon className="w-10 h-10 text-forest-900" />
            </div>

            <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-2">
              Program
            </p>

            <h3 className="text-xl font-bold text-white leading-snug">
              {course.name}
            </h3>
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
      <section className="section-padding bg-forest-50">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="MPT Specializations"
            title="Areas of Specialization"
            description="The Master of Physiotherapy program offers specialization in these key areas of physiotherapy practice."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseSpecializations.map((spec) => (
              <div
                key={spec}
                className="flex items-center gap-3 p-5 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
              >
                <div className="w-10 h-10 rounded-lg bg-forest-50 group-hover:bg-gold-500 transition-colors flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-forest-700 group-hover:text-forest-900 transition-colors" />
                </div>
                <span className="text-sm font-medium text-forest-800">{spec}</span>
              </div>
            ))}
          </div>
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
