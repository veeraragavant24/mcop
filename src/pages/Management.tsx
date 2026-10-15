
import { useState } from "react";

type ManagementMember = {
  name: string;
  role: string;
  image: string;
  experience: string;
  qualification: string;
  vision: string;
  bio: string;
  focus: string[];
};

const managementTeam: ManagementMember[] = [
  {
    name: "Dr. [Chairman's Name]",
    role: "Chairman",
    image: "/managementand faculty/image2.png",
    experience: "Institutional Leadership",
    qualification: "Academic and Institutional Leadership",
    vision: "Building excellence in healthcare education.",
    bio: "Add the chairman's official biography here, including leadership experience, contributions to the institution, and commitment to healthcare education.",
    focus: [
      "Institutional development",
      "Strategic leadership",
      "Healthcare education",
    ],
  },
  {
    name: "Dr. [Correspondent's Name]",
    role: "Correspondent",
    image: "/managementand faculty/image 1.png",
    experience: "Institutional Administration",
    qualification: "Academic and Administrative Leadership",
    vision: "Supporting quality education and student development.",
    bio: "Add the correspondent's official biography, administrative responsibilities, achievements, and contribution to the college.",
    focus: [
      "Institutional administration",
      "Academic development",
      "Student welfare",
    ],
  },
  {
    name: "Dr. [Secretary's Name]",
    role: "Secretary",
    image: "/managementand faculty/image3.png",
    experience: "Educational Management",
    qualification: "Institutional Management",
    vision: "Creating opportunities for professional growth.",
    bio: "Add the secretary's verified profile, professional background, institutional responsibilities, and vision for the college.",
    focus: [
      "Institutional planning",
      "Quality improvement",
      "Professional development",
    ],
  },
  
];

