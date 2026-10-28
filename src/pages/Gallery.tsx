
import { useMemo, useState } from 'react';

import {
  Image as ImageIcon,
  CalendarDays,
  Building2,
  Stethoscope,
  FlaskConical,
  PartyPopper,
  Users,
  GraduationCap,
  Trophy,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { galleryItems } from '@/data/content';

type GalleryPhoto = {
  id: string | number;
  title: string;
  image: string;
  category: string;
  year?: number | string;
  date?: string;
};

type EventSection = {
  title: string;
  photos: GalleryPhoto[];
};

const photos = galleryItems as unknown as GalleryPhoto[];

const years = [
  'All Years',
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
];

const categories = [
  { name: 'All Photos', icon: ImageIcon },
  { name: 'Campus Life', icon: Building2 },
  { name: 'Clinical Training', icon: Stethoscope },
  { name: 'Laboratories', icon: FlaskConical },
  { name: 'Events & Celebrations', icon: PartyPopper },
  { name: 'Workshops & Seminars', icon: Users },
  { name: 'Students', icon: GraduationCap },
  { name: 'Achievements', icon: Trophy },
];

function getPhotoYear(photo: GalleryPhoto): string {
  if (photo.year) return String(photo.year);

  if (photo.date) {
    const year = new Date(photo.date).getFullYear();

    if (!Number.isNaN(year)) {
      return String(year);
    }
  }

  return '';
}

function normalizeCategory(value: string): string {
  const category = (value || '').toLowerCase().trim();

  if (category.includes('campus')) return 'Campus Life';

  if (
    category.includes('clinical') ||
    category.includes('training') ||
    category.includes('physiotherapy')
  ) {
    return 'Clinical Training';
  }

  if (category.includes('lab')) return 'Laboratories';

  if (
    category.includes('event') ||
    category.includes('celebration') ||
    category.includes('pongal') ||
    category.includes('republic') ||
    category.includes('independence') ||
    category.includes('graduation') ||
    category.includes('freshers') ||
    category.includes('annual day') ||
    category.includes('cultural') ||
    category.includes('festival')
  ) {
    return 'Events & Celebrations';
  }

  if (
    category.includes('workshop') ||
    category.includes('seminar') ||
    category.includes('conference')
  ) {
    return 'Workshops & Seminars';
  }

  if (
    category.includes('achievement') ||
    category.includes('award')
  ) {
    return 'Achievements';
  }

  if (
    category.includes('student') ||
    category.includes('sports')
  ) {
    return 'Students';
  }

  return value;
}

function getEventType(photo: GalleryPhoto): string {
  const title = (photo.title || '').toLowerCase();
  const image = (photo.image || '').toLowerCase();
  const category = (photo.category || '').toLowerCase();

  if (
    title.includes('pongal') ||
    image.includes('pongal') ||
    category.includes('pongal')
  ) {
    return 'Pongal Fest';
  }

  if (
    title.includes('graduation') ||
    image.includes('graduationday') ||
    image.includes('graduation-day') ||
    category.includes('graduation')
  ) {
    return 'Graduation Day 2026';
  }

  if (
    title.includes('independence') ||
    image.includes('independence') ||
    category.includes('independence')
  ) {
    return 'Independence Day';
  }

  if (
    title.includes('freshers') ||
    image.includes('freshers') ||
    category.includes('freshers')
  ) {
    return 'Freshers Day';
  }

  if (
    title.includes('republic') ||
    image.includes('republic') ||
    category.includes('republic')
  ) {
    return 'Republic Day';
  }

  return 'Other Events';
}

export default function Gallery() {
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedCategory, setSelectedCategory] =
    useState('All Photos');
  const [search, setSearch] = useState('');
  const [lightboxIndex, setLightboxIndex] =
    useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const title = (photo.title || '').toLowerCase();
      const image = (photo.image || '').toLowerCase();
      const originalCategory = (
        photo.category || ''
      ).toLowerCase();

      const category = normalizeCategory(
        photo.category || ''
      );

      const photoYear = getPhotoYear(photo);

      // Identify event photos by title, category, or image path.
      const isPongal =
        title.includes('pongal') ||
        image.includes('pongal') ||
        originalCategory.includes('pongal');

      const isGraduation =
        title.includes('graduation') ||
        image.includes('graduationday') ||
        image.includes('graduation-day') ||
        originalCategory.includes('graduation');

      const isIndependence =
        title.includes('independence') ||
        image.includes('independence') ||
        originalCategory.includes('independence');

      const isFreshers =
        title.includes('freshers') ||
        image.includes('freshers') ||
        originalCategory.includes('freshers');

      const isRepublic =
        title.includes('republic') ||
        image.includes('republic') ||
        originalCategory.includes('republic');

      const isSpecialEvent =
        isPongal ||
        isGraduation ||
        isIndependence ||
        isFreshers ||
        isRepublic;

      const isEvent =
        isSpecialEvent ||
        category === 'Events & Celebrations' ||
        originalCategory.includes('event') ||
        originalCategory.includes('celebration');

      const matchesYear =
        selectedYear === 'All Years' ||
        photoYear === selectedYear;

      // Show the special event photos in all three requested categories.
      const matchesCategory =
        selectedCategory === 'All Photos' ||
        category === selectedCategory ||
        (
          selectedCategory === 'Campus Life' &&
          isSpecialEvent
        ) ||
        (
          selectedCategory === 'Students' &&
          isSpecialEvent
        ) ||
        (
          selectedCategory === 'Events & Celebrations' &&
          isEvent
        );

      // Keep the existing search feature working.
      const searchableText = [
        photo.title,
        photo.category,
        photoYear,
        photo.image,
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        search.toLowerCase().trim()
      );

      return (
        matchesYear &&
        matchesCategory &&
        matchesSearch
      );
    });
  }, [selectedYear, selectedCategory, search]);

  const eventSections = useMemo<EventSection[]>(() => {
    const sectionTitles = [
      'Pongal Fest',
      'Graduation Day 2026',
      'Independence Day',
      'Freshers Day',
      'Republic Day',
      'Other Events',
    ];

    return sectionTitles
      .map((title) => ({
        title,
        photos: filteredPhotos.filter(
          (photo) => getEventType(photo) === title
        ),
      }))
      .filter((section) => section.photos.length > 0);
  }, [filteredPhotos]);

  const activePhoto =
    lightboxIndex !== null
      ? filteredPhotos[lightboxIndex] ?? null
      : null;

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrevious = () => {
    if (
      lightboxIndex === null ||
      filteredPhotos.length < 2
    ) {
      return;
    }

    setLightboxIndex(
      (lightboxIndex - 1 + filteredPhotos.length) %
        filteredPhotos.length
    );
  };

  const showNext = () => {
    if (
      lightboxIndex === null ||
      filteredPhotos.length < 2
    ) {
      return;
    }

    setLightboxIndex(
      (lightboxIndex + 1) % filteredPhotos.length
    );
  };

  const clearFilters = () => {
    setSelectedYear('All Years');
    setSelectedCategory('All Photos');
    setSearch('');
    setLightboxIndex(null);
  };

  // Keep the rest of your existing JSX below this point.


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
          overflow: hidden;
          background: #fff;
          color: var(--g-text);
          font-family: inherit;
        }

        .mcp-gallery *,
        .mcp-gallery *::before,
        .mcp-gallery *::after {
          box-sizing: border-box;
        }

        .mcp-gallery button {
          font-family: inherit;
        }

        .mcp-gallery .g-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 35px 7.8% 32px;
          color: #fff;
          background:
            radial-gradient(
              ellipse at 85% 15%,
              rgba(25, 100, 72, .45),
              transparent 42%
            ),
            linear-gradient(
              115deg,
              var(--g-deep),
              var(--g-dark),
              #03432f
            );
          border-bottom: 3px solid var(--g-gold);
        }

        .mcp-gallery .g-hero::before {
          position: absolute;
          z-index: -1;
          right: -4%;
          bottom: -145px;
          width: 53%;
          height: 220px;
          border: 1px solid rgba(214, 173, 82, .7);
          border-radius: 50%;
          content: "";
          transform: rotate(-13deg);
          box-shadow:
            0 -16px 0 -15px rgba(214, 173, 82, .5),
            0 -36px 0 -35px rgba(214, 173, 82, .3);
          pointer-events: none;
        }

        .mcp-gallery .g-hero::after {
          position: absolute;
          z-index: -1;
          top: -190px;
          right: 4%;
          width: 280px;
          height: 280px;
          border: 1px solid rgba(214, 173, 82, .2);
          border-radius: 50%;
          content: "";
          box-shadow:
            0 0 0 24px rgba(214, 173, 82, .025),
            0 0 0 48px rgba(214, 173, 82, .025);
          pointer-events: none;
        }

        .mcp-gallery .g-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
        }

        .mcp-gallery .g-college-name {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 12px;
          color: var(--g-gold-light);
          font-size: 14px;
          font-weight: 650;
          letter-spacing: 1.3px;
          text-transform: uppercase;
        }

        .mcp-gallery .g-gold-line {
          display: inline-block;
          width: 65px;
          height: 1px;
          background: var(--g-gold);
        }

        .mcp-gallery .g-hero-title {
          position: relative;
          width: fit-content;
          margin: 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(48px, 5.2vw, 76px);
          font-weight: 700;
          letter-spacing: -2px;
          line-height: 1.06;
        }

        .mcp-gallery .g-hero-title::after {
          position: absolute;
          right: -42px;
          bottom: 9px;
          width: 28px;
          height: 2px;
          background: var(--g-gold);
          content: "";
        }

        .mcp-gallery .g-hero-description {
          max-width: 720px;
          margin: 15px 0 0;
          color: rgba(255, 255, 255, .9);
          font-size: 17px;
          line-height: 1.7;
        }

        .mcp-gallery .g-decoration {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .mcp-gallery .g-decoration-line {
          position: absolute;
          right: 8%;
          bottom: -145px;
          width: 44%;
          height: 210px;
          border-top: 1px solid rgba(214, 173, 82, .6);
          border-radius: 50%;
          transform: rotate(-17deg);
        }

        .mcp-gallery .g-decoration-leaf {
          position: absolute;
          top: 18px;
          right: 8%;
          color: rgba(214, 173, 82, .8);
          font-size: 90px;
          font-weight: 200;
          transform: rotate(25deg);
        }

        .mcp-gallery .g-container {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 6.3% 65px;
        }

        .mcp-gallery .g-section-heading {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 11px;
          color: var(--g-green);
        }

        .mcp-gallery .g-section-heading > svg {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          stroke-width: 2.3;
        }

        .mcp-gallery .g-section-heading h2 {
          margin: 0;
          color: var(--g-dark);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
          font-weight: 700;
          line-height: 1.3;
        }

        .mcp-gallery .g-year-section {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 28px;
          min-height: 72px;
          padding: 15px 0;
          border-bottom: 1px solid var(--g-border);
        }

        .mcp-gallery .g-year-filters {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
        }

        .mcp-gallery .g-year-button {
          min-width: 64px;
          padding: 10px 15px;
          border: 1px solid transparent;
          border-radius: 9px;
          background: #f0f4f0;
          color: var(--g-dark);
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all .25s ease;
        }

        .mcp-gallery .g-year-button:hover {
          border-color: var(--g-gold);
          background: #fffaf0;
          transform: translateY(-2px);
        }

        .mcp-gallery .g-year-button.active {
          border-color: var(--g-green);
          background: var(--g-green);
          color: #fff;
          box-shadow: 0 4px 10px rgba(3, 45, 34, .12);
        }

        .mcp-gallery .g-category-section {
          padding: 23px 0 30px;
        }

        .mcp-gallery .g-category-section > .g-section-heading {
          margin-bottom: 16px;
        }

        .mcp-gallery .g-grid-icon {
          display: grid;
          width: 23px;
          height: 23px;
          flex-shrink: 0;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 3px;
        }

        .mcp-gallery .g-grid-icon span {
          border: 2px solid var(--g-green);
          border-radius: 2px;
        }

        .mcp-gallery .g-category-grid {
          display: grid;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          gap: 12px;
        }

        .mcp-gallery .g-category-card {
          display: flex;
          min-width: 0;
          min-height: 112px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 9px;
          padding: 14px 7px;
          border: 1px solid transparent;
          border-radius: 12px;
          background: var(--g-soft);
          color: var(--g-dark);
          cursor: pointer;
          transition: all .3s ease;
        }

        .mcp-gallery .g-category-card:hover {
          border-color: rgba(214, 173, 82, .7);
          background: #fff;
          box-shadow: 0 8px 22px rgba(3, 45, 34, .09);
          transform: translateY(-4px);
        }

        .mcp-gallery .g-category-card.active {
          border-color: var(--g-gold);
          background: #fffdf7;
          box-shadow: 0 3px 12px rgba(214, 173, 82, .15);
        }

        .mcp-gallery .g-category-icon {
          display: flex;
          width: 49px;
          height: 49px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #e8efe8;
          color: var(--g-green);
          transition: all .3s ease;
        }

        .mcp-gallery .g-category-icon svg {
          width: 27px;
          height: 27px;
          stroke-width: 2.1;
        }

        .mcp-gallery .g-category-card.active .g-category-icon,
        .mcp-gallery .g-category-card:hover .g-category-icon {
          background: var(--g-green);
          color: var(--g-gold-light);
          transform: scale(1.04);
        }

        .mcp-gallery .g-category-name {
          max-width: 100%;
          font-size: 12px;
          font-weight: 650;
          line-height: 1.35;
          text-align: center;
        }

        .mcp-gallery .g-photos-section {
          padding-top: 5px;
        }

        .mcp-gallery .g-photos-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 20px;
        }

        .mcp-gallery .g-photo-count {
          padding: 4px 9px;
          border-radius: 20px;
          background: #edf3ee;
          color: var(--g-green);
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .mcp-gallery .g-search {
          display: flex;
          width: min(280px, 100%);
          min-height: 42px;
          align-items: center;
          gap: 9px;
          padding: 0 12px;
          border: 1px solid var(--g-border);
          border-radius: 10px;
          background: #fff;
          transition: all .25s ease;
        }

        .mcp-gallery .g-search:focus-within {
          border-color: var(--g-gold);
          box-shadow: 0 0 0 3px rgba(214, 173, 82, .12);
        }

        .mcp-gallery .g-search > svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          color: var(--g-green);
        }

        .mcp-gallery .g-search input {
          width: 100%;
          min-width: 0;
          padding: 0;
          border: 0;
          outline: none;
          background: transparent;
          color: var(--g-text);
          font-size: 14px;
        }

        .mcp-gallery .g-clear-search {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          padding: 3px;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: var(--g-muted);
          cursor: pointer;
        }

        .mcp-gallery .g-photo-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .mcp-gallery .g-photo-card {
          position: relative;
          display: block;
          min-width: 0;
          overflow: hidden;
          aspect-ratio: 1.58 / 1;
          padding: 0;
          border: 1px solid rgba(3, 45, 34, .08);
          border-radius: 11px;
          background: #e8eee9;
          box-shadow: 0 3px 8px rgba(3, 45, 34, .05);
          cursor: pointer;
          isolation: isolate;
          text-align: left;
          transition: all .3s ease;
        }

        .mcp-gallery .g-photo-card:hover {
          z-index: 1;
          border-color: rgba(214, 173, 82, .7);
          box-shadow: 0 12px 26px rgba(3, 45, 34, .18);
          transform: translateY(-4px);
        }

        .mcp-gallery .g-photo-card > img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .55s ease;
        }

        .mcp-gallery .g-photo-card:hover > img {
          transform: scale(1.07);
        }

        .mcp-gallery .g-photo-card::after {
          position: absolute;
          z-index: 0;
          inset: 35% 0 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(2, 31, 24, .82)
          );
          content: "";
          pointer-events: none;
        }

        .mcp-gallery .g-photo-year {
          position: absolute;
          z-index: 1;
          top: 10px;
          left: 10px;
          padding: 6px 10px;
          border-radius: 5px;
          background: var(--g-gold-light);
          color: var(--g-deep);
          font-size: 12px;
          font-weight: 750;
          line-height: 1;
        }

        .mcp-gallery .g-photo-zoom {
          position: absolute;
          z-index: 1;
          top: 9px;
          right: 9px;
          display: flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, .4);
          border-radius: 50%;
          background: rgba(3, 45, 34, .86);
          color: #fff;
          opacity: 0;
          transform: scale(.85);
          transition: all .25s ease;
        }

        .mcp-gallery .g-photo-zoom svg {
          width: 18px;
          height: 18px;
        }

        .mcp-gallery .g-photo-card:hover .g-photo-zoom,
        .mcp-gallery .g-photo-card:focus-visible .g-photo-zoom {
          opacity: 1;
          transform: scale(1);
        }

        .mcp-gallery .g-photo-caption {
          position: absolute;
          z-index: 1;
          right: 10px;
          bottom: 10px;
          left: 10px;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          gap: 4px;
          color: #fff;
        }

        .mcp-gallery .g-photo-category {
          max-width: 100%;
          overflow: hidden;
          padding: 4px 7px;
          border-radius: 4px;
          background: rgba(2, 31, 24, .8);
          color: #fff;
          font-size: 12px;
          font-weight: 650;
          line-height: 1.3;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .mcp-gallery .g-photo-title {
          display: none;
          max-width: 100%;
          overflow: hidden;
          color: #fff;
          font-size: 12px;
          line-height: 1.4;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* SEPARATE EVENT SECTIONS */

        .mcp-gallery .g-event-section {
          margin-bottom: 34px;
        }

        .mcp-gallery .g-event-heading {
          margin: 0 0 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--g-border);
          color: var(--g-dark);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.3;
        }

        .mcp-gallery .g-event-section:last-child {
          margin-bottom: 0;
        }

        .mcp-gallery .g-empty {
          display: flex;
          min-height: 240px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 30px 20px;
          border: 1px dashed #d8e1da;
          border-radius: 14px;
          background: #fafcf9;
          text-align: center;
        }

        .mcp-gallery .g-empty > svg {
          width: 40px;
          height: 40px;
          color: var(--g-green);
        }

        .mcp-gallery .g-empty h3 {
          margin: 13px 0 5px;
          color: var(--g-dark);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
        }

        .mcp-gallery .g-empty p {
          margin: 0 0 17px;
          color: var(--g-muted);
          font-size: 14px;
        }

        .mcp-gallery .g-reset-button {
          padding: 10px 17px;
          border: 1px solid var(--g-green);
          border-radius: 8px;
          background: var(--g-green);
          color: #fff;
          cursor: pointer;
          font-weight: 600;
        }

        /* LIGHTBOX */

        .mcp-gallery .g-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 70px 35px;
          background: rgba(1, 19, 14, .96);
          backdrop-filter: blur(8px);
          animation: g-fade-in .25s ease both;
        }

        .mcp-gallery .g-lightbox-close {
          position: absolute;
          top: 20px;
          right: 24px;
          display: flex;
          width: 45px;
          height: 45px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(214, 173, 82, .5);
          border-radius: 50%;
          background: rgba(255, 255, 255, .08);
          color: #fff;
          cursor: pointer;
          transition: all .25s ease;
        }

        .mcp-gallery .g-lightbox-close:hover {
          background: var(--g-gold);
          color: var(--g-deep);
        }

        .mcp-gallery .g-lightbox-content {
          display: flex;
          max-width: 1100px;
          max-height: 100%;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 15px;
        }

        .mcp-gallery .g-lightbox-content > img {
          display: block;
          max-width: 100%;
          max-height: 72vh;
          border: 1px solid rgba(214, 173, 82, .35);
          border-radius: 9px;
          object-fit: contain;
          box-shadow: 0 15px 60px rgba(0, 0, 0, .35);
        }

        .mcp-gallery .g-lightbox-caption {
          text-align: center;
        }

        .mcp-gallery .g-lightbox-caption > span {
          color: var(--g-gold-light);
          font-size: 13px;
          font-weight: 700;
        }

        .mcp-gallery .g-lightbox-caption h3 {
          margin: 5px 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
        }

        .mcp-gallery .g-lightbox-caption p {
          margin: 0;
          color: rgba(255, 255, 255, .72);
          font-size: 14px;
        }

        .mcp-gallery .g-lightbox-nav {
          position: absolute;
          top: 50%;
          display: flex;
          width: 45px;
          height: 45px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(214, 173, 82, .55);
          border-radius: 50%;
          background: rgba(255, 255, 255, .08);
          color: #fff;
          cursor: pointer;
          transform: translateY(-50%);
          transition: all .25s ease;
        }

        .mcp-gallery .g-lightbox-nav:hover {
          background: var(--g-gold);
          color: var(--g-deep);
        }

        .mcp-gallery .g-lightbox-nav.previous {
          left: 18px;
        }

        .mcp-gallery .g-lightbox-nav.next {
          right: 18px;
        }

        .mcp-gallery button:focus-visible {
          outline: 3px solid var(--g-gold);
          outline-offset: 3px;
        }

        @keyframes g-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 1100px) {
          .mcp-gallery .g-container {
            padding-right: 4%;
            padding-left: 4%;
          }

          .mcp-gallery .g-hero {
            padding-right: 5%;
            padding-left: 5%;
          }

          .mcp-gallery .g-year-section {
            align-items: flex-start;
            flex-direction: column;
            gap: 13px;
          }

          .mcp-gallery .g-category-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .mcp-gallery .g-photo-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .mcp-gallery .g-hero {
            padding: 28px 22px 26px;
          }

          .mcp-gallery .g-college-name {
            gap: 9px;
            margin-bottom: 14px;
            font-size: 10px;
            letter-spacing: 1px;
          }

          .mcp-gallery .g-gold-line {
            width: 35px;
          }

          .mcp-gallery .g-hero-title {
            font-size: clamp(43px, 11vw, 60px);
            letter-spacing: -1.5px;
          }

          .mcp-gallery .g-hero-title::after {
            right: -25px;
            width: 17px;
          }

          .mcp-gallery .g-hero-description {
            max-width: 480px;
            margin-top: 13px;
            font-size: 14px;
            line-height: 1.6;
          }

          .mcp-gallery .g-decoration-leaf {
            top: 25px;
            right: -6%;
            font-size: 70px;
            opacity: .4;
          }

          .mcp-gallery .g-container {
            padding: 0 18px 40px;
          }

          .mcp-gallery .g-year-section {
            min-height: auto;
            padding: 19px 0;
          }

          .mcp-gallery .g-section-heading {
            gap: 9px;
          }

          .mcp-gallery .g-section-heading > svg {
            width: 21px;
            height: 21px;
          }

          .mcp-gallery .g-section-heading h2 {
            font-size: 20px;
          }

          .mcp-gallery .g-year-filters {
            width: 100%;
            gap: 7px;
          }

          .mcp-gallery .g-year-button {
            min-width: auto;
            padding: 9px 12px;
            font-size: 12px;
          }

          .mcp-gallery .g-category-section {
            padding: 21px 0 25px;
          }

          .mcp-gallery .g-category-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 9px;
          }

          .mcp-gallery .g-category-card {
            min-height: 103px;
            padding: 12px 8px;
          }

          .mcp-gallery .g-category-icon {
            width: 43px;
            height: 43px;
          }

          .mcp-gallery .g-category-icon svg {
            width: 24px;
            height: 24px;
          }

          .mcp-gallery .g-category-name {
            font-size: 12px;
          }

          .mcp-gallery .g-photos-header {
            align-items: stretch;
            flex-direction: column;
            gap: 13px;
            margin-bottom: 14px;
          }

          .mcp-gallery .g-search {
            width: 100%;
            min-height: 44px;
          }

          .mcp-gallery .g-photo-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .mcp-gallery .g-photo-card {
            aspect-ratio: 1.15 / 1;
            border-radius: 9px;
          }

          .mcp-gallery .g-photo-year {
            top: 7px;
            left: 7px;
            padding: 5px 7px;
            font-size: 10px;
          }

          .mcp-gallery .g-photo-zoom {
            top: 6px;
            right: 6px;
            width: 29px;
            height: 29px;
            opacity: 1;
            transform: none;
          }

          .mcp-gallery .g-photo-zoom svg {
            width: 16px;
            height: 16px;
          }

          .mcp-gallery .g-photo-caption {
            right: 6px;
            bottom: 7px;
            left: 6px;
          }

          .mcp-gallery .g-photo-category {
            padding: 4px 5px;
            font-size: 10px;
            white-space: normal;
          }

          .mcp-gallery .g-event-section {
            margin-bottom: 26px;
          }

          .mcp-gallery .g-event-heading {
            margin-bottom: 14px;
            font-size: 23px;
          }

          .mcp-gallery .g-lightbox {
            padding: 70px 15px 25px;
          }

          .mcp-gallery .g-lightbox-content > img {
            max-height: 65vh;
          }

          .mcp-gallery .g-lightbox-close {
            top: 13px;
            right: 13px;
            width: 40px;
            height: 40px;
          }

          .mcp-gallery .g-lightbox-nav {
            top: auto;
            bottom: 17px;
            width: 42px;
            height: 42px;
            transform: none;
          }

          .mcp-gallery .g-lightbox-nav.previous {
            left: 20px;
          }

          .mcp-gallery .g-lightbox-nav.next {
            right: 20px;
          }

          .mcp-gallery .g-lightbox-caption h3 {
            font-size: 19px;
          }
        }

        @media (max-width: 380px) {
          .mcp-gallery .g-container {
            padding-right: 12px;
            padding-left: 12px;
          }

          .mcp-gallery .g-year-button {
            padding: 8px 9px;
            font-size: 11px;
          }

          .mcp-gallery .g-category-name {
            font-size: 11px;
          }

          .mcp-gallery .g-photo-grid {
            gap: 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mcp-gallery *,
          .mcp-gallery *::before,
          .mcp-gallery *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
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
            Explore moments from our campus life, clinical training,
            academic events, workshops, and student achievements
            through the years.
          </p>

          <div className="g-decoration" aria-hidden="true">
            <span className="g-decoration-line" />
            <span className="g-decoration-leaf">✧</span>
          </div>
        </div>
      </header>

      <div className="g-container">
        {/* BROWSE BY YEAR */}
        <section className="g-year-section">
          <div className="g-section-heading">
            <CalendarDays aria-hidden="true" />
            <h2>Browse by Year</h2>
          </div>

          <div className="g-year-filters">
            {years.map((year) => (
              <button
                type="button"
                key={year}
                className={`g-year-button ${
                  selectedYear === year ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedYear(year);
                  setLightboxIndex(null);
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </section>

        {/* EXPLORE CATEGORIES */}
        <section className="g-category-section">
          <div className="g-section-heading">
            <div className="g-grid-icon" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>

            <h2>Explore Categories</h2>
          </div>

          <div className="g-category-grid">
            {categories.map(({ name, icon: Icon }) => (
              <button
                type="button"
                key={name}
                className={`g-category-card ${
                  selectedCategory === name ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedCategory(name);
                  setLightboxIndex(null);
                }}
                aria-pressed={selectedCategory === name}
              >
                <span className="g-category-icon">
                  <Icon aria-hidden="true" />
                </span>

                <span className="g-category-name">{name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* PHOTO GALLERY */}
        <section className="g-photos-section">
          <div className="g-photos-header">
            <div className="g-section-heading">
              <ImageIcon aria-hidden="true" />
              <h2>Photo Gallery</h2>

              <span className="g-photo-count">
                {filteredPhotos.length} photos
              </span>
            </div>

           
          </div>

          {filteredPhotos.length > 0 ? (
            selectedCategory === 'Events & Celebrations' ? (
              <div className="g-event-sections">
                {eventSections.map((section) => (
                  <section
                    className="g-event-section"
                    key={section.title}
                  >
                    <h3 className="g-event-heading">
                      {section.title}
                    </h3>

                    <div className="g-photo-grid">
                      {section.photos.map((photo) => {
                        const originalIndex =
                          filteredPhotos.indexOf(photo);

                        return (
                          <button
                            type="button"
                            key={`${photo.id}-${photo.image}`}
                            className="g-photo-card"
                            onClick={() =>
                              setLightboxIndex(originalIndex)
                            }
                            aria-label={`View ${photo.title}`}
                          >
                            <img
                              src={photo.image}
                              alt={photo.title}
                              loading="lazy"
                            />

                            <span className="g-photo-year">
                              {getPhotoYear(photo) || 'Gallery'}
                            </span>

                            <span className="g-photo-zoom">
                              <ZoomIn aria-hidden="true" />
                            </span>

                            <span className="g-photo-caption">
                              <span className="g-photo-category">
                                {section.title}
                              </span>

                              <span className="g-photo-title">
                                {photo.title}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="g-photo-grid">
                {filteredPhotos.map((photo, index) => (
                  <button
                    type="button"
                    key={`${photo.id}-${photo.image}-${index}`}
                    className="g-photo-card"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`View ${photo.title}`}
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      loading="lazy"
                    />

                    <span className="g-photo-year">
                      {getPhotoYear(photo) || 'Gallery'}
                    </span>

                    <span className="g-photo-zoom">
                      <ZoomIn aria-hidden="true" />
                    </span>

                    <span className="g-photo-caption">
                      <span className="g-photo-category">
                        {normalizeCategory(photo.category || '')}
                      </span>

                      <span className="g-photo-title">
                        {photo.title}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )
          ) : (
            <div className="g-empty">
              <ImageIcon aria-hidden="true" />
              <h3>No photos found</h3>

              <p>
                Try another year, category, or search term.
              </p>

              <button
                type="button"
                className="g-reset-button"
                onClick={clearFilters}
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* LIGHTBOX */}
      {activePhoto && (
        <div
          className="g-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="g-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close photo viewer"
          >
            <X />
          </button>

          {filteredPhotos.length > 1 && (
            <>
              <button
                type="button"
                className="g-lightbox-nav previous"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft />
              </button>

              <button
                type="button"
                className="g-lightbox-nav next"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
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
            <img
              src={activePhoto.image}
              alt={activePhoto.title}
            />

            <div className="g-lightbox-caption">
              <span>{getPhotoYear(activePhoto)}</span>

              <h3>{activePhoto.title}</h3>

              <p>
                {normalizeCategory(activePhoto.category || '')}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}