
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Search, ArrowRight } from 'lucide-react';
import { useHeaderTheme } from '@/hooks/useHeaderTheme';
import { searchSiteText } from '@/utils/siteSearch';

const popularSearches = [
  'BPT',
  'MPT',
  'Clinical training',
  'Facilities',
  'Eligibility',
  'Departments',
];

function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

const mainNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Academics', path: '/courses' },
  { label: 'Admissions', path: '/contact' },
  { label: 'Departments', path: '/departments' },
  { label: 'Facilities', path: '/facilities' },
  { label: 'Student Life', path: '/gallery' },
];

const allNavLinks = [
  ...mainNavLinks,
  { label: 'Vision & Mission', path: '/vision-mission' },
  { label: 'Madha Group', path: '/madha-group' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'News & Events', path: '/news-events' },
  { label: 'Contact Us', path: '/contact' },
];

const aboutSubmenuLinks = [
  { label: 'About College', path: '/about' },
  { label: 'Management', path: '/management' },
  { label: 'Principal', path: '/principal' },
  { label: 'Faculty', path: '/faculty' },
];

interface NavbarProps {
  onEnquiryClick: () => void;
}

export default function Navbar({ onEnquiryClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const [theme, isScrolled] = useHeaderTheme();

  // Search results: rank titles and snippets by relevance.
  const searchResults = searchQuery.trim()
    ? [...searchSiteText(searchQuery)].sort((a, b) => {
        const query = normalizeSearchText(searchQuery);
        const words = query.split(' ').filter(Boolean);

        const getScore = (title: string, description: string) => {
          const normalizedTitle = normalizeSearchText(title);
          const normalizedDescription = normalizeSearchText(description);
          let score = 0;

          if (normalizedTitle === query) score += 100;
          else if (normalizedTitle.startsWith(query)) score += 60;
          else if (normalizedTitle.includes(query)) score += 40;

          if (normalizedDescription.includes(query)) score += 25;

          score +=
            words.filter((word) => normalizedTitle.includes(word)).length * 10;

          score +=
            words.filter((word) => normalizedDescription.includes(word)).length * 5;

          return score;
        };

        return (
          getScore(b.title ?? '', b.description ?? '') -
          getScore(a.title ?? '', a.description ?? '')
        );
      })
    : [];

  useEffect(() => {
    setScrolled(isScrolled);
  }, [isScrolled]);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setAboutOpen(false);
  }, [location.pathname]);

  // Scroll to matching page content after selecting a search result.
  useEffect(() => {
    const savedTerm = sessionStorage.getItem('site-search-target');
    if (!savedTerm) return;

    sessionStorage.removeItem('site-search-target');

    const timer = window.setTimeout(() => {
      const queryWords = normalizeSearchText(savedTerm)
        .split(' ')
        .filter(Boolean);

      if (queryWords.length === 0) return;

      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(
          'h1, h2, h3, h4, p, li, article, section[id], [data-search-section]',
        ),
      );

      const matchingElement = candidates.find((element) => {
        const text = normalizeSearchText(
          element.innerText || element.textContent || '',
        );

        return (
          text.length > 0 &&
          queryWords.every((word) => text.includes(word))
        );
      });

      if (matchingElement) {
        const section = matchingElement.closest<HTMLElement>(
          'section[id], article[id], [data-search-section]',
        );

        const target = section ?? matchingElement;

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        if (target.id) {
          window.history.replaceState(
            null,
            '',
            `${window.location.pathname}${window.location.search}#${target.id}`,
          );
        }
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const isAboutActive = [
    '/about',
    '/management',
    '/principal',
    '/faculty',
  ].includes(location.pathname);

  const isDark = theme === 'dark';

  const textColor = isDark ? 'text-white' : 'text-forest-800';

  const hoverBg = isDark
    ? 'hover:bg-white/15'
    : 'hover:bg-forest-700/10';

  const brandColor = isDark ? 'text-white' : 'text-forest-800';

  const goldText = isDark ? 'text-gold-400' : 'text-gold-600';

  const openSearchResult = (path: string) => {
    const term = searchQuery.trim();

    if (term) {
      sessionStorage.setItem('site-search-target', term);
    }

    setSearchOpen(false);
    setSearchQuery('');
    setAboutOpen(false);
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-[2px]' : ''
      }`}
    >
      <nav className="container-mcp">
        <div className="flex items-center justify-between py-3">
          {/* Logo and college name */}
          <Link
            to="/"
            onClick={() => {
              setAboutOpen(false);
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="sticky-logo-fog relative flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 shrink-0">
              <div className="sticky-logo-shine absolute inset-0 rounded-full" />

              <img
                src="/logos/mdch-logo (1).png"
                alt="Madha College of Physiotherapy"
                className="relative z-10 w-[105%] h-[105%] max-w-none max-h-none object-contain p-0"
                style={{
                  width: '105%',
                  height: '105%',
                  flexShrink: 0,
                }}
              />
            </div>

            <div>
              <p
                className={`font-serif text-sm lg:text-[26px] font-bold leading-tight tracking-wide transition-colors duration-500 ${brandColor}`}
              >
                MADHA COLLEGE
              </p>

              <p
                className={`text-[10px] lg:text-[14px] font-semibold font-[Montserrat] tracking-[0.15em] uppercase transition-colors duration-500 ${goldText}`}
              >
                Of Physiotherapy
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden lg:flex items-center gap-2">
            {mainNavLinks.map((link) => {
              const isAboutButton = link.label === 'About Us';
              const active = isActive(link.path);

              const showNormalActiveUnderline =
                active && !aboutOpen && !isAboutActive;

              return (
                <li key={link.label} className="relative">
                  {isAboutButton ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setAboutOpen((previous) => !previous)
                        }
                        aria-expanded={aboutOpen}
                        className={`group relative inline-flex items-center gap-1 px-3 xl:px-4 py-2 transition-colors ${
                          isDark
                            ? 'text-white/80 hover:text-white'
                            : 'text-forest-700/70 hover:text-forest-800'
                        }`}
                        style={{ fontSize: '13px', fontWeight: 600 }}
                      >
                        About Us

                        <span
                          className={`inline-block text-xs transition-transform duration-300 ${
                            aboutOpen ? 'rotate-180' : ''
                          }`}
                        >
                          ▾
                        </span>

                        <span
                          aria-hidden="true"
                          className={`absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-[#D4AF37] transition-transform duration-300 ${
                            aboutOpen || isAboutActive
                              ? 'scale-x-100'
                              : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                          style={{ transformOrigin: 'center' }}
                        />
                      </button>

                      {aboutOpen && (
                        <div className="absolute left-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                          {aboutSubmenuLinks.map((item) => {
                            const submenuActive = isActive(item.path);

                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setAboutOpen(false)}
                                className={`block px-3 py-2 text-xs transition-colors duration-200 ${
                                  submenuActive
                                    ? 'bg-[#D4AF37] font-bold text-forest-800'
                                    : 'font-medium text-forest-800 hover:bg-[#F4D77E] hover:text-forest-900'
                                }`}
                              >
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setAboutOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      style={{ fontSize: '13px', fontWeight: 600 }}
                      className={`group relative inline-flex px-3 xl:px-4 py-2 transition-colors duration-300 ${
                        isDark
                          ? active
                            ? 'text-white'
                            : 'text-white/80 hover:text-white'
                          : active
                            ? 'text-forest-800'
                            : 'text-forest-700/70 hover:text-forest-800'
                      }`}
                    >
                      {link.label}

                      <span
                        aria-hidden="true"
                        className={`absolute left-3 right-3 bottom-0 h-[3px] rounded-full bg-[#D4AF37] transition-transform duration-300 ${
                          showNormalActiveUnderline
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                        style={{ transformOrigin: 'center' }}
                      />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Search and mobile controls */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((previous) => !previous)}
              className={`w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-colors ${textColor} ${hoverBg}`}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Apply Now — tablet */}
            <button
              type="button"
              onClick={onEnquiryClick}
              className="hidden md:inline-flex lg:hidden items-center gap-1.5 px-4 py-2 bg-forest-700 text-white text-xs font-semibold rounded-lg border-b-2 border-gold-500 active:scale-95"
            >
              Apply
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors ${textColor} ${hoverBg}`}
              onClick={() => setMobileOpen((previous) => !previous)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="container-mcp pb-3 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' &&
                    searchResults.length > 0
                  ) {
                    openSearchResult(searchResults[0].path);
                  }

                  if (event.key === 'Escape') {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }
                }}
                placeholder="Search courses, departments, facilities..."
                className="flex-1 text-sm outline-none text-gray-700"
                autoFocus
              />

              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-sm font-medium text-forest-700 hover:text-gold-600 transition-colors"
              >
                Close
              </button>
            </div>

            {!searchQuery.trim() && (
              <div className="mt-4 border-t border-gray-100 pt-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Popular searches
                </p>

                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setSearchQuery(suggestion)}
                      className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-forest-800 transition-colors hover:border-gold-500 hover:bg-gold-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery.trim() && (
              <div className="mt-4 border-t border-gray-100 pt-3">
                {searchResults.length > 0 ? (
                  <ul className="space-y-2 max-h-64 overflow-y-auto">
                    {searchResults.map((item) => (
                      <li key={`${item.path}-${item.title}`}>
                        <button
                          type="button"
                          onClick={() => openSearchResult(item.path)}
                          className="w-full text-left rounded-xl p-3 hover:bg-gray-50 transition-colors"
                        >
                          <span className="block text-sm font-semibold text-forest-800">
                            {item.title}
                          </span>

                          <span className="block text-xs text-gray-500 mt-1">
                            {item.description}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 py-3">
                    No matching content found. Try another word.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-forest-900/95 backdrop-blur-md max-h-[75vh] overflow-y-auto animate-slide-in">
          <ul className="container-mcp py-4 space-y-1">
            {allNavLinks.map((link) => {
              const isAboutButton = link.label === 'About Us';

              return (
                <li key={`${link.label}-${link.path}`}>
                  {isAboutButton ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setAboutOpen((previous) => !previous)
                        }
                        aria-expanded={aboutOpen}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          isAboutActive
                            ? 'text-gold-400 bg-white/10 border-l-4 border-gold-500'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        About Us
                        <span
                          className={`transition-transform duration-300 ${
                            aboutOpen ? 'rotate-180' : ''
                          }`}
                        >
                          ▾
                        </span>
                      </button>

                      {aboutOpen && (
                        <div className="ml-4 mt-1 mb-2 overflow-hidden rounded-md border border-gray-200 bg-white">
                          {aboutSubmenuLinks.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => {
                                setAboutOpen(false);
                                setMobileOpen(false);
                              }}
                              className={`block px-4 py-3 text-sm transition-colors ${
                                isActive(item.path)
                                  ? 'bg-[#D4AF37] font-bold text-forest-800'
                                  : 'font-medium text-forest-800 hover:bg-[#F4D77E]'
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => {
                        setAboutOpen(false);
                        setMobileOpen(false);
                      }}
                      className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive(link.path)
                          ? 'text-gold-400 bg-white/10 border-l-4 border-gold-500'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}

            <li className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onEnquiryClick();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 text-forest-900 font-semibold rounded-xl transition-all duration-300 active:scale-95"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </li>

            <li className="pt-2">
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="block text-center text-sm text-white/70 font-medium py-2"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
