
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  BookOpen,
  BusFront,
  CheckCircle2,
  Dumbbell,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  LibraryBig,
  Presentation,
  Stethoscope,
} from "lucide-react";

interface FacilitiesProps {
  onEnquiryClick: () => void;
}

const heroIcons = [
  { Icon: Presentation, label: "Classroom",   top: "6%",  left: "12%", size: 76, dur: 7,   delay: 0 },
  { Icon: FlaskConical, label: "Laboratory",  top: "10%", left: "58%", size: 88, dur: 9,   delay: -2 },
  { Icon: HeartPulse,   label: "Rehabilitation", top: "26%", left: "82%", size: 68, dur: 8, delay: -6 },
  { Icon: BusFront,     label: "Transport",   top: "40%", left: "34%", size: 98, dur: 8,   delay: -4 },
  { Icon: BedDouble,    label: "Hostel",      top: "52%", left: "74%", size: 76, dur: 10,  delay: -1 },
  { Icon: LibraryBig,   label: "Library",     top: "70%", left: "10%", size: 80, dur: 9,   delay: -3 },
  { Icon: Dumbbell,     label: "Gym",         top: "74%", left: "55%", size: 72, dur: 7.5, delay: -5 },
];


const academicFacilities = [
  "Spacious classrooms with audio-visual aids",
  "Demonstration rooms",
  "Seminar rooms",
];

const rehabilitationFacilities = [
  "Physiotherapy Laboratories",
  "Exercise Therapy Unit",
  "Electrotherapy Unit",
  "Neurological Rehabilitation Unit",
  "Cardiorespiratory Rehabilitation Unit",
  "Musculoskeletal Rehabilitation",
  "Multi-Gym",
  "Sports Rehabilitation",
];

const facilityCards = [
  {
    title: "Academic Facilities",
    description:
      "Spacious classrooms equipped with audio-visual aids, demonstration rooms and seminar facilities.",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=85",
    icon: GraduationCap,
    link: "#academic",
  },
  {
    title: "Clinical & Rehabilitation",
    description:
      "Practical learning spaces supporting physiotherapy education and rehabilitation training.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85",
    icon: HeartPulse,
    link: "#clinical",
  },
  {
    title: "Library & Research",
    description:
      "A centralized library with advanced textbooks, journals, research publications and internet resources.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=85",
    icon: BookOpen,
    link: "#library",
  },
  {
    title: "Hostel Facility",
    description:
      "Hostel accommodation to support students during their academic journey.",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=85",
    icon: BedDouble,
    link: "#hostel",
  },
];

