
import React from "react";

const principal = {
  name: "Dr. D. Mythili",
  role: "Principal",
  college: "Madha College of Physiotherapy",
  image: "/managementand faculty/Dr D. Mythili.png",
};

const academicDetails = [
  {
    icon: "🎓",
    title: "Qualifications",
    items: [
      "BPT",
      "MPT (Physiotherapy)",
      "Ph.D. (Physiotherapy)",
    ],
  },
  {
    icon: "▣",
    title: "Professional Experience",
    items: [
      "Academic Leadership",
      "Clinical Expertise",
      "Research and Innovation",
    ],
  },
  {
    icon: "▤",
    title: "Areas of Interest",
    items: [
      "Musculoskeletal Physiotherapy",
      "Rehabilitation Sciences",
      "Student Development",
      "Clinical Research",
    ],
  },
];

const focusDetails = [
  {
    icon: "◎",
    title: "Vision",
    description:
      "To be a centre of excellence in physiotherapy education, research and community service.",
  },
  {
    icon: "◉",
    title: "Mission",
    description:
      "To develop competent and compassionate physiotherapists through quality education, clinical exposure and ethical practice.",
  },
  {
    icon: "♟",
    title: "Commitment",
    description:
      "Empowering students to create a healthier and more inclusive society through physiotherapy.",
  },
];

