import { useState } from "react";

type ManagementMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

const managementTeam: ManagementMember[] = [
  {
    name: "Dr. Dr.Ln.S.Peter",
    role: "Chancellor",
    image: "/managementand faculty/image2.png",
    bio: `Dr. Ln. S. Peter is one of the early pioneers in the field of education in Tamil Nadu. His educational journey began with the establishment of an Engineering College in the year 1995 under the Soosaiya Peter Educational Trust.

Under his visionary leadership, the Madha Group expanded into several prestigious educational institutions covering Medicine, Dentistry, Physiotherapy, Nursing, Management, Arts & Science along with CBSE and Matriculation schools.

His commitment towards quality education, discipline, innovation and social responsibility has helped thousands of students achieve academic excellence and successful careers across various professional fields.

Through his inspiring vision and dedication, Madha Group has become one of the leading educational organizations in Tamil Nadu, continuously striving to create future professionals with knowledge, ethics and leadership qualities.`,
  },
 
  {
    name: "Dr. Ms. Mercy Florence Peter",
    role: "Vice Chancellor",
    image: "/managementand faculty/image3.png",
    bio: `Ms. Mercy Florence Peter is an engineer by profession, having completed her Undergraduate Degree in Electronics and Communication Engineering.

She earned her Post Graduate Degree (MS) in Management Information Systems from the New Jersey Institute of Technology, USA.

With her international academic exposure and modern leadership approach, she actively contributes to the strategic growth and academic excellence of Madha Group of Academic Institutions.

She is committed to promoting innovation, quality education, digital transformation and holistic student development while strengthening the institution's vision for future generations.`,
  },
   {
    name: "Dr. Mr. Ajay Ravindra Kumar",
    role: "Managing Director",
    image: "/managementand faculty/image 1.png",
    bio: `Mr. Ajay Ravindra Kumar was one of the early employees of Tesla Inc., California, USA, where he worked during the company's start-up years and gained valuable experience in engineering, innovation and technology.

He holds an Undergraduate Degree in Electronics and Communication Engineering and a Post Graduate Degree (MS) in Information Technology Management from the University of Texas at Dallas, USA.

During his tenure at Tesla, he was part of the Engineering Team involved in the development of Tesla's revolutionary vehicle programs including the Roadster, Model S and Model X.

He has also completed his Bachelor's Degree in Law (LL.B) from The Tamil Nadu Dr. Ambedkar Law University. His leadership combines global industrial expertise, innovation and strategic vision to further strengthen Madha Group's commitment to world-class education.`,
  },
];

