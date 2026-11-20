import { Link } from 'react-router-dom';
import { useMemo, type ComponentType } from 'react';
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
  ChevronRight,
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
    'Convenient transportation facilities for students travelling to and from campus.',
  icon: 'Bus',
  image:
    'https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

const heroImage =
  'https://images.pexels.com/photos/20860610/pexels-photo-20860610.jpeg?auto=compress&cs=tinysrgb&w=1400';

const clinicalImage =
  'https://images.pexels.com/photos/20860610/pexels-photo-20860610.jpeg?auto=compress&cs=tinysrgb&w=1400';

/* Curved edge of the hero panel. The same path draws the green panel and the
   gold ring around it, so the gold line always follows the curve exactly. */
const HERO_CURVE = 'M0 0 H76 C104 0 104 100 76 100 H0 Z';

export default function Facilities({
  onEnquiryClick,
}: FacilitiesProps) {
  const allFacilities = useMemo(() => {
    const existing = facilities.map((facility) => ({
      ...facility,
    }));

    const hasTransport = existing.some((facility) =>
      /transport|bus/i.test(facility.name)
    );

    return hasTransport
      ? existing
      : [...existing, transportFacility];
  }, []);

  const featured = useMemo(() => {
    const find = (pattern: RegExp) =>
      allFacilities.find((item) => pattern.test(item.name));

    const exercise =
      find(/exercise|therapy|physio/i) ?? allFacilities[0];

    const diagnostics =
      find(/electro|diagnostic/i) ??
      allFacilities.find((item) => item.id !== exercise?.id);

    const anatomy =
      find(/anatomy|movement/i) ??
      allFacilities.find(
        (item) =>
          item.id !== exercise?.id &&
          item.id !== diagnostics?.id
      );

    const remaining = allFacilities.filter(
      (item) =>
        item.id !== exercise?.id &&
        item.id !== diagnostics?.id &&
        item.id !== anatomy?.id
    );

    return {
      exercise,
      diagnostics,
      anatomy,
      remaining,
    };
  }, [allFacilities]);

  const getIcon = (icon: string) =>
    iconMap[icon] ?? Building2;

  const renderFeature = (
    facility: (typeof allFacilities)[number] | undefined,
    variant: 'large' | 'small',
    eyebrow: string
  ) => {
    if (!facility) return null;

    const Icon = getIcon(facility.icon);

    return (
      <article
        key={facility.id}
        className={`premium-feature premium-feature--${variant}`}
      >
        <img
          src={facility.image}
          alt={facility.name}
          loading="lazy"
        />

        <div className="premium-feature__overlay" />

        <div className="premium-feature__icon">
          <Icon />
        </div>

        <div className="premium-feature__content">
          <span>{eyebrow}</span>
          <h3>{facility.name}</h3>
          <p>{facility.description}</p>
        </div>

        <div className="premium-feature__arrow">
          <ArrowRight />
        </div>
      </article>
    );
  };

  return (
    <main className="premium-facilities">
      <style>{`
        .premium-facilities {
          --forest: #063d2f;
          --deep: #022e24;
          --green: #105c43;
          --gold: #e6b52f;
          --gold-light: #f5d77b;
          --cream: #fbf8f0;
          --ink: #183d30;
          --muted: #66736d;

          background: #fff;
          color: var(--ink);
          overflow-x: clip;
        }

        .premium-facilities *,
        .premium-facilities *::before,
        .premium-facilities *::after {
          box-sizing: border-box;
        }

        .pf-container {
          width: min(1240px, calc(100% - 48px));
          margin-inline: auto;
        }

        /* ---------- HERO ---------- */

        .pf-hero {
          position: relative;
          display: flex;
          align-items: stretch;
          min-height: 440px;
          overflow: hidden;
          isolation: isolate;
          background: var(--deep);
        }

        /* Photo sits in the right part of the hero so the subject
           is centred in the area that stays visible */
        .pf-hero__image {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 35%;
          z-index: -2;
          overflow: hidden;
        }

        .pf-hero__image img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 60% 30%;
        }

        .pf-hero__image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(2, 46, 36, .25),
            transparent 55%
          );
        }

        /* Green panel + gold ring, drawn as one SVG so they match exactly */
        .pf-hero__shape {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
          width: 56%;
          pointer-events: none;
        }

        .pf-hero__shape svg {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .pf-hero__ring {
          fill: var(--gold);
          stroke: var(--gold);
          stroke-width: 14px; /* about 7px of gold shows outside the green */
          stroke-linejoin: round;
        }

        .pf-hero__content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 56%;
          min-height: 440px;
          padding: 55px 70px 55px max(30px, calc((100vw - 1240px) / 2));
          color: #fff;
        }

        .pf-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 15px;
          color: var(--gold);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .pf-eyebrow::after {
          content: "";
          width: 55px;
          height: 1px;
          background: var(--gold);
        }

        .pf-hero h1 {
          margin: 0 0 15px;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(48px, 6vw, 76px);
          font-weight: 600;
          line-height: 1;
        }

        .pf-hero__description {
          max-width: 440px;
          margin: 0;
          color: rgba(255,255,255,.9);
          font-size: 15px;
          line-height: 1.8;
        }

        .pf-hero__button {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          gap: 12px;
          margin-top: 25px;
          padding: 13px 20px;
          border-radius: 30px;
          background: var(--gold);
          color: var(--deep);
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          transition: .3s ease;
        }

        .pf-hero__button:hover {
          transform: translateY(-3px);
          background: var(--gold-light);
        }

        .pf-hero__button svg {
          width: 17px;
        }

        /* ---------- SECTION INTRO ---------- */

        .pf-intro {
          padding: 35px 0 25px;
          background: var(--cream);
          text-align: center;
        }

        .pf-label {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 8px;
          color: #b98516;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .pf-label::before,
        .pf-label::after {
          content: "";
          width: 38px;
          height: 1px;
          background: var(--gold);
        }

        .pf-section-title {
          margin: 0;
          color: var(--forest);
          font-family: Georgia, serif;
          font-size: clamp(30px, 4vw, 42px);
          font-weight: 600;
          line-height: 1.2;
        }

        .pf-section-description {
          max-width: 720px;
          margin: 10px auto 0;
          color: #52635a;
          font-size: 14px;
          line-height: 1.8;
        }

        /* ---------- FEATURE SHOWCASE ---------- */

        .pf-showcase-section {
          padding: 0 0 30px;
          background: var(--cream);
        }

        .pf-showcase {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          grid-template-rows: repeat(2, minmax(155px, 1fr));
          gap: 14px;
        }

        .premium-feature {
          position: relative;
          isolation: isolate;
          min-width: 0;
          overflow: hidden;
          border-radius: 15px;
          background: var(--deep);
          box-shadow: 0 5px 18px rgba(3,48,36,.09);
          transition: transform .35s ease;
        }

        .premium-feature:hover {
          transform: translateY(-4px);
        }

        .premium-feature--large {
          grid-row: 1 / span 2;
          min-height: 350px;
        }

        .premium-feature--small {
          min-height: 165px;
        }

        .premium-feature > img {
          position: absolute;
          inset: 0;
          z-index: -2;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .65s ease;
        }

        .premium-feature:hover > img {
          transform: scale(1.05);
        }

        .premium-feature__overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(
            180deg,
            rgba(1,30,22,.08),
            rgba(1,32,23,.18) 35%,
            rgba(1,36,27,.93) 100%
          );
        }

        .premium-feature--small .premium-feature__overlay {
          background:
            linear-gradient(
              90deg,
              rgba(2,43,32,.72),
              rgba(2,43,32,.12)
            ),
            linear-gradient(
              0deg,
              rgba(1,30,22,.55),
              transparent
            );
        }

        .premium-feature__icon {
          position: absolute;
          top: 18px;
          left: 18px;
          display: grid;
          width: 47px;
          height: 47px;
          place-items: center;
          border-radius: 12px;
          background: #fff9e9;
          color: var(--forest);
        }

        .premium-feature__icon svg {
          width: 24px;
          height: 24px;
        }

        .premium-feature__content {
          position: absolute;
          right: 55px;
          bottom: 20px;
          left: 20px;
        }

        .premium-feature__content span {
          display: block;
          margin-bottom: 6px;
          color: var(--gold-light);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .premium-feature__content h3 {
          margin: 0 0 6px;
          color: #fff;
          font-family: Georgia, serif;
          font-size: clamp(19px, 2vw, 27px);
          font-weight: 600;
        }

        .premium-feature__content p {
          max-width: 430px;
          margin: 0;
          color: rgba(255,255,255,.9);
          font-size: 12px;
          line-height: 1.6;
        }

        .premium-feature--small .premium-feature__content {
          left: 98px;
          bottom: 17px;
        }

        .premium-feature--small .premium-feature__content h3 {
          font-size: 21px;
        }

        .premium-feature__arrow {
          position: absolute;
          right: 15px;
          bottom: 17px;
          display: grid;
          width: 36px;
          height: 36px;
          place-items: center;
          border: 1px solid var(--gold);
          border-radius: 50%;
          background: rgba(2,46,36,.7);
          color: white;
          transition: .25s ease;
        }

        .premium-feature__arrow svg {
          width: 17px;
        }

        .premium-feature:hover .premium-feature__arrow {
          background: var(--gold);
          color: var(--deep);
        }

        /* ---------- AMENITIES ---------- */

        .pf-amenities {
          padding: 32px 0 38px;
          scroll-margin-top: 90px;
          background: linear-gradient(
            110deg,
            #f8f3e9,
            #fffdf8
          );
        }

        .pf-amenities__heading {
          margin-bottom: 22px;
          text-align: center;
        }

        .pf-amenities__grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
        }

        .pf-amenity {
          display: flex;
          align-items: center;
          gap: 13px;
          min-width: 0;
          min-height: 76px;
          padding: 14px;
          border: 1px solid #eae4d7;
          border-radius: 12px;
          background: rgba(255,255,255,.8);
          box-shadow: 0 2px 6px rgba(20,50,35,.035);
          transition: .3s ease;
        }

        .pf-amenity:hover {
          transform: translateY(-3px);
          border-color: var(--gold);
          box-shadow: 0 7px 18px rgba(20,50,35,.09);
        }

        .pf-amenity__icon {
          display: grid;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          place-items: center;
          color: var(--green);
        }

        .pf-amenity__icon svg {
          width: 29px;
          height: 29px;
          stroke-width: 2;
        }

        .pf-amenity__name {
          flex: 1;
          color: #253c32;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.5;
        }

        .pf-amenity__arrow {
          flex-shrink: 0;
          color: #78877e;
        }

        .pf-amenity__arrow svg {
          width: 18px;
        }

        /* ---------- CLINICAL SECTION ---------- */

        .pf-clinical {
          padding: 30px 0 42px;
          background: #fffdf7;
        }

        .pf-clinical__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 38px;
        }

        .pf-clinical__image {
          position: relative;
          min-height: 315px;
          overflow: hidden;
          border-radius: 15px;
          background: #e8eee8;
          box-shadow: 0 10px 30px rgba(3,48,36,.1);
        }

        .pf-clinical__image img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pf-clinical__content .pf-label {
          margin-bottom: 10px;
        }

        .pf-clinical__content .pf-section-title {
          font-size: clamp(27px, 3vw, 39px);
        }

        .pf-clinical__content p {
          margin: 13px 0 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.85;
        }

        .pf-department-link {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          margin-top: 20px;
          padding: 12px 20px;
          border-radius: 30px;
          background: var(--forest);
          color: white;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: .3s ease;
        }

        .pf-department-link:hover {
          transform: translateY(-3px);
          background: var(--gold);
          color: var(--deep);
        }

        .pf-department-link svg {
          width: 17px;
        }

        /* ---------- CTA ---------- */

        .pf-cta {
          position: relative;
          isolation: isolate;
          padding: 52px 0;
          overflow: hidden;
          background:
            radial-gradient(
              ellipse at 85% 20%,
              rgba(33,115,78,.65),
              transparent 50%
            ),
            linear-gradient(110deg, #022e24, #07513c);
        }

        .pf-cta::before {
          content: "";
          position: absolute;
          z-index: -1;
          top: 0;
          right: 0;
          bottom: 0;
          width: 45%;
          background:
            linear-gradient(
              90deg,
              #063d2f,
              rgba(6,61,47,.35)
            ),
            url('https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1200')
            center / cover;
          opacity: .4;
        }

        .pf-cta__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
        }

        .pf-cta__content {
          padding-left: 20px;
          border-left: 4px solid var(--gold);
        }

        .pf-cta h2 {
          margin: 0;
          color: #fff;
          font-family: Georgia, serif;
          font-size: clamp(27px, 3vw, 38px);
        }

        .pf-cta p {
          max-width: 570px;
          margin: 10px 0 0;
          color: rgba(255,255,255,.82);
          font-size: 13px;
          line-height: 1.7;
        }

        .pf-cta__button {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 15px 23px;
          border: none;
          border-radius: 30px;
          background: var(--gold);
          color: var(--deep);
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: .3s ease;
        }

        .pf-cta__button:hover {
          transform: translateY(-3px);
          background: var(--gold-light);
          box-shadow: 0 8px 20px rgba(230,181,47,.2);
        }

        .pf-cta__button svg {
          width: 17px;
        }

        /* ---------- TABLET ---------- */

        @media (max-width: 900px) {
          .pf-hero {
            min-height: 390px;
          }

          .pf-hero__image {
            left: 30%;
          }

          .pf-hero__shape {
            width: 64%;
          }

          .pf-hero__content {
            width: 64%;
            min-height: 390px;
            padding: 40px 50px 40px 30px;
          }

          .pf-hero h1 {
            font-size: 54px;
          }

          .pf-hero__description {
            max-width: 380px;
            font-size: 14px;
          }

          .pf-showcase {
            grid-template-columns: 1fr 1fr;
          }

          .premium-feature--large {
            grid-column: 1 / -1;
            grid-row: auto;
            min-height: 300px;
          }

          .premium-feature--small {
            min-height: 210px;
          }

          .premium-feature--small .premium-feature__content {
            left: 17px;
          }

          .premium-feature--small .premium-feature__icon {
            top: 14px;
            left: 14px;
          }

          .pf-amenities__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .pf-clinical__grid {
            gap: 25px;
          }
        }

        /* ---------- MOBILE ---------- */

        @media (max-width: 600px) {
          .pf-container {
            width: calc(100% - 32px);
          }

          .pf-hero {
            flex-direction: column;
            min-height: auto;
          }

          .pf-hero__image {
            position: relative;
            inset: auto;
            z-index: 0;
            width: 100%;
            height: 235px;
            min-height: 235px;
            order: 1;
          }

          .pf-hero__shape {
            display: none;
          }

          .pf-hero__content {
            order: 2;
            width: 100%;
            min-height: 290px;
            padding: 38px 24px 40px;
            background: linear-gradient(120deg, #022e24, #064735);
            border-bottom: 6px solid var(--gold);
            border-radius: 0 0 45% 0 / 0 0 12% 0;
          }

          .pf-hero h1 {
            font-size: 49px;
          }

          .pf-hero__description {
            max-width: 100%;
            font-size: 14px;
          }

          .pf-intro {
            padding: 30px 0 23px;
          }

          .pf-section-title {
            font-size: 32px;
          }

          .pf-section-description {
            font-size: 13px;
          }

          .pf-showcase {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .premium-feature--large {
            grid-column: auto;
            min-height: 290px;
          }

          .premium-feature--small {
            min-height: 220px;
          }

          .premium-feature--small .premium-feature__content {
            left: 17px;
            bottom: 18px;
          }

          .premium-feature--small .premium-feature__content h3 {
            font-size: 20px;
          }

          .pf-amenities {
            padding: 30px 0;
          }

          .pf-amenities__grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .pf-amenity {
            min-height: 78px;
            gap: 7px;
            padding: 10px 8px;
          }

          .pf-amenity__icon {
            width: 30px;
            height: 30px;
          }

          .pf-amenity__icon svg {
            width: 23px;
            height: 23px;
          }

          .pf-amenity__name {
            font-size: 11px;
          }

          .pf-amenity__arrow svg {
            width: 14px;
          }

          .pf-clinical {
            padding: 26px 0 34px;
          }

          .pf-clinical__grid {
            grid-template-columns: 1fr;
            gap: 23px;
          }

          .pf-clinical__image {
            min-height: 235px;
          }

          .pf-cta {
            padding: 38px 0;
          }

          .pf-cta__inner {
            align-items: flex-start;
            flex-direction: column;
          }

          .pf-cta h2 {
            font-size: 30px;
          }
        }

        @media (max-width: 360px) {
          .pf-amenities__grid {
            grid-template-columns: 1fr;
          }
        }

        /* ---------- REDUCED MOTION ---------- */

        @media (prefers-reduced-motion: reduce) {
          .premium-facilities *,
          .premium-facilities *::before,
          .premium-facilities *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* HERO */}

      <section className="pf-hero">
        <div className="pf-hero__image">
          <img
            src={heroImage}
            alt="Modern physiotherapy laboratory"
          />
        </div>

        {/* Green curved panel with a gold ring that follows the same curve */}
        <div className="pf-hero__shape" aria-hidden="true">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            focusable="false"
          >
            <defs>
              <linearGradient
                id="pf-hero-gradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0" stopColor="#022e24" />
                <stop offset="0.65" stopColor="#064735" />
                <stop offset="1" stopColor="#06382c" />
              </linearGradient>
            </defs>

            <path
              className="pf-hero__ring"
              d={HERO_CURVE}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={HERO_CURVE}
              fill="url(#pf-hero-gradient)"
            />
          </svg>
        </div>

        <div className="pf-hero__content">
          <p className="pf-eyebrow">
            Infrastructure &amp; Learning
          </p>

          <h1>Facilities</h1>

          <p className="pf-hero__description">
            Modern laboratories, advanced rehabilitation
            equipment, student resources, and convenient
            transport facilities supporting a complete
            physiotherapy learning experience.
          </p>

          <a
            href="#pf-amenities"
            className="pf-hero__button"
          >
            Explore Our Campus
            <ArrowRight />
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}

      <section className="pf-intro">
        <div className="pf-container">
          <span className="pf-label">
            Explore Our Campus
          </span>

          <h2 className="pf-section-title">
            Our Facilities
          </h2>

          <p className="pf-section-description">
            Every space is designed to support physiotherapy
            education, from foundational sciences and practical
            laboratories to clinical training, student resources,
            and campus transport.
          </p>
        </div>
      </section>

      {/* FEATURED LABORATORIES */}

      <section className="pf-showcase-section">
        <div className="pf-container">
          <div className="pf-showcase">
            {renderFeature(
              featured.exercise,
              'large',
              'Therapy Lab'
            )}

            {renderFeature(
              featured.diagnostics,
              'small',
              'Diagnostics Lab'
            )}

            {renderFeature(
              featured.anatomy,
              'small',
              'Anatomy Lab'
            )}
          </div>
        </div>
      </section>

      {/* CAMPUS AMENITIES */}

      <section className="pf-amenities" id="pf-amenities">
        <div className="pf-container">
          <div className="pf-amenities__heading">
            <span className="pf-label">
              More Facilities
            </span>

            <h2 className="pf-section-title">
              Campus Amenities
            </h2>

            <p className="pf-section-description">
              A holistic campus environment to support
              your academic and personal growth.
            </p>
          </div>

          <div className="pf-amenities__grid">
            {featured.remaining.map((facility) => {
              const Icon = getIcon(facility.icon);

              return (
                <article
                  className="pf-amenity"
                  key={facility.id}
                  title={facility.description}
                >
                  <div className="pf-amenity__icon">
                    <Icon />
                  </div>

                  <span className="pf-amenity__name">
                    {facility.name}
                  </span>

                  <span className="pf-amenity__arrow">
                    <ChevronRight />
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLINICAL TRAINING */}

      <section className="pf-clinical">
        <div className="pf-container pf-clinical__grid">
          <div className="pf-clinical__image">
            <img
              src={clinicalImage}
              alt="Practical physiotherapy clinical training"
              loading="lazy"
            />
          </div>

          <div className="pf-clinical__content">
            <span className="pf-label">
              Clinical Training
            </span>

            <h2 className="pf-section-title">
              Learning Through Clinical Practice
            </h2>

            <p>
              Students develop practical skills through
              supervised learning, clinical demonstrations,
              case discussions, and exposure to rehabilitation
              techniques.
            </p>

            <p>
              This learning experience helps connect classroom
              knowledge with professional physiotherapy practice.
            </p>

            <Link
              to="/departments"
              className="pf-department-link"
            >
              Explore Departments
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

    
    </main>
  );
}