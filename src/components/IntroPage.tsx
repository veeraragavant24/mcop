import { useEffect } from 'react';

interface IntroPageProps {
  onComplete: () => void;
}

export default function IntroPage({ onComplete }: IntroPageProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 4000);

    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <>
      <style>{`
        .mc-intro {
          --mc-green: #103D2E;
          --mc-gold: #D8B54C;
          --mc-light-gold: #FFE9A0;

          position: fixed;
          inset: 0;
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 50% 38%, rgba(23, 94, 67, .7), transparent 48%),
            linear-gradient(135deg, #061d16 0%, #103D2E 52%, #062219 100%);
          color: #fff;
          animation: mcIntroAppear .5s ease both;
          font-family: Georgia, 'Times New Roman', serif;
        }

        .mc-intro *,
        .mc-intro *::before,
        .mc-intro *::after {
          box-sizing: border-box;
        }

        .mc-intro__glow {
          position: absolute;
          width: min(62vw, 650px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(216,181,76,.12), transparent 68%);
          animation: mcGlow 3s ease-in-out infinite alternate;
          pointer-events: none;
        }

        



.mc-intro__ring {
  position: absolute;
  top: 19%;
  left: 50%;
  width: clamp(175px, 19vw, 230px);
  aspect-ratio: 1;
  border: 1px solid #E8C65A;
  border-radius: 50%;
  box-shadow:
    0 0 8px rgba(216, 181, 76, 0.85),
    0 0 18px rgba(216, 181, 76, 0.55),
    0 0 36px rgba(216, 181, 76, 0.25),
    inset 0 0 10px rgba(216, 181, 76, 0.16);
  transform: translate(-50%, -50%) scale(0.92);
  opacity: 0;
  animation:
    mcRingReveal 1s 0.15s ease-out forwards,
    mcGoldenPulse 2.8s 1.2s ease-in-out infinite;
  pointer-events: none;
}

.mc-intro__ring::before {
  content: '';
  position: absolute;
  inset: 7px;
  border: 1px solid rgba(255, 222, 120, 0.9);
  border-radius: 50%;
  box-shadow:
    0 0 7px rgba(255, 222, 120, 0.75),
    0 0 16px rgba(216, 181, 76, 0.3);
}


.mc-intro__ring::after {
  content: none;
}


@keyframes mcGoldenPulse {
  0%, 100% {
    filter: brightness(0.9);
    box-shadow:
      0 0 6px rgba(216, 181, 76, 0.5),
      0 0 16px rgba(216, 181, 76, 0.3),
      inset 0 0 8px rgba(216, 181, 76, 0.1);
  }
  50% {
    filter: brightness(1.3);
    box-shadow:
      0 0 10px rgb(255, 221, 120),
      0 0 24px rgba(216, 181, 76, 0.7),
      0 0 42px rgba(216, 181, 76, 0.3),
      inset 0 0 12px rgba(216, 181, 76, 0.22);
  }
}






        .mc-intro__content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: min(92%, 900px);
          padding: 30px 16px 76px;
          text-align: center;
        }

        

.mc-intro__logo-wrap {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Adjust the white logo circle */
  width: 200px;
  height: 200px;
  aspect-ratio: 1;
  margin-top: 0;
  margin-bottom: 24px;
  padding: 8px;

  overflow: hidden;
  border: 2px solid #D8B54C;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 20px rgba(216, 181, 76, 0.2);
}



       

.mc-intro__logo {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 0;
  flex-shrink: 0;
}



        .mc-intro__eyebrow {
          margin: 0 0 10px;
          color: var(--mc-light-gold);
          font: 600 11px/1.5 Arial, sans-serif;
          letter-spacing: .32em;
          text-transform: uppercase;
          opacity: 0;
          animation: mcTextReveal .65s .85s ease forwards;
        }

        .mc-intro__title {
          margin: 0;
          color: #fff;
          font-size: clamp(24px, 4.1vw, 52px);
          font-weight: 500;
          line-height: 1.12;
          letter-spacing: .045em;
          text-wrap: balance;
          opacity: 0;
          animation: mcTextReveal .7s 1s ease forwards;
        }

        .mc-intro__title span {
          display: block;
          margin-top: 3px;
          color: var(--mc-gold);
          font-size: clamp(31px, 5.8vw, 76px);
          font-weight: 700;
          letter-spacing: .025em;
          text-shadow: 0 0 22px rgba(216,181,76,.12);
        }

        .mc-intro__divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: min(80%, 490px);
          margin: 21px 0 14px;
          opacity: 0;
          animation: mcTextReveal .6s 1.5s ease forwards;
        }

        .mc-intro__divider::before,
        .mc-intro__divider::after {
          content: '';
          height: 1px;
          flex: 1;
          background: linear-gradient(90deg, transparent, var(--mc-gold));
        }

        .mc-intro__divider::after {
          background: linear-gradient(90deg, var(--mc-gold), transparent);
        }

        .mc-intro__diamond {
          width: 9px;
          height: 9px;
          border: 1px solid var(--mc-light-gold);
          transform: rotate(45deg);
          box-shadow: 0 0 10px rgba(216,181,76,.4);
        }

        .mc-intro__tagline {
          margin: 0;
          color: #f7f1df;
          font-size: clamp(16px, 2.3vw, 25px);
          font-style: italic;
          line-height: 1.5;
          opacity: 0;
          animation: mcTextReveal .7s 1.65s ease forwards;
        }

        .mc-intro__descriptor {
          margin: 13px 0 0;
          color: rgba(255,255,255,.68);
          font: 10px/1.8 Arial, sans-serif;
          letter-spacing: .22em;
          text-transform: uppercase;
          opacity: 0;
          animation: mcTextReveal .7s 1.9s ease forwards;
        }

        .mc-intro__loader {
          position: absolute;
          bottom: 35px;
          left: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: min(230px, 55vw);
          transform: translateX(-50%);
        }

        .mc-intro__loader-label {
          color: var(--mc-light-gold);
          font: 9px/1.4 Arial, sans-serif;
          letter-spacing: .25em;
          text-transform: uppercase;
        }

        .mc-intro__track {
          width: 100%;
          height: 3px;
          overflow: hidden;
          border-radius: 10px;
          background: rgba(255,255,255,.17);
        }

        .mc-intro__progress {
          width: 0;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--mc-gold), var(--mc-light-gold));
          box-shadow: 0 0 9px rgba(216,181,76,.5);
          animation: mcProgress 4s linear forwards;
        }

        .mc-intro__skip {
          position: absolute;
          right: clamp(18px, 3.2vw, 48px);
          bottom: 30px;
          z-index: 4;
          padding: 9px 0;
          border: 0;
          border-bottom: 1px solid rgba(216,181,76,.75);
          background: transparent;
          color: var(--mc-light-gold);
          font: 11px Arial, sans-serif;
          letter-spacing: .12em;
          cursor: pointer;
          transition: color .25s ease, border-color .25s ease;
        }

        .mc-intro__skip:hover {
          color: #fff;
          border-color: #fff;
        }

        .mc-intro__skip:focus-visible {
          outline: 2px solid var(--mc-gold);
          outline-offset: 5px;
        }

        @keyframes mcIntroAppear {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes mcGlow {
          from { opacity: .5; transform: scale(.94); }
          to { opacity: 1; transform: scale(1.06); }
        }

        @keyframes mcRingReveal {
          to { opacity: 1; transform: translateX(-50%) scale(1); }
        }

        @keyframes mcLogoReveal {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes mcTextReveal {
          from { opacity: 0; transform: translateY(13px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes mcProgress {
          from { width: 0; }
          to { width: 100%; }
        }

        @media (max-height: 650px) {
          .mc-intro__content { padding-top: 14px; padding-bottom: 58px; }
          .mc-intro__logo-wrap { width: 88px; margin-bottom: 12px; }
          .mc-intro__ring { top: 8%; width: 120px; }
          .mc-intro__divider { margin: 12px 0 8px; }
          .mc-intro__descriptor { margin-top: 7px; }
          .mc-intro__loader { bottom: 15px; }
          .mc-intro__skip { bottom: 12px; }
        }

        @media (max-width: 520px) {
          .mc-intro__content { padding-bottom: 90px; }
          .mc-intro__eyebrow { font-size: 9px; letter-spacing: .2em; }
          .mc-intro__title { font-size: clamp(22px, 6vw, 32px); }
          .mc-intro__title span { font-size: clamp(29px, 8vw, 43px); }
          .mc-intro__descriptor { max-width: 290px; font-size: 8px; letter-spacing: .12em; }
          .mc-intro__skip { right: 50%; bottom: 12px; transform: translateX(50%); }
          .mc-intro__loader { bottom: 54px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mc-intro *,
          .mc-intro *::before,
          .mc-intro *::after {
            animation-duration: .01ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>

      <section
        className="mc-intro"
        aria-label="Madha College of Physiotherapy introduction"
      >
        <div className="mc-intro__glow" aria-hidden="true" />
        <div className="mc-intro__ring" aria-hidden="true" />

        <div className="mc-intro__content">
          <div className="mc-intro__logo-wrap">
            <img
              className="mc-intro__logo"
              src="/logos/mdch-logo (1).png"
              alt="Madha College of Physiotherapy logo"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <p className="mc-intro__eyebrow">
            Heal · Move · Empower
          </p>

          <h1 className="mc-intro__title">
            MADHA COLLEGE OF
            <span>PHYSIOTHERAPY</span>
          </h1>

          <div className="mc-intro__divider" aria-hidden="true">
            <span className="mc-intro__diamond" />
          </div>

          <p className="mc-intro__tagline">
            Empowering Movement. Transforming Lives.
          </p>

          <p className="mc-intro__descriptor">
            Excellence in Physiotherapy Education and Rehabilitation
          </p>
        </div>

        <div className="mc-intro__loader" aria-hidden="true">
          <span className="mc-intro__loader-label">
            Welcome to Madha
          </span>
          <div className="mc-intro__track">
            <div className="mc-intro__progress" />
          </div>
        </div>

        <button
          type="button"
          className="mc-intro__skip"
          onClick={onComplete}
          aria-label="Skip introduction and enter website"
        >
          SKIP INTRO →
        </button>
      </section>
    </>
  );
}