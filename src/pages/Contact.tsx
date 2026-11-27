
import { useEffect, useRef, useState } from "react";
import {
  MapPin, Phone, Mail, ArrowRight, Send,
  GraduationCap, CheckCircle2, Clock,
  ChevronRight, Globe, ShieldCheck
} from "lucide-react";
/* ===== Gold balls animation (lives in this file) ===== */

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  m: number;
  flash: number;
};

function GoldBalls({ count = 8 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const parent = canvas?.parentElement;
    if (!canvas || !ctx || !parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const balls: Ball[] = Array.from({ length: count }, () => {
      const r = 10 + Math.random() * 22;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.2;
      return {
        x: r + Math.random() * Math.max(1, width - r * 2),
        y: r + Math.random() * Math.max(1, height - r * 2),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r,
        m: r * r,
        flash: 0,
      };
    });

    const update = () => {
      for (const b of balls) {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx); }
        if (b.x + b.r > width) { b.x = width - b.r; b.vx = -Math.abs(b.vx); }
        if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy); }
        if (b.y + b.r > height) { b.y = height - b.r; b.vy = -Math.abs(b.vy); }

        b.flash = Math.max(0, b.flash - 0.03);
      }

      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i];
          const b = balls[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minDist = a.r + b.r;

          if (dist === 0 || dist >= minDist) continue;

          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = minDist - dist;
          const total = a.m + b.m;

          a.x -= nx * overlap * (b.m / total);
          a.y -= ny * overlap * (b.m / total);
          b.x += nx * overlap * (a.m / total);
          b.y += ny * overlap * (a.m / total);

          const vn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (vn < 0) {
            const impulse = (-2 * vn) / (1 / a.m + 1 / b.m);
            a.vx -= (impulse * nx) / a.m;
            a.vy -= (impulse * ny) / a.m;
            b.vx += (impulse * nx) / b.m;
            b.vy += (impulse * ny) / b.m;
            a.flash = 1;
            b.flash = 1;
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const b of balls) {
        const gradient = ctx.createRadialGradient(
          b.x - b.r * 0.35,
          b.y - b.r * 0.35,
          b.r * 0.1,
          b.x,
          b.y,
          b.r
        );
        gradient.addColorStop(0, "#FFF1B0");
        gradient.addColorStop(0.45, "#E3BE5A");
        gradient.addColorStop(1, "#9A6A00");

        ctx.save();
        ctx.globalAlpha = 0.5 + b.flash * 0.45;
        ctx.shadowColor = "rgba(240, 207, 112, 0.9)";
        ctx.shadowBlur = 12 + b.flash * 28;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const loop = () => {
      update();
      draw();
      raf = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
const cards = [
  {
    icon: MapPin,
    title: "Visit Our Campus",
    text: "Meet our team and explore our campus.",
    detail: "Madha College of Physiotherapy"
  },
  {
    icon: Phone,
    title: "Call Our Team",
    text: "We are happy to assist with your enquiries.",
    detail: "+91 91576 51234",
    href: "tel:+919157651234"
  },
  {
    icon: Mail,
    title: "Email Enquiries",
    text: "Get in touch for admission information.",
    detail: "College Admissions Office"
  }
];

export default function ContactDemo() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef<HTMLElement>(null);

 
useEffect(() => {
  const elements = document.querySelectorAll(".demo-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("demo-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}, []);


  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSuccess(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Frontend-only demo. No API request is made.
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: ""
      });
    }, 700);
  };

  return (
    <main className="premium-contact" ref={pageRef}>
      <style>{`
        .premium-contact {
          --green: #103d2e;
          --deep: #082b20;
          --gold: #d8b54c;
          --gold-light: #f1cf62;
          --cream: #f8f7f1;
          --muted: #718078;
          color: #183a2f;
          background: white;
          font-family: inherit;
          overflow: hidden;
        }

        .premium-contact * {
          box-sizing: border-box;
        }

        .pd-container {
          width: min(1180px, 91%);
          margin: auto;
        }

        .pd-eyebrow {
          color: #bd9839;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .pd-title {
          font-family: Georgia, serif;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -.7px;
        }

        .pd-gold-line {
          width: 65px;
          height: 4px;
          border-radius: 5px;
          background: var(--gold);
          margin: 22px 0;
        }

/* =================================
   PREMIUM SCROLL REVEAL ANIMATIONS
================================= */

.demo-reveal {
  opacity: 0;
  transition:
    opacity 1.1s ease,
    transform 1.2s cubic-bezier(.2,.75,.25,1);
  will-change: opacity, transform;
}

.demo-from-left {
  transform: translate3d(-75px, 15px, 0);
}

.demo-from-right {
  transform: translate3d(75px, 15px, 0);
}

.demo-from-bottom {
  transform: translate3d(0, 45px, 0);
}

.demo-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  will-change: auto;
}

/* =================================
   CONTACT CARD HOVER ANIMATION
================================= */

.pd-card {
  position: relative;
  overflow: hidden;
  transition:
    transform .45s cubic-bezier(.2,.7,.2,1),
    box-shadow .45s ease,
    border-color .4s ease,
    background .4s ease;
}

.pd-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: -110%;
  width: 65%;
  height: 100%;
  background: linear-gradient(
    110deg,
    transparent,
    rgba(216,181,76,.10),
    transparent
  );
  transition: left .7s ease;
  pointer-events: none;
}

.pd-card:hover {
  transform: translateY(-9px);
  border-color: #d8b54c;
  box-shadow:
    0 20px 45px rgba(16,61,46,.15),
    0 5px 15px rgba(216,181,76,.12);
}

.pd-card:hover::after {
  left: 130%;
}

.pd-card .pd-icon {
  transition:
    transform .45s cubic-bezier(.2,.7,.2,1),
    background .4s ease,
    box-shadow .4s ease;
}

.pd-card:hover .pd-icon {
  transform: translateY(-4px) rotate(-6deg);
  background: #082b20;
  box-shadow: 0 8px 18px rgba(8,43,32,.2);
}

/* =================================
   FORM AND LOCATION HOVER
================================= */

.pd-form-box,
.pd-location {
  transition:
    transform .45s ease,
    box-shadow .45s ease,
    border-color .4s ease;
}

.pd-form-box:hover,
.pd-location:hover {
  border-color: rgba(216,181,76,.65);
  box-shadow: 0 22px 50px rgba(16,61,46,.11);
}

/* =================================
   REDUCED MOTION ACCESSIBILITY
================================= */

@media (prefers-reduced-motion: reduce) {
  .demo-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .pd-card,
  .pd-card *,
  .pd-form-box,
  .pd-location {
    transition: none !important;
  }

  .pd-card:hover,
  .pd-card:hover .pd-icon {
    transform: none;
  }
}

        /* HERO */

        .pd-hero {
          position: relative;
          isolation: isolate;
          min-height: 390px;
          display: flex;
          align-items: center;
          padding: 75px 0;
          overflow: hidden;
          color: white;
          background:
            radial-gradient(
              circle at 82% 25%,
              rgba(216,181,76,.19),
              transparent 30%
            ),
            linear-gradient(
              115deg,
              #06271c,
              #103d2e 65%,
              #20533e
            );
        }

        .pd-hero::before {
          content: "";
          position: absolute;
          z-index: -1;
          width: 430px;
          height: 430px;
          right: -110px;
          top: -230px;
          border: 1px solid rgba(241,207,98,.3);
          border-radius: 50%;
          box-shadow:
            0 0 0 35px rgba(241,207,98,.025),
            0 0 0 75px rgba(241,207,98,.025);
        }

        .pd-hero::after {
          content: "";
          position: absolute;
          z-index: -1;
          width: 300px;
          height: 300px;
          bottom: -220px;
          left: 35%;
          border: 1px solid rgba(241,207,98,.2);
          border-radius: 50%;
        }
          /* keeps the hero text above the animated balls */
.pd-hero .pd-container {
  position: relative;
  z-index: 1;
}

        .pd-hero h1 {
          margin: 15px 0;
          font-size: clamp(43px, 6vw, 68px);
          color: white;
        }

        .pd-hero-copy {
          max-width: 590px;
          color: #d7e5dc;
          font-size: 15px;
          line-height: 1.9;
        }

        .pd-breadcrumb {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #d6e2da;
          font-size: 12px;
        }

        .pd-breadcrumb span:last-child {
          color: var(--gold-light);
        }

        .pd-hero-bottom {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 25px;
          color: #e6e9df;
          font-size: 12px;
        }

        .pd-hero-bottom svg {
          color: var(--gold-light);
        }

        /* INTRO */

        .pd-intro {
          padding: 76px 0 35px;
          text-align: center;
        }

        .pd-intro h2 {
          color: var(--green);
          font-size: clamp(28px, 4vw, 39px);
          margin: 13px 0;
        }

        .pd-intro .pd-gold-line {
          margin: 20px auto;
        }

        .pd-intro p {
          max-width: 670px;
          margin: auto;
          color: var(--muted);
          line-height: 1.9;
          font-size: 14px;
        }

        /* CARDS */

        .pd-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          padding: 28px 0 85px;
        }

        .pd-card {
          position: relative;
          padding: 32px 27px;
          border: 1px solid #e7e9df;
          border-radius: 13px;
          background: white;
          box-shadow: 0 8px 28px rgba(16,61,46,.045);
          transition: .4s ease;
        }

        .pd-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 25px;
          width: 42px;
          height: 3px;
          background: var(--gold);
          transition: width .4s ease;
        }

        .pd-card:hover {
          transform: translateY(-9px);
          border-color: var(--gold);
          box-shadow: 0 18px 40px rgba(16,61,46,.12);
        }

        .pd-card:hover::before {
          width: 75px;
        }

        .pd-icon {
          width: 55px;
          height: 55px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: var(--gold-light);
          background: var(--green);
          margin-bottom: 24px;
          transition: .35s ease;
        }

        .pd-card:hover .pd-icon {
          transform: rotate(-5deg);
          background: var(--deep);
        }

        .pd-card h3 {
          font-size: 18px;
          color: var(--green);
          margin: 0 0 10px;
        }

        .pd-card p {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.8;
          min-height: 46px;
        }

        .pd-card a,
        .pd-card strong {
          color: #a27c21;
          font-size: 13px;
          text-decoration: none;
        }

        /* MAIN SECTION */

        .pd-main {
          padding: 80px 0;
          background: #f6f8f4;
          border-block: 1px solid #e9eee7;
        }

        .pd-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          align-items: stretch;
        }

        /* FORM */

        .pd-form-box {
          padding: 38px;
          background: white;
          border: 1px solid #e6ebe4;
          border-radius: 16px;
          box-shadow: 0 15px 45px rgba(16,61,46,.07);
        }

        .pd-form-box h2 {
          color: var(--green);
          font-size: 30px;
          margin: 10px 0;
        }

        .pd-form-subtitle {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.8;
          margin-bottom: 28px;
        }

        .pd-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 19px;
        }

        .pd-field {
          display: flex;
          flex-direction: column;
          gap: 9px;
          min-width: 0;
        }

        .pd-field.full {
          grid-column: 1 / -1;
        }

        .pd-field label {
          color: var(--green);
          font-size: 12px;
          font-weight: 700;
        }

        .pd-field input,
        .pd-field select,
        .pd-field textarea {
          width: 100%;
          padding: 13px 14px;
          border: 1px solid #dfe7df;
          border-radius: 7px;
          outline: none;
          background: #fafbf8;
          color: var(--green);
          font: inherit;
          font-size: 13px;
          transition: .3s ease;
        }

        .pd-field input,
        .pd-field select {
          min-height: 47px;
        }

        .pd-field textarea {
          height: 115px;
          resize: vertical;
        }

        .pd-field input:focus,
        .pd-field select:focus,
        .pd-field textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 4px rgba(216,181,76,.13);
          background: white;
        }

        .pd-field input::placeholder,
        .pd-field textarea::placeholder {
          color: #a3aea6;
        }

        .pd-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 50px;
          border: 0;
          border-radius: 7px;
          background: linear-gradient(120deg, #d8b54c, #f1cf62);
          color: var(--deep);
          font-weight: 800;
          font-size: 13px;
          cursor: pointer;
          transition: .3s ease;
        }

        .pd-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(216,181,76,.3);
        }

        .pd-submit:disabled {
          opacity: .65;
          cursor: wait;
        }

        .pd-success {
          grid-column: 1 / -1;
          display: flex;
          align-items: flex-start;
          gap: 9px;
          padding: 13px;
          border-radius: 7px;
          color: #17623d;
          background: #effaf3;
          font-size: 13px;
          line-height: 1.6;
        }

        .pd-assurance {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          color: var(--muted);
          font-size: 11px;
        }

        .pd-assurance svg {
          color: #a17c27;
        }

        /* LOCATION */

        .pd-location {
          padding: 34px;
          border-radius: 16px;
          border: 1px solid #e6ebe4;
          background: white;
          box-shadow: 0 15px 45px rgba(16,61,46,.06);
        }

        .pd-location-heading {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }

        .pd-location-heading .pd-icon {
          width: 48px;
          height: 48px;
          margin: 0;
          flex-shrink: 0;
        }

        .pd-location-heading h3 {
          margin: 0 0 7px;
          color: var(--green);
          font-family: Georgia, serif;
          font-size: 23px;
        }

        .pd-location-heading p {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .pd-map {
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid #e0e8df;
        }

        .pd-map iframe {
          display: block;
          width: 100%;
          height: 340px;
          border: 0;
        }

        .pd-location-info {
          display: flex;
          gap: 12px;
          margin-top: 18px;
          padding: 16px;
          border-radius: 9px;
          background: #f3f7f0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .pd-location-info svg {
          flex-shrink: 0;
          color: #a17c27;
        }

        /* BOTTOM STRIP */

        .pd-bottom {
          padding: 38px 0;
          background: var(--deep);
          color: white;
        }

        .pd-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .pd-bottom h3 {
          margin: 0 0 7px;
          font-family: Georgia, serif;
          font-size: 23px;
        }

        .pd-bottom p {
          margin: 0;
          color: #cad8ce;
          font-size: 12px;
          line-height: 1.8;
        }

        .pd-bottom-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--gold-light);
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }

        .pd-bottom-link:hover {
          gap: 15px;
        }

        @media(max-width: 850px) {
          .pd-main-grid {
            grid-template-columns: 1fr;
          }

          .pd-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media(max-width: 560px) {
          .pd-container {
            width: 90%;
          }

          .pd-hero {
            min-height: 340px;
            padding: 55px 0;
          }

          .pd-hero h1 {
            font-size: 43px;
          }

          .pd-intro {
            padding-top: 50px;
          }

          .pd-cards {
            grid-template-columns: 1fr;
            gap: 15px;
            padding-bottom: 55px;
          }

          .pd-card {
            padding: 26px;
          }

          .pd-main {
            padding: 48px 0;
          }

          .pd-form-box,
          .pd-location {
            padding: 24px 18px;
          }

          .pd-form {
            grid-template-columns: 1fr;
          }

          .pd-field.full {
            grid-column: auto;
          }

          .pd-form-box h2 {
            font-size: 26px;
          }

          .pd-map iframe {
            height: 280px;
          }

          .pd-bottom-inner {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media(prefers-reduced-motion: reduce) {
          .premium-contact *,
          .premium-contact *::before,
          .premium-contact *::after {
            transition-duration: .01ms !important;
            animation-duration: .01ms !important;
          }

          .demo-reveal {
            opacity: 1;
            transform: none;
          }
        }


/* =========================================
   SLOW & SMOOTH SCROLL REVEAL ANIMATIONS
========================================= */

.premium-contact .demo-reveal {
  opacity: 0;
  transition:
    opacity 1.5s ease,
    transform 1.7s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

/* Cards enter from alternate directions */

.premium-contact .demo-from-left {
  transform: translate3d(-90px, 20px, 0);
}

.premium-contact .demo-from-right {
  transform: translate3d(90px, 20px, 0);
}

/* Other page content fades upward */

.premium-contact .demo-from-bottom {
  transform: translate3d(0, 55px, 0);
}

/* Final revealed position */

.premium-contact .demo-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  will-change: auto;
}

/* =========================================
   SLOW PREMIUM CARD HOVER EFFECT
========================================= */

.premium-contact .pd-card {
  position: relative;
  transition:
    transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.75s ease,
    border-color 0.65s ease,
    background 0.65s ease;
}

.premium-contact .pd-card:hover {
  transform: translateY(-10px);
  border-color: #d8b54c;

  box-shadow:
    0 24px 50px rgba(16, 61, 46, 0.16),
    0 8px 20px rgba(216, 181, 76, 0.13);
}

/* Gold shine animation */

.premium-contact .pd-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: -110%;
  width: 65%;
  height: 100%;

  background: linear-gradient(
    110deg,
    transparent,
    rgba(216, 181, 76, 0.12),
    transparent
  );

  transition: left 1s ease;
  pointer-events: none;
}

.premium-contact .pd-card:hover::after {
  left: 130%;
}

/* Icon hover */

.premium-contact .pd-card .pd-icon {
  transition:
    transform 0.7s ease,
    background 0.65s ease,
    box-shadow 0.65s ease;
}

.premium-contact .pd-card:hover .pd-icon {
  transform: translateY(-5px) rotate(-6deg);
  background: #082b20;
  box-shadow: 0 10px 22px rgba(8, 43, 32, 0.22);
}

/* Form and location hover */

.premium-contact .pd-form-box,
.premium-contact .pd-location {
  transition:
    transform 0.7s ease,
    box-shadow 0.7s ease,
    border-color 0.65s ease;
}

.premium-contact .pd-form-box:hover,
.premium-contact .pd-location:hover {
  transform: translateY(-5px);
  border-color: rgba(216, 181, 76, 0.65);
  box-shadow: 0 24px 50px rgba(16, 61, 46, 0.12);
}

/* Accessibility */

@media (prefers-reduced-motion: reduce) {
  .premium-contact .demo-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .premium-contact .pd-card,
  .premium-contact .pd-form-box,
  .premium-contact .pd-location {
    transition: none !important;
  }

  .premium-contact .pd-card:hover,
  .premium-contact .pd-form-box:hover,
  .premium-contact .pd-location:hover {
    transform: none;
  }
}

      `}</style>

      {/* HERO */}
      <section className="pd-hero">
          <GoldBalls count={8} />

        <div className="pd-container demo-reveal">
          <div className="pd-breadcrumb">
            <span>Home</span>
            <ChevronRight size={13} />
            <span>Contact Us</span>
          </div>

          <p className="pd-eyebrow" style={{marginTop: 35}}>
            MADHA COLLEGE OF PHYSIOTHERAPY
          </p>

          <h1 className="pd-title">Let's Connect.</h1>

          <div className="pd-gold-line" />

          <p className="pd-hero-copy">
            Every great journey begins with a conversation.
            Connect with us to explore your future in
            physiotherapy and discover the opportunities
            waiting for you.
          </p>

          <div className="pd-hero-bottom">
            <GraduationCap size={20} />
            Your future in healthcare starts here.
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="pd-intro demo-reveal">
        <div className="pd-container">
          <span className="pd-eyebrow">WE ARE HERE FOR YOU</span>
          <h2 className="pd-title">
            We'd Love to Hear From You
          </h2>
          <div className="pd-gold-line" />
          <p>
            Whether you are exploring our academic programmes,
            seeking admission guidance, or simply want to
            know more about our institution, our team is
            always ready to help.
          </p>
        </div>
      </section>



      {/* FORM AND LOCATION */}
      <section className="pd-main">
        <div className="pd-container pd-main-grid">

          <div className="pd-form-box demo-reveal">
            <span className="pd-eyebrow">GET IN TOUCH</span>

            <h2 className="pd-title">
              Admission Enquiry
            </h2>

            <p className="pd-form-subtitle">
              Tell us a little about yourself. Our team will
              be happy to guide you through the next steps.
            </p>

            <form className="pd-form" onSubmit={submit}>
              <div className="pd-field">
                <label>Full Name *</label>
                <input
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => update("name", e.target.value)}
                />
              </div>

              <div className="pd-field">
                <label>Email Address *</label>
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => update("email", e.target.value)}
                />
              </div>

              <div className="pd-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Your contact number"
                  value={form.phone}
                  onChange={e => update("phone", e.target.value)}
                />
              </div>

              <div className="pd-field">
                <label>Programme</label>
                <select
                  value={form.course}
                  onChange={e => update("course", e.target.value)}
                >
                  <option value="">Select programme</option>
                  <option value="BPT">Bachelor of Physiotherapy</option>
                  <option value="MPT">Master of Physiotherapy</option>
                  <option value="Other">Other Enquiry</option>
                </select>
              </div>

              <div className="pd-field full">
                <label>Your Message *</label>
                <textarea
                  required
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={e => update("message", e.target.value)}
                />
              </div>

              {success && (
                <div className="pd-success" role="status">
                  <CheckCircle2 size={19}/>
                  Your demo enquiry has been submitted successfully.
                  No data was sent to the college.
                </div>
              )}

              <div className="pd-field full">
                <button
                  className="pd-submit"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Please wait..." : "Send Your Enquiry"}
                  <Send size={16}/>
                </button>
              </div>
            </form>

            <div className="pd-assurance">
              <ShieldCheck size={16}/>
              Your information is treated with care.
            </div>
          </div>

          {/* LOCATION */}
          <div className="pd-location demo-reveal">
            <div className="pd-location-heading">
              <div className="pd-icon">
                <GraduationCap size={23}/>
              </div>
              <div>
                <h3>Visit Our Campus</h3>
                <p>
                  We look forward to welcoming you.
                </p>
              </div>
            </div>

            <div className="pd-map">
              <iframe
                title="Madha College of Physiotherapy map"
                src="https://www.google.com/maps?q=Madha%20College%20of%20Physiotherapy&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="pd-location-info">
              <MapPin size={19}/>
              <span>
                Madha College of Physiotherapy.
                Please verify the campus location
                before travelling.
              </span>
            </div>
          </div>

        </div>
      </section>
            {/* CONTACT CARDS */}
      <section className="pd-container">
        <div className="pd-cards">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              
<article
  key={card.title}
  className={`pd-card demo-reveal ${
    index % 2 === 0
      ? "demo-from-left"
      : "demo-from-right"
  }`}
  style={{
    transitionDelay: `${index * 150}ms`,
  }}
>
  <div className="pd-icon">
    <Icon size={24} />
  </div>

  <h3>{card.title}</h3>
  <p>{card.text}</p>

  {card.href ? (
    <a href={card.href}>
      {card.detail} <ArrowRight size={13} />
    </a>
  ) : (
    <strong>{card.detail}</strong>
  )}
</article>

            );
          })}
        </div>
      </section>

   
    </main>
  );
}
