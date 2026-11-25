import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, BookOpen, ArrowRight, CheckCircle2, Clock, User, ChevronDown, Briefcase } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionTitle from '@/components/SectionTitle';
import { courses, mptSpecializations } from '@/data/content';
import ScrollReveal from '@/components/ScrollReveal';

interface CoursesProps {
  onEnquiryClick: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Award, BookOpen,
};

/* Flip panel: front = green card with icon + title, back = image only */
function CourseFlipPanel({
  name,
  image,
  Icon,
}: {
  name: string;
  image?: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const [flipped, setFlipped] = useState(false);

  const faceStyle: React.CSSProperties = {
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  };

  return (
    <div
      className="crs-flip"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setFlipped(false)}
      onClick={() => setFlipped((f) => !f)} // tap to flip on touch screens
    >
      <div
        className="crs-flip-inner"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT */}
        <div className="crs-flip-front" style={faceStyle}>
          <div className="crs-flip-icon-box">
            <Icon className="crs-flip-icon" />
          </div>

          <p className="crs-flip-label">Program</p>

          <h3 className="crs-flip-title">{name}</h3>
        </div>

        {/* BACK: image only */}
        <div
          className="crs-flip-back"
          style={{ ...faceStyle, transform: 'rotateY(180deg)' }}
        >
          {image && <img src={image} alt={name} className="crs-flip-img" />}
        </div>
      </div>
    </div>
  );
}

