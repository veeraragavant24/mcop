import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  Brain,
  HeartPulse,
  Baby,
  Users,
  Accessibility,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Building2,
  UserRound,
  Stethoscope,
  Sparkles,
} from 'lucide-react';

/* =========================================================
   DEPARTMENT DATA
========================================================= */

type Department = {
  id: number;
  shortName: string;
  title: string;
  cardTitle: string;
  icon: typeof Activity;
  image: string;
  bannerColor: string;
  hod: string;
  qualification: string;
  overview: string;
  focusAreas: string[];
  training: string[];
  facilities: string[];
  laboratories: { name: string; image: string }[];
};

const departments: Department[] = [
  {
    id: 1,
    shortName: 'Orthopedics',
    title: 'Orthopedics & Sports Physiotherapy',
    cardTitle: 'Orthopedics & Sports',
    icon: Activity,
    image: '/department/orthopedics.jpg',
    bannerColor: '#0196fa',
    hod: 'Department Faculty',
    qualification: 'Faculty details to be updated',
    overview:
      'The Department of Orthopedics and Sports Physiotherapy focuses on the assessment, treatment, and rehabilitation of musculoskeletal conditions. Students develop practical knowledge in manual therapy, therapeutic exercise, sports injury management, and post-surgical rehabilitation.',
    focusAreas: [
      'Manual therapy techniques',
      'Sports injury rehabilitation',
      'Post-surgical recovery',
      'Posture and ergonomics',
      'Functional movement training',
    ],
    training: [
      'Hands-on clinical exposure in rehabilitation settings',
      'Case-based learning and supervised practice',
      'Sports injury assessment and management',
      'Pre- and post-surgical rehabilitation techniques',
    ],
    facilities: [
      'Musculoskeletal assessment facilities',
      'Therapeutic exercise equipment',
      'Sports rehabilitation training',
    ],
    laboratories: [
      { name: 'Musculoskeletal Rehabilitation Lab', image: '/images/departments/msk-lab.jpg' },
      { name: 'Exercise Therapy Lab', image: '/images/departments/exercise-lab.jpg' },
      { name: 'Gait Analysis Lab', image: '/images/departments/gait-lab.jpg' },
    ],
  },
  {
    id: 2,
    shortName: 'Neurology',
    title: 'Neurological Physiotherapy',
    cardTitle: 'Neurological Physiotherapy',
    icon: Brain,
    image: '/department/neurological.jpg',
    bannerColor: '#ffd726',
    hod: 'Department Faculty',
    qualification: 'Faculty details to be updated',
    overview:
      'Neurological Physiotherapy focuses on rehabilitation for individuals experiencing neurological movement and functional difficulties. Students explore assessment methods, balance training, mobility exercises, and rehabilitation approaches under appropriate clinical supervision.',
    focusAreas: [
      'Neurological assessment',
      'Balance and coordination',
      'Motor control and movement',
      'Functional mobility training',
      'Neurological rehabilitation',
    ],
    training: [
      'Neurological patient assessment',
      'Balance and coordination training',
      'Mobility and functional exercises',
      'Supervised rehabilitation practice',
    ],
    facilities: [
      'Neurological assessment equipment',
      'Balance training equipment',
      'Mobility rehabilitation aids',
    ],
    laboratories: [
      { name: 'Neurological Rehabilitation Lab', image: '/images/departments/neuro-lab.jpg' },
      { name: 'Balance Training Unit', image: '/images/departments/balance-lab.jpg' },
      { name: 'Mobility Training Area', image: '/images/departments/mobility-lab.jpg' },
    ],
  },
  {
    id: 3,
    shortName: 'Cardiorespiratory',
    title: 'Cardiorespiratory Physiotherapy',
    cardTitle: 'Cardiorespiratory',
    icon: HeartPulse,
    image: '/department/cardiorespiratory.jpg',
    bannerColor: '#ffb4d8',
    hod: 'Department Faculty',
    qualification: 'Faculty details to be updated',
    overview:
      'The Cardiorespiratory Physiotherapy department focuses on breathing, exercise tolerance, and functional rehabilitation. Students learn assessment techniques and supervised interventions relevant to respiratory and cardiovascular rehabilitation.',
    focusAreas: [
      'Breathing exercises',
      'Airway clearance techniques',
      'Exercise tolerance assessment',
      'Cardiopulmonary rehabilitation',
      'Functional endurance training',
    ],
    training: [
      'Respiratory assessment techniques',
      'Breathing and airway clearance practice',
      'Exercise tolerance assessment',
      'Supervised cardiopulmonary rehabilitation',
    ],
    facilities: [
      'Respiratory assessment equipment',
      'Exercise monitoring facilities',
      'Cardiopulmonary training equipment',
    ],
    laboratories: [
      { name: 'Cardiorespiratory Lab', image: '/images/departments/cardio-lab.jpg' },
      { name: 'Exercise Testing Area', image: '/images/departments/exercise-testing.jpg' },
      { name: 'Respiratory Training Unit', image: '/images/departments/respiratory-lab.jpg' },
    ],
  },
  {
    id: 4,
    shortName: 'Pediatrics',
    title: 'Pediatric Physiotherapy',
    cardTitle: 'Pediatric Physiotherapy',
    icon: Baby,
    image: '/department/pediatric.jpg',
    bannerColor: '#87a3ff',
    hod: 'Department Faculty',
    qualification: 'Faculty details to be updated',
    overview:
      'Pediatric Physiotherapy focuses on movement, physical development, and functional participation in children. Students learn about age-appropriate assessment, developmental milestones, therapeutic play, and family-centred rehabilitation approaches.',
    focusAreas: [
      'Child development assessment',
      'Motor milestone evaluation',
      'Pediatric movement training',
      'Therapeutic play',
      'Functional mobility',
    ],
    training: [
      'Developmental assessment practice',
      'Age-appropriate movement exercises',
      'Therapeutic play techniques',
      'Family-centred rehabilitation learning',
    ],
    facilities: [
      'Pediatric assessment equipment',
      'Child-friendly therapy resources',
      'Developmental training equipment',
    ],
    laboratories: [
      { name: 'Pediatric Physiotherapy Lab', image: '/images/departments/pediatric-lab.jpg' },
      { name: 'Developmental Training Area', image: '/images/departments/development-lab.jpg' },
      { name: 'Functional Movement Unit', image: '/images/departments/functional-lab.jpg' },
    ],
  },
  {
    id: 5,
    shortName: 'Community',
    title: 'Community-Based Rehabilitation',
    cardTitle: 'Community Rehabilitation',
    icon: Users,
    image: '/department/community.jpg',
    bannerColor: '#58c294',
    hod: 'Department Faculty',
    qualification: 'Faculty details to be updated',
    overview:
      'Community-Based Rehabilitation explores physiotherapy services in community settings, prevention strategies, accessibility, and functional independence. Students learn how rehabilitation principles can support individuals and communities in different environments.',
    focusAreas: [
      'Community rehabilitation',
      'Disability awareness',
      'Health education',
      'Functional independence',
      'Rehabilitation accessibility',
    ],
    training: [
      'Community-based assessment',
      'Health education activities',
      'Functional independence planning',
      'Rehabilitation awareness programmes',
    ],
    facilities: [
      'Community assessment resources',
      'Mobility support equipment',
      'Rehabilitation education materials',
    ],
    laboratories: [
      { name: 'Community Rehabilitation Unit', image: '/images/departments/community-lab.jpg' },
      { name: 'Mobility Assessment Area', image: '/images/departments/mobility-assessment.jpg' },
      { name: 'Assistive Training Unit', image: '/images/departments/assistive-lab.jpg' },
    ],
  },
  {
    id: 6,
    shortName: 'Geriatrics',
    title: 'Geriatric Physiotherapy',
    cardTitle: 'Geriatric Physiotherapy',
    icon: Accessibility,
    image: '/department/geriatric.jpg',
    bannerColor: '#8674d8',
    hod: 'Department Faculty',
    qualification: 'Faculty details to be updated',
    overview:
      'Geriatric Physiotherapy focuses on mobility, balance, strength, and functional independence in older adults. Students learn age-appropriate assessment, fall prevention, exercise prescription, and rehabilitation strategies that support safe daily activities.',
    focusAreas: [
      'Balance and fall prevention',
      'Strength and mobility',
      'Age-related functional assessment',
      'Gait training',
      'Daily activity independence',
    ],
    training: [
      'Balance and mobility assessment',
      'Functional exercise programmes',
      'Fall prevention strategies',
      'Gait and walking practice',
    ],
    facilities: [
      'Balance assessment equipment',
      'Gait training equipment',
      'Functional mobility resources',
    ],
    laboratories: [
      { name: 'Geriatric Rehabilitation Lab', image: '/images/departments/geriatric-lab.jpg' },
      { name: 'Balance and Gait Unit', image: '/images/departments/gait-training.jpg' },
      { name: 'Functional Training Area', image: '/images/departments/functional-training.jpg' },
    ],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function Departments() {
  const [activeDepartment, setActiveDepartment] = useState(0);
  const [detailKey, setDetailKey] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const department = departments[activeDepartment];

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>('.dept-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('dept-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -35px 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeDepartment]);

  const selectDepartment = (index: number) => {
    if (index === activeDepartment) return;
    setActiveDepartment(index);
    setDetailKey((previous) => previous + 1);
  };

  return (
    <section className="dept-page" ref={sectionRef}>
      <style>{`
        .dept-page {
          --dept-green: #073D2F;
          --dept-green-dark: #032B22;
          --dept-green-light: #155A45;
          --dept-gold: #D8B54C;
          --dept-gold-bright: #F0CF70;
          --dept-cream: #FBFCF8;
          --dept-text: #173D30;
          --dept-muted: #66756E;
          --dept-border: rgba(7, 61, 47, 0.10);
          background:
            radial-gradient(ellipse at 10% 35%, rgba(216,181,76,0.06), transparent 35%),
            linear-gradient(180deg, #F7FAF7 0%, #FFFFFF 55%, #F5F9F5 100%);
          color: var(--dept-text);
          width: 100%;
          overflow: clip;
          padding-bottom: 90px;
          font-family: inherit;
        }

        .dept-page *,
        .dept-page *::before,
        .dept-page *::after {
          box-sizing: border-box;
        }

        .dept-page button { font: inherit; }

        .dept-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 255px;
          padding: 55px max(6%, calc((100% - 1240px) / 2));
          background:
            radial-gradient(ellipse at 85% 25%, rgba(216,181,76,.14), transparent 30%),
            linear-gradient(115deg, #032B22 0%, #073D2F 55%, #0B4B38 100%);
          border-radius: 0 0 34px 34px;
          color: white;
        }

        .dept-hero::before,
        .dept-hero::after {
          content: "";
          position: absolute;
          pointer-events: none;
          z-index: -1;
          border: 1px solid rgba(216,181,76,.30);
          border-radius: 50%;
          animation: dept-orbit 16s linear infinite;
        }

        .dept-hero::before {
          width: 430px;
          height: 430px;
          right: -65px;
          top: -245px;
          box-shadow: 0 0 0 35px rgba(216,181,76,.035), 0 0 0 75px rgba(216,181,76,.025);
        }

        .dept-hero::after {
          width: 240px;
          height: 240px;
          right: 20%;
          bottom: -210px;
          animation-direction: reverse;
        }

        .dept-hero-content {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          animation: dept-hero-in .9s cubic-bezier(.2,.75,.25,1) both;
        }

        .dept-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--dept-gold-bright);
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2.5px;
          margin: 0 0 13px;
        }

        .dept-eyebrow::before {
          content: "";
          width: 27px;
          height: 2px;
          background: var(--dept-gold);
          box-shadow: 0 0 10px rgba(216,181,76,.7);
        }

        .dept-hero h1 {
          margin: 0;
          color: white;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(32px, 4.3vw, 54px);
          line-height: 1.12;
          font-weight: 700;
          letter-spacing: -1.2px;
        }

        .dept-hero h1 span { color: var(--dept-gold); }

        .dept-hero p {
          max-width: 570px;
          color: rgba(255,255,255,.83);
          font-size: 15px;
          line-height: 1.8;
          margin: 14px 0 0;
        }

        .dept-gold-line {
          width: 96px;
          height: 4px;
          border-radius: 99px;
          margin-top: 19px;
          background: linear-gradient(90deg, #B78B25, #F5D778, #D8B54C);
          position: relative;
          transform-origin: left;
          animation: dept-line-grow 1.1s .25s ease both;
        }

        .dept-gold-line::after {
          content: "";
          position: absolute;
          right: -14px;
          top: 50%;
          width: 7px;
          height: 7px;
          transform: translateY(-50%) rotate(45deg);
          background: var(--dept-gold);
          box-shadow: 0 0 10px rgba(216,181,76,.6);
        }

        .dept-container {
          width: min(1240px, calc(100% - 64px));
          margin: 26px auto 0;
        }

        .dept-selector {
          position: relative;
          padding: 22px;
          border: 1px solid rgba(7,61,47,.09);
          border-radius: 24px;
          background: rgba(255,255,255,.75);
          box-shadow: 0 15px 45px rgba(7,61,47,.045);
          backdrop-filter: blur(12px);
        }

        .dept-selector-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .dept-selector-title {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .dept-heading-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          color: #986D0C;
          background: linear-gradient(145deg, #FFF5D8, #F5E3AC);
          border-radius: 13px;
        }

        .dept-selector-heading h2 {
          margin: 0;
          font: 700 clamp(18px, 2vw, 23px)/1.3 Georgia, serif;
          color: var(--dept-green);
        }

        .dept-count {
          color: #9A6A00;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.3px;
          white-space: nowrap;
        }

        .dept-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 13px;
        }

        .dept-card {
          --card-delay: 0ms;
          position: relative;
          min-width: 0;
          min-height: 104px;
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
          padding: 17px 16px;
          overflow: hidden;
          border: 1px solid rgba(7,61,47,.09);
          border-radius: 16px;
          background: linear-gradient(145deg, #FFFFFF, #FBFDFB);
          color: var(--dept-green);
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(7,61,47,.025);
          transition: transform .42s cubic-bezier(.2,.8,.2,1), background .35s ease,
            border-color .35s ease, box-shadow .4s ease, color .3s ease;
          animation: dept-card-enter .7s cubic-bezier(.2,.75,.25,1) both;
          animation-delay: var(--card-delay);
          transform-style: preserve-3d;
        }

        .dept-card::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          background: linear-gradient(115deg, transparent 15%, rgba(255,255,255,.12) 48%, transparent 80%);
          transform: translateX(-110%);
          transition: opacity .25s ease;
        }

        .dept-card:hover {
          transform: translateY(-5px) perspective(900px) rotateX(1deg);
          border-color: rgba(216,181,76,.75);
          box-shadow: 0 14px 28px rgba(7,61,47,.11), 0 3px 12px rgba(216,181,76,.08);
        }

        .dept-card:hover::before {
          opacity: 1;
          animation: dept-shimmer .85s ease;
        }

        .dept-card:focus-visible {
          outline: 3px solid rgba(216,181,76,.65);
          outline-offset: 3px;
        }

        .dept-card.active {
          color: #FFFFFF;
          border-color: var(--dept-gold);
          background: linear-gradient(120deg, #032B22, #07503B 80%, #0A4936);
          box-shadow: 0 12px 25px rgba(7,61,47,.18), 0 0 0 1px rgba(216,181,76,.12);
        }

        .dept-card.active::after {
          content: "";
          position: absolute;
          width: 100px;
          height: 100px;
          right: -45px;
          bottom: -65px;
          border: 1px solid rgba(216,181,76,.28);
          border-radius: 50%;
          box-shadow: 0 0 0 12px rgba(216,181,76,.04), 0 0 0 25px rgba(216,181,76,.025);
        }

        .dept-card-icon {
          width: 58px;
          height: 58px;
          flex: 0 0 58px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: var(--dept-green);
          background: linear-gradient(145deg, #F2F7F3, #E5F0E9);
          border: 1px solid rgba(7,61,47,.035);
          transition: transform .4s ease, color .3s ease, background .3s ease;
        }

        .dept-card:nth-child(3n + 2) .dept-card-icon {
          background: linear-gradient(145deg, #FFF8E7, #F8EDCF);
        }

        .dept-card.active .dept-card-icon {
          color: var(--dept-gold-bright);
          background: rgba(255,255,255,.08);
          border-color: rgba(216,181,76,.55);
          transform: rotate(-7deg) scale(1.04);
        }

        .dept-card:hover .dept-card-icon { transform: rotate(-6deg) scale(1.06); }
        .dept-card.active:hover .dept-card-icon { transform: rotate(0deg) scale(1.09); }

        .dept-card-text {
          flex: 1;
          min-width: 0;
          position: relative;
          z-index: 1;
          font: 700 15px/1.35 Georgia, "Times New Roman", serif;
        }

        .dept-card-number {
          position: absolute;
          top: 13px;
          right: 14px;
          font-size: 13px;
          line-height: 1;
          font-weight: 800;
          color: #B17B05;
          letter-spacing: .3px;
        }

        .dept-card.active .dept-card-number { color: var(--dept-gold-bright); }

        .dept-card-arrow {
          width: 27px;
          height: 27px;
          flex: 0 0 27px;
          display: grid;
          place-items: center;
          align-self: flex-end;
          border-radius: 50%;
          border: 1px solid #D8A526;
          color: #B78308;
          transition: transform .3s ease, background .3s ease, color .3s ease;
          position: relative;
          z-index: 1;
        }

        .dept-card.active .dept-card-arrow {
          color: var(--dept-gold-bright);
          background: rgba(216,181,76,.09);
        }

        .dept-card:hover .dept-card-arrow {
          transform: translateX(3px);
          background: var(--dept-gold);
          color: var(--dept-green-dark);
        }

        /* PASTEL SELECTED DEPARTMENT BANNER */

        .dept-detail {
          margin-top: 28px;
          animation: dept-detail-enter .8s cubic-bezier(.2,.75,.25,1) both;
        }

        .dept-detail-banner {
          min-height: 315px;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          border: 1px solid rgba(216,181,76,.85);
          border-radius: 24px;
          background: var(--banner-color, #E4F4FF);
          box-shadow: 0 16px 38px rgba(7,61,47,.15), 0 0 0 1px rgba(216,181,76,.13),
            0 0 32px rgba(216,181,76,.17);
          transition: box-shadow .4s ease;
        }

        .dept-detail-banner:hover {
          border-color: #F3D77E;
          box-shadow: 0 20px 45px rgba(7,61,47,.21), 0 0 22px rgba(216,181,76,.35),
            0 0 42px rgba(216,181,76,.22);
        }

        .dept-detail-banner::after {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            var(--banner-color) 0%,
            color-mix(in srgb, var(--banner-color) 94%, transparent) 34%,
            color-mix(in srgb, var(--banner-color) 72%, transparent) 55%,
            color-mix(in srgb, var(--banner-color) 22%, transparent) 73%,
            transparent 100%
          );
        }

        .dept-detail-image {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          animation: dept-image-reveal 1.1s cubic-bezier(.2,.75,.25,1) both;
          transition: transform .9s cubic-bezier(.2,.75,.25,1), filter .5s ease;
        }

        .dept-detail-banner:hover .dept-detail-image {
          transform: scale(1.045);
          filter: saturate(1.12) contrast(1.04);
        }

        .dept-banner-content {
          position: relative;
          z-index: 2;
          width: min(590px, 70%);
          min-height: 315px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 36px;
          color: #102C43;
        }

        .dept-number-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 15px;
          margin-bottom: 20px;
          border: 1px solid rgba(177,123,5,.4);
          border-radius: 999px;
          background: rgba(255,255,255,.66);
          color: #815D0A;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
          backdrop-filter: blur(8px);
        }

        .dept-banner-content h2 {
          margin: 0;
          color: #102C43;
          font: 700 clamp(28px, 3.2vw, 43px)/1.15 Georgia, "Times New Roman", serif;
          letter-spacing: -.7px;
          text-shadow: 0 1px 0 rgba(255,255,255,.2);
        }

        .dept-banner-content p {
          max-width: 560px;
          margin: 15px 0 0;
          color: #29475B;
          font-size: 14px;
          line-height: 1.85;
        }

        .dept-banner-accent {
          width: 68px;
          height: 4px;
          margin-top: 20px;
          border-radius: 99px;
          background: linear-gradient(90deg, #B78B25, #F5D778);
          box-shadow: 0 0 15px rgba(216,181,76,.35);
        }

        /* DETAILS */

        .dept-info-grid,
        .dept-bottom-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr);
          gap: 20px;
          margin-top: 20px;
        }

        .dept-bottom-grid { grid-template-columns: minmax(0, 1fr); }

        .dept-panel {
          min-width: 0;
          padding: 25px;
          border: 1px solid rgba(7,61,47,.09);
          border-radius: 21px;
          background: rgba(255,255,255,.88);
          box-shadow: 0 12px 32px rgba(7,61,47,.055);
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
        }

        .dept-panel:hover {
          transform: translateY(-3px);
          border-color: rgba(216,181,76,.42);
          box-shadow: 0 18px 38px rgba(7,61,47,.085);
        }

        .dept-hod {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 17px;
          margin-bottom: 24px;
          border: 1px solid rgba(216,181,76,.3);
          border-radius: 17px;
          background: linear-gradient(120deg, #FFFBED, #FFFFFF);
        }

        .dept-hod-icon {
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          display: grid;
          place-items: center;
          color: #89640C;
          border: 1px solid rgba(216,181,76,.42);
          border-radius: 50%;
          background: linear-gradient(145deg, #FFF1C7, #FFFFFF);
        }

        .dept-hod-label {
          margin: 0 0 5px;
          color: #99700C;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.3px;
          text-transform: uppercase;
        }

        .dept-hod h3 {
          margin: 0;
          color: var(--dept-green);
          font: 700 19px/1.35 Georgia, serif;
        }

        .dept-hod p:last-child {
          margin: 5px 0 0;
          color: var(--dept-muted);
          font-size: 12px;
          line-height: 1.6;
        }

        .dept-section-title {
          margin: 0 0 15px;
          color: var(--dept-green);
          font: 700 23px/1.3 Georgia, serif;
        }

        .dept-overview {
          margin: 0;
          color: #53645B;
          font-size: 14px;
          line-height: 1.9;
        }

        .dept-focus-panel {
          background: linear-gradient(145deg, #FFFFFF, #F7FBF7);
        }

        .dept-focus-list,
        .dept-training-list,
        .dept-facility-list {
          display: grid;
          gap: 13px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .dept-focus-list li,
        .dept-training-list li,
        .dept-facility-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #4B6055;
          font-size: 13px;
          line-height: 1.7;
        }

        .dept-check {
          flex: 0 0 auto;
          margin-top: 2px;
          color: #B18A20;
        }

        .dept-subheading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 17px;
          color: var(--dept-green);
          font: 700 20px/1.4 Georgia, serif;
        }

        .dept-subheading-icon {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          color: #9A710E;
          background: linear-gradient(145deg, #FFF3CE, #FFFFFF);
          border: 1px solid rgba(216,181,76,.35);
        }

        /* REVEAL ANIMATIONS */

        .dept-reveal {
          opacity: 0;
          filter: blur(5px);
          transition: opacity .75s ease, transform .75s cubic-bezier(.2,.75,.25,1), filter .75s ease;
        }

        .dept-reveal.from-bottom { transform: translateY(24px); }
        .dept-reveal.from-left { transform: translateX(-25px); }
        .dept-reveal.from-right { transform: translateX(25px); }

        .dept-reveal.dept-visible {
          opacity: 1;
          filter: blur(0);
          transform: translate(0, 0);
        }

        @keyframes dept-hero-in {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes dept-line-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes dept-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes dept-card-enter {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes dept-shimmer {
          from { transform: translateX(-110%); }
          to { transform: translateX(110%); }
        }

        @keyframes dept-detail-enter {
          from { opacity: 0; transform: translateY(13px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes dept-image-reveal {
          from { opacity: .55; transform: scale(1.035); }
          to { opacity: 1; transform: scale(1); }
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {
          .dept-container { width: min(100% - 38px, 760px); }
          .dept-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .dept-info-grid { grid-template-columns: 1fr; }
          .dept-banner-content { width: min(590px, 78%); }
        }

        @media (max-width: 600px) {
          .dept-page { padding-bottom: 48px; }

          .dept-hero {
            min-height: 230px;
            padding: 39px 22px;
            border-radius: 0 0 25px 25px;
          }

          .dept-hero h1 { font-size: clamp(30px, 8vw, 42px); }
          .dept-hero p { font-size: 13px; line-height: 1.7; }

          .dept-container {
            width: calc(100% - 28px);
            margin-top: 18px;
          }

          .dept-selector { padding: 15px; border-radius: 19px; }

          .dept-selector-heading {
            align-items: flex-start;
            gap: 10px;
          }

          .dept-selector-title { gap: 9px; }
          .dept-heading-icon { width: 34px; height: 34px; border-radius: 10px; }

          .dept-selector-heading h2 { font-size: 17px; }
          .dept-count { font-size: 9px; letter-spacing: .5px; padding-top: 10px; }

          .dept-grid { gap: 9px; }

          .dept-card {
            min-height: 100px;
            padding: 15px 10px;
            gap: 8px;
            flex-wrap: wrap;
          }

          .dept-card-icon { width: 40px; height: 40px; flex-basis: 40px; }
          .dept-card-text { width: 100%; flex-basis: 100%; padding-right: 2px; font-size: 12px; }
          .dept-card-number { top: 12px; right: 11px; font-size: 11px; }
          .dept-card-arrow { width: 23px; height: 23px; flex-basis: 23px; margin-left: auto; }

          .dept-detail { margin-top: 19px; }

          .dept-detail-banner {
            min-height: 310px;
            border-radius: 19px;
          }

          .dept-banner-content {
            width: 100%;
            min-height: 310px;
            justify-content: flex-end;
            padding: 24px;
          }

          .dept-detail-banner::after {
            background: linear-gradient(
              0deg,
              var(--banner-color) 0%,
              color-mix(in srgb, var(--banner-color) 92%, transparent) 43%,
              color-mix(in srgb, var(--banner-color) 38%, transparent) 68%,
              transparent 100%
            );
          }

          .dept-banner-content h2 { font-size: clamp(25px, 6vw, 34px); }
          .dept-banner-content p { font-size: 13px; line-height: 1.65; }

          .dept-info-grid,
          .dept-bottom-grid {
            grid-template-columns: 1fr;
            gap: 13px;
            margin-top: 13px;
          }

          .dept-side-stack { gap: 13px; }
          .dept-panel { border-radius: 17px; padding: 19px; }
          .dept-section-title { font-size: 20px; }
          .dept-lab-grid { gap: 9px; }
          .dept-lab-item h4 { font-size: 11px; }
        }

        @media (max-width: 420px) {
          .dept-hero { padding: 36px 19px; }
          .dept-hero p { font-size: 13px; }
          .dept-container { width: calc(100% - 22px); }
          .dept-selector { padding: 12px; }
          .dept-selector-title { gap: 8px; }
          .dept-selector-heading h2 { font-size: 17px; }
          .dept-count { font-size: 8px; }
          .dept-grid { gap: 8px; }
          .dept-card { min-height: 108px; padding: 11px 9px; }
          .dept-card-text { font-size: 11px; }
          .dept-banner-content { padding: 19px; }
          .dept-number-pill { margin-bottom: 15px; padding: 8px 12px; }
          .dept-lab-grid { grid-template-columns: 1fr; }
          .dept-lab-image-wrap { aspect-ratio: 16 / 8; }
          .dept-hod { align-items: flex-start; padding: 13px; }
          .dept-hod h3 { font-size: 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .dept-page *,
          .dept-page *::before,
          .dept-page *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }

          .dept-reveal {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <header className="dept-hero">
        <div className="dept-hero-content">
          <div className="dept-eyebrow">
            Madha College of Physiotherapy
          </div>

          <h1>
            Explore Our <span>Departments</span>
          </h1>

          <p>
            Specialised departments shaping future physiotherapists
            through academic excellence, clinical training and research.
          </p>

          <div className="dept-gold-line" />
        </div>
      </header>

      <div className="dept-container">
        {/* DEPARTMENT SELECTOR */}
        <section className="dept-selector dept-reveal from-bottom">
          <div className="dept-selector-heading">
            <div className="dept-selector-title">
              <div className="dept-heading-icon">
                <Building2 size={21} />
              </div>

              <h2>Choose a Specialization</h2>
            </div>

            <span className="dept-count">
              {String(departments.length).padStart(2, '0')} DEPARTMENTS
            </span>
          </div>

          <div className="dept-grid">
            {departments.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeDepartment === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`dept-card ${isActive ? 'active' : ''}`}
                  style={{ '--card-delay': `${index * 85}ms` } as React.CSSProperties}
                  onClick={() => selectDepartment(index)}
                  aria-pressed={isActive}
                  aria-label={`View ${item.title}`}
                >
                  <span className="dept-card-icon">
                    <Icon size={25} strokeWidth={1.8} />
                  </span>

                  <span className="dept-card-text">{item.cardTitle}</span>

                  <span className="dept-card-number">
                    {String(item.id).padStart(2, '0')}
                  </span>

                  <span className="dept-card-arrow">
                    <ArrowRight size={16} />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* SELECTED DEPARTMENT DETAILS */}
        <div className="dept-detail" key={`${department.id}-${detailKey}`}>
          <article
            className="dept-detail-banner"
            key={department.id}
            style={{ '--banner-color': department.bannerColor } as React.CSSProperties}
          >
            <img
              key={department.image}
              className="dept-detail-image"
              src={department.image}
              alt={department.title}
              onError={(event) => {
                event.currentTarget.style.opacity = '0';
              }}
            />

            <div className="dept-banner-content">
              <span className="dept-number-pill">
                DEPARTMENT {String(department.id).padStart(2, '0')}
              </span>

              <h2>{department.title}</h2>
              <p>{department.overview}</p>
              <span className="dept-banner-accent" />
            </div>
          </article>

          {/* OVERVIEW + FOCUS AREAS */}
          <div className="dept-info-grid">
            <article className="dept-panel dept-reveal from-left">
              <div className="dept-hod">
                <div className="dept-hod-icon">
                  <UserRound size={27} />
                </div>

                <div>
                  <p className="dept-hod-label">Head of Department</p>
                  <h3>{department.hod}</h3>
                  <p>{department.qualification}</p>
                </div>
              </div>

              <h3 className="dept-section-title">Department Overview</h3>

              <p className="dept-overview">{department.overview}</p>
            </article>

            <article className="dept-panel dept-focus-panel dept-reveal from-right">
              <h3 className="dept-section-title">Key Focus Areas</h3>

              <ul className="dept-focus-list">
                {department.focusAreas.map((area) => (
                  <li key={area}>
                    <CheckCircle2 className="dept-check" size={18} />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* TRAINING + FACILITIES */}
          <div className="dept-bottom-grid">
            <article className="dept-panel dept-reveal from-left">
              <h3 className="dept-subheading">
                <span className="dept-subheading-icon">
                  <GraduationCap size={20} />
                </span>
                Clinical Training & Learning
              </h3>

              <ul className="dept-training-list">
                {department.training.map((item) => (
                  <li key={item}>
                    <CheckCircle2 className="dept-check" size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="dept-subheading" style={{ marginTop: 26 }}>
                <span className="dept-subheading-icon">
                  <Stethoscope size={19} />
                </span>
                Department Facilities
              </h3>

              <ul className="dept-facility-list">
                {department.facilities.map((item) => (
                  <li key={item}>
                    <CheckCircle2 className="dept-check" size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}