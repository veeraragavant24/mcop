
import type { SearchItem } from '@/types/siteSearch';

const pageSources = import.meta.glob('/src/pages/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const dataSources = import.meta.glob('/src/data/*.{ts,tsx,json}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const routeByFile: Record<string, { title: string; path: string }> = {
  Home: { title: 'Home', path: '/' },
  About: { title: 'About College', path: '/about' },
  VisionMission: { title: 'Vision & Mission', path: '/vision-mission' },
  MadhaGroup: { title: 'Madha Group', path: '/madha-group' },
  Courses: { title: 'Courses', path: '/courses' },
  Departments: { title: 'Departments', path: '/departments' },
  Facilities: { title: 'Facilities', path: '/facilities' },
  Gallery: { title: 'Gallery', path: '/gallery' },
  NewsEvents: { title: 'News & Events', path: '/news-events' },
  Contact: { title: 'Contact Us', path: '/contact' },
  Management: { title: 'Management', path: '/management' },
  Principal: { title: 'Principal', path: '/principal' },
  Faculty: { title: 'Faculty', path: '/faculty' },
};

const keywordAliases: Record<string, string[]> = {
  Home: [
    'home',
    'welcome',
    'our college',
    'college introduction',
    'flagship program',
    'evidence based curriculum',
    'hands on clinical training',
    'experienced faculty',
    'professional excellence',
    'madha educational group',
  ],
  About: [
    'about',
    'about us',
    'about college',
    'college history',
    'our institution',
    'institution profile',
  ],
  VisionMission: [
    'vision',
    'mission',
    'vision and mission',
    'core values',
    'quality education',
    'ethical practice',
    'patient care',
    'objectives',
    'community awareness',
  ],
  MadhaGroup: [
    'madha group',
    'group of institutions',
    'educational group',
  ],
  Courses: [
    'course',
    'courses',
    'programs offered',
    'course details',
    'course duration',
    'duration',
    'eligibility',
    'specialization',
    'mpt specializations',
    'admission process',
    'enrollment',
    'bpt',
    'bachelor of physiotherapy',
    'mpt',
    'master of physiotherapy',
    'undergraduate',
    'postgraduate',
    'physiotherapy degree',
  ],
  Departments: [
    'department',
    'departments',
    'clinical training',
    'orthopaedic',
    'orthopedics',
    'neurological',
    'neurology',
    'cardiopulmonary',
    'musculoskeletal',
    'rehabilitation',
  ],
  Facilities: [
    'facility',
    'facilities',
    'infrastructure',
    'laboratory',
    'laboratories',
    'lab',
    'library',
    'clinical training facilities',
    'hands on training',
    'rehabilitation practice',
    'classrooms',
  ],
  Gallery: [
    'gallery',
    'photo gallery',
    'photos',
    'images',
    'pictures',
    'campus life',
    'campus photos',
    'student activities',
  ],
  NewsEvents: [
    'news',
    'event',
    'events',
    'news and events',
    'latest news',
    'announcements',
    'upcoming events',
    'college activities',
  ],
  Contact: [
    'contact',
    'contact us',
    'address',
    'phone',
    'telephone',
    'email',
    'office hours',
    'general enquiry',
    'admission',
    'admissions',
    'apply',
    'apply now',
    'location',
    'directions',
  ],
  Management: [
    'management',
    'administration',
    'leadership',
    'chairman',
    'correspondent',
    'secretary',
    'management team',
  ],
  Principal: [
    'principal',
    'principal message',
    'principal profile',
    'professional experience',
    'areas of interest',
  ],
  Faculty: [
    'faculty',
    'staff',
    'teachers',
    'professor',
    'qualifications',
    'experience',
    'research',
    'faculty members',
    'teaching staff',
  ],
};

// Associate data files with pages based on their filenames.
// Example: coursesData.ts -> Courses; facilities.ts -> Facilities.
const dataFilePageHints: Record<string, string[]> = {
  course: ['Courses', 'Home'],
  department: ['Departments', 'Home'],
  facilit: ['Facilities', 'Home'],
  gallery: ['Gallery', 'Home'],
  news: ['NewsEvents', 'Home'],
  event: ['NewsEvents', 'Home'],
  faculty: ['Faculty', 'Home'],
  staff: ['Faculty', 'Home'],
  vision: ['VisionMission', 'Home'],
  mission: ['VisionMission', 'Home'],
  contact: ['Contact'],
  management: ['Management'],
  principal: ['Principal'],
  madha: ['MadhaGroup', 'Home'],
};

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&amp;/g, ' and ')
    .replace(/&nbsp;/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function cleanText(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract readable text from raw TSX/TS/JSON source.
 * This is a lightweight source extractor, not a JSX compiler.
 */
function extractSearchableText(source: string): string {
  return cleanText(
    source
      // Remove import and export statements.
      .replace(
        /^\s*(?:import|export)\s+(?:type\s+)?[\s\S]*?;\s*$/gm,
        ' ',
      )
      // Remove comments.
      .replace(/\/\*[\s\S]*?\*\//g, ' ')
      .replace(/(^|\s)\/\/.*$/gm, ' ')
      // Keep useful accessibility and image text before removing tags.
      .replace(
        /\b(?:alt|title|aria-label)\s*=\s*["']([^"']*)["']/g,
        ' $1 ',
      )
      // Remove complete script/style blocks if present.
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
      // Remove JSX/HTML tags.
      .replace(/<\/?[A-Za-z][^>]*>/g, ' ')
      // Remove JSX expressions. Complex dynamic expressions cannot
      // reliably be evaluated from raw source.
      .replace(/\{[^{}]*\}/g, ' ')
      // Remove common source-code syntax.
      .replace(/\b(?:const|let|var|return|function|className)\b/g, ' ')
      .replace(/[="'`;()[\],]/g, ' ')
      .replace(/\s+/g, ' '),
  );
}

/**
 * Read text from heading tags in a TSX page.
 * Supports ordinary headings such as <h2>Our Facilities</h2>.
 */
function extractHeadings(source: string): string[] {
  const headings: string[] = [];
  const headingRegex =
    /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi;

  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(source)) !== null) {
    const heading = cleanText(
      match[2]
        .replace(/<[^>]*>/g, ' ')
        .replace(/\{[^{}]*\}/g, ' ')
        .replace(/&amp;/g, '&'),
    );

    if (heading.length >= 2 && !headings.includes(heading)) {
      headings.push(heading);
    }
  }

  return headings;
}

/**
 * Make a short snippet from readable page text around a query match.
 */
function makeSnippet(content: string, query: string): string {
  const normalizedContent = normalizeText(content);
  const normalizedQuery = normalizeText(query);
  const words = normalizedQuery.split(' ').filter(Boolean);

  if (!content) {
    return 'Explore this section for more information.';
  }

  let position = normalizedContent.indexOf(normalizedQuery);

  // If the complete phrase is not present, find the first query word.
  if (position < 0) {
    const firstMatchingWord = words.find(
      (word) => normalizedContent.indexOf(word) >= 0,
    );

    if (firstMatchingWord) {
      position = normalizedContent.indexOf(firstMatchingWord);
    }
  }

  if (position < 0) {
    return content.slice(0, 150).trim() + (content.length > 150 ? '…' : '');
  }

  const start = Math.max(0, position - 55);
  const end = Math.min(content.length, position + 115);

  return (
    (start > 0 ? '…' : '') +
    content.slice(start, end).trim() +
    (end < content.length ? '…' : '')
  );
}

function getTitleScore(title: string, query: string): number {
  const normalizedTitle = normalizeText(title);
  const normalizedQuery = normalizeText(query);

  if (!normalizedTitle || !normalizedQuery) return 0;

  if (normalizedTitle === normalizedQuery) return 100;
  if (normalizedTitle.startsWith(normalizedQuery)) return 80;
  if (normalizedTitle.includes(normalizedQuery)) return 60;

  return 0;
}

function getMatchScore(
  title: string,
  content: string,
  aliases: string[],
  query: string,
): number {
  const normalizedQuery = normalizeText(query);
  const words = normalizedQuery.split(' ').filter(Boolean);

  if (!words.length) return 0;

  const normalizedTitle = normalizeText(title);
  const normalizedContent = normalizeText(content);
  const normalizedAliases = aliases.map(normalizeText);

  const titleContainsAllWords = words.every((word) =>
    normalizedTitle.includes(word),
  );

  const contentContainsAllWords = words.every((word) =>
    normalizedContent.includes(word),
  );

  // Match a complete alias phrase, not words scattered across
  // unrelated aliases.
  const aliasContainsAllWords = normalizedAliases.some((alias) =>
    words.every((word) => alias.includes(word)),
  );

  // Do not show a page merely because one word appears in an alias.
  if (
    !titleContainsAllWords &&
    !contentContainsAllWords &&
    !aliasContainsAllWords
  ) {
    return 0;
  }

  let score = getTitleScore(title, query);

  if (titleContainsAllWords) score += 35;
  if (contentContainsAllWords) score += 30;
  if (aliasContainsAllWords) score += 20;

  const matchedContentWords = words.filter((word) =>
    normalizedContent.includes(word),
  ).length;

  score += matchedContentWords * 8;

  if (normalizedContent.includes(normalizedQuery)) {
    score += 25;
  }

  return score;
}

/**
 * Include data files only for pages whose names match the data file.
 * This prevents all data files from being searched on every page.
 */
function getPageDataText(pageName: string): string {
  const matchingData: string[] = [];

  for (const [filePath, source] of Object.entries(dataSources)) {
    const fileName =
      filePath.split('/').pop()?.replace(/\.(ts|tsx|json)$/i, '') ?? '';

    const normalizedFileName = normalizeText(fileName).replace(/\s/g, '');
    const relatedPages = Object.entries(dataFilePageHints)
      .filter(([hint]) => normalizedFileName.includes(hint))
      .flatMap(([, pages]) => pages);

    if (relatedPages.includes(pageName)) {
      matchingData.push(extractSearchableText(source));
    }
  }

  return matchingData.join(' ');
}

export function searchSiteText(query: string): SearchItem[] {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) return [];

  const results: Array<SearchItem & { score: number }> = [];
  const seenResults = new Set<string>();

  for (const [filePath, source] of Object.entries(pageSources)) {
    const fileName =
      filePath.split('/').pop()?.replace(/\.tsx$/i, '') ?? '';

    const route = routeByFile[fileName];

    if (!route) continue;

    const aliases = keywordAliases[fileName] ?? [];
    const pageText = extractSearchableText(source);
    const dataText = getPageDataText(fileName);
    const searchableText = `${pageText} ${dataText}`.trim();

    const pageScore = getMatchScore(
      route.title,
      searchableText,
      aliases,
      normalizedQuery,
    );
    const courseQueryAliases = [
  'bachelor of physiotherapy',
  'bachelor physiotherapy',
  'bachelor of physiotherapy bpt',
  'bpt',
];

const normalizedCourseAliases = courseQueryAliases.map(normalizeText);

const courseMatch =
  fileName === 'Courses' &&
  normalizedCourseAliases.some(
    (alias) =>
      alias.includes(normalizedQuery) ||
      normalizedQuery.includes(alias),
  );

    // Add a page-level result when the page has a genuine match.
if (pageScore > 0 || courseMatch) {
        const pageKey = `${route.path}|page`;

      if (!seenResults.has(pageKey)) {
        seenResults.add(pageKey);

        results.push({
          title: route.title,
          description: makeSnippet(searchableText, query),
          path: route.path,
          score: pageScore,
        });
      }
    }

    // Add individual heading results when the heading or its related
    // page content matches the query.
    const headings = extractHeadings(source);

    for (const heading of headings) {
      const headingScore = getMatchScore(
        heading,
        searchableText,
        [],
        normalizedQuery,
      );

      if (headingScore <= 0) continue;

      const headingKey = `${route.path}|${normalizeText(heading)}`;

      if (seenResults.has(headingKey)) continue;
      seenResults.add(headingKey);

      results.push({
        title: `${route.title} — ${heading}`,
        description: makeSnippet(
          `${heading}. ${searchableText}`,
          query,
        ),
        path: route.path,
        score: headingScore + 10,
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .map(({ score: _score, ...item }) => item);
}