export default function Courses({ onEnquiryClick }: CoursesProps) {
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<string | null>(null);

  return (
    <div className="crs-page">
      <style>{`
        .crs-page {
          --forest-50: #EEF5F1;
          --forest-700: #164B38;
          --forest-800: #0F3B2C;
          --forest-900: #0A2E22;
          --gold-400: #E3C46A;
          --gold-500: #D8B54C;
          --gray-50: #F9FAFB;
          --gray-100: #F3F4F6;
          --gray-300: #D1D5DB;
          --gray-600: #4B5563;
        }

        .crs-page *,
        .crs-page *::before,
        .crs-page *::after {
          box-sizing: border-box;
        }

        .crs-page button { font: inherit; }

        /* ---------- HERO ---------- */

        .crs-hero > *:first-child {
          min-height: 420px;
          display: flex;
          align-items: center;
        }

        .crs-hero img {
          object-fit: cover;
          object-position: center;
        }

        @media (min-width: 768px) {
          .crs-hero > *:first-child { min-height: 560px; }
        }

        /* ---------- COURSE CARDS ---------- */

        .crs-white-section { background: #fff; }

        .crs-course-list > * + * { margin-top: 32px; }

        .crs-course-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 0;
          min-height: 650px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--gray-100);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1);
          transition: box-shadow .3s ease;
        }

        .crs-course-card:hover {
          box-shadow: 0 25px 50px -12px rgba(0,0,0,.25);
        }

        .crs-course-media {
          position: relative;
          min-height: 450px;
          background: var(--forest-700);
        }

        .crs-course-details {
          padding: 32px;
          background: #fff;
          height: 100%;
        }

        .crs-course-desc {
          margin: 0 0 24px;
          color: var(--gray-600);
          line-height: 1.625;
        }

        .crs-info-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .crs-info-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border-radius: 12px;
          background: var(--forest-50);
        }

        .crs-info-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--forest-700);
        }

        .crs-info-label {
          margin: 0;
          font-size: 12px;
          font-weight: 600;
          color: var(--forest-700);
          text-transform: uppercase;
          letter-spacing: .025em;
        }

        .crs-info-value {
          margin: 2px 0 0;
          font-size: 14px;
          color: var(--gray-600);
        }

        .crs-highlights { margin-bottom: 24px; }

        .crs-highlights-title {
          margin: 0 0 12px;
          font-size: 14px;
          font-weight: 600;
          color: var(--forest-800);
        }

        .crs-highlights-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 8px;
        }

        .crs-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 14px;
          color: var(--gray-600);
        }

        .crs-highlight-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--gold-500);
        }

        @media (min-width: 640px) {
          .crs-info-grid,
          .crs-highlights-grid,
          .crs-spec-grid,
          .crs-duration-grid,
          .crs-spec-highlights-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 768px) {
          .crs-course-details { padding: 40px; }
        }

        @media (min-width: 1024px) {
          .crs-course-card { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .crs-course-media { min-height: 100%; order: 1; }
          .crs-course-details { grid-column: span 2 / span 2; order: 2; }
          .crs-reverse .crs-course-media { order: 2; }
          .crs-reverse .crs-course-details { order: 1; }
        }

        /* ---------- FLIP PANEL ---------- */

        .crs-flip {
          position: absolute;
          inset: 0;
          cursor: pointer;
          perspective: 1000px;
        }

        .crs-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform .7s ease-in-out;
        }

        .crs-flip-front {
          position: absolute;
          inset: 0;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: var(--forest-700);
        }

        .crs-flip-back {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: var(--forest-700);
        }

        .crs-flip-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .crs-flip-icon-box {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border-radius: 16px;
          background: var(--gold-500);
        }

        .crs-flip-icon {
          width: 40px;
          height: 40px;
          color: var(--forest-900);
        }

        .crs-flip-label {
          margin: 0 0 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--gold-400);
          text-transform: uppercase;
          letter-spacing: .05em;
        }

        .crs-flip-title {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.375;
          color: #fff;
        }

        /* ---------- MPT SPECIALIZATIONS ---------- */

        .crs-mpt { background: var(--forest-700); }

        .crs-mpt-title h2 { color: #fff; }
        .crs-mpt-title p:last-of-type { color: var(--gray-300); }

               .crs-spec-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          max-width: 56rem;
          margin: 0 auto 40px;
        }

        @media (min-width: 768px) {
          .crs-spec-grid { gap: 24px; }
        }

        .crs-spec-btn {
          position: relative;
          overflow: hidden;
                   padding: 16px;
          text-align: left;
          cursor: pointer;
          border-radius: 16px;
          border: 2px solid var(--gray-100);
          background: #fff;
          color: var(--forest-800);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1);
          transition: all .3s ease;
        }

        .crs-spec-btn:focus { outline: none; }
        .crs-spec-btn:focus-visible { box-shadow: 0 0 0 4px rgba(216,181,76,.4); }

        .crs-spec-btn:hover {
          border-color: var(--gold-500);
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1);
        }

        .crs-spec-btn.is-selected {
          color: #fff;
          border-color: var(--gold-500);
          background: linear-gradient(135deg, var(--forest-800), var(--forest-900));
          transform: translateY(-4px);
          box-shadow: 0 25px 50px -12px rgba(0,0,0,.25);
        }

        .crs-spec-circle {
          position: absolute;
          top: -48px;
          right: -48px;
          width: 144px;
          height: 144px;
          border-radius: 50%;
          pointer-events: none;
          background: var(--forest-50);
          transition: all .5s ease;
        }

        .crs-spec-btn:hover .crs-spec-circle { transform: scale(1.25); }
        .crs-spec-btn.is-selected .crs-spec-circle { background: rgba(216,181,76,.2); }

        .crs-spec-content { position: relative; z-index: 10; }

                .crs-spec-icon-box {
          width: 40px;
          height: 40px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: var(--forest-50);
          box-shadow: 0 1px 2px rgba(0,0,0,.08);
          transition: all .3s ease;
        }

        .crs-spec-btn:hover .crs-spec-icon-box {
          background: var(--gold-500);
          transform: rotate(6deg) scale(1.1);
        }

        .crs-spec-btn.is-selected .crs-spec-icon-box { background: var(--gold-500); }

        .crs-spec-icon {
          width: 24px;
          height: 24px;
          color: var(--forest-700);
          transition: color .3s ease;
        }

        .crs-spec-btn:hover .crs-spec-icon,
        .crs-spec-btn.is-selected .crs-spec-icon { color: var(--forest-900); }

                .crs-spec-name {
          margin: 0 0 8px;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.375;
        }

        .crs-spec-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--forest-700);
        }

        .crs-spec-btn.is-selected .crs-spec-more { color: var(--gold-400); }

        .crs-spec-chevron {
          width: 16px;
          height: 16px;
          transition: transform .3s ease;
        }

        .crs-spec-btn:hover .crs-spec-chevron { transform: translateY(2px); }
        .crs-spec-btn.is-selected .crs-spec-chevron { transform: rotate(180deg); }

        .crs-spec-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          width: 0;
          background: var(--gold-500);
          transition: width .5s ease;
        }

        .crs-spec-btn:hover .crs-spec-bar,
        .crs-spec-btn.is-selected .crs-spec-bar { width: 100%; }

        @media (min-width: 768px) {
          .crs-spec-btn { padding: 20px; }
                              .crs-spec-icon-box { width: 44px; height: 44px; }
          .crs-spec-icon { width: 24px; height: 24px; }
          .crs-spec-name { font-size: 20px; }
          .crs-spec-more { font-size: 14px; }
        }

        /* ---------- SPECIALIZATION DETAIL CARD ---------- */

        .crs-detail {
          max-width: 64rem;
          margin: 0 auto;
          animation: crs-fade .4s ease both;
        }

        @keyframes crs-fade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .crs-detail-card {
          overflow: hidden;
          border-radius: 16px;
          background: #fff;
          border: 1px solid var(--gray-100);
          border-top: 4px solid var(--gold-500);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1);
        }

        .crs-detail-header {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: linear-gradient(90deg, var(--forest-700), var(--forest-900));
        }

        .crs-detail-circle {
          position: absolute;
          right: -40px;
          top: -64px;
          width: 176px;
          height: 176px;
          border-radius: 50%;
          pointer-events: none;
          background: rgba(216,181,76,.15);
        }

        .crs-detail-icon-box {
          position: relative;
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: var(--gold-500);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,.2);
        }

        .crs-detail-icon {
          width: 32px;
          height: 32px;
          color: var(--forest-900);
        }

        .crs-detail-head-text { position: relative; }

        .crs-detail-eyebrow {
          margin: 0 0 4px;
          font-size: 12px;
          font-weight: 600;
          color: var(--gold-400);
          text-transform: uppercase;
          letter-spacing: .1em;
        }

        .crs-detail-title {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
        }

        /* specialization image banner */
        .crs-spec-image {
          position: relative;
          height: 224px;
          overflow: hidden;
        }

        .crs-spec-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .crs-spec-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,46,34,.4), transparent);
        }

        .crs-detail-body { padding: 24px; }

        .crs-detail-section { margin-bottom: 28px; }

        .crs-detail-h4 {
          margin: 0 0 12px;
          font-size: 18px;
          font-weight: 700;
          color: var(--forest-800);
        }

        .crs-detail-text {
          margin: 0;
          font-size: 14px;
          line-height: 1.625;
          color: var(--gray-600);
        }

        .crs-duration-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .crs-duration-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 20px;
          border-radius: 12px;
          background: var(--forest-50);
        }

        .crs-duration-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          color: var(--forest-700);
        }

        .crs-duration-label {
          margin: 0 0 8px;
          font-size: 12px;
          font-weight: 700;
          color: var(--forest-700);
          text-transform: uppercase;
          letter-spacing: .025em;
        }

        .crs-duration-value {
          margin: 0;
          font-size: 14px;
          color: var(--gray-600);
        }

        .crs-spec-highlights-title {
          margin: 0 0 16px;
          font-size: 18px;
          font-weight: 700;
          color: var(--forest-800);
        }

        .crs-spec-highlights-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 12px;
        }

        .crs-spec-highlight {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          background: var(--gray-50);
          border-left: 4px solid var(--gold-500);
          transition: all .2s ease;
        }

        .crs-spec-highlight:hover {
          background: var(--forest-50);
          transform: translateX(4px);
        }

        .crs-spec-highlight-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--gold-500);
        }

        .crs-spec-highlight span {
          font-size: 14px;
          line-height: 1.625;
          color: var(--gray-600);
        }

        .crs-careers { margin-top: 28px; }

        .crs-careers-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .crs-career-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: var(--forest-50);
          border: 1px solid rgba(22,75,56,.1);
          font-size: 14px;
          font-weight: 500;
          color: var(--forest-800);
          transition: all .2s ease;
        }

        .crs-career-chip:hover {
          background: var(--forest-700);
          color: #fff;
          border-color: var(--forest-700);
        }

        .crs-career-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          color: var(--gold-500);
        }

        .crs-close-row {
          margin-top: 28px;
          text-align: right;
        }

        .crs-close-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          background: var(--forest-700);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s ease;
        }

        .crs-close-btn:hover { background: var(--forest-800); }

        @media (min-width: 768px) {
          .crs-detail-header { padding: 32px; }
          .crs-detail-title { font-size: 24px; }
          .crs-spec-image { height: 288px; }
          .crs-detail-body { padding: 32px; }
        }

        /* ---------- ADMISSION PROCESS ---------- */

        .crs-admission { background: #FFF8E7; }

        .crs-steps-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 24px;
        }

        @media (min-width: 768px) {
          .crs-steps-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }

        .crs-step { position: relative; }

        .crs-step-card {
          height: 100%;
          padding: 28px;
          border-radius: 16px;
          background: #fff;
          transition: box-shadow .3s ease;
        }

        .crs-step-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1);
        }

        .crs-step-num {
          margin-bottom: 12px;
          font-size: 36px;
          font-weight: 700;
          line-height: 1.1;
          color: rgba(216,181,76,.5);
          transition: color .3s ease;
        }

        .crs-step-card:hover .crs-step-num { color: var(--gold-500); }

        .crs-step-title {
          margin: 0 0 8px;
          font-weight: 700;
          color: var(--forest-800);
        }

        .crs-step-desc {
          margin: 0;
          font-size: 14px;
          line-height: 1.625;
          color: var(--gray-600);
        }

        .crs-center-row {
          margin-top: 40px;
          text-align: center;
        }

        /* ---------- CTA ---------- */

        .crs-cta {
          padding: 64px 0;
          background: var(--forest-700);
        }

        .crs-cta-inner { text-align: center; }

        .crs-cta-title {
          margin: 0 0 12px;
          font-size: 24px;
          font-weight: 700;
          color: #fff;
        }

        .crs-cta-text {
          max-width: 36rem;
          margin: 0 auto 24px;
          color: var(--gray-300);
        }

        @media (min-width: 768px) {
          .crs-cta-title { font-size: 30px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .crs-page *,
          .crs-page *::before,
          .crs-page *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="crs-hero">
        <PageHeader
          title="Courses"
          subtitle="Comprehensive physiotherapy programs designed to build competent, confident, and compassionate professionals."
          image="/course/coursehero.png"
          breadcrumbs={[{ label: 'Courses' }]}
        />
      </div>

      {/* Course cards */}
      <section className="section-padding crs-white-section">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="Programs Offered"
            title="Our Physiotherapy Programs"
            description="From undergraduate foundations to advanced specialization and doctoral research, our programs cover the full spectrum of physiotherapy education."
          />

          <div className="crs-course-list">
            {courses.map((course, index) => {
              const Icon = iconMap[course.icon] ?? BookOpen;
              const isEven = index % 2 === 0;

              return (
                <ScrollReveal
                  key={course.id}
                  direction={isEven ? 'left' : 'right'}
                  className="w-full"
                >
                  <div className={`crs-course-card ${isEven ? '' : 'crs-reverse'}`}>
                    {/* Left: flip panel */}
                    <div className="crs-course-media">
                      <CourseFlipPanel
                        name={course.name}
                        image={course.image}
                        Icon={Icon}
                      />
                    </div>

                    {/* Right: Details */}
                    <div className="crs-course-details">
                      <p className="crs-course-desc">{course.description}</p>

                      <div className="crs-info-grid">
                        <div className="crs-info-box">
                          <Clock className="crs-info-icon" />
                          <div>
                            <p className="crs-info-label">Duration</p>
                            <p className="crs-info-value">{course.duration}</p>
                          </div>
                        </div>

                        <div className="crs-info-box">
                          <User className="crs-info-icon" />
                          <div>
                            <p className="crs-info-label">Eligibility</p>
                            <p className="crs-info-value">{course.eligibility}</p>
                          </div>
                        </div>
                      </div>

                      <div className="crs-highlights">
                        <p className="crs-highlights-title">Program Highlights</p>

                        <div className="crs-highlights-grid">
                          {course.highlights.map((highlight) => (
                            <div key={highlight} className="crs-highlight-item">
                              <CheckCircle2 className="crs-highlight-icon" />
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      <button onClick={onEnquiryClick} className="btn-primary">
                        Apply for Admission <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MPT Specializations */}
      <section className="section-padding crs-mpt">
        <div className="container-mcp">
          <div className="crs-mpt-title">
            <SectionTitle
              eyebrow="MPT Specializations"
              title="Areas of Specialization"
              description="Explore our postgraduate specialization areas designed to develop advanced clinical knowledge, research skills and professional expertise."
            />
          </div>

          {/* Specialization Buttons - 2 x 2 */}
          <div className="crs-spec-grid">
            {mptSpecializations.map((spec) => {
              const isSelected = selectedSpecialization === spec.id;

              return (
                <button
                  key={spec.id}
                  onClick={() =>
                    setSelectedSpecialization(isSelected ? null : spec.id)
                  }
                  aria-pressed={isSelected}
                  className={`crs-spec-btn ${isSelected ? 'is-selected' : ''}`}
                >
                  {/* Decorative corner circle */}
                  <span aria-hidden="true" className="crs-spec-circle" />

                  {/* Content */}
                  <div className="crs-spec-content">
                    <div className="crs-spec-icon-box">
                      <Award className="crs-spec-icon" />
                    </div>

                    <h3 className="crs-spec-name">{spec.name}</h3>

                    <div className="crs-spec-more">
                      {isSelected ? 'Selected' : 'View Details'}
                      <ChevronDown className="crs-spec-chevron" />
                    </div>
                  </div>

                  {/* Animated bottom accent bar */}
                  <span aria-hidden="true" className="crs-spec-bar" />
                </button>
              );
            })}
          </div>

          {/* Selected Specialization Details */}
          {selectedSpecialization && (
            <div className="crs-detail">
              {mptSpecializations
                .filter((spec) => spec.id === selectedSpecialization)
                .map((spec) => {
                  const mptCourse = courses.find((course) => course.id === 'mpt');

                  return (
                    <div key={spec.id} className="crs-detail-card">
                      {/* Card Header */}
                      <div className="crs-detail-header">
                        <span aria-hidden="true" className="crs-detail-circle" />
                        <div className="crs-detail-icon-box">
                          <Award className="crs-detail-icon" />
                        </div>

                        <div className="crs-detail-head-text">
                          <p className="crs-detail-eyebrow">MPT Specialization</p>
                          <h3 className="crs-detail-title">{spec.name}</h3>
                        </div>
                      </div>

                      {/* Specialization Image */}
                      {spec.image && (
                        <div className="crs-spec-image">
                          <img src={spec.image} alt={spec.name} />
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="crs-detail-body">
                        {/* Description */}
                        <div className="crs-detail-section">
                          <h4 className="crs-detail-h4">Course Description</h4>
                          <p className="crs-detail-text">{spec.description}</p>
                        </div>

                        {/* Duration and Eligibility */}
                        <div className="crs-duration-grid">
                          <div className="crs-duration-box">
                            <Clock className="crs-duration-icon" />
                            <div>
                              <p className="crs-duration-label">Duration</p>
                              <p className="crs-duration-value">{mptCourse?.duration}</p>
                            </div>
                          </div>

                          <div className="crs-duration-box">
                            <User className="crs-duration-icon" />
                            <div>
                              <p className="crs-duration-label">Eligibility</p>
                              <p className="crs-duration-value">{mptCourse?.eligibility}</p>
                            </div>
                          </div>
                        </div>

                        {/* Program Highlights */}
                        <div>
                          <h4 className="crs-spec-highlights-title">Program Highlights</h4>

                          <div className="crs-spec-highlights-grid">
                            {spec.highlights.map((highlight) => (
                              <div key={highlight} className="crs-spec-highlight">
                                <CheckCircle2 className="crs-spec-highlight-icon" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Career Opportunities */}
                        {spec.careers && spec.careers.length > 0 && (
                          <div className="crs-careers">
                            <h4 className="crs-spec-highlights-title">Career Opportunities</h4>

                            <div className="crs-careers-list">
                              {spec.careers.map((career) => (
                                <span key={career} className="crs-career-chip">
                                  <Briefcase className="crs-career-icon" />
                                  {career}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Close Button */}
                        <div className="crs-close-row">
                          <button
                            onClick={() => setSelectedSpecialization(null)}
                            className="crs-close-btn"
                          >
                            Close Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>

      {/* Admission process */}
      <section className="section-padding crs-admission">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="How to Join"
            title="Admission Process"
            description="A clear, structured process to guide prospective students from application to enrollment."
          />

          <div className="crs-steps-grid">
            {[
              { step: '01', title: 'Submit Enquiry', desc: 'Express your interest through our admission enquiry form or contact the admissions office directly.' },
              { step: '02', title: 'Verify Eligibility', desc: 'Our team will verify that you meet the eligibility criteria for your chosen program.' },
              { step: '03', title: 'Entrance Assessment', desc: 'Participate in the entrance assessment and personal interview as part of the selection process.' },
              { step: '04', title: 'Enrollment', desc: 'Complete the enrollment formalities and begin your journey in physiotherapy education.' },
            ].map((item) => (
              <div key={item.step} className="crs-step">
                <div className="crs-step-card">
                  <div className="crs-step-num">{item.step}</div>
                  <h3 className="crs-step-title">{item.title}</h3>
                  <p className="crs-step-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="crs-center-row">
            <button onClick={onEnquiryClick} className="btn-primary">
              Start Your Application <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="crs-cta">
        <div className="container-mcp crs-cta-inner">
          <h2 className="crs-cta-title">Have Questions About Our Programs?</h2>
          <p className="crs-cta-text">
            Our admissions team is ready to help you find the right program and guide you through the application process.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Admissions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}