import { Link } from 'react-router-dom';
import { Building2, GraduationCap, Users, Heart, ArrowRight, CheckCircle2, BookOpen, Stethoscope } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionTitle from '@/components/SectionTitle';

export default function MadhaGroup() {
  return (
    <div>
      <PageHeader
        title="Madha Educational Group"
        subtitle="An established educational group serving communities through a range of professional institutions."
        image="https://images.pexels.com/photos/19554793/pexels-photo-19554793.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        breadcrumbs={[{ label: 'Madha Group' }]}
      />

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-mcp grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/396304/pexels-photo-396304.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Madha Educational Group campus"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -top-5 -right-5 bg-gold-500 rounded-2xl p-6 shadow-xl hidden md:block">
              <Building2 className="w-10 h-10 text-forest-900" />
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Overview" title="Educational Group Overview" center={false} />
            <p className="text-gray-600 leading-relaxed mb-4">
              The Madha Educational Group is an established educational group that encompasses
              multiple institutions dedicated to quality education across professional disciplines.
              The group's commitment to accessible, value-based education provides the foundation upon
              which the College of Physiotherapy builds its specialized programs.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Through a shared infrastructure, experienced faculty, and a culture of educational
              excellence, the group supports institutions that serve their respective professional
              fields with dedication and integrity. Each institution within the group maintains its
              specialized focus while contributing to the group's broader educational mission.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Madha College of Physiotherapy benefits from this institutional network, drawing upon
              shared resources, administrative expertise, and the educational values that the group
              has cultivated across its initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Group values */}
      <section className="section-padding bg-forest-50">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="Shared Principles"
            title="Group Educational Values"
            description="The principles that unite all institutions within the Madha Educational Group."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: 'Academic Rigor', desc: 'Structured curricula and qualified faculty across all institutions.' },
              { icon: Users, title: 'Accessibility', desc: 'Making professional education available to diverse student communities.' },
              { icon: Heart, title: 'Value-Based Education', desc: 'Instilling ethics, compassion, and social responsibility in every program.' },
              { icon: Stethoscope, title: 'Professional Focus', desc: 'Preparing graduates for meaningful careers in their chosen fields.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 group text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-forest-50 group-hover:bg-forest-700 transition-colors duration-300 flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-forest-700 group-hover:text-gold-500 transition-colors" />
                </div>
                <h3 className="font-bold text-forest-800 mb-3 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional framework */}
      <section className="section-padding bg-white">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="Structure"
            title="Institutional Framework"
            description="The College of Physiotherapy operates within the broader Madha Educational Group structure."
          />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-forest-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-forest-700 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-bold text-forest-800">Madha Educational Group</h3>
                  <p className="text-xs text-gray-500">Umbrella organization</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                The group provides the institutional foundation, shared infrastructure, and
                administrative framework that supports its member institutions. It maintains a
                commitment to educational quality across all its initiatives.
              </p>
              <ul className="space-y-2">
                {[
                  'Shared campus infrastructure and resources',
                  'Common administrative and governance framework',
                  'Cross-institutional faculty expertise',
                  'Unified commitment to educational excellence',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gold-50 rounded-2xl p-8 border border-gold-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gold-500 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-forest-900" />
                </div>
                <div>
                  <h3 className="font-bold text-forest-800">College of Physiotherapy</h3>
                  <p className="text-xs text-gray-500">Specialized institution</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                As a specialized institution within the group, the College of Physiotherapy focuses
                exclusively on physiotherapy education and rehabilitation sciences. It draws upon
                the group's resources while maintaining its dedicated professional focus.
              </p>
              <ul className="space-y-2">
                {[
                  'Specialized physiotherapy curriculum',
                  'Dedicated physiotherapy faculty and clinical trainers',
                  'Purpose-built laboratories and clinical facilities',
                  'Professional affiliations and clinical partnerships',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Note about verification */}
      <section className="bg-forest-50 py-12">
        <div className="container-mcp">
          <div className="max-w-3xl mx-auto text-center p-8 bg-white rounded-2xl border border-forest-100 shadow-sm">
            <Heart className="w-10 h-10 text-gold-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-forest-800 mb-3">Our Commitment</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For the most current and complete information about the Madha Educational Group and
              its member institutions, please contact us directly. We are committed to providing
              accurate, verified information about our institutional structure and programs.
            </p>
            <Link to="/contact" className="btn-secondary mt-6">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
