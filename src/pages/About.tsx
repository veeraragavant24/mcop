import { Link } from 'react-router-dom';

import {
  BookOpen,
  FlaskConical,
  Heart,
  Award,
  Users,
  Building2,
  ArrowRight,
  CheckCircle2,
  Eye,
  Target,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionTitle from '@/components/SectionTitle';
import ScrollReveal from '@/components/ScrollReveal';

export default function About() {
  const philosophyItems = [
    {
      icon: BookOpen,
      title: 'Knowledge',
      desc: 'A rigorous, evidence-informed curriculum that builds a strong theoretical foundation for physiotherapy practice.',
    },
    {
      icon: FlaskConical,
      title: 'Practice',
      desc: 'Practical learning that helps students translate classroom knowledge into assessment and rehabilitation skills.',
    },
    {
      icon: Heart,
      title: 'Compassion',
      desc: 'Patient-centred care that values empathy, dignity, and each individual’s rehabilitation needs.',
    },
    {
      icon: Award,
      title: 'Excellence',
      desc: 'A commitment to professional standards, continuous improvement, and lifelong learning.',
    },
  ];

  const academicPoints = [
    'Undergraduate Bachelor of Physiotherapy (BPT) and postgraduate Master of Physiotherapy (MPT) programs',
    'Academic learning supported by practical and clinical exposure',
    'Emphasis on research and evidence-informed practice',
    'Development of clinical reasoning and professional competencies',
    'A focus on ethical conduct and patient-centred care',
  ];

  const practicalPoints = [
    'Hands-on learning through practical sessions and laboratory training',
    'Opportunities to connect theoretical knowledge with clinical practice',
    'Learning focused on assessment, treatment planning, and rehabilitation',
    'Encouragement of research and continuing professional development',
    'Community outreach that promotes social responsibility',
  ];

  const professionalValues = [
    {
      icon: Award,
      title: 'Ethical Practice',
      desc: 'Upholding integrity, professional responsibility, and ethical principles in rehabilitation and patient care.',
    },
    {
      icon: Users,
      title: 'Respect & Dignity',
      desc: 'Recognising each patient’s needs and treating every individual with respect, fairness, and dignity.',
    },
    {
      icon: Heart,
      title: 'Compassionate Care',
      desc: 'Approaching rehabilitation with empathy and a commitment to the well-being of patients and communities.',
    },
  ];

  return (
    <div>
      <PageHeader
        title="About Us"
        subtitle="Discover our history, values, and commitment to excellence in physiotherapy education and clinical practice."
        image="https://images.pexels.com/photos/20860622/pexels-photo-20860622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* College Background */}
      <section className="section-padding bg-white">
        <div className="container-mcp grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/slides/campus.png"
                  alt="Physiotherapy education and learning"
                  className="w-full h-[420px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -top-5 -right-5 w-28 h-28 border-4 border-gold-500 rounded-2xl hidden md:block" />
              <div className="absolute -bottom-5 -left-5 bg-forest-700 text-white rounded-xl px-5 py-4 shadow-lg">
                <p className="text-2xl font-bold text-gold-500">1998</p>
                <p className="text-sm">Established</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={150}>
            <div>
              <SectionTitle eyebrow="Our Story" title="About College" center={false} />
              <p className="text-gray-600 leading-relaxed mb-4">
                Madha College of Physiotherapy (MCOP) established in the year 1998 is 
                a premier institution that aims to offer quality education in the field 
                of Physiotherapy. The college is affiliated to Tamil Nadu Dr. M.G.R. Medical
                 University, Guindy, Chennai -600032 and follows the curriculum approved by
                  National Commission for Allied and Healthcare Professions (NCAHP),
                   Government of India. The college has successfully completed over 25 
                   years of providing quality education to budding Physiotherapists.
                    The college located at Kundrathur, Chennai -600069, 
                    Tamil Nadu offers an excellent environment to provide
                     academic excellence, clinical expertise, evidence-based practice 
                     and ethical values to shape future healthcare professionals.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The college provides modern laboratories, Smart Classrooms,
                 well stocked library and clinical training facilities.
                  All the students are guided by an experienced and dedicated faculty. 
                  The curriculum focuses on providing patient centric, 
                  evidence-based education, collaborative and lifelong learning. 
                  The students receive adequate exposure to various specialist
                   areas such as Musculoskeletal, Neurology, Cardiopulmonary Physiotherapy,
                    Sports Physiotherapy, Community Based Rehabilitation and Paediatrics Physiotherapy.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
               The college logo consists of a statue of Mother Mary representing
                strength, patience, nobility, compassion and perseverance.
                 The motto of the institution is "Oli Peruga" meaning Let the light flourish.
                  Apart from academics, the students receive exposure to community by organising 
                  various outreach programs, workshops, continuing education sessions, conferences
                   and professional development programs. Students are trained to become future
                    healthcare professionals who are socially responsible. The college aims to
                     provide an environment of excellence to produce future leaders in Physiotherapy..
              </p>
              
            </div>
          </ScrollReveal>
        </div>
      </section>

{/* Vision & Mission */}
<ScrollReveal direction="right" as="section" className="section-padding bg-white">
  <style>{`
    .vision-mission-card {
      position: relative;
      min-height: 300px;
      overflow: hidden;
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 1rem;
      background: #174D38;
      transition: background 0.45s ease,
        border-color 0.45s ease,
        box-shadow 0.45s ease,
        transform 0.45s ease;
    }

    .vision-mission-card:hover {
      background: linear-gradient(135deg, #D4AF37 0%, #D4AF37 52%, #D4AF37);
      border-color: #D4AF37;
      box-shadow: 0 16px 36px rgba(132, 95, 12, 0.22);
      transform: translateY(-5px);
    }

    .vision-mission-card .vm-content {
      position: relative;
      z-index: 1;
      min-height: 300px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }

    .vision-mission-card .vm-icon {
      color: #D4AF37;
      margin-bottom: 1rem;
      transition: color 0.35s ease;
    }

    .vision-mission-card h3 {
      color: #FFFFFF;
      transition: color 0.35s ease;
    }

    .vision-mission-card p,
    .vision-mission-card ul {
      color: #FFFFFF;
      line-height: 1.7;
      transition: color 0.35s ease;
    }

    .vision-mission-card ul li::marker {
      color: #D4AF37;
    }

    .vision-mission-card .vm-link {
      color: #D4AF37;
      transition: color 0.35s ease, gap 0.3s ease;
    }

    .vision-mission-card:hover .vm-icon,
    .vision-mission-card:hover h3,
    .vision-mission-card:hover p,
    .vision-mission-card:hover ul,
    .vision-mission-card:hover .vm-link {
      color: #173B2C;
    }

    .vision-mission-card:hover ul li::marker {
      color: #173B2C;
    }

    @media (max-width: 640px) {
      .vision-mission-card .vm-content {
        padding: 1.5rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .vision-mission-card,
      .vision-mission-card * {
        transition: none !important;
      }

      .vision-mission-card:hover {
        transform: none;
      }
    }
      /* Core Values Card */
.core-values-card .vm-content {
  
  
}

.core-values-card ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 14px;
  width: 100%;
  max-width: 650px;
  text-align: left;
}

.core-values-card ul li::marker {
  color: #D4AF37;
}

@media (max-width: 640px) {
  .core-values-card ul {
    grid-template-columns: 1fr;
  }
}
  `}</style>

  <div className="container-mcp">

    <SectionTitle
      eyebrow="Our Direction"
      title="Vision & Mission"
      description="Guided by clear principles that shape every aspect of our educational approach — from classroom teaching to clinical practice."
    />

    <div className="grid md:grid-cols-2 gap-6">

      {/* Our Vision */}
      <div className="vision-mission-card group">
        <div className="vm-content">

          <Eye className="vm-icon w-10 h-10" />

          <h3 className="text-2xl font-bold mb-3">
            Our Vision
          </h3>

          <p className="text-sm">
            To provide a centre of excellence in Physiotherapy education,
            research and healthcare services to produce skilled professionals.
          </p>

          <Link
            to="/vision-mission"
            className="vm-link inline-flex items-center gap-2 text-sm font-semibold mt-4 group-hover:gap-3"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>

        </div>
      </div>

      {/* Our Mission */}
      <div className="vision-mission-card group">
        <div className="vm-content">

          <Target className="vm-icon w-10 h-10" />

          <h3 className="text-2xl font-bold mb-3">
            Our Mission
          </h3>

          <ul className="text-sm list-disc pl-5 space-y-2 leading-relaxed">
            <li>To provide quality Physiotherapy education using innovative methods of teaching.</li>
            <li>To encourage research in Physiotherapy.</li>
            <li>To train ethical, compassionate and skilled healthcare professionals.</li>
            <li>To empower communities with health knowledge.</li>
            <li>To encourage lifelong learning.</li>
          </ul>
    

          <Link
            to="/vision-mission"
            className="vm-link inline-flex items-center gap-2 text-sm font-semibold mt-4 group-hover:gap-3"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>

        </div>
      </div>

    </div>
  </div>
        <div className="grid md:grid-cols-2 gap-6">

          </div>
            
{/* Our Core Values */}
<div className="flex justify-center mt-8">

  <div className="vision-mission-card core-values-card group w-full max-w-xl">

    <div className="vm-content">

      <Award className="vm-icon w-12 h-12" />

      <h3 className="text-2xl font-bold mb-5">
        Our Core Values
      </h3>

      <ul className="text-sm text-white list-disc pl-5 leading-relaxed">

        <li>Principled Excellence</li>

        <li>Integrity</li>

        <li>Professional Ethics</li>

        <li>Value Based Education</li>

        <li>Innovation</li>

        <li>Service to Community</li>

      </ul>

    </div>

  </div>

</div>
</ScrollReveal>


      {/* Educational Philosophy */}
      <section className="section-padding bg-forest-50">
        <div className="container-mcp">
          <ScrollReveal direction="scale">
            <SectionTitle
              eyebrow="Our Approach"
              title="Educational Philosophy"
              description="We bring together academic knowledge, practical learning, compassion, and professional values to prepare students for responsible physiotherapy practice."
            />
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {philosophyItems.map((item, index) => {
    const Icon = item.icon;

    return (
      <ScrollReveal
        key={item.title}
        direction="up"
        delay={index * 120}
        className="premium-card h-full"
      >
<div className="bg-[#D4AF37] rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 text-center group h-full">
            <div className="w-16 h-16 mx-auto rounded-full bg-forest-50 group-hover:bg-forest-700 transition-colors duration-300 flex items-center justify-center mb-5">
            <Icon className="w-8 h-8 text-forest-700 group-hover:text-gold-500 transition-colors" />
          </div>

          <h3 className="font-bold text-forest-800 mb-3">
            {item.title}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            {item.desc}
          </p>
        </div>
      </ScrollReveal>
    );
  })}
</div>
        </div>
      </section>

      {/* Academic Excellence */}
      <section className="section-padding bg-white">
        <div className="container-mcp grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div>
              <SectionTitle eyebrow="Academic Standards" title="Academic Excellence" center={false} />
              <p className="text-gray-600 leading-relaxed mb-6">
                Our BPT and MPT programs combine structured academic learning
                with practical experience to help students build the knowledge,
                clinical reasoning, and professional skills required in
                physiotherapy. Research, ethical practice, and continued
                learning are important parts of this educational journey.
              </p>
              <ul className="space-y-3 mb-8">
                {academicPoints.map((point, index) => (
                  <li key={point}>
                    <ScrollReveal direction="up" delay={index * 80}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                      </div>
                    </ScrollReveal>
                  </li>
                ))}
              </ul>
              <Link to="/courses" className="btn-secondary">
                Explore Programs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/academic.png"
                alt="Students learning in an academic environment"
                className="w-full h-[400px] object-cover"
               
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Practical Learning */}
      <section className="section-padding bg-forest-50">
        <div className="container-mcp grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/slides/student.png"
                alt="Practical physiotherapy learning"
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <div className="order-1 lg:order-2">
              <SectionTitle eyebrow="Clinical Learning" title="Practical Learning" center={false} />
              <p className="text-gray-600 leading-relaxed mb-6">
                Practical learning helps students connect classroom knowledge
                with physiotherapy assessment, treatment planning, and
                rehabilitation. Laboratory sessions and clinical learning
                environments help develop practical competencies, while
                research and community outreach encourage students to become
                thoughtful, socially responsible healthcare professionals.
              </p>
              <ul className="space-y-3 mb-8">
                {practicalPoints.map((point, index) => (
                  <li key={point}>
                    <ScrollReveal direction="up" delay={index * 80}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                      </div>
                    </ScrollReveal>
                  </li>
                ))}
              </ul>
             
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Professional Values */}
      <section className="section-padding bg-white">
        <div className="container-mcp">
          <ScrollReveal direction="scale">
            <SectionTitle
              eyebrow="Integrity"
              title="Professional Values"
              description="We aim to develop graduates who combine clinical competence with empathy, ethical responsibility, and respect for every patient."
            />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
  {professionalValues.map((value, index) => {
    const Icon = value.icon;

    return (
      <ScrollReveal
        key={value.title}
        direction="up"
        delay={index * 140}
        className="premium-card h-full"
      >
<div className="relative bg-gradient-to-br from-[#D4AF37] via-[#D4AF37] to-[#EBD69B] rounded-2xl p-8 border border-[#D4AF37]/40 hover:shadow-xl transition-all duration-300 group h-full">          <div className="w-14 h-14 rounded-xl bg-forest-700 group-hover:bg-gold-500 transition-colors duration-300 flex items-center justify-center mb-5">
            <Icon className="w-7 h-7 text-gold-500 group-hover:text-forest-900 transition-colors" />
          </div>

          <h3 className="text-xl font-bold text-forest-800 mb-3">
            {value.title}
          </h3>

          <p className="text-gray-600 leading-relaxed text-sm">
            {value.desc}
          </p>
        </div>
      </ScrollReveal>
    );
  })}

                </div>
        </div>
      </section>

      {/* Madha Educational Group */}
      <section className="bg-forest-700 py-16">
        <div className="container-mcp text-center">
          <ScrollReveal direction="scale">
            <Building2 className="w-12 h-12 text-gold-500 mx-auto mb-4" />

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Part of Madha Educational Group
            </h2>

            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              Explore the educational heritage and institutional network that
              supports our college.
            </p>

            <Link to="/madha-group" className="btn-primary">
              About Madha Group
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