export default function Management() {
  const [selected, setSelected] =
    useState<ManagementMember | null>(null);

  return (
    <main className="management-page">
      <style>{`
        .management-page {
          --mg-forest: #073d2b;
          --mg-deep: #02281d;
          --mg-gold: #c5a34d;
          --mg-light-gold: #ffe6a0;
          --mg-cream: #faf7ed;

          min-height: 100vh;
          padding: 48px 5% 80px;
          color: var(--mg-forest);
          background:
            radial-gradient(
              ellipse at 50% 0%,
              #fffef9 0%,
              transparent 65%
            ),
            var(--mg-cream);
        }

        .management-page *,
        .management-page *::before,
        .management-page *::after {
          box-sizing: border-box;
        }

        .mg-heading {
          text-align: center;
          margin: 0 auto 45px;
          animation: mgFadeUp .7s ease both;
        }

        .mg-eyebrow {
          color: #987626;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .24em;
        }

        .mg-heading h1 {
          margin: 10px 0;
          color: var(--mg-forest);
          font-family: Georgia, serif;
          font-size: clamp(38px, 4vw, 58px);
        }

        .mg-heading p {
          max-width: 760px;
          margin: 12px auto;
          color: #53645a;
          font-size: 11px;
          line-height: 2;
          letter-spacing: .19em;
        }

        .mg-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: var(--mg-gold);
          font-size: 22px;
        }

        .mg-divider span {
          width: 65px;
          height: 1px;
          background: var(--mg-gold);
        }

        /* Original four-column layout */
        
/* Entire management card width */
.management-page .mg-grid {
  width: 100%;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 28px;
}

.management-page .mg-grid > article.mg-card {
  flex: 0 0 350px;
  width: 350px;
  max-width: 100%;
  min-width: 0;
}


        /* Original card size, border and colors */
        .mg-card {
          position: relative;
          min-width: 0;
          border: 1px solid var(--mg-gold);
          border-radius: 15px;
          color: white;
          background: var(--mg-forest);
          box-shadow: 0 6px 18px #073d2b18;
          animation: mgFadeUp .7s ease both;
          transition:
            box-shadow .35s ease,
            transform .35s ease;
        }

        .mg-card:hover {
          box-shadow:
            0 0 9px #c5a34d99,
            0 0 28px #c5a34d55,
            0 18px 35px #02281d30;
        }

        /*
          Flip container:
          its height is determined by the original front content.
          The back face does not affect card sizing.
        */
        .mg-card.mg-flip-card {
          perspective: 1200px;
          isolation: isolate;
          overflow: visible;
          padding: 0;
        }

        .mg-flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          min-width: 0;
          transform-style: preserve-3d;
          transition: transform .8s cubic-bezier(.2, .7, .2, 1);
          border-radius: 14px;
        }

        .mg-flip-card:hover .mg-flip-card-inner {
          transform: rotateY(180deg);
        }

        /* Both faces occupy the same card area */
        .mg-flip-card-front,
        .mg-flip-card-back {
          width: 100%;
          border-radius: 14px;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /*
          FRONT:
          This stays in normal document flow and determines
          the original card height.
        */
        .mg-flip-card-front {
          position: relative;
          z-index: 1;
          border-radius: 14px;
          background: linear-gradient(150deg, #084832, #02291e);
        }

        /* Original circular photo area */
        .mg-card-top {
          height: 175px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(
            ellipse at center bottom,
            #c5a34d28,
            transparent 70%
          );
        }

        .mg-photo-ring {
  position: relative;
  isolation: isolate;
  width: 170px;
  height: 170px;
  flex: 0 0 160px;
  margin-top: 45px; /* Moves the circle down */
  padding: 0;
  border: 1px solid var(--mg-gold);
  border-radius: 50%;
  background: linear-gradient(135deg, #fff0b0, #c5a34d);
  box-shadow: 0 0 16px #c5a34d35;
  transition: box-shadow .35s ease;
}
        .mg-photo-ring::before {
          content: "";
          position: absolute;
          inset: -2px;
          z-index: 2;
          padding: 3px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            #c5a34d 0deg,
            #c5a34d 250deg,
            #fff2b0 275deg,
            #ffffff 290deg,
            #ffd700 305deg,
            #c5a34d 325deg,
            #c5a34d 360deg
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          animation: mg-photo-golden-rotation 2.5s linear infinite;
        }

        .mg-photo-ring img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          border: 3px solid var(--mg-forest);
          border-radius: 50%;
          background: var(--mg-cream);
        }

       



.management-page .mg-card {
  border: 1px solid #C5A34D;
  transition:
    border-color 0.3s ease,
    box-shadow 0.4s ease;
}

.management-page .mg-card:hover {
  border-color: #F0D58A;
  box-shadow:
    0 0 22px 7px #D4AF3760,
    0 0 48px 14px #C5A34D40;
}


        .mg-card-content {
          min-height: 215px;
          padding: 8px 13px 22px;
          text-align: center;
        }

        .mg-card-content h2 {
          margin: 0 0 8px;
          color: var(--mg-light-gold);
          font-family: Georgia, serif;
          font-size: 19px;
          line-height: 1.4;
        }

        .mg-role {
          margin: 0 0 10px;
          color: #fff2d0;
          font-size: 14px;
        }

        .mg-experience {
          min-height: 34px;
          margin: 0 0 17px;
          color: #dce9e1;
          font-size: 12px;
          line-height: 1.6;
        }

       .mg-more {
  position: relative;
  z-index: 10;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  min-width: 155px;
  padding: 11px 20px;
  border: 1px solid var(--mg-gold);
  border-radius: 30px;
  color: #092c20;
  background: linear-gradient(
    110deg,
    #c59a3c,
    #ffe6a0,
    #c5a34d
  );
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  pointer-events: auto;
  touch-action: manipulation;
  transition: transform .25s, box-shadow .25s;
}

.mg-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 18px #ffdc7d77;
}

.mg-more:focus-visible {
  outline: 2px solid var(--mg-gold);
  outline-offset: 4px;
}
        /*
          BACK:
          Absolutely positioned, so it never changes
          the dimensions of the original card.
        */
        .mg-flip-card-back {
          position: absolute;
          inset: 0;
          z-index: 2;
          height: 100%;
          padding: 0;
          border: 1px solid var(--mg-gold);
          background: var(--mg-deep);
          transform: rotateY(180deg);
        }

        .mg-flip-card-back img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .mg-flip-card-back h3 {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          margin: 0;
          padding: 30px 12px 17px;
          color: var(--mg-light-gold);
          background: linear-gradient(
            to top,
            rgba(2, 40, 29, .96),
            transparent
          );
          font-family: Georgia, serif;
          font-size: 18px;
          line-height: 1.4;
          text-align: center;
          overflow-wrap: anywhere;
        }

        /* Profile popup */
        .mg-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 24px;
          background: #001b13c9;
          backdrop-filter: blur(9px);
          animation: mgFade .25s ease both;
        }

        .mg-profile {
          position: relative;
          display: grid;
          grid-template-columns:
            minmax(190px, .8fr)
            minmax(240px, 1.3fr)
            minmax(200px, .9fr);
          gap: 28px;
          align-items: center;
          width: 100%;
          max-width: 1120px;
          max-height: 88vh;
          overflow-y: auto;
          padding: 38px;
          border: 2px solid var(--mg-gold);
          border-radius: 20px;
          color: white;
          background: linear-gradient(135deg, #07442f, #02291e 80%);
          box-shadow:
            0 0 22px #c5a34d55,
            0 0 65px #c5a34d25;
          animation: mgModalIn .4s ease both;
        }

        .mg-close {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border: 1px solid #c5a34d99;
          border-radius: 50%;
          color: var(--mg-light-gold);
          background: transparent;
          font-size: 27px;
          cursor: pointer;
          transition: background .25s, color .25s, transform .25s;
        }

        .mg-close:hover {
          color: var(--mg-forest);
          background: var(--mg-light-gold);
          transform: rotate(90deg);
        }

        .mg-profile-photo {
          height: 320px;
          overflow: hidden;
          border: 2px solid var(--mg-gold);
          border-radius: 13px;
          background: var(--mg-deep);
        }

        .mg-profile-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .mg-profile-label {
          color: var(--mg-gold);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .2em;
        }

        .mg-profile-main h2 {
          margin: 10px 0 7px;
          color: var(--mg-light-gold);
          font-family: Georgia, serif;
          font-size: clamp(25px, 2.3vw, 34px);
          line-height: 1.25;
        }

        .mg-profile-main h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 500;
        }

        .mg-vision {
          margin: 12px 0 0;
          color: #ffedbd;
          font-style: italic;
          font-size: 13px;
          line-height: 1.7;
        }

        .mg-profile-divider {
          height: 1px;
          margin: 20px 0;
          background: linear-gradient(90deg, var(--mg-gold), #c5a34d15);
        }

        .mg-bio {
          margin: 0;
          color: #e4ece6;
          font-size: 13px;
          line-height: 1.9;
        }

        .mg-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 23px;
          height: 100%;
          padding-left: 22px;
          border-left: 1px solid #c5a34d77;
        }

        .mg-detail h4 {
          margin: 0 0 8px;
          color: var(--mg-light-gold);
          font-size: 14px;
        }

        .mg-detail p,
        .mg-detail li {
          color: #e4ece6;
          font-size: 12px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .mg-detail p {
          margin: 0;
        }

        .mg-detail ul {
          margin: 0;
          padding-left: 17px;
        }

        .mg-detail li::marker {
          color: var(--mg-gold);
        }

        @keyframes mg-photo-golden-rotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes mgFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes mgFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes mgModalIn {
          from { opacity: 0; transform: translateY(20px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 1100px) {
          .mg-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: 760px;
          }

          .mg-profile {
            grid-template-columns: 180px minmax(0, 1fr);
            gap: 22px;
            padding: 30px;
          }

          .mg-profile-photo {
            height: 260px;
          }

          .mg-details {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            height: auto;
            padding: 22px 0 0;
            border-left: 0;
            border-top: 1px solid #c5a34d77;
          }
        }

        @media (max-width: 600px) {
          .management-page {
            padding: 32px 18px 50px;
          }

          .mg-heading {
            margin-bottom: 30px;
          }

          .mg-heading p {
            font-size: 9px;
            letter-spacing: .12em;
          }

          .mg-grid {
            grid-template-columns: 1fr;
            max-width: 380px;
            gap: 20px;
          }

          .mg-backdrop {
            padding: 12px;
          }

          .mg-profile {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
            padding: 54px 20px 24px;
            max-height: 92vh;
          }

          .mg-profile-photo {
            height: 250px;
          }

          .mg-profile-main h2 {
            font-size: 27px;
          }

          .mg-details {
            display: flex;
            gap: 20px;
            padding-top: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mg-card,
          .mg-card::before,
          .mg-heading,
          .mg-backdrop,
          .mg-profile,
          .mg-photo-ring::before {
            animation: none;
          }

          .mg-card,
          .mg-more,
          .mg-photo-ring,
          .mg-flip-card-inner {
            transition: none;
          }
        }
         
      
/* Card layout */
.mg-card {
  position: relative;
  flex: 0 1 270px;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--mg-gold);
  border-radius: 15px;
  color: #fff;
  background: linear-gradient(150deg, #084832, #02291e);
  box-shadow: 0 6px 18px #073d2b18;
  animation: mgFadeUp 0.7s ease both;
  transition: box-shadow 0.35s ease;
}

.mg-card:hover {
  box-shadow: 0 0 18px #c5a34d55, 0 18px 35px #02281d30;
}

/* Upper section only: flip on hover */
.mg-flip-area {
  position: relative;
  height: 365px;
  perspective: 1000px;
  cursor: pointer;
  outline: none;
}

.mg-flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s ease;
}

.mg-flip-area:hover .mg-flip-inner,
.mg-flip-area:focus .mg-flip-inner {
  transform: rotateY(180deg);
}

/* Both faces share the same upper area */
.mg-flip-front,
.mg-flip-back {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 12px;
  overflow: hidden;
  border-radius: 14px 14px 0 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.mg-flip-front {
  background: linear-gradient(150deg, #084832, #02291e);
}

.mg-flip-back {
  transform: rotateY(180deg);
  padding: 0;
  background: var(--mg-deep);
}

.mg-flip-back img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.mg-flip-back-name {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 30px 10px 16px;
  color: var(--mg-light-gold);
  background: linear-gradient(
    transparent,
    rgba(2, 40, 29, 0.96)
  );
  font-family: Georgia, serif;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  overflow-wrap: anywhere;
}

/* Divider stays outside the flip area */
.mg-card-divider {
  height: 1px;
  margin: 0 18px;
  background: linear-gradient(
    90deg,
    transparent,
    #c5a34d,
    #ffe6a0,
    #c5a34d,
    transparent
  );
}

/* Fixed lower button section */
.mg-card-content {
  position: relative;
  z-index: 2;
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 12px;
  background: linear-gradient(150deg, #084832, #02291e);
}

.mg-more {
  position: relative;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 155px;
  padding: 11px 20px;
  border: 1px solid var(--mg-gold);
  border-radius: 30px;
  color: #092c20;
  background: linear-gradient(110deg, #c59a3c, #ffe6a0, #c5a34d);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  pointer-events: auto;
  touch-action: manipulation;
  transition: transform 0.25s, box-shadow 0.25s;
}

.mg-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 18px #ffdc7d77;
}

.mg-more:focus-visible {
  outline: 2px solid var(--mg-light-gold);
  outline-offset: 4px;
}

@media (max-width: 600px) {
  .mg-flip-area {
    height: 340px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mg-flip-inner,
  .mg-more {
    transition: none;
  }
}
  
/* Move content below the photo slightly down */
.management-page .mg-flip-front h2 {
  margin-top: 30px;
}

.management-page .mg-flip-front .mg-role {
  margin-top: 12px;
}

.management-page .mg-flip-front .mg-experience {
  margin-top: 15px;
}

  
`}</style>

      <header className="mg-heading">
        <span className="mg-eyebrow">
          MADHA COLLEGE OF PHYSIOTHERAPY
        </span>

        <h1>Our Management</h1>

        <p>
          LEADERSHIP, VISION AND COMMITMENT TO EXCELLENCE
          IN HEALTHCARE EDUCATION
        </p>

        <div className="mg-divider">
          <span />
          <i>✦</i>
          <span />
        </div>
      </header>

      <section className="mg-grid">
       {managementTeam.map((person, index) => (
  <article
    className="mg-card"
    key={person.role}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Only this upper section flips */}
    <div className="mg-flip-area" tabIndex={0}>
      <div className="mg-flip-inner">
        {/* Front: management details */}
        <div className="mg-flip-front">
          <div className="mg-photo-ring">
            <img src={person.image} alt={person.name} />
          </div>

          <h2>{person.name}</h2>
          <p className="mg-role">{person.role}</p>
          <p className="mg-experience">{person.experience}</p>
        </div>

        {/* Back: full-size image */}
        <div className="mg-flip-back">
          <img src={person.image} alt={person.name} />
          <div className="mg-flip-back-name">
            {person.name}
          </div>
        </div>
      </div>
    </div>

    {/* Thin gold divider; does not flip */}
    <div className="mg-card-divider" />

    {/* Button remains fixed and clickable */}
    <div className="mg-card-content">
      <button
        type="button"
        className="mg-more"
        onClick={() => setSelected(person)}
      >
        Know More <span aria-hidden="true">→</span>
      </button>
    </div>
  </article>
))}
      </section>

      {selected && (
        <div
          className="mg-backdrop"
          onClick={() => setSelected(null)}
        >
          <section
            className="mg-profile"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.role} profile`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="mg-close"
              aria-label="Close profile"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <div className="mg-profile-photo">
              <img src={selected.image} alt={selected.name} />
            </div>

            <div className="mg-profile-main">
              <span className="mg-profile-label">
                LEADERSHIP PROFILE
              </span>

              <h2>{selected.name}</h2>
              <h3>{selected.role}</h3>

              <p className="mg-vision">{selected.vision}</p>

              <div className="mg-profile-divider" />

              <p className="mg-bio">{selected.bio}</p>
            </div>

            <aside className="mg-details">
              <div className="mg-detail">
                <h4>Qualifications</h4>
                <p>{selected.qualification}</p>
              </div>

              <div className="mg-detail">
                <h4>Leadership Role</h4>
                <p>{selected.role}</p>
                <p>{selected.experience}</p>
              </div>

              <div className="mg-detail">
                <h4>Areas of Focus</h4>
                <ul>
                  {selected.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </section>
        </div>
      )}
    </main>
  );
}
