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
                  src="https://images.pexels.com/photos/32213424/pexels-photo-32213424.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
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
                Madha College of Physiotherapy (MCOP), established in 1998 and
                affiliated with The Tamil Nadu Dr. M.G.R. Medical University,
                Guindy, Chennai, is committed to excellence in physiotherapy
                education and clinical practice. Located in Kundrathur, Chennai
                – 600069, Tamil Nadu, the college has completed over 25 years of
                service, nurturing physiotherapists who embody compassion,
                clinical skill, and professionalism.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The college crest features the statue of Mother Mary,
                symbolising endurance, patience, nobility, and strength. The
                inscription <em>“Oli Peruga”</em>, meaning enlightenment,
                reflects the institution’s guiding philosophy: ethical
                rehabilitation and the responsibility to deliver primary care
                with integrity and empathy.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                MCOP offers undergraduate Bachelor of Physiotherapy (BPT) and
                postgraduate Master of Physiotherapy (MPT) programs that
                combine academic learning with clinical exposure. Laboratories,
                modern infrastructure, and collaborations with leading
                hospitals support students as they develop the knowledge and
                skills needed to respond to evolving healthcare challenges.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Beyond academics, the college encourages research, cultural
                activities, and community outreach. Madha College of
                Physiotherapy continues to advance physiotherapy education
                while promoting student well-being, innovation, social
                responsibility, and professional excellence.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

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
        <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 text-center group h-full">
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
                src="https://images.pexels.com/photos/8197558/pexels-photo-8197558.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Students learning in an academic environment"
                className="w-full h-[400px] object-cover"
                loading="lazy"
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
                src="https://images.pexels.com/photos/20860610/pexels-photo-20860610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
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
              <Link to="/facilities" className="btn-secondary">
                View Facilities <ArrowRight className="w-4 h-4" />
              </Link>
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
        <div className="relative bg-gradient-to-br from-forest-50 to-white rounded-2xl p-8 border border-forest-100 hover:shadow-xl transition-all duration-300 group h-full">
          <div className="w-14 h-14 rounded-xl bg-forest-700 group-hover:bg-gold-500 transition-colors duration-300 flex items-center justify-center mb-5">
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
