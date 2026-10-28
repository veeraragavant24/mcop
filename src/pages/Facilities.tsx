
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, type ComponentType } from 'react';
import {
  Dumbbell,
  Activity,
  Library,
  Monitor,
  Stethoscope,
  Accessibility,
  ArrowRight,
  Bus,
  BookOpen,
  Users,
  HeartPulse,
  FlaskConical,
  GraduationCap,
  Building2,
} from 'lucide-react';
import { facilities } from '@/data/content';

interface FacilitiesProps {
  onEnquiryClick: () => void;
}

type FacilityIcon = ComponentType<{ className?: string }>;

const iconMap: Record<string, FacilityIcon> = {
  Dumbbell,
  Activity,
  Library,
  Monitor,
  Stethoscope,
  Accessibility,
  Bus,
  BookOpen,
  Users,
  HeartPulse,
  FlaskConical,
  GraduationCap,
  Building2,
};

const transportFacility = {
  id: 'transport',
  name: 'Transport Facilities',
  description:
    'Convenient transportation facilities designed to support students travelling to and from campus.',
  icon: 'Bus',
  image:
    'https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

const clinicalImage =
  'https://images.pexels.com/photos/20860610/pexels-photo-20860610.jpeg?auto=compress&cs=tinysrgb&w=1400';

export default function Facilities({
  onEnquiryClick,
}: FacilitiesProps) {
  const pageRef = useRef<HTMLDivElement | null>(null);

  // Reveal elements when they enter the viewport.
  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const revealItems = page.querySelectorAll<HTMLElement>(
      '.facility-reveal'
    );

    if (
      reduceMotion ||
      !('IntersectionObserver' in window)
    ) {
      revealItems.forEach((item) =>
        item.classList.add('is-visible')
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -35px 0px',
      }
    );

    revealItems.forEach((item) =>
      observer.observe(item)
    );

    return () => observer.disconnect();
  }, []);

  const allFacilities = useMemo(() => {
    const existing = facilities.map((facility) => ({
      ...facility,
      name: facility.name,
      description: facility.description,
      image: facility.image,
      icon: facility.icon,
    }));

    const hasTransport = existing.some((facility) =>
      /transport|bus/i.test(facility.name)
    );

    return hasTransport
      ? existing
      : [...existing, transportFacility];
  }, []);

  const featuredFacilities = useMemo(() => {
    const find = (pattern: RegExp) =>
      allFacilities.find((facility) =>
        pattern.test(facility.name)
      );

    const exercise =
      find(/exercise|therapy|physio/i) ??
      allFacilities[0];

    const diagnostics =
      find(/electro|diagnostic/i) ??
      allFacilities.find(
        (facility) => facility.id !== exercise?.id
      );

    const anatomy =
      find(/anatomy|movement/i) ??
      allFacilities.find(
        (facility) =>
          facility.id !== exercise?.id &&
          facility.id !== diagnostics?.id
      );

    const remaining = allFacilities.filter(
      (facility) =>
        facility.id !== exercise?.id &&
        facility.id !== diagnostics?.id &&
        facility.id !== anatomy?.id
    );

    return {
      exercise,
      diagnostics,
      anatomy,
      remaining,
    };
  }, [allFacilities]);

  const renderFacilityCard = (
    facility: (typeof allFacilities)[number],
    variant: 'featured' | 'compact' | 'standard' = 'standard',
    eyebrow?: string
  ) => {
    const Icon = iconMap[facility.icon] ?? Monitor;

    return (
      <article
        key={facility.id}
        className={`facility-card facility-reveal facility-card--${variant}`}
      >
        <img
          className="facility-card__image"
          src={facility.image}
          alt={facility.name}
          loading="lazy"
        />

        <div className="facility-card__shade" />

        <div className="facility-card__icon">
          <Icon className="facility-icon" />
        </div>

        <div className="facility-card__content">
          {eyebrow && (
            <span className="facility-card__eyebrow">
              {eyebrow}
            </span>
          )}

          <h3>{facility.name}</h3>

          <p>{facility.description}</p>
        </div>

        <span
          className="facility-card__arrow"
          aria-hidden="true"
        >
          <ArrowRight />
        </span>
      </article>
    );
  };

  return (
    <div className="facilities-page" ref={pageRef}>
      <style>{`
        .facilities-page {
          --facility-forest: #063d2f;
          --facility-deep: #022e24;
          --facility-green: #105c43;
          --facility-gold: #e6b52f;
          --facility-gold-light: #f5d77b;
          --facility-ink: #153f32;
          --facility-muted: #65736e;

          background: #fff;
          color: var(--facility-ink);
          overflow: hidden;
        }

        .facilities-page * {
          box-sizing: border-box;
        }

        .facilities-container {
          width: min(1240px, calc(100% - 48px));
          margin-inline: auto;
        }

        /* ==============================
           HERO SECTION
        ============================== */

        .facilities-hero {
          position: relative;
          isolation: isolate;
          padding: 52px 0 42px;
          color: #fff;

          background:
            radial-gradient(
              ellipse at 85% 15%,
              rgba(31, 111, 79, .34),
              transparent 42%
            ),
            linear-gradient(
              115deg,
              #022e24 0%,
              #064735 55%,
              #06382c 100%
            );
        }

        .facilities-hero::after {
          content: "";
          position: absolute;
          z-index: -1;
          width: 300px;
          height: 2px;
          right: 8%;
          bottom: 38px;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(230,181,47,.75),
            transparent
          );

          opacity: .65;
        }

        .facilities-hero__inner {
          max-width: 800px;
          padding-block: 8px;
        }

        .facilities-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0 0 12px;

          color: var(--facility-gold);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .facilities-eyebrow::after {
          content: "";
          display: block;
          width: 58px;
          height: 2px;
          background: var(--facility-gold);
        }

        .facilities-hero h1 {
          margin: 0 0 12px;
          color: #fff;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(38px, 5vw, 62px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -.8px;
        }

        .facilities-hero__description {
          max-width: 690px;
          margin: 0;

          color: rgba(255,255,255,.86);
          font-size: 16px;
          line-height: 1.8;
        }

        /* ==============================
           INTRODUCTION
        ============================== */

        .facilities-intro {
          padding: 45px 0 30px;
          text-align: center;
        }

        .facilities-section-label {
          display: inline-block;
          margin-bottom: 9px;

          color: #b88712;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .facilities-section-title {
          margin: 0;

          color: var(--facility-forest);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 3vw, 39px);
          font-weight: 600;
          line-height: 1.2;
        }

        .facilities-section-description {
          max-width: 710px;
          margin: 13px auto 0;

          color: var(--facility-muted);
          font-size: 14px;
          line-height: 1.85;
        }

        .facilities-gold-divider {
          width: 48px;
          height: 3px;
          margin: 18px auto 0;
          border-radius: 20px;
          background: var(--facility-gold);
        }

        /* ==============================
           FACILITY CARD LAYOUT
        ============================== */

        .facilities-showcase {
          display: grid;
          grid-template-columns: 1.18fr 1fr;
          grid-template-rows: repeat(2, minmax(160px, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }

        .facility-card {
          position: relative;
          isolation: isolate;
          min-width: 0;
          min-height: 180px;
          overflow: hidden;

          border: 1px solid rgba(6,61,47,.10);
          border-radius: 13px;
          background: var(--facility-deep);
          box-shadow: 0 5px 18px rgba(3,48,36,.08);

          transition:
            transform .35s ease,
            box-shadow .35s ease,
            border-color .35s ease;
        }

        .facility-card:hover {
          transform: translateY(-4px);
          border-color: rgba(230,181,47,.8);

          box-shadow:
            0 14px 30px rgba(3,48,36,.18),
            0 0 0 1px rgba(230,181,47,.08);
        }

        .facility-card--featured {
          grid-row: 1 / span 2;
          min-height: 380px;
        }

        .facility-card--compact {
          min-height: 182px;
        }

        .facility-card__image {
          position: absolute;
          inset: 0;
          z-index: -2;

          width: 100%;
          height: 100%;
          object-fit: cover;

          transition: transform .7s cubic-bezier(.2,.7,.2,1);
        }

        .facility-card:hover .facility-card__image {
          transform: scale(1.055);
        }

        .facility-card__shade {
          position: absolute;
          inset: 0;
          z-index: -1;

          background: linear-gradient(
            180deg,
            rgba(1,25,19,.04) 0%,
            rgba(1,31,23,.05) 30%,
            rgba(1,37,27,.75) 72%,
            rgba(1,36,27,.97) 100%
          );
        }

        .facility-card__icon {
          position: absolute;
          top: 14px;
          left: 14px;

          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;

          border: 1px solid rgba(230,181,47,.28);
          border-radius: 10px;
          background: rgba(255,255,255,.96);
          color: var(--facility-forest);

          box-shadow: 0 4px 14px rgba(0,0,0,.08);

          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .facility-card:hover .facility-card__icon {
          transform: translateY(-2px) rotate(-2deg);
          border-color: rgba(230,181,47,.9);

          box-shadow:
            0 5px 20px rgba(230,181,47,.2);
        }

        .facility-icon {
          width: 22px;
          height: 22px;
          stroke-width: 1.9;
        }

        .facility-card__content {
          position: absolute;
          right: 52px;
          bottom: 18px;
          left: 18px;
        }

        .facility-card__eyebrow {
          display: block;
          margin-bottom: 5px;

          color: var(--facility-gold-light);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .facility-card__content h3 {
          margin: 0 0 6px;

          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(17px, 1.6vw, 22px);
          font-weight: 600;
          line-height: 1.25;
        }

        .facility-card--compact .facility-card__content h3 {
          font-size: 17px;
        }

        .facility-card__content p {
          max-width: 480px;
          margin: 0;

          color: rgba(255,255,255,.9);
          font-size: 12px;
          line-height: 1.55;
        }

        .facility-card__arrow {
          position: absolute;
          right: 13px;
          bottom: 16px;

          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;

          border: 1px solid var(--facility-gold);
          border-radius: 50%;
          background: rgba(2,46,36,.65);
          color: #fff;

          transition:
            background .25s ease,
            color .25s ease,
            transform .25s ease;
        }

        .facility-card__arrow svg {
          width: 17px;
          height: 17px;
          transition: transform .25s ease;
        }

        .facility-card:hover .facility-card__arrow {
          transform: translateX(2px);
          background: var(--facility-gold);
          color: var(--facility-deep);
        }

        .facility-card:hover .facility-card__arrow svg {
          transform: translateX(3px);
        }

        /* ==============================
           ADDITIONAL FACILITIES
        ============================== */

        .facilities-extra-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 44px;
        }

        .facilities-extra-grid .facility-card {
          min-height: 200px;
        }

        .facilities-extra-grid .facility-card__content h3 {
          font-size: 17px;
        }

        /* ==============================
           CLINICAL TRAINING SECTION
        ============================== */

        .facilities-clinical {
          padding: 30px 0;

          background: linear-gradient(
            105deg,
            #f4f8f5,
            #fff 60%,
            #f1f7f3
          );

          border-top: 1px solid #e7eee9;
          border-bottom: 1px solid #e7eee9;
        }

        .facilities-clinical__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 38px;
        }

        .facilities-clinical__image-wrap {
          position: relative;
          min-height: 260px;
          overflow: hidden;

          border: 1px solid rgba(230,181,47,.45);
          border-radius: 13px;
          background: #e7eee9;

          box-shadow: 0 12px 28px rgba(3,48,36,.10);
        }

        .facilities-clinical__image {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;
          object-fit: cover;

          transition: transform .7s cubic-bezier(.2,.7,.2,1);
        }

        .facilities-clinical__image-wrap:hover
        .facilities-clinical__image {
          transform: scale(1.045);
        }

        .facilities-clinical__content .facilities-section-title {
          font-size: clamp(25px, 3vw, 34px);
        }

        .facilities-clinical__content p {
          margin: 14px 0 0;

          color: var(--facility-muted);
          font-size: 14px;
          line-height: 1.85;
        }

        .facilities-departments-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          padding: 12px 19px;

          border: 1px solid var(--facility-gold);
          border-radius: 6px;
          background: var(--facility-forest);
          color: #fff;

          font-size: 13px;
          font-weight: 700;
          text-decoration: none;

          transition:
            background .25s ease,
            color .25s ease,
            transform .25s ease;
        }

        .facilities-departments-link:hover {
          transform: translateY(-2px);
          background: var(--facility-gold);
          color: var(--facility-deep);
        }

        .facilities-departments-link svg {
          width: 17px;
          height: 17px;
          transition: transform .25s ease;
        }

        .facilities-departments-link:hover svg {
          transform: translateX(3px);
        }

        /* ==============================
           CAMPUS VISIT CTA
        ============================== */

        .facilities-cta {
          padding: 37px 0 40px;

          background:
            radial-gradient(
              ellipse at center top,
              rgba(24,100,69,.36),
              transparent 65%
            ),
            var(--facility-deep);

          text-align: center;
        }

        .facilities-cta h2 {
          margin: 0;

          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(27px, 3vw, 35px);
          font-weight: 600;
        }

        .facilities-cta p {
          max-width: 620px;
          margin: 11px auto 20px;

          color: rgba(255,255,255,.78);
          font-size: 13px;
          line-height: 1.8;
        }

        .facilities-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 44px;
          padding: 12px 22px;

          border: 1px solid var(--facility-gold-light);
          border-radius: 6px;
          background: var(--facility-gold);
          color: #183d2d;

          font-size: 13px;
          font-weight: 800;
          cursor: pointer;

          box-shadow: 0 5px 15px rgba(230,181,47,.15);

          transition:
            transform .25s ease,
            box-shadow .25s ease,
            background .25s ease;
        }

        .facilities-cta-button:hover {
          transform: translateY(-2px);
          background: var(--facility-gold-light);

          box-shadow:
            0 8px 22px rgba(230,181,47,.25),
            0 0 0 4px rgba(230,181,47,.10);
        }

        .facilities-cta-button svg {
          width: 17px;
          height: 17px;
          transition: transform .25s ease;
        }

        .facilities-cta-button:hover svg {
          transform: translateX(3px);
        }

        /* ==============================
           SCROLL REVEAL ANIMATIONS
        ============================== */

        .facility-reveal {
          opacity: 0;
          transform: translateY(26px);

          transition:
            opacity .7s ease,
            transform .7s cubic-bezier(.2,.7,.2,1),
            border-color .35s ease,
            box-shadow .35s ease;

          will-change: opacity, transform;
        }

        .facility-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger featured cards */
        .facilities-showcase .facility-card:nth-child(2) {
          transition-delay: .10s;
        }

        .facilities-showcase .facility-card:nth-child(3) {
          transition-delay: .20s;
        }

        /* Stagger additional cards */
        .facilities-extra-grid .facility-card:nth-child(3n + 2) {
          transition-delay: .08s;
        }

        .facilities-extra-grid .facility-card:nth-child(3n) {
          transition-delay: .16s;
        }

        /* ==============================
           ANIMATED GOLD DIVIDER
        ============================== */

        .facilities-gold-divider {
          transform: scaleX(0);
          transform-origin: center;

          transition:
            transform .8s cubic-bezier(.2,.7,.2,1) .2s;
        }

        .facilities-intro.is-visible
        .facilities-gold-divider {
          transform: scaleX(1);
        }

        /* ==============================
           RESPONSIVE DESIGN
        ============================== */

        @media (min-width: 1500px) {
          .facilities-container {
            width: min(1320px, calc(100% - 80px));
          }
        }

        @media (max-width: 900px) {
          .facilities-hero {
            padding: 42px 0 34px;
          }

          .facilities-showcase {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }

          .facility-card--featured {
            grid-column: 1 / -1;
            grid-row: auto;
            min-height: 310px;
          }

          .facility-card--compact {
            min-height: 220px;
          }

          .facilities-extra-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .facilities-clinical__grid {
            gap: 25px;
          }

          .facilities-clinical__image-wrap {
            min-height: 300px;
          }
        }

        @media (max-width: 600px) {
          .facilities-container {
            width: calc(100% - 32px);
          }

          .facilities-hero {
            padding: 34px 0 30px;
          }

          .facilities-hero h1 {
            font-size: 40px;
          }

          .facilities-hero__description {
            font-size: 14px;
            line-height: 1.75;
          }

          .facilities-eyebrow {
            font-size: 10px;
            letter-spacing: 1.4px;
          }

          .facilities-intro {
            padding: 35px 0 24px;
          }

          .facilities-section-description {
            font-size: 13px;
          }

          .facilities-showcase {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .facility-card--featured {
            grid-column: auto;
            min-height: 290px;
          }

          .facility-card--compact {
            min-height: 210px;
          }

          .facilities-extra-grid {
            grid-template-columns: 1fr;
            gap: 13px;
            margin-bottom: 30px;
          }

          .facilities-extra-grid .facility-card {
            min-height: 215px;
          }

          .facility-card__content {
            right: 48px;
            bottom: 15px;
            left: 15px;
          }

          .facility-card__content h3 {
            font-size: 19px;
          }

          .facilities-clinical {
            padding: 25px 0;
          }

          .facilities-clinical__grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .facilities-clinical__image-wrap {
            min-height: 230px;
          }

          .facilities-cta {
            padding: 32px 0;
          }
        }

        /* ==============================
           ACCESSIBILITY
        ============================== */

        @media (prefers-reduced-motion: reduce) {
          .facilities-page *,
          .facilities-page *::before,
          .facilities-page *::after {
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
            animation-duration: .01ms !important;
          }

          .facilities-page .facility-reveal {
            opacity: 1 !important;
            transform: none !important;
            will-change: auto;
          }

          .facilities-page .facilities-gold-divider {
            transform: none !important;
          }
        }
      `}</style>

      {/* Hero */}
      <header className="facilities-hero">
        <div className="facilities-container facilities-hero__inner">
          <p className="facilities-eyebrow">
            Infrastructure &amp; Learning
          </p>

          <h1>Facilities</h1>

          <p className="facilities-hero__description">
            Modern laboratories, advanced rehabilitation equipment,
            student resources, and convenient transport facilities
            supporting a complete physiotherapy learning experience.
          </p>
        </div>
      </header>

      {/* Introduction */}
      <section className="facilities-intro facility-reveal">
        <div className="facilities-container">
          <span className="facilities-section-label">
            Explore Our Campus
          </span>

          <h2 className="facilities-section-title">
            Our Facilities
          </h2>

          <p className="facilities-section-description">
            Every space is designed to support physiotherapy education,
            from foundational sciences and practical laboratories to
            clinical training, student resources, and campus transport.
          </p>

          <div className="facilities-gold-divider" />
        </div>
      </section>

      {/* Featured facilities */}
      <section className="facilities-container">
        <div className="facilities-showcase">
          {featuredFacilities.exercise &&
            renderFacilityCard(
              featuredFacilities.exercise,
              'featured',
              'Therapy Lab'
            )}

          {featuredFacilities.diagnostics &&
            renderFacilityCard(
              featuredFacilities.diagnostics,
              'compact',
              'Diagnostics Lab'
            )}

          {featuredFacilities.anatomy &&
            renderFacilityCard(
              featuredFacilities.anatomy,
              'compact',
              'Anatomy Lab'
            )}
        </div>

        {/* Remaining facilities, including transport */}
        <div className="facilities-extra-grid">
          {featuredFacilities.remaining.map((facility) => {
            const name = facility.name.toLowerCase();

            let eyebrow = 'Campus Facility';

            if (/transport|bus/i.test(name)) {
              eyebrow = 'Campus Transport';
            } else if (/rehab|mobility|accessibility/i.test(name)) {
              eyebrow = 'Rehabilitation';
            } else if (/library|resource/i.test(name)) {
              eyebrow = 'Resource Centre';
            } else if (/clinical|practice/i.test(name)) {
              eyebrow = 'Clinical Training';
            } else if (/anatomy|lab/i.test(name)) {
              eyebrow = 'Practical Learning';
            }

            return renderFacilityCard(
              facility,
              'standard',
              eyebrow
            );
          })}
        </div>
      </section>

      {/* Clinical training feature */}
      <section className="facilities-clinical facility-reveal">
        <div className="facilities-container facilities-clinical__grid">
          <div className="facilities-clinical__image-wrap">
            <img
              src={clinicalImage}
              alt="Practical physiotherapy clinical training"
              className="facilities-clinical__image"
              loading="lazy"
            />
          </div>

          <div className="facilities-clinical__content">
            <span className="facilities-section-label">
              Clinical Training
            </span>

            <h2 className="facilities-section-title">
              Learning Through Clinical Practice
            </h2>

            <p>
              Students develop practical skills through supervised
              learning, clinical demonstrations, case discussions,
              and exposure to rehabilitation techniques.
            </p>

            <p>
              This learning experience helps connect classroom
              knowledge with professional physiotherapy practice.
            </p>

            <Link
              to="/departments"
              className="facilities-departments-link"
            >
              Explore Departments
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Campus visit CTA */}
      <section className="facilities-cta facility-reveal">
        <div className="facilities-container">
          <h2>Experience Our Campus</h2>

          <p>
            Discover our learning facilities and explore the
            opportunities available at Madha College of Physiotherapy.
          </p>

          <button
            type="button"
            onClick={onEnquiryClick}
            className="facilities-cta-button"
          >
            Schedule a Visit
            <ArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}
