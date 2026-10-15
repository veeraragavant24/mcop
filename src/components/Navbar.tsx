
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Search, X as CloseIcon } from 'lucide-react';
import { useHeaderTheme } from '@/hooks/useHeaderTheme';
import { searchSiteText } from '@/utils/siteSearch';

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
  const [notifVisible, setNotifVisible] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const [theme, isScrolled] = useHeaderTheme();

  const searchResults = searchQuery.trim()
    ? searchSiteText(searchQuery)
    : [];

  const handleSearchResult = (path: string) => {
    const term = searchQuery.trim();

    if (term) {
      sessionStorage.setItem('site-search-target', term);
    }

    setSearchOpen(false);
    setSearchQuery('');
    setAboutOpen(false);
    navigate(path);
  };

  useEffect(() => {
    setScrolled(isScrolled);
  }, [isScrolled]);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setAboutOpen(false);
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

  return (
    <>
      {/* Main Navigation */}
      <div
        className={`absolute top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? 'lg:fixed lg:backdrop-blur-[2px]' : ''
        }`}
      >
        <nav className="container-mcp">
          <div className="flex items-center justify-between py-3 lg:py-4">
            {/* Logo and branding */}
            <Link
              to="/"
              onClick={() => setAboutOpen(false)}
              className="flex items-center gap-3 shrink-0 group"
            >
            
<div className="flex items-center gap-2 sm:gap-3 -translate-x-2 sm:-translate-x-3 lg:translate-x-0 lg:gap-3">
  <div className="logo-fog w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-24 lg:h-24">
    <div className="logo-shine relative w-full h-full flex items-center justify-center shrink-0">
      <img
        src="/logos/mdch-logo (1).png"
        alt="Madha College of Physiotherapy"
        className="w-full h-full object-contain"
      />
    </div>
  </div>

  <div className="min-w-0">
    <p
      className={`font-serif text-sm sm:text-base md:text-lg lg:text-3xl font-bold leading-tight tracking-wide transition-colors duration-300 ${brandColor}`}
    >
      MADHA COLLEGE
    </p>

    <p
      className={`text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold font-[Montserrat] tracking-[0.1em] sm:tracking-[0.15em] uppercase transition-colors duration-300 ${goldText}`}
    >
      Of Physiotherapy
    </p>
  </div>
</div>

            </Link>

            {/* Desktop navigation */}
            <ul className="hidden lg:flex items-center gap-2">
              {mainNavLinks.map((link) => {
                const active = isActive(link.path);
                const isAboutButton = link.label === 'About Us';

                /*
                 * Only one active underline is displayed.
                 * Opening About Us temporarily suppresses Home's
                 * active underline without changing the current route.
                 */
                const showNormalActiveUnderline =
                  active && !(link.path === '/' && aboutOpen);

                return (
                  <li key={link.label} className="relative">
                    
{isAboutButton ? (
  <div className="relative">
    <button
      type="button"
      onClick={() => setAboutOpen((previous) => !previous)}
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
        className={`inline-block text-xs transition-transform ${
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

<div className="absolute left-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-md border border-[#C9A227] bg-[#F5D76E] py-1 shadow-lg">
        {aboutSubmenuLinks.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setAboutOpen(false)}
              
className={`block px-3 py-2 text-xs transition-colors duration-200 ${
  active
    ? 'bg-[#D4AF37] font-bold text-forest-800'
    : 'text-forest-800 font-medium hover:bg-[#D4AF37] hover:text-forest-900'
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
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                        }}
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

                        {/* Normal navigation underline */}
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
            <div className="flex items-center gap-1 lg:gap-2 shrink-0 ml-1">
              <button
                type="button"
                onClick={() => setSearchOpen((previous) => !previous)}
                className={`w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center translate-y-0 transition-colors ${textColor} ${hoverBg}`}
                aria-label="Search"
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

              {/* Mobile hamburger */}
              <button
                type="button"
                className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors ${textColor} ${hoverBg}`}
                onClick={() =>
                  setMobileOpen((previous) => !previous)
                }
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

        {/* Search bar overlay */}
        {searchOpen && (
          <div className="container-mcp pb-3 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />

                <input
                  type="text"
                  placeholder="Search courses, departments, facilities..."
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Enter' &&
                      searchResults.length > 0
                    ) {
                      handleSearchResult(searchResults[0].path);
                    }
                  }}
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

              {searchQuery.trim() && (
                <div className="mt-4 border-t border-gray-100 pt-3">
                  {searchResults.length > 0 ? (
                    <ul className="space-y-2 max-h-64 overflow-y-auto">
                      {searchResults.map((item) => (
                        <li key={item.path}>
                          <button
                            type="button"
                            onClick={() =>
                              handleSearchResult(item.path)
                            }
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-forest-900/95 backdrop-blur-md max-h-[75vh] overflow-y-auto animate-slide-in">
            <ul className="container-mcp py-4 space-y-1">
              {allNavLinks.map((link) => (
                <li key={`${link.label}-${link.path}`}>
                  <Link
                    to={link.path}
                    onClick={() => setAboutOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'text-gold-400 bg-white/10 border-l-4 border-gold-500'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="pt-3" />

              <li className="pt-2">
                <Link
                  to="/admin"
                  onClick={() => setAboutOpen(false)}
                  className="block text-center text-sm text-white/70 font-medium py-2"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Floating Admission Notification Card */}
      {notifVisible && !mobileOpen && (
        <div className="absolute bottom-6 right-4 lg:right-8 z-30 max-w-[300px] animate-fade-up">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex">
            <div className="w-20 h-20 shrink-0 overflow-hidden bg-forest-100">
              <img
                src="https://images.pexels.com/photos/20860622/pexels-photo-20860622.jpeg?auto=compress&cs=tinysrgb&h=200&w=200"
                alt="Admissions"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 p-3 relative">
              <button
                type="button"
                onClick={() => setNotifVisible(false)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
                aria-label="Close notification"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>

              <p className="text-xs font-bold text-forest-800 leading-snug mb-1">
                Admissions Open
              </p>

              <p className="text-[0.7rem] text-gray-500 leading-snug mb-2 pr-4">
                Explore opportunities at Madha College of Physiotherapy.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
