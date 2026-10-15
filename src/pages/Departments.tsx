import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionTitle from '@/components/SectionTitle';
import { departments } from '@/data/content';

export default function Departments() {
  return (
    <div>
      <PageHeader
        title="Departments"
        subtitle="Specialized departments covering the full spectrum of physiotherapy practice, each with dedicated faculty and clinical training facilities."
        image="https://images.pexels.com/photos/20860622/pexels-photo-20860622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        breadcrumbs={[{ label: 'Departments' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="Specializations"
            title="Physiotherapy Departments"
            description="Each department focuses on a specific area of physiotherapy practice, providing students with in-depth knowledge and hands-on clinical training under experienced faculty."
          />

          <div className="space-y-12">
            {departments.map((dept, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={dept.id}
                  className={`grid lg:grid-cols-2 gap-8 items-center ${
                    isEven ? '' : 'lg:[&>div:first-child]:order-2'
                  }`}
                >
                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-forest-700/90 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">Department {String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-forest-800 mb-4">{dept.name}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{dept.description}</p>

                    <p className="text-sm font-semibold text-forest-700 mb-3">Key Focus Areas</p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {dept.focus.map((area) => (
                        <div key={area} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                          {area}
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/facilities"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-gold-600 transition-colors"
                    >
                      View Related Facilities <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-forest-700 py-12">
        <div className="container-mcp">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '6', label: 'Specialized Departments' },
              { number: '3', label: 'Degree Programs' },
              { number: '6+', label: 'Focus Areas' },
              { number: '100%', label: 'Hands-On Training' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-gold-500">{stat.number}</p>
                <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