const Facilities: React.FC<FacilitiesProps> = ({ onEnquiryClick }) => {
  return (
    <main className="bg-[#FAF8F1] text-[#26332C]">

     {/* HERO SECTION */}
<section className="relative overflow-hidden bg-[#174D38]">
  <style>{`
    @keyframes fac-float {
      0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
      25%      { transform: translate3d(14px, -18px, 0) rotate(6deg); }
      50%      { transform: translate3d(-10px, -30px, 0) rotate(-4deg); }
      75%      { transform: translate3d(-16px, -10px, 0) rotate(5deg); }
    }
    @keyframes fac-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(215,180,90,.0), 0 0 14px rgba(215,180,90,.18); }
      50%      { box-shadow: 0 0 0 8px rgba(215,180,90,.06), 0 0 30px rgba(215,180,90,.4); }
    }
    .fac-float-icon {
      animation:
        fac-float var(--dur, 8s) ease-in-out var(--delay, 0s) infinite,
        fac-glow 4s ease-in-out var(--delay, 0s) infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .fac-float-icon { animation: none; }
    }
  `}</style>

  <div className="grid min-h-[480px] lg:grid-cols-2">
    <div className="relative z-10 flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 xl:px-24">
      <span className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D7B45A]">
        <span className="h-[2px] w-8 bg-[#D7B45A]" />
        Infrastructure & Learning
      </span>

      <h1 className="max-w-xl text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
        Our <span className="text-[#D7B45A]">Facilities</span>
      </h1>

      <p className="mt-6 max-w-lg text-base leading-8 text-white/85 sm:text-lg">
        Modern learning spaces, physiotherapy laboratories,
        rehabilitation facilities, library resources and hostel
        accommodation to support a complete educational experience.
      </p>

      <div className="mt-9">
        <button
          onClick={() =>
            document
              .getElementById("facility-overview")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="inline-flex items-center gap-3 rounded-full bg-[#D7B45A] px-7 py-3.5 text-sm font-bold text-[#174D38] transition hover:bg-white"
        >
          Explore Our Campus
          <ArrowRight size={18} />
        </button>
      </div>
    </div>

    {/* FLOATING GOLD ICONS */}
    <div className="relative min-h-[340px] lg:min-h-full" aria-hidden="true">
      <div className="pointer-events-none absolute right-[-60px] top-[-80px] h-72 w-72 rounded-full border border-[#D7B45A]/15" />
      <div className="pointer-events-none absolute bottom-[-90px] left-[10%] h-64 w-64 rounded-full border border-[#D7B45A]/15" />

      {heroIcons.map(({ Icon, label, top, left, size, dur, delay }) => (
        <div
          key={label}
          title={label}
          className="fac-float-icon absolute flex items-center justify-center rounded-full border border-[#D7B45A]/60 bg-[#D7B45A]/10 text-[#D7B45A] backdrop-blur-[2px]"
          style={
            {
              top,
              left,
              width: size,
              height: size,
              "--dur": `${dur}s`,
              "--delay": `${delay}s`,
            } as React.CSSProperties
          }
        >
          <Icon size={Math.round(size * 0.45)} strokeWidth={1.6} />
        </div>
      ))}
    </div>
  </div>
</section>

      {/* INTRODUCTION */}
      <section
        id="facility-overview"
        className="px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B58A28]">
              Explore Our Campus
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl lg:text-5xl">
              Facilities That Support Excellence
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-600">
              Madha College of Physiotherapy provides students with
              comprehensive facilities to ensure academic excellence,
              clinical practice, research and development.
            </p>
          </div>

          {/* FACILITY OVERVIEW CARDS */}
          <div className="grid gap-6 md:grid-cols-2">
            {facilityCards.map((facility) => {
              const Icon = facility.icon;

              return (
                <a
                  key={facility.title}
                  href={facility.link}
                  className="group grid overflow-hidden rounded-2xl border border-[#E9E3D4] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[42%_58%]"
                >
                  <div className="relative min-h-[220px] overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 p-6 sm:p-7">
                    <div>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#174D38] text-[#D7B45A]">
                        <Icon size={23} />
                      </div>

                      <h3 className="text-xl font-bold text-[#174D38]">
                        {facility.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {facility.description}
                      </p>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2C34E] text-[#174D38] transition group-hover:bg-[#174D38] group-hover:text-white">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACADEMIC FACILITIES */}
      <section
        id="academic"
        className="bg-white px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=85"
              alt="Academic classroom"
              className="h-[350px] w-full object-cover sm:h-[430px]"
            />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A28]">
              Learning Environment
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl">
              Academic Facilities
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Our academic facilities provide a supportive environment
              for classroom learning, demonstrations and knowledge sharing.
              Students have access to learning spaces designed to support
              their academic development.
            </p>

            <div className="mt-7 space-y-4">
              {academicFacilities.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#C49A36]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL & REHABILITATION FACILITIES */}
      <section
        id="clinical"
        className="px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A28]">
              Practical Learning
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl">
              Clinical & Rehabilitation Facilities
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Students gain practical exposure through specialized
              physiotherapy and rehabilitation learning facilities.
              These units support the development of clinical knowledge
              and practical skills.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {rehabilitationFacilities.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#C49A36]"
                  />
                  <span className="text-sm font-medium leading-6 text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/departments"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#174D38] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23694D]"
            >
              Explore Departments
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=85"
              alt="Exercise and rehabilitation training"
              className="h-[390px] w-full rounded-3xl object-cover shadow-xl sm:h-[480px]"
            />

            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg sm:left-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174D38] text-[#D7B45A]">
                <Stethoscope size={23} />
              </div>
              <div>
                <p className="font-bold text-[#174D38]">
                  Clinical Learning
                </p>
                <p className="text-xs text-gray-500">
                  Practical skill development
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIBRARY FACILITY */}
      <section
        id="library"
        className="bg-white px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-[#E9E3D4] bg-[#F7F2E5] lg:grid-cols-2">
          <div className="min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85"
              alt="Library bookshelves and reading area"
              className="h-full min-h-[300px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#174D38] text-[#D7B45A]">
              <LibraryBig size={27} />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A28]">
              Learning Resources
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl">
              Centralized Library
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Students have access to a centralized library featuring
              advanced textbooks, journals, research publications and
              internet resources. These resources support academic
              learning, research and professional development.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Advanced Textbooks",
                "Journals",
                "Research Publications",
                "Internet Resources",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#D7B45A]/60 bg-white px-4 py-2 text-xs font-semibold text-[#174D38]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOSTEL FACILITY */}
      <section
        id="hostel"
        className="px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A28]">
              Student Accommodation
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl">
              Hostel Facility
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              The hostel facility provides accommodation support for
              students pursuing their education at Madha College of
              Physiotherapy. It is presented as part of the campus
              facilities available to students.
            </p>

            <button
              onClick={onEnquiryClick}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#174D38] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23694D]"
            >
              Enquire About Hostel
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="order-1 overflow-hidden rounded-3xl lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=85"
              alt="Student accommodation"
              className="h-[320px] w-full object-cover sm:h-[420px]"
            />
          </div>
        </div>
      </section>

      {/* TRANSPORT FACILITY */}
      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-[#174D38] p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="relative z-10 flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#D7B45A] text-[#D7B45A]">
              <BusFront size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Transport Facilities
              </h2>
              <p className="mt-1 text-sm text-white/75">
                Student transportation facilities.
              </p>
            </div>
          </div>

          <button
            onClick={onEnquiryClick}
            className="relative z-10 inline-flex items-center gap-3 rounded-full border border-[#D7B45A] px-6 py-3 text-sm font-semibold text-[#D7B45A] transition hover:bg-[#D7B45A] hover:text-[#174D38]"
          >
            Enquire Now
            <ArrowRight size={17} />
          </button>

          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-12 h-48 w-48 rounded-full border border-white/10" />
        </div>
      </section>

      {/* FINAL ENQUIRY */}
      <section className="bg-[#E7EDE7] px-6 py-14 text-center sm:px-10">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A28]">
            Begin Your Journey
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl">
            Learn, Practise and Grow With Us
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Discover the learning environment and facilities that
            support your journey in physiotherapy education.
          </p>

          <button
            onClick={onEnquiryClick}
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#174D38] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#23694D]"
          >
            Enquire Now
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Facilities;
