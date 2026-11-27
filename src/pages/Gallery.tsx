import { galleryItems } from '@/data/galleryData';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

type GalleryPhoto = {
  id: string | number;
  title: string;
  image: string;
  category: string;
  year?: number | string;
  date?: string;
};

type Album = {
  id: string;
  title: string;
  year: string;
  description: string;
  photos: GalleryPhoto[];
};

type EventDef = {
  id: string;
  title: string;
  year: string;
  description: string;
  keywords: string[];
};

/* ------------------------------------------------------------------ */
/*  ALBUM DEFINITIONS                                                  */
/*  Add a new event here and its album appears automatically.          */
/* ------------------------------------------------------------------ */

const eventDefs: EventDef[] = [
  {
    id: 'pongal-fest-2026',
    title: 'Pongal Fest',
    year: '2026',
    description:
      'Kolam, traditional dress and the pongal pot: our harvest festival celebrated on campus.',
    keywords: ['pongalfest', 'pongal fest', 'pongal'],
  },
  {
    id: 'republic-day-2026',
    title: 'Republic Day',
    year: '2026',
    description: 'Flag hoisting and the day’s celebrations with students and staff.',
    keywords: ['republic day', 'republicday', 'republic'],
  },
  {
    id: 'graduation-day-2026',
    title: 'Graduation Day',
    year: '2026',
    description: 'Our graduating batch receives their degrees and celebrates with family.',
    keywords: ['graduation day', 'graduationday', 'graduation'],
  },
  {
    id: 'freshers-day-2025',
    title: 'Fresher’s Day',
    year: '2025',
    description: 'Welcoming the new batch with games, music and performances.',
    keywords: ['freshers day', 'freshersday', 'fresher day', 'freshers'],
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/%20/g, ' ')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getPhotoYear(photo: GalleryPhoto): string {
  if (photo.year) return String(photo.year);

  if (photo.date) {
    const year = new Date(photo.date).getFullYear();
    if (!Number.isNaN(year)) return String(year);
  }

  return '';
}

function getEventDef(photo: GalleryPhoto): EventDef | null {
  const text = normalizeText(`${photo.title} ${photo.image}`);

  return (
    eventDefs.find((def) =>
      def.keywords.some((keyword) => text.includes(normalizeText(keyword)))
    ) || null
  );
}

function prettyCategory(value: string): string {
  const category = (value || '').trim();
  return category || 'More Photos';
}

/**
 * Build albums once:
 *  1. one album per event (Pongal, Republic Day, ...)
 *  2. any photo that is not part of an event goes into an album
 *     named after its original category, so nothing is lost.
 */
function buildAlbums(items: GalleryPhoto[]): Album[] {
  const eventMap = new Map<string, Album>();
  const otherMap = new Map<string, Album>();

  eventDefs.forEach((def) => {
    eventMap.set(def.id, {
      id: def.id,
      title: def.title,
      year: def.year,
      description: def.description,
      photos: [],
    });
  });

  items.forEach((photo) => {
    const def = getEventDef(photo);

    if (def) {
      eventMap.get(def.id)!.photos.push(photo);
      return;
    }

    const name = prettyCategory(photo.category);
    const year = getPhotoYear(photo);
    const key = `${name}-${year}`;

    if (!otherMap.has(key)) {
      otherMap.set(key, {
        id: `other-${normalizeText(key).replace(/\s+/g, '-')}`,
        title: name,
        year,
        description: `Photos from ${name.toLowerCase()}${year ? ` in ${year}` : ''}.`,
        photos: [],
      });
    }

    otherMap.get(key)!.photos.push(photo);
  });

  return [...eventMap.values(), ...otherMap.values()].filter(
    (album) => album.photos.length > 0
  );
}

const albums: Album[] = buildAlbums(galleryItems as unknown as GalleryPhoto[]);

/* ------------------------------------------------------------------ */
/*  SCROLL REVEAL                                                      */
/* ------------------------------------------------------------------ */

type RevealDir = 'up' | 'left' | 'right';

const Reveal: React.FC<{
  children: React.ReactNode;
  dir?: RevealDir;
  delay?: number;
  className?: string;
}> = ({ children, dir = 'up', delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`g-rv g-rv-${dir} ${shown ? 'g-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Gallery() {
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeAlbum = useMemo(
    () => albums.find((album) => album.id === activeAlbumId) || null,
    [activeAlbumId]
  );

  const activePhoto =
    activeAlbum && lightboxIndex !== null
      ? activeAlbum.photos[lightboxIndex]
      : null;

  const openAlbum = (id: string) => {
    setActiveAlbumId(id);
    setLightboxIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeAlbum = () => {
    setActiveAlbumId(null);
    setLightboxIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeLightbox = () => setLightboxIndex(null);

  const step = (direction: 1 | -1) => {
    if (!activeAlbum || lightboxIndex === null) return;
    const total = activeAlbum.photos.length;
    if (total < 2) return;
    setLightboxIndex((lightboxIndex + direction + total) % total);
  };

  // reset zoom whenever the photo changes
  useEffect(() => {
    setZoomLevel(1);
  }, [lightboxIndex]);

  // keyboard controls + lock page scroll while the viewer is open
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, activeAlbumId]);

  return (
    <main className="mcp-gallery">
      <style>{`
        .mcp-gallery {
          --g-green: #064b38;
          --g-dark: #032d22;
          --g-deep: #021f18;
          --g-gold: #d6ad52;
          --g-gold-light: #f1d58c;
          --g-text: #183c30;
          --g-muted: #68766f;
          --g-border: #e4ebe6;
          --g-soft: #f5f7f4;
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          background: #fff;
          color: var(--g-text);
          font-family: inherit;
        }
        .mcp-gallery *, .mcp-gallery *::before, .mcp-gallery *::after { box-sizing: border-box; }
        .mcp-gallery button { font-family: inherit; cursor: pointer; }
        .mcp-gallery button:focus-visible { outline: 3px solid var(--g-gold); outline-offset: 3px; }

        /* ===== HERO ===== */
        .mcp-gallery .g-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 40px 7.8% 36px;
          color: #fff;
          border-bottom: 3px solid var(--g-gold);
          background:
            radial-gradient(ellipse at 85% 15%, rgba(25,100,72,.45), transparent 42%),
            linear-gradient(115deg, var(--g-deep), var(--g-dark), #03432f);
        }
        .mcp-gallery .g-hero::before {
          position: absolute; z-index: -1; right: -4%; bottom: -145px;
          width: 53%; height: 220px;
          border: 1px solid rgba(214,173,82,.7); border-radius: 50%;
          content: ""; transform: rotate(-13deg); pointer-events: none;
        }
        .mcp-gallery .g-hero-inner { max-width: 1440px; margin: 0 auto; }
        .mcp-gallery .g-college-name {
          display: flex; align-items: center; flex-wrap: wrap; gap: 14px;
          margin-bottom: 12px; color: var(--g-gold-light);
          font-size: 14px; font-weight: 650; letter-spacing: 1.3px; text-transform: uppercase;
        }
        .mcp-gallery .g-gold-line { display: inline-block; width: 65px; height: 1px; background: var(--g-gold); }
        .mcp-gallery .g-hero-title {
          margin: 0; color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(48px, 5.2vw, 76px); font-weight: 700;
          letter-spacing: -2px; line-height: 1.06;
        }
        .mcp-gallery .g-hero-description {
          max-width: 720px; margin: 15px 0 0;
          color: rgba(255,255,255,.9); font-size: 17px; line-height: 1.7;
        }
        .mcp-gallery .g-hero-star {
          position: absolute; top: 18px; right: 8%;
          display: inline-flex; align-items: center; justify-content: center;
          width: 100px; height: 100px;
          color: rgba(214,173,82,.8); font-size: 90px; font-weight: 200; line-height: 1;
          animation: g-star-spin 8s linear infinite;
          transition: color .3s ease, text-shadow .3s ease;
        }
        .mcp-gallery .g-hero-star:hover {
          animation-play-state: paused; color: var(--g-gold-light);
          text-shadow: 0 0 18px rgba(214,173,82,.6);
        }
        @keyframes g-star-spin {
          from { transform: rotate(25deg); }
          to   { transform: rotate(385deg); }
        }

        /* ===== LAYOUT ===== */
        .mcp-gallery .g-container {
          width: 100%; max-width: 1600px; margin: 0 auto; padding: 0 6.3% 70px;
        }
        .mcp-gallery .g-section-heading {
          display: flex; align-items: baseline; gap: 12px; margin: 34px 0 22px;
        }
        .mcp-gallery .g-section-heading h2 {
          margin: 0; color: var(--g-green);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 27px; font-weight: 700;
        }
        .mcp-gallery .g-count {
          padding: 4px 10px; border-radius: 20px;
          background: #edf3ee; color: var(--g-green);
          font-size: 12px; font-weight: 650; white-space: nowrap;
        }

        /* ===== ALBUM GRID ===== */
        .mcp-gallery .g-album-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 38px 26px;
        }
        .mcp-gallery .g-album {
          display: block; width: 100%; padding: 0; border: 0;
          background: none; color: inherit; text-align: left;
        }
        .mcp-gallery .g-stack { position: relative; aspect-ratio: 4 / 3; margin: 0 8px 14px; }
        .mcp-gallery .g-stack img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; border-radius: 12px;
          border: 3px solid #fff; background: #e8eee9;
          box-shadow: 0 6px 18px rgba(3,45,34,.18);
          transition: transform .45s cubic-bezier(.22,1,.36,1);
        }
        .mcp-gallery .g-stack .l3 { transform: rotate(-5deg) translate(-6px, 4px); }
        .mcp-gallery .g-stack .l2 { transform: rotate(4deg) translate(6px, 2px); }
        .mcp-gallery .g-stack .l1 { z-index: 2; }
        .mcp-gallery .g-album:hover .l3 { transform: rotate(-11deg) translate(-18px, 6px); }
        .mcp-gallery .g-album:hover .l2 { transform: rotate(9deg) translate(18px, 4px); }
        .mcp-gallery .g-album:hover .l1 { transform: translateY(-6px); }
        .mcp-gallery .g-badge {
          position: absolute; z-index: 3; top: 10px; left: 10px;
          padding: 5px 9px; border-radius: 5px;
          background: var(--g-gold-light); color: var(--g-deep);
          font-size: 12px; font-weight: 750; line-height: 1;
        }
        .mcp-gallery .g-album h3 {
          margin: 4px 0 0; color: var(--g-dark);
          font-family: Georgia, "Times New Roman", serif; font-size: 20px;
        }
        .mcp-gallery .g-album-meta {
          display: flex; justify-content: space-between; gap: 10px;
          margin-top: 4px; color: var(--g-muted); font-size: 13px;
        }
        .mcp-gallery .g-open { color: var(--g-green); font-weight: 650; transition: transform .3s; }
        .mcp-gallery .g-album:hover .g-open { transform: translateX(4px); }

        /* ===== ALBUM VIEW ===== */
        .mcp-gallery .g-back {
          display: inline-flex; align-items: center; gap: 8px;
          margin: 28px 0 6px; padding: 9px 15px;
          border: 1px solid var(--g-border); border-radius: 9px;
          background: #fff; color: var(--g-dark); font-size: 14px; font-weight: 600;
          transition: all .25s ease;
        }
        .mcp-gallery .g-back:hover { border-color: var(--g-gold); transform: translateX(-3px); }
        .mcp-gallery .g-album-head {
          display: flex; flex-wrap: wrap; align-items: flex-end;
          justify-content: space-between; gap: 12px;
          margin: 14px 0 24px; padding-bottom: 16px;
          border-bottom: 1px solid var(--g-border);
          animation: g-fade-up .5s ease both;
        }
        .mcp-gallery .g-album-head h2 {
          margin: 0; color: var(--g-green);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 4vw, 40px);
        }
        .mcp-gallery .g-album-head p { max-width: 560px; margin: 6px 0 0; color: var(--g-muted); line-height: 1.6; }
        .mcp-gallery .g-masonry { columns: 4 220px; column-gap: 14px; }
        .mcp-gallery .g-masonry > .g-rv { break-inside: avoid; margin-bottom: 14px; }
        .mcp-gallery .g-photo {
          position: relative; display: block; width: 100%; padding: 0;
          overflow: hidden; border: 1px solid rgba(3,45,34,.08);
          border-radius: 11px; background: #e8eee9;
          transition: box-shadow .25s ease, transform .25s ease;
        }
        .mcp-gallery .g-photo:hover { box-shadow: 0 12px 26px rgba(3,45,34,.18); transform: translateY(-4px); }
        .mcp-gallery .g-photo img {
          display: block; width: 100%; height: auto; min-height: 90px;
          transition: transform .4s ease;
        }
        .mcp-gallery .g-photo:hover img { transform: scale(1.05); }
        .mcp-gallery .g-photo-zoom {
          position: absolute; top: 9px; right: 9px;
          display: flex; width: 34px; height: 34px;
          align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,.4); border-radius: 50%;
          background: rgba(3,45,34,.86); color: #fff;
          opacity: 0; transform: scale(.85); transition: all .25s ease;
        }
        .mcp-gallery .g-photo:hover .g-photo-zoom,
        .mcp-gallery .g-photo:focus-visible .g-photo-zoom { opacity: 1; transform: scale(1); }
        .mcp-gallery .g-empty {
          padding: 50px 20px; border: 1px dashed #d8e1da; border-radius: 14px;
          background: #fafcf9; color: var(--g-muted); text-align: center;
        }

        /* ===== REVEAL ===== */
        .mcp-gallery .g-rv {
          opacity: 0; transform: translate3d(0, 28px, 0);
          transition: opacity .7s ease, transform .8s cubic-bezier(.22,1,.36,1);
          will-change: opacity, transform;
        }
        .mcp-gallery .g-rv-left  { transform: translate3d(-60px, 0, 0); }
        .mcp-gallery .g-rv-right { transform: translate3d(60px, 0, 0); }
        .mcp-gallery .g-rv.g-in  { opacity: 1; transform: none; }
        @keyframes g-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes g-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .mcp-gallery .g-view { animation: g-fade-up .45s ease both; }

        /* ===== LIGHTBOX ===== */
        .mcp-gallery .g-lightbox {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 60px 70px 35px;
          background: rgba(1,19,14,.96); backdrop-filter: blur(8px);
          animation: g-fade-in .25s ease both;
        }
        .mcp-gallery .g-lightbox-content {
          display: flex; width: 100%; max-width: 1100px; max-height: 100%;
          flex-direction: column; align-items: center; gap: 15px;
        }
        .mcp-gallery .g-lightbox-viewport {
          display: flex; width: 100%; height: 72vh;
          align-items: center; justify-content: center; overflow: hidden;
          border: 1px solid rgba(214,173,82,.35); border-radius: 9px;
        }
        .mcp-gallery .g-lightbox-viewport img {
          display: block; max-width: 100%; max-height: 100%;
          width: auto; height: auto; object-fit: contain;
          user-select: none; cursor: zoom-in;
        }
        .mcp-gallery .g-lightbox-caption { text-align: center; }
        .mcp-gallery .g-lightbox-caption span { color: var(--g-gold-light); font-size: 13px; font-weight: 700; }
        .mcp-gallery .g-lightbox-caption h3 {
          margin: 5px 0; color: #fff;
          font-family: Georgia, "Times New Roman", serif; font-size: 22px;
        }
        .mcp-gallery .g-lightbox-caption p { margin: 0; color: rgba(255,255,255,.72); font-size: 14px; }
        .mcp-gallery .g-lb-btn {
          position: absolute; display: flex; width: 45px; height: 45px;
          align-items: center; justify-content: center;
          border: 1px solid rgba(214,173,82,.55); border-radius: 50%;
          background: rgba(255,255,255,.08); color: #fff; transition: all .25s ease;
        }
        .mcp-gallery .g-lb-btn:hover { background: var(--g-gold); color: var(--g-deep); }
        .mcp-gallery .g-lb-close { top: 20px; right: 24px; }
        .mcp-gallery .g-lb-prev  { top: 50%; left: 18px; transform: translateY(-50%); }
        .mcp-gallery .g-lb-next  { top: 50%; right: 18px; transform: translateY(-50%); }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1100px) {
          .mcp-gallery .g-container { padding-right: 4%; padding-left: 4%; }
          .mcp-gallery .g-hero { padding-right: 5%; padding-left: 5%; }
        }
        @media (max-width: 700px) {
          .mcp-gallery .g-hero { padding: 30px 22px 28px; }
          .mcp-gallery .g-college-name { gap: 9px; font-size: 10px; letter-spacing: 1px; }
          .mcp-gallery .g-gold-line { width: 35px; }
          .mcp-gallery .g-hero-title { font-size: clamp(43px, 11vw, 60px); letter-spacing: -1.5px; }
          .mcp-gallery .g-hero-description { font-size: 14px; line-height: 1.6; }
          .mcp-gallery .g-hero-star { top: 25px; right: -6%; width: 70px; height: 70px; font-size: 70px; opacity: .4; }
          .mcp-gallery .g-container { padding: 0 18px 45px; }
          .mcp-gallery .g-section-heading h2 { font-size: 22px; }
          .mcp-gallery .g-album-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 30px 18px; }
          .mcp-gallery .g-masonry { columns: 2 140px; column-gap: 10px; }
          .mcp-gallery .g-masonry > .g-rv { margin-bottom: 10px; }
          .mcp-gallery .g-rv-left  { transform: translate3d(-30px, 0, 0); }
          .mcp-gallery .g-rv-right { transform: translate3d(30px, 0, 0); }
          .mcp-gallery .g-photo-zoom { opacity: 1; transform: none; width: 29px; height: 29px; top: 6px; right: 6px; }
          .mcp-gallery .g-lightbox { padding: 70px 12px 90px; }
          .mcp-gallery .g-lightbox-viewport { height: 60vh; }
          .mcp-gallery .g-lb-close { top: 13px; right: 13px; width: 40px; height: 40px; }
          .mcp-gallery .g-lb-prev, .mcp-gallery .g-lb-next { top: auto; bottom: 20px; transform: none; width: 42px; height: 42px; }
          .mcp-gallery .g-lb-prev { left: 20px; }
          .mcp-gallery .g-lb-next { right: 20px; }
          .mcp-gallery .g-lightbox-caption h3 { font-size: 18px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mcp-gallery *, .mcp-gallery *::before, .mcp-gallery *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
          .mcp-gallery .g-rv { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* HEADER */}
      <header className="g-hero">
        <div className="g-hero-inner">
          <div className="g-college-name">
            <span>MADHA COLLEGE OF PHYSIOTHERAPY</span>
            <span className="g-gold-line" />
          </div>

          <h1 className="g-hero-title">Gallery</h1>

          <p className="g-hero-description">
            Browse our memories album by album: festivals, celebrations,
            workshops and milestones from across the years.
          </p>

          <span className="g-hero-star" aria-hidden="true">✧</span>
        </div>
      </header>

      <div className="g-container">
        {/* ============ ALBUM LIST ============ */}
        {!activeAlbum && (
          <section className="g-view" key="list">
            <div className="g-section-heading">
              <h2>Albums</h2>
              <span className="g-count">
                {albums.length} {albums.length === 1 ? 'album' : 'albums'}
              </span>
            </div>

            {albums.length > 0 ? (
              <div className="g-album-grid">
                {albums.map((album, index) => (
                  <Reveal
                    key={album.id}
                    dir={index % 2 === 0 ? 'left' : 'right'}
                    delay={(index % 3) * 0.08}
                  >
                    <button
                      type="button"
                      className="g-album"
                      onClick={() => openAlbum(album.id)}
                      aria-label={`Open album ${album.title}${album.year ? ` ${album.year}` : ''}`}
                    >
                      <div className="g-stack">
                        {album.year && <span className="g-badge">{album.year}</span>}

                        {album.photos[2] && (
                          <img className="l3" src={album.photos[2].image} alt="" loading="lazy" />
                        )}
                        {album.photos[1] && (
                          <img className="l2" src={album.photos[1].image} alt="" loading="lazy" />
                        )}
                        <img
                          className="l1"
                          src={album.photos[0].image}
                          alt={`${album.title} cover`}
                          loading="lazy"
                        />
                      </div>

                      <h3>{album.title}</h3>

                      <div className="g-album-meta">
                        <span>
                          {album.photos.length}{' '}
                          {album.photos.length === 1 ? 'photo' : 'photos'}
                        </span>
                        <span className="g-open">Open album →</span>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="g-empty">No albums available yet.</div>
            )}
          </section>
        )}

        {/* ============ ALBUM VIEW ============ */}
        {activeAlbum && (
          <section className="g-view" key={activeAlbum.id}>
            <button type="button" className="g-back" onClick={closeAlbum}>
              <ArrowLeft size={17} aria-hidden="true" />
              All albums
            </button>

            <div className="g-album-head">
              <div>
                <h2>
                  {activeAlbum.title}
                  {activeAlbum.year ? ` – ${activeAlbum.year}` : ''}
                </h2>
                <p>{activeAlbum.description}</p>
              </div>

              <span className="g-count">
                {activeAlbum.photos.length}{' '}
                {activeAlbum.photos.length === 1 ? 'photo' : 'photos'}
              </span>
            </div>

            <div className="g-masonry">
              {activeAlbum.photos.map((photo, index) => (
                <Reveal
                  key={photo.id}
                  dir={index % 2 === 0 ? 'left' : 'right'}
                  delay={(index % 4) * 0.06}
                >
                  <button
                    type="button"
                    className="g-photo"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`View ${photo.title}`}
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      loading="lazy"
                      onError={(event) => {
                        console.error('Gallery image failed to load:', photo.image);
                        event.currentTarget.style.visibility = 'hidden';
                      }}
                    />
                    <span className="g-photo-zoom">
                      <ZoomIn size={17} aria-hidden="true" />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ============ LIGHTBOX ============ */}
      {activeAlbum && activePhoto && (
        <div
          className="g-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="g-lb-btn g-lb-close"
            onClick={closeLightbox}
            aria-label="Close photo viewer"
          >
            <X />
          </button>

          {activeAlbum.photos.length > 1 && (
            <>
              <button
                type="button"
                className="g-lb-btn g-lb-prev"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft />
              </button>

              <button
                type="button"
                className="g-lb-btn g-lb-next"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
              >
                <ChevronRight />
              </button>
            </>
          )}

          <div
            className="g-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="g-lightbox-viewport"
              onWheel={(event) => {
                // scroll wheel zooms the photo (page scroll is locked while open)
                const change = event.deltaY < 0 ? 0.2 : -0.2;
                setZoomLevel((current) =>
                  Math.min(4, Math.max(1, current + change))
                );
              }}
            >
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                draggable={false}
                onDoubleClick={() =>
                  setZoomLevel((current) => (current > 1 ? 1 : 2))
                }
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform .15s ease',
                  transformOrigin: 'center center',
                  cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in',
                }}
              />
            </div>

            <div className="g-lightbox-caption">
              <span>
                {lightboxIndex !== null ? lightboxIndex + 1 : 0} /{' '}
                {activeAlbum.photos.length}
                {activeAlbum.year ? ` · ${activeAlbum.year}` : ''}
              </span>
              <h3>{activePhoto.title}</h3>
              <p>{activeAlbum.title}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}