export default function Principal() {
  return (
    <main className="principal-page">
      <style>{`
        .principal-page {
          --forest: #003b2b;
          --forest-dark: #00251b;
          --forest-light: #07513a;
          --gold: #d9a83e;
          --gold-light: #ffda80;
          --cream: #fbf8f0;
          --text: #17231e;

          width: 100%;
          overflow: hidden;
          color: var(--text);
          background: var(--cream);
          font-family: Arial, Helvetica, sans-serif;
        }

        .principal-page *,
        .principal-page *::before,
        .principal-page *::after {
          box-sizing: border-box;
        }

        /* TOP PROFILE SECTION */
        .principal-hero {
          position: relative;
          isolation: isolate;
          display: grid;
          grid-template-columns: 300px 1fr;
          align-items: center;
          gap: 45px;
          min-height: 440px;
          padding: 45px 7%;
          color: #fff;
          background:
            radial-gradient(
              ellipse at 80% 30%,
              rgba(14, 92, 61, 0.35),
              transparent 50%
            ),
            linear-gradient(
              110deg,
              var(--forest-dark),
              var(--forest) 65%,
              #003324
            );
        }

        .principal-hero::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(
              90deg,
              rgba(0, 25, 17, 0.12),
              transparent 70%
            );
        }

        .principal-photo-frame {
          width: 100%;
          max-width: 290px;
          justify-self: center;
          overflow: hidden;
          border: 2px solid var(--gold);
          border-radius: 16px;
          background: var(--cream);
          box-shadow: 0 0 16px rgba(217, 168, 62, 0.17);
          transition:
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .principal-photo-frame:hover {
          border-color: var(--gold-light);
          box-shadow:
            0 0 12px rgba(255, 218, 128, 0.55),
            0 0 25px rgba(217, 168, 62, 0.18);
        }

        .principal-photo {
          display: block;
          width: 100%;
          height: 285px;
          object-fit: cover;
          object-position: center top;
        }

        .principal-photo-caption {
          padding: 13px 10px 15px;
          text-align: center;
          color: var(--forest-dark);
          background: linear-gradient(
            115deg,
            #e6bb59,
            #ffe5a0,
            #d5a13b
          );
        }

        .principal-photo-caption h2 {
          margin: 0 0 4px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
          line-height: 1.3;
          font-weight: 700;
        }

        .principal-photo-caption p {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
        }

        .principal-intro {
          min-width: 0;
          padding: 8px 0;
          border-left: 2px solid var(--gold);
          padding-left: 38px;
        }

        .principal-eyebrow {
          margin: 0 0 18px;
          color: var(--gold-light);
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .principal-title {
          margin: 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 4vw, 54px);
          line-height: 1.12;
          font-weight: 700;
        }

        .principal-title span {
          color: var(--gold-light);
        }
        .principal-qualifications {
  margin: 8px 0;
  color: #ffffff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
}
        .principal-role {
          margin: 8px 0 4px;
          color: var(--gold-light);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
          font-weight: 600;
        }

        .principal-college {
          margin: 0;
          color: #f0f2ed;
          font-size: 16px;
          line-height: 1.7;
        }

        .principal-quote {
          position: relative;
          max-width: 570px;
          margin: 27px 0 0;
          padding: 0 0 0 19px;
          border-left: 2px solid var(--gold);
          color: #f2ead7;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17px;
          font-style: italic;
          line-height: 1.65;
        }

        /* MAIN CONTENT */
        .principal-content {
          padding: 38px 6% 45px;
          background:
            radial-gradient(
              ellipse at top right,
              rgba(225, 190, 111, 0.08),
              transparent 55%
            ),
            var(--cream);
        }

        .principal-section {
          max-width: 1350px;
          margin: 0 auto 36px;
        }

        .principal-section:last-child {
          margin-bottom: 0;
        }

        .principal-section-heading {
          margin: 0;
          color: var(--forest);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(23px, 2.6vw, 30px);
          line-height: 1.35;
          font-weight: 700;
        }

        .principal-heading-underline {
          width: 70px;
          height: 3px;
          margin: 11px 0 17px;
          background: var(--gold);
        }

        .principal-message p {
          margin: 0 0 17px;
          color: #26312c;
          font-size: 16px;
          line-height: 1.8;
        }

        /* INFORMATION CARDS */
        .principal-card-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 17px;
        }

        .principal-info-card {
          min-width: 0;
          padding: 22px 19px;
          border: 1px solid rgba(217, 168, 62, 0.8);
          border-radius: 10px;
          background: linear-gradient(
            145deg,
            #fffdf7,
            #f8f1df
          );
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .principal-info-card:hover {
          transform: translateY(-3px);
          border-color: var(--gold);
          box-shadow: 0 8px 22px rgba(92, 66, 16, 0.12);
        }

        .principal-card-heading {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 17px;
        }

        .principal-card-icon {
          display: flex;
          flex: 0 0 54px;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          border: 1px solid var(--gold);
          border-radius: 50%;
          color: var(--forest);
          background: linear-gradient(
            145deg,
            #fff0be,
            #e7bc58
          );
          font-size: 25px;
          font-weight: 700;
        }

        .principal-card-heading h3 {
          margin: 0;
          color: var(--forest);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          line-height: 1.4;
        }

        .principal-card-rule {
          width: 38px;
          height: 2px;
          margin-top: 8px;
          background: var(--gold);
        }

        .principal-info-card ul {
          margin: 0;
          padding-left: 24px;
        }

        .principal-info-card li {
          margin: 7px 0;
          padding-left: 1px;
          color: #27322d;
          font-size: 14px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .principal-info-card li::marker {
          color: var(--gold);
        }

        .principal-focus-card p {
          margin: 0;
          padding-left: 67px;
          color: #27322d;
          font-size: 14px;
          line-height: 1.75;
        }

        /* RESPONSIVE */
        @media (min-width: 1500px) {
          .principal-hero {
            padding-right: max(7%, calc((100% - 1250px) / 2));
            padding-left: max(7%, calc((100% - 1250px) / 2));
          }
        }

        @media (max-width: 900px) {
          .principal-hero {
            grid-template-columns: 250px minmax(0, 1fr);
            gap: 28px;
            padding: 38px 5%;
          }

          .principal-photo-frame {
            max-width: 245px;
          }

          .principal-photo {
            height: 245px;
          }

          .principal-intro {
            padding-left: 25px;
          }

          .principal-title {
            font-size: 39px;
          }

          .principal-quote {
            font-size: 15px;
          }

          .principal-card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .principal-hero {
            grid-template-columns: 1fr;
            gap: 25px;
            padding: 32px 20px;
          }

          .principal-photo-frame {
            width: 220px;
            max-width: 100%;
          }

          .principal-photo {
            height: 220px;
          }

          .principal-photo-caption h2 {
            font-size: 21px;
          }

          .principal-intro {
            padding: 0 0 0 18px;
          }

          .principal-eyebrow {
            font-size: 10px;
            letter-spacing: 0.23em;
          }

          .principal-title {
            font-size: 34px;
          }

          .principal-role {
            font-size: 21px;
          }

          .principal-college {
            font-size: 14px;
          }

          .principal-quote {
            margin-top: 20px;
            font-size: 15px;
          }

          .principal-content {
            padding: 30px 18px 35px;
          }

          .principal-section {
            margin-bottom: 29px;
          }

          .principal-section-heading {
            font-size: 24px;
          }

          .principal-message p {
            font-size: 14px;
            line-height: 1.8;
          }

          .principal-card-grid {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .principal-info-card {
            padding: 19px 17px;
          }

          .principal-card-heading h3 {
            font-size: 18px;
          }

          .principal-focus-card p {
            padding-left: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .principal-photo-frame,
          .principal-info-card {
            transition: none;
          }

          .principal-info-card:hover {
            transform: none;
          }
        }
      `}</style>

      {/* Principal hero */}
      <section className="principal-hero">
        <div className="principal-photo-frame">
          <img
            className="principal-photo"
            src={principal.image}
            alt={principal.name}
          />

          <div className="principal-photo-caption">
            <h2>{principal.name}</h2>
            <p>{principal.role}</p>
            <p>{principal.college}</p>
          </div>
        </div>

        <div className="principal-intro">
          <p className="principal-eyebrow">Our Principal</p>

          <h1 className="principal-title">
            Dr. D. <span>Mythili</span>
          </h1>
<p className="principal-qualifications">
  MPT (Neuro.), MSc (Counsel. Psychol.), Ph.D., MIAP
</p>
          <p className="principal-role">{principal.role}</p>

          <p className="principal-college">{principal.college}</p>

          <blockquote className="principal-quote">
            “Education is not just about knowledge, but about
            shaping compassionate professionals who make a
            difference in society.”
          </blockquote>
        </div>
      </section>

      {/* Message and academic details */}
      <div className="principal-content">
        <section className="principal-section principal-message">
          <h2 className="principal-section-heading">
            A Message from the Principal
          </h2>

          <div className="principal-heading-underline" />

          <p>
            At Madha College of Physiotherapy, we are committed
            to nurturing compassionate, skilled and ethical
            physiotherapy professionals who can contribute
            meaningfully to the healthcare sector.
          </p>

          <p>
            Our focus is on academic excellence, clinical
            training, research and the holistic development of
            our students. We aim to create an environment where
            learning goes beyond the classroom, shaping
            confident and competent professionals for a
            healthier society.
          </p>
        </section>

        <section className="principal-section">
          <h2 className="principal-section-heading">
            Academic Profile &amp; Expertise
          </h2>

          <div className="principal-heading-underline" />

          <div className="principal-card-grid">
            {academicDetails.map((card) => (
              <article className="principal-info-card" key={card.title}>
                <div className="principal-card-heading">
                  <div className="principal-card-icon" aria-hidden="true">
                    {card.icon}
                  </div>

                  <div>
                    <h3>{card.title}</h3>
                    <div className="principal-card-rule" />
                  </div>
                </div>

                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="principal-section">
          <h2 className="principal-section-heading">Our Focus</h2>

          <div className="principal-heading-underline" />

          <div className="principal-card-grid">
            {focusDetails.map((card) => (
              <article
                className="principal-info-card principal-focus-card"
                key={card.title}
              >
                <div className="principal-card-heading">
                  <div className="principal-card-icon" aria-hidden="true">
                    {card.icon}
                  </div>

                  <div>
                    <h3>{card.title}</h3>
                    <div className="principal-card-rule" />
                  </div>
                </div>

                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
