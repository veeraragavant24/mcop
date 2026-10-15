import type { SearchItem } from '@/types/siteSearch';

const pageSources = import.meta.glob('/src/pages/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const dataSources = import.meta.glob('/src/data/*.ts', {
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
    'ours',
    'our college',
    'about our college',
    'college introduction',
    'flagship program',
    'evidence-based curriculum',
    'hands-on clinical training',
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
    'our vision',
    'mission',
    'our mission',
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
    'program',
    'programs',
    'programs offered',
    'our physiotherapy programs',
    'course details',
    'course duration',
    'duration',
    'eligibility',
    'description',
    'specialization',
    'specializations',
    'mpt specializations',
    'areas of specialization',
    'admission process',
    'submit enquiry',
    'verify eligibility',
    'entrance assessment',
    'enrollment',
    'bpt',
    'bachelor of physiotherapy',
    'mpt',
    'master of physiotherapy',
    'undergraduate',
    'postgraduate',
    'doctoral research',
    'physiotherapy degree',
  ],

  Departments: [
    'department',
    'departments',
    'physiotherapy departments',
    'key focus areas',
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
    'our facilities',
    'infrastructure',
    'laboratory',
    'laboratories',
    'lab',
    'library',
    'clinical training facilities',
    'hands-on training',
    'rehabilitation practice',
    'training spaces',
    'classrooms',
  ],

  Gallery: [
    'gallery',
    'photo gallery',
    'photos',
    'photo',
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
    'admissions office',
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

function extractSearchableText(source: string): string {
  return source
    // Remove imports and comments.
    .replace(/^\s*import[\s\S]*?;\s*$/gm, ' ')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|\s)\/\/.*$/gm, ' ')

    // Remove JSX tags but retain the text between them.
    .replace(/<\/?[A-Za-z][^>]*>/g, ' ')

    // Remove JSX expressions and JavaScript code blocks.
    .replace(/\{[^{}]*\}/g, ' ')

    // Remove common source-code punctuation.
    .replace(/[="'`;()[\],]/g, ' ')

    // Normalize whitespace.
    .replace(/\s+/g, ' ')
    .trim();
}

function matchesQuery(source: string, query: string): boolean {
  return extractSearchableText(source)
    .toLocaleLowerCase()
    .includes(query);
}

export function searchSiteText(query: string): SearchItem[] {
    const term = query.trim().toLocaleLowerCase();

  if (!term) return [];

  const results: SearchItem[] = [];

  const sharedDataText = Object.values(dataSources).join(' ');

  const pagesUsingSharedData = new Set([
    'Home',
    'Courses',
    'Departments',
    'Facilities',
    'Gallery',
    'NewsEvents',
  ]);

  for (const [filePath, source] of Object.entries(pageSources)) {
    const fileName =
      filePath.split('/').pop()?.replace(/\.tsx$/, '') ?? '';

    const route = routeByFile[fileName];

    if (!route) continue;

const aliases = keywordAliases[fileName] ?? [];

const matchesAlias = aliases.some((keyword) =>
  keyword.toLocaleLowerCase().includes(term)
);

const matchesPage =
  matchesQuery(source, term) || matchesAlias;
  
    const matchesSharedData =
      pagesUsingSharedData.has(fileName) &&
      matchesQuery(sharedDataText, term);

    if (matchesPage || matchesSharedData) {
      results.push({
        title: route.title,
        description: `Matching content on the ${route.title} page`,
        path: route.path,
      });
    }
  }

  return results.filter(
    (item, index, array) =>
      array.findIndex(
        (candidate) => candidate.path === item.path,
      ) === index,
  );
}