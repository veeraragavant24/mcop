import { Link } from 'react-router-dom';
import { Eye, Target, Heart, ShieldCheck, Brain, HandHeart, BookOpen, Stethoscope, ArrowRight, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionTitle from '@/components/SectionTitle';

const coreValues = [
  { icon: BookOpen, title: 'Quality Education', desc: 'Delivering a rigorous, evidence-based curriculum that meets professional standards and prepares graduates for competent practice.' },
  { icon: Brain, title: 'Evidence-Based Physiotherapy', desc: 'Grounding all teaching and clinical practice in current scientific evidence, research findings, and established therapeutic principles.' },
  { icon: Stethoscope, title: 'Rehabilitation Excellence', desc: 'Promoting comprehensive rehabilitation that restores function, enhances quality of life, and empowers patients toward independence.' },
  { icon: ShieldCheck, title: 'Ethical Practice', desc: 'Instilling professional integrity, honest communication, and adherence to ethical codes in every aspect of patient care.' },
  { icon: HandHeart, title: 'Compassionate Patient Care', desc: 'Placing empathy, dignity, and individualized attention at the center of the therapeutic relationship.' },
];

const objectives = [
  'Provide comprehensive physiotherapy education that builds strong scientific foundations and clinical competencies',
  'Foster critical thinking and clinical reasoning skills essential for effective assessment and treatment',
  'Cultivate research aptitude and engagement with evidence-based practice',
  'Develop professional communication skills for effective patient interaction and teamwork',
  'Promote community awareness of rehabilitation and preventive physiotherapy',
  'Prepare graduates who are ready to serve in diverse healthcare settings with competence and compassion',
];

export default function VisionMission() {
  return (
    <div>
      <PageHeader
        title="Vision & Mission"
        subtitle="The principles that guide our institution and shape every aspect of our educational approach."
        image="https://images.pexels.com/photos/20860596/pexels-photo-20860596.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        breadcrumbs={[{ label: 'Vision & Mission' }]}
      />

      {/* Vision */}
      <section className="section-padding bg-white">
        <div className="container-mcp grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/20860610/pexels-photo-20860610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Our Vision"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-forest-700 rounded-2xl p-6 shadow-xl hidden md:block">
              <Eye className="w-10 h-10 text-gold-500" />
            </div>
          </div>
          <div>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-gold-600 mb-3">Our Vision</span>
            <h2 className="text-3xl font-bold text-forest-800 mb-5">Looking Forward</h2>
            <div className="h-1 w-20 bg-gold-500 rounded-full mb-6" />
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              To be a center of excellence in physiotherapy education, producing skilled professionals
              who advance rehabilitation science and serve communities with evidence-based, compassionate
              care.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We envision an institution where students develop not only the technical competence
              required for physiotherapy practice but also the professional values and personal qualities
              that define outstanding healthcare providers — integrity, empathy, and a commitment to
              lifelong learning.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-forest-50">
        <div className="container-mcp grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-gold-600 mb-3">Our Mission</span>
            <h2 className="text-3xl font-bold text-forest-800 mb-5">What We Do</h2>
            <div className="h-1 w-20 bg-gold-500 rounded-full mb-6" />
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              To deliver quality physiotherapy education through evidence-based curriculum, hands-on
              clinical training, and a commitment to ethical practice and compassionate patient care.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We strive to create an educational environment where students are challenged to achieve
              their full potential, supported by experienced faculty, modern facilities, and a curriculum
              that bridges theory and practice. Our mission extends beyond the classroom to include
              community engagement and the advancement of the physiotherapy profession.
            </p>
            <Link to="/courses" className="btn-secondary">
              Explore Our Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/40117755/pexels-photo-40117755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Our Mission"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-gold-500 rounded-2xl p-6 shadow-xl hidden md:block">
              <Target className="w-10 h-10 text-forest-900" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="What We Stand For"
            title="Core Values"
            description="Five principles that guide our curriculum, clinical training, and institutional culture."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, i) => (
              <div
                key={value.title}
                className={`bg-gradient-to-br from-forest-50 to-white rounded-2xl p-7 border border-forest-100 hover:shadow-xl transition-all duration-300 group ${
                  i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-forest-700 group-hover:bg-gold-500 transition-colors duration-300 flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-gold-500 group-hover:text-forest-900 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-forest-800 mb-3">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-padding bg-forest-700">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="Our Goals"
            title="Educational Objectives"
            description="Specific outcomes we work toward in every program and every student interaction."
            light
          />
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {objectives.map((obj) => (
              <div key={obj} className="flex items-start gap-3 p-5 rounded-xl bg-forest-800/50 hover:bg-forest-800 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm leading-relaxed">{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="container-mcp text-center">
          <Heart className="w-12 h-12 text-gold-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-forest-800 mb-3">Join Our Mission</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Become part of an institution dedicated to advancing physiotherapy through education, research, and compassionate care.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