export default function Management() {
  const [selected, setSelected] = useState<ManagementMember | null>(null);

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
            radial-gradient(ellipse at 50% 0%, #fffef9 0%, transparent 65%),
            var(--mg-cream);
        }

        .management-page *,
        .management-page *::before,
        .management-page *::after {
          box-sizing: border-box;
        }

        /* Heading */
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

        /* Card grid */
        .management-page .mg-grid {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
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

        .management-page .mg-card {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--mg-gold);
          border-radius: 15px;
          color: #fff;
          background: linear-gradient(150deg, #084832, #02291e);
          box-shadow: 0 6px 18px #073d2b18;
          animation: mgFadeUp .7s ease both;
          transition: border-color .3s ease, box-shadow .4s ease;
        }

        .management-page .mg-card:hover {
          border-color: #f0d58a;
          box-shadow:
            0 0 22px 7px #d4af3760,
            0 0 48px 14px #c5a34d40;
        }

        /* Upper section flips on hover */
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
          transition: transform .7s ease;
        }

        .mg-flip-area:hover .mg-flip-inner,
        .mg-flip-area:focus .mg-flip-inner {
          transform: rotateY(180deg);
        }

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
          text-align: center;
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
          background: linear-gradient(transparent, rgba(2, 40, 29, .96));
          font-family: Georgia, serif;
          font-size: 17px;
          font-weight: bold;
          text-align: center;
          overflow-wrap: anywhere;
        }

        .mg-flip-back-role {
          display: block;
          margin-top: 4px;
          color: #fff2d0;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          font-weight: 500;
        }

        /* Circular photo with rotating gold ring */
        .mg-photo-ring {
          position: relative;
          isolation: isolate;
          width: 170px;
          height: 170px;
          flex: 0 0 170px;
          margin-top: 45px;
          padding: 0;
          border: 1px solid var(--mg-gold);
          border-radius: 50%;
          background: linear-gradient(135deg, #fff0b0, #c5a34d);
          box-shadow: 0 0 16px #c5a34d35;
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
          animation: mgRing 2.5s linear infinite;
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

        /* Name and designation on the card front */
        .management-page .mg-flip-front h2 {
          margin: 30px 0 0;
          color: var(--mg-light-gold);
          font-family: Georgia, serif;
          font-size: 19px;
          line-height: 1.4;
        }

        .management-page .mg-flip-front .mg-role {
          margin: 0;
          color: #fff2d0;
          font-size: 14px;
          font-weight: 600;
        }

        /* Divider and button */
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
          touch-action: manipulation;
          transition: transform .25s, box-shadow .25s;
        }

        .mg-more:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 18px #ffdc7d77;
        }

        .mg-more:focus-visible {
          outline: 2px solid var(--mg-light-gold);
          outline-offset: 4px;
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
          grid-template-columns: minmax(220px, .8fr) minmax(0, 2fr);
          gap: 28px;
          align-items: start;
          width: 100%;
          max-width: 1120px;
          max-height: 88vh;
          overflow-y: auto;
          padding: 38px;
          border: 2px solid var(--mg-gold);
          border-radius: 20px;
          color: #fff;
          background: linear-gradient(135deg, #07442f, #02291e 80%);
          box-shadow: 0 0 22px #c5a34d55, 0 0 65px #c5a34d25;
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
          padding-right: 40px;
          color: var(--mg-light-gold);
          font-family: Georgia, serif;
          font-size: clamp(25px, 2.3vw, 34px);
          line-height: 1.25;
          overflow-wrap: anywhere;
        }

        .mg-profile-main h3 {
          margin: 0;
          color: #fff2d0;
          font-size: 16px;
          font-weight: 600;
        }

        .mg-profile-divider {
          height: 1px;
          margin: 20px 0;
          background: linear-gradient(90deg, var(--mg-gold), #c5a34d15);
        }

        .mg-bio {
          margin: 0 0 12px;
          color: #e4ece6;
          font-size: 13px;
          line-height: 1.9;
          overflow-wrap: anywhere;
        }

        /* Animations */
        @keyframes mgRing {
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

        /* Tablet */
        @media (max-width: 1100px) {
          .mg-profile {
            grid-template-columns: 180px minmax(0, 1fr);
            gap: 22px;
            padding: 30px;
          }

          .mg-profile-photo {
            height: 260px;
          }
        }

        /* Mobile */
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

          .mg-flip-area {
            height: 340px;
          }

          .management-page .mg-backdrop {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            overflow: hidden;
          }

          .management-page .mg-profile {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            max-width: 390px;
            max-height: 92dvh;
            overflow-x: hidden;
            overflow-y: auto;
            overscroll-behavior: contain;
            padding: 20px 16px 14px;
            border: 2px solid #d8b54c;
            border-radius: 22px;
            background:
              radial-gradient(ellipse at top, rgba(17, 100, 67, .32), transparent 48%),
              linear-gradient(155deg, #06452f, #02291e 80%);
            box-shadow:
              0 0 0 1px rgba(255, 230, 160, .15),
              0 0 24px rgba(212, 175, 55, .22),
              0 18px 50px rgba(0, 0, 0, .35);
            scrollbar-width: thin;
            scrollbar-color: #c5a34d #02291e;
          }

          .management-page .mg-close {
            position: sticky;
            top: 0;
            align-self: flex-end;
            flex-shrink: 0;
            margin: -8px -7px 4px 0;
            width: 36px;
            height: 36px;
            color: #ffe6a0;
            background: #033526;
            border: 1px solid #d8b54c;
          }

          .management-page .mg-profile-photo {
            flex: 0 0 auto;
            width: min(78%, 230px);
            height: clamp(145px, 24dvh, 190px);
            margin: 0 auto 17px;
            border: 3px solid #d8b54c;
            border-radius: 17px;
            background: #02291e;
            box-shadow:
              0 0 0 1px rgba(255, 230, 160, .35),
              0 0 17px rgba(212, 175, 55, .24);
          }

          .management-page .mg-profile-photo img {
            object-position: center 25%;
          }

          .management-page .mg-profile-main {
            width: 100%;
            min-width: 0;
            text-align: center;
          }

          .management-page .mg-profile-label {
            display: block;
            margin-bottom: 8px;
            color: #e5bd58;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 2.4px;
          }

          .management-page .mg-profile-main h2 {
            margin: 0 0 5px;
            padding-right: 0;
            font-size: clamp(21px, 6vw, 27px);
          }

          .management-page .mg-profile-main h3 {
            font-family: Georgia, serif;
            color: #fff8e8;
          }

          .management-page .mg-profile-divider {
            margin: 14px 0;
            background: linear-gradient(90deg, transparent, #d8b54c, transparent);
          }

          .management-page .mg-bio {
            margin: 0 0 12px;
            color: #e7eee9;
            font-size: 12px;
            line-height: 1.75;
            text-align: left;
          }
        }

        @media (max-width: 360px) {
          .management-page .mg-profile {
            padding: 16px 12px 10px;
            border-radius: 18px;
          }

          .management-page .mg-profile-photo {
            width: 76%;
            height: 140px;
          }

          .management-page .mg-profile-main h2 {
            font-size: 21px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mg-card,
          .mg-heading,
          .mg-backdrop,
          .mg-profile,
          .mg-photo-ring::before {
            animation: none;
          }

          .mg-flip-inner,
          .mg-more,
          .mg-close,
          .management-page .mg-card {
            transition: none;
          }
        }
      `}</style>

      <header className="mg-heading">
        <span className="mg-eyebrow">MADHA COLLEGE OF PHYSIOTHERAPY</span>

        <h1>Our Management</h1>

        <p>
          LEADERSHIP, VISION AND COMMITMENT TO EXCELLENCE IN HEALTHCARE
          EDUCATION
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
                {/* Front: photo, name and designation */}
                <div className="mg-flip-front">
                  <div className="mg-photo-ring">
                    <img src={person.image} alt={person.name} />
                  </div>

                  <h2>{person.name}</h2>
                  <p className="mg-role">{person.role}</p>
                </div>

                {/* Back: full-size image */}
                <div className="mg-flip-back">
                  <img src={person.image} alt={person.name} />
                  <div className="mg-flip-back-name">
                    {person.name}
                    <span className="mg-flip-back-role">{person.role}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mg-card-divider" />

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
        <div className="mg-backdrop" onClick={() => setSelected(null)}>
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
              <span className="mg-profile-label">LEADERSHIP PROFILE</span>

              <h2>{selected.name}</h2>
              <h3>{selected.role}</h3>

              <div className="mg-profile-divider" />

              {selected.bio.split("\n\n").map((paragraph, i) => (
                <p className="mg-bio" key={i}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
