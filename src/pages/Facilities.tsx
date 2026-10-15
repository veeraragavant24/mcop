import { Link } from 'react-router-dom';
import { Dumbbell, Activity, Library, Monitor, Stethoscope, Accessibility, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionTitle from '@/components/SectionTitle';
import { facilities } from '@/data/content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell, Activity, Library, Monitor, Stethoscope, Accessibility,
};

interface FacilitiesProps {
  onEnquiryClick: () => void;
}

export default function Facilities({ onEnquiryClick }: FacilitiesProps) {
  return (
    <div>
      <PageHeader
        title="Facilities"
        subtitle="Modern laboratories, well-equipped training spaces, and a comprehensive library that support an immersive, hands-on learning experience."
        image="https://images.pexels.com/photos/20860579/pexels-photo-20860579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        breadcrumbs={[{ label: 'Facilities' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="Infrastructure"
            title="Our Facilities"
            description="Each facility is designed to support specific aspects of physiotherapy education — from foundational sciences to advanced clinical skills and rehabilitation practice."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => {
              const Icon = iconMap[facility.icon] ?? Monitor;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={facility.id}
                  className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-6 h-6 text-forest-700" />
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-white font-bold text-lg leading-snug">{facility.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-600 leading-relaxed">{facility.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clinical training emphasis */}
      <section className="section-padding bg-forest-50">
        <div className="container-mcp grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/20860610/pexels-photo-20860610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Clinical training"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Hands-On" title="Clinical Training Facilities" center={false} />
            <p className="text-gray-600 leading-relaxed mb-6">
              Our clinical training facilities are central to the educational experience at Madha
              College of Physiotherapy. Students practice under faculty supervision, working with
              real patients in structured outpatient settings that mirror professional practice.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Rotations span orthopedic, neurological, and general physiotherapy departments,
              giving students exposure to a wide range of conditions and treatment approaches.
              Structured case discussions and clinical reasoning exercises complement the
              hands-on experience, building the competencies needed for independent practice.
            </p>
            <Link to="/departments" className="btn-secondary">
              Explore Departments <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-700 py-16">
        <div className="container-mcp text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Experience Our Campus</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            Schedule a visit to see our facilities firsthand and learn more about our programs.
          </p>
          <button onClick={onEnquiryClick} className="btn-primary">
            Schedule a Visit <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
