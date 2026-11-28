import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  BookOpen,
  BusFront,
  Briefcase,
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

/* ------------------------------------------------------------------ */
/*  SCROLL REVEAL                                                      */
/* ------------------------------------------------------------------ */

type RevealDir = "up" | "down" | "left" | "right" | "zoom" | "fade";

interface RevealProps {
  children: React.ReactNode;
  /** Where the element starts from before it settles into place */
  dir?: RevealDir;
  /** Delay in seconds (use for staggering) */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  className?: string;
  as?: React.ElementType;
}

/**
 * Wraps content and animates it into place the first time it
 * scrolls into view.
 *  dir="left"  -> starts on the left, moves right, settles
 *  dir="right" -> starts on the right, moves left, settles
 *  dir="up"    -> fades up and settles
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  dir = "up",
  delay = 0,
  duration = 0.85,
  className = "",
  as,
}) => {
  const Tag = (as || "div") as React.ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect(); // animate only once
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`fac-rv fac-rv-${dir} ${shown ? "fac-in" : ""} ${className}`}
      style={
        {
          "--rv-delay": `${delay}s`,
          "--rv-dur": `${duration}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const heroIcons = [
  { Icon: Presentation, label: "Classroom",      top: "6%",  left: "12%", size: 76, dur: 7,   delay: 0 },
  { Icon: FlaskConical, label: "Laboratory",     top: "10%", left: "58%", size: 88, dur: 9,   delay: -2 },
  { Icon: HeartPulse,   label: "Rehabilitation", top: "26%", left: "82%", size: 68, dur: 8,   delay: -6 },
  { Icon: BusFront,     label: "Transport",      top: "40%", left: "34%", size: 98, dur: 8,   delay: -4 },
  { Icon: BedDouble,    label: "Hostel",         top: "52%", left: "74%", size: 76, dur: 10,  delay: -1 },
  { Icon: LibraryBig,   label: "Library",        top: "70%", left: "10%", size: 80, dur: 9,   delay: -3 },
  { Icon: Dumbbell,     label: "Gym",            top: "74%", left: "55%", size: 72, dur: 7.5, delay: -5 },
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

const libraryTags = [
  "Advanced Textbooks",
  "Journals",
  "Research Publications",
  "Internet Resources",
];

const trainingCentres = [
  "Frontier Lifeline Hospital, Mugappair",
  "JK Rehabilitation Centre, Anna Nagar",
  "YMCA, Nandanam",
  "KARE Foundation",
  "Hamsa Rehabilitation Centre",
  "Align Peak Physio Centre, Kilpauk",
];

const industrialVisits = [
  "Sun Orthotics and Prosthetics, Porur",
  "Technomed Electronics, Perungudi",
  "Museum of Possibilities",
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
  {
    title: "Clinical Placement & Internship",
    description:
      "Real-world clinical experience through our own hospital and a network of well-established rehabilitation and healthcare centres.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=85",
    icon: Briefcase,
    link: "#placement",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

const Facilities: React.FC<FacilitiesProps> = ({ onEnquiryClick }) => {
  return (
    <main className="overflow-x-hidden bg-[#FAF8F1] text-[#26332C]">
      {/* ---------- ANIMATION STYLES ---------- */}
      <style>{`
        /* ===== Scroll reveal ===== */
        .fac-rv {
          opacity: 0;
          will-change: transform, opacity;
          transition:
            opacity var(--rv-dur, .85s) cubic-bezier(.22, 1, .36, 1) var(--rv-delay, 0s),
            transform var(--rv-dur, .85s) cubic-bezier(.22, 1, .36, 1) var(--rv-delay, 0s);
        }
        .fac-rv-up    { transform: translate3d(0, 44px, 0); }
        .fac-rv-down  { transform: translate3d(0, -44px, 0); }
        .fac-rv-left  { transform: translate3d(-90px, 0, 0); }   /* left -> right, settle */
        .fac-rv-right { transform: translate3d(90px, 0, 0); }    /* right -> left, settle */
        .fac-rv-zoom  { transform: scale(.92); }
        .fac-rv-fade  { transform: none; }

        .fac-rv.fac-in {
          opacity: 1;
          transform: none;
        }

        @media (max-width: 639px) {
          /* smaller travel on phones so nothing causes sideways scroll */
          .fac-rv-left  { transform: translate3d(-40px, 0, 0); }
          .fac-rv-right { transform: translate3d(40px, 0, 0); }
        }

        /* ===== Hero entrance ===== */
        @keyframes fac-fade-up {
          from { opacity: 0; transform: translate3d(0, 34px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes fac-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fac-pop {
          from { opacity: 0; transform: scale(.4); }
          to   { opacity: 1; transform: scale(1); }
        }
        .fac-hero-in {
          opacity: 0;
          animation: fac-fade-up .9s cubic-bezier(.22, 1, .36, 1) var(--hd, 0s) forwards;
        }
        .fac-hero-line {
          transform-origin: left center;
          animation: fac-line-grow .8s cubic-bezier(.22, 1, .36, 1) .2s both;
        }
        .fac-pop-in {
          opacity: 0;
          animation: fac-pop .8s cubic-bezier(.34, 1.56, .64, 1) var(--pd, 0s) forwards;
        }

        /* ===== Floating hero icons ===== */
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
          --s: 1;
          animation:
            fac-float var(--dur, 8s) ease-in-out var(--delay, 0s) infinite,
            fac-glow 4s ease-in-out var(--delay, 0s) infinite;
        }
        @media (max-width: 1023px) { .fac-float-icon { --s: .8; } }
        @media (max-width: 639px)  { .fac-float-icon { --s: .6; } }

        /* ===== Soft pulse on the final CTA button ===== */
        @keyframes fac-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(23,77,56,.35); }
          70%  { box-shadow: 0 0 0 16px rgba(23,77,56,0); }
          100% { box-shadow: 0 0 0 0 rgba(23,77,56,0); }
        }
        .fac-cta-pulse { animation: fac-pulse-ring 2.6s ease-out 1.2s infinite; }

        /* ===== Card icon wiggle on hover ===== */
        @keyframes fac-wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          30%      { transform: rotate(-10deg) scale(1.1); }
          60%      { transform: rotate(8deg) scale(1.1); }
        }
        .fac-card:hover .fac-card-icon { animation: fac-wiggle .6s ease; }

        /* ===== Reduced motion: show everything, no movement ===== */
        @media (prefers-reduced-motion: reduce) {
          .fac-rv {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .fac-hero-in, .fac-hero-line, .fac-pop-in {
            opacity: 1 !important;
            animation: none !important;
          }
          .fac-float-icon, .fac-cta-pulse { animation: none !important; }
          .fac-card:hover .fac-card-icon { animation: none !important; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#174D38]">
        <div className="grid lg:min-h-[480px] lg:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-center px-6 pb-6 pt-12 sm:px-12 lg:px-16 lg:py-16 xl:px-24">
            <span
              className="fac-hero-in mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D7B45A]"
              style={{ "--hd": "0.05s" } as React.CSSProperties}
            >
              <span className="fac-hero-line h-[2px] w-8 bg-[#D7B45A]" />
              Infrastructure & Learning
            </span>

            <h1
              className="fac-hero-in max-w-xl text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
              style={{ "--hd": "0.2s" } as React.CSSProperties}
            >
              Our <span className="text-[#D7B45A]">Facilities</span>
            </h1>

            <p
              className="fac-hero-in mt-6 max-w-lg text-base leading-8 text-white/85 sm:text-lg"
              style={{ "--hd": "0.4s" } as React.CSSProperties}
            >
              Modern learning spaces, physiotherapy laboratories,
              rehabilitation facilities, library resources and hostel
              accommodation to support a complete educational experience.
            </p>

            <div
              className="fac-hero-in mt-9"
              style={{ "--hd": "0.6s" } as React.CSSProperties}
            >
              <button
                onClick={() =>
                  document
                    .getElementById("facility-overview")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center gap-3 rounded-full bg-[#D7B45A] px-7 py-3.5 text-sm font-bold text-[#174D38] transition hover:bg-white"
              >
                Explore Our Campus
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </button>
            </div>
          </div>

          {/* FLOATING GOLD ICONS */}
          <div
            className="relative min-h-[300px] overflow-hidden lg:min-h-full"
            aria-hidden="true"
          >
            <div className="pointer-events-none absolute right-[-60px] top-[-80px] h-72 w-72 rounded-full border border-[#D7B45A]/15" />
            <div className="pointer-events-none absolute bottom-[-90px] left-[10%] h-64 w-64 rounded-full border border-[#D7B45A]/15" />

            {heroIcons.map(({ Icon, label, top, left, size, dur, delay }, i) => (
              /* outer wrapper = pop-in entrance, inner = endless float */
              <div
                key={label}
                className="fac-pop-in absolute"
                style={
                  {
                    top,
                    left,
                    "--pd": `${0.3 + i * 0.12}s`,
                  } as React.CSSProperties
                }
              >
                <div
                  title={label}
                  className="fac-float-icon flex items-center justify-center rounded-full border border-[#D7B45A]/60 bg-[#D7B45A]/10 text-[#D7B45A] backdrop-blur-[2px]"
                  style={
                    {
                      width: `calc(${size}px * var(--s))`,
                      height: `calc(${size}px * var(--s))`,
                      "--dur": `${dur}s`,
                      "--delay": `${delay}s`,
                    } as React.CSSProperties
                  }
                >
                  <Icon className="h-[45%] w-[45%]" strokeWidth={1.6} />
                </div>
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
            <Reveal dir="up">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B58A28]">
                Explore Our Campus
              </span>
            </Reveal>

            <Reveal dir="up" delay={0.12}>
              <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl lg:text-5xl">
                Facilities That Support Excellence
              </h2>
            </Reveal>

            <Reveal dir="up" delay={0.24}>
              <p className="mt-5 text-base leading-8 text-black">
                Madha College of Physiotherapy provides students with
                comprehensive facilities to ensure academic excellence,
                clinical practice, research and development.
              </p>
            </Reveal>
          </div>

          {/* FACILITY OVERVIEW CARDS
              left column  -> slides in from the left
              right column -> slides in from the right
              full-width   -> rises up                                   */}
          <div className="grid gap-6 md:grid-cols-2">
            {facilityCards.map((facility, index) => {
              const Icon = facility.icon;
              const isFullWidth = facility.link === "#placement";
              const dir: RevealDir = isFullWidth
                ? "up"
                : index % 2 === 0
                ? "left"
                : "right";

              return (
                <Reveal
                  key={facility.title}
                  dir={dir}
                  delay={isFullWidth ? 0.1 : (index % 2) * 0.12}
                  className={isFullWidth ? "md:col-span-2" : ""}
                >
                  <a
                    href={facility.link}
                    className="fac-card group grid h-full overflow-hidden rounded-2xl border border-[#E9E3D4] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[42%_58%]"
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
                        <div className="fac-card-icon mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#174D38] text-[#D7B45A]">
                          <Icon size={23} />
                        </div>

                        <h3 className="text-xl font-bold text-[#174D38]">
                          {facility.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-black">
                          {facility.description}
                        </p>
                      </div>

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2C34E] text-[#174D38] transition duration-300 group-hover:rotate-45 group-hover:bg-[#174D38] group-hover:text-white">
                        <ArrowUpRight size={19} />
                      </span>
                    </div>
                  </a>
                </Reveal>
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
          <Reveal dir="left">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=85"
                alt="Academic classroom"
                className="h-[350px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[430px]"
              />
            </div>
          </Reveal>

          <div>
            <Reveal dir="right">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A28]">
                Learning Environment
              </span>
            </Reveal>

            <Reveal dir="right" delay={0.1}>
              <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl">
                Academic Facilities
              </h2>
            </Reveal>

            <Reveal dir="up" delay={0.2}>
              <p className="mt-5 leading-8 text-black">
                Our academic facilities provide a supportive environment
                for classroom learning, demonstrations and knowledge sharing.
                Students have access to learning spaces designed to support
                their academic development.
              </p>
            </Reveal>

            <div className="mt-7 space-y-4">
              {academicFacilities.map((item, i) => (
                <Reveal
                  key={item}
                  dir="up"
                  delay={0.3 + i * 0.12}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#C49A36]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {item}
                  </span>
                </Reveal>
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
            <Reveal dir="left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A28]">
                Practical Learning
              </span>
            </Reveal>

            <Reveal dir="left" delay={0.1}>
              <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl">
                Clinical & Rehabilitation Facilities
              </h2>
            </Reveal>

            <Reveal dir="up" delay={0.2}>
              <p className="mt-5 leading-8 text-black">
                Students gain practical exposure through specialized
                physiotherapy and rehabilitation learning facilities.
                These units support the development of clinical knowledge
                and practical skills.
              </p>
            </Reveal>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {rehabilitationFacilities.map((item, i) => (
                <Reveal
                  key={item}
                  dir={i % 2 === 0 ? "left" : "right"}
                  delay={0.25 + i * 0.07}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#C49A36]"
                  />
                  <span className="text-sm font-medium leading-6 text-gray-700">
                    {item}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal dir="up" delay={0.5}>
              <Link
                to="/departments"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#174D38] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23694D]"
              >
                Explore Departments
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </Reveal>
          </div>

          <Reveal dir="right" delay={0.1}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=85"
                alt="Exercise and rehabilitation training"
                className="h-[390px] w-full rounded-3xl object-cover shadow-xl sm:h-[480px]"
              />

              <Reveal
                dir="zoom"
                delay={0.7}
                className="absolute -bottom-5 left-5 sm:left-8"
              >
                <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174D38] text-[#D7B45A]">
                    <Stethoscope size={23} />
                  </div>
                  <div>
                    <p className="font-bold text-[#174D38]">
                      Clinical Learning
                    </p>
                    <p className="text-xs text-black">
                      Practical skill development
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LIBRARY FACILITY */}
      <section
        id="library"
        className="bg-white px-6 py-16 sm:px-10 lg:px-16"
      >
        <Reveal dir="zoom" duration={1}>
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-[#E9E3D4] bg-[#F7F2E5] lg:grid-cols-2">
            <div className="min-h-[300px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85"
                alt="Library bookshelves and reading area"
                className="h-full min-h-[300px] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-12">
              <Reveal dir="zoom" delay={0.2}>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#174D38] text-[#D7B45A]">
                  <LibraryBig size={27} />
                </div>
              </Reveal>

              <Reveal dir="right" delay={0.25}>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A28]">
                  Learning Resources
                </span>
              </Reveal>

              <Reveal dir="right" delay={0.35}>
                <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl">
                  Centralized Library
                </h2>
              </Reveal>

              <Reveal dir="up" delay={0.45}>
                <p className="mt-5 leading-8 text-black">
                  Students have access to a centralized library featuring
                  advanced textbooks, journals, research publications and
                  internet resources. These resources support academic
                  learning, research and professional development.
                </p>
              </Reveal>

              <div className="mt-6 flex flex-wrap gap-3">
                {libraryTags.map((item, i) => (
                  <Reveal key={item} dir="zoom" delay={0.55 + i * 0.1}>
                    <span className="block rounded-full border border-[#D7B45A]/60 bg-white px-4 py-2 text-xs font-semibold text-[#174D38] transition hover:-translate-y-0.5 hover:border-[#D7B45A] hover:shadow-md">
                      {item}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* HOSTEL FACILITY */}
      <section
        id="hostel"
        className="px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Reveal dir="left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A28]">
                Student Accommodation
              </span>
            </Reveal>

            <Reveal dir="left" delay={0.1}>
              <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl">
                Hostel Facility
              </h2>
            </Reveal>

            <Reveal dir="up" delay={0.22}>
              <p className="mt-5 leading-8 text-black">
                The hostel facility provides accommodation support for
                students pursuing their education at Madha College of
                Physiotherapy. It is presented as part of the campus
                facilities available to students.
              </p>
            </Reveal>
          </div>

          <Reveal dir="right" className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=85"
                alt="Student accommodation"
                className="h-[320px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[420px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLINICAL PLACEMENT & INTERNSHIP */}
      <section
        id="placement"
        className="bg-white px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Reveal dir="up">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A28]">
                Hands-On Experience
              </span>
            </Reveal>

            <Reveal dir="up" delay={0.1}>
              <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl">
                Clinical Placement and Internship
              </h2>
            </Reveal>

            <Reveal dir="up" delay={0.2}>
              <p className="mt-5 leading-8 text-black">
                At MCOP, students get plenty of real-world clinical experience
                through our own hospital and a network of well-established
                rehabilitation and healthcare centres. This is where they put
                their learning into practice – assessing patients, planning
                treatment and delivering evidence-based care.
              </p>
            </Reveal>

            <Reveal dir="up" delay={0.3}>
              <p className="mt-4 text-sm font-semibold text-[#174D38]">
                Internships are carried out at Madha Medical College and
                Hospital, Kovur, Chennai.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Clinical training centres */}
            <Reveal dir="left">
              <div className="h-full rounded-2xl border border-[#E9E3D4] bg-[#F7F2E5] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174D38] text-[#D7B45A]">
                    <Stethoscope size={23} />
                  </div>
                  <h3 className="text-xl font-bold text-[#174D38]">
                    Clinical Training Centres
                  </h3>
                </div>

                <ul className="space-y-3">
                  {trainingCentres.map((item, i) => (
                    <Reveal
                      as="li"
                      key={item}
                      dir="up"
                      delay={0.25 + i * 0.09}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-[#C49A36]"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {item}
                      </span>
                    </Reveal>
                  ))}
                </ul>

                <p className="mt-6 border-t border-[#D7B45A]/40 pt-4 text-sm leading-7 text-black">
                  Across these placements, students gain experience in
                  orthopaedic, neurological, cardiorespiratory, paediatric,
                  sports and community-based rehabilitation.
                </p>
              </div>
            </Reveal>

            {/* Industrial visits */}
            <Reveal dir="right" delay={0.1}>
              <div className="h-full rounded-2xl border border-[#E9E3D4] bg-[#F7F2E5] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174D38] text-[#D7B45A]">
                    <Briefcase size={23} />
                  </div>
                  <h3 className="text-xl font-bold text-[#174D38]">
                    Industrial Visits
                  </h3>
                </div>

                <ul className="space-y-3">
                  {industrialVisits.map((item, i) => (
                    <Reveal
                      as="li"
                      key={item}
                      dir="up"
                      delay={0.3 + i * 0.1}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-[#C49A36]"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {item}
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRANSPORT FACILITY */}
      <section className="px-6 pb-16 pt-16 sm:px-10 lg:px-16">
        <Reveal dir="zoom" duration={1}>
          <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-[#174D38] p-8 sm:flex-row sm:items-center sm:p-10">
            <div className="relative z-10 flex items-center gap-5">
              <Reveal dir="left" delay={0.25}>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#D7B45A] text-[#D7B45A]">
                  <BusFront size={28} />
                </div>
              </Reveal>

              <Reveal dir="left" delay={0.4}>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Transport Facilities
                  </h2>
                  <p className="mt-1 text-sm text-white/75">
                    Student transportation facilities.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-2 -top-12 h-48 w-48 rounded-full border border-white/10" />
          </div>
        </Reveal>
      </section>

      {/* FINAL ENQUIRY */}
      <section className="bg-[#E7EDE7] px-6 py-14 text-center sm:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal dir="up">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A28]">
              Begin Your Journey
            </span>
          </Reveal>

          <Reveal dir="up" delay={0.12}>
            <h2 className="mt-3 text-3xl font-bold text-[#174D38] sm:text-4xl">
              Learn, Practise and Grow With Us
            </h2>
          </Reveal>

          <Reveal dir="up" delay={0.24}>
            <p className="mt-4 leading-7 text-black">
              Discover the learning environment and facilities that
              support your journey in physiotherapy education.
            </p>
          </Reveal>

          <Reveal dir="zoom" delay={0.4}>
            <button
              onClick={onEnquiryClick}
              className="fac-cta-pulse group mt-7 inline-flex items-center gap-3 rounded-full bg-[#174D38] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#23694D]"
            >
              Enquire Now
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Facilities;
