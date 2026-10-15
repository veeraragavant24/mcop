import { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route,useLocation,useNavigate,} from 'react-router-dom';
import StickyNavbar from '@/components/StickyNavbar';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';
import Chatbot from '@/components/Chatbot';
import ScrollToTop from '@/components/ScrollToTop';
import SocialContactBar from '@/components/SocialContactBar';
import Home from '@/pages/Home';
import About from '@/pages/About';
import VisionMission from '@/pages/VisionMission';
import MadhaGroup from '@/pages/MadhaGroup';
import Courses from '@/pages/Courses';
import Departments from '@/pages/Departments';
import Facilities from '@/pages/Facilities';
import Gallery from '@/pages/Gallery';
import NewsEvents from '@/pages/NewsEvents';
import Contact from '@/pages/Contact';
import AdminLogin from '@/pages/AdminLogin';
import AdminNewsEvents from '@/pages/AdminNewsEvents';
import Management from "./pages/Management";
import Principal from "./pages/Principal";
import Faculty from "./pages/Faculty";




function RefreshToHome() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePageShow = () => {
      // Navigation on refresh is handled below.
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return null;
}

interface LayoutProps {
  onEnquiryClick: () => void;
}

/** Finds the requested text after a search result opens its page. */
function SearchJumpHandler() {
  const location = useLocation();

  useEffect(() => {
    const term = sessionStorage.getItem('site-search-target');
    if (!term) return;

    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (cancelled) return;

      const root = document.querySelector('main') ?? document.body;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const normalizedTerm = term.toLocaleLowerCase();
      let textNode: Node | null;

      while ((textNode = walker.nextNode())) {
        const parent = textNode.parentElement;
        if (!parent || parent.closest('script, style, noscript, mark, input, textarea, button')) {
          continue;
        }

        const text = textNode.textContent ?? '';
        const start = text.toLocaleLowerCase().indexOf(normalizedTerm);
        if (start < 0) continue;

        const range = document.createRange();
        range.setStart(textNode, start);
        range.setEnd(textNode, start + term.length);

        const mark = document.createElement('mark');
        mark.className = 'site-search-highlight';
        try {
          range.surroundContents(mark);
        } catch {
          // If the text node cannot be wrapped, still scroll to its containing block.
        }

        const target = mark.isConnected ? mark : parent;
        const block = target.closest('p, h1, h2, h3, h4, li, section, div') ?? target;
        block.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.setTimeout(() => window.scrollBy({ top: -110, behavior: 'smooth' }), 100);
        sessionStorage.removeItem('site-search-target');
        return;
      }

      // Keep no stale search query if the selected page has no exact rendered match.
      sessionStorage.removeItem('site-search-target');
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [location.pathname]);

  return null;
}

function Layout({ onEnquiryClick }: LayoutProps) {
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleOpenAdmissionEnquiry = () => {
      onEnquiryClick();
    };

    window.addEventListener(
      'open-admission-enquiry',
      handleOpenAdmissionEnquiry
    );

    return () => {
      window.removeEventListener(
        'open-admission-enquiry',
        handleOpenAdmissionEnquiry
      );
    };
  }, [onEnquiryClick]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SearchJumpHandler />
      {!isHome && <StickyNavbar onEnquiryClick={onEnquiryClick} />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onEnquiryClick={onEnquiryClick} />} />
          <Route path="/about" element={<About />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/madha-group" element={<MadhaGroup />} />
          <Route path="/courses" element={<Courses onEnquiryClick={onEnquiryClick} />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/facilities" element={<Facilities onEnquiryClick={onEnquiryClick} />} />
         <Route path="/gallery" element={<Gallery />} />
<Route path="/news-events" element={<NewsEvents />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/management" element={<Management />} />
      <Route path="/principal" element={<Principal />} />
      <Route path="/faculty" element={<Faculty />} />
     

        </Routes>
      </main>
      <Footer onEnquiryClick={onEnquiryClick} />
      <SocialContactBar />
      <Chatbot />
    </div>
  );
}


export default function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const openEnquiry = () => setEnquiryOpen(true);
  const closeEnquiry = () => setEnquiryOpen(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
 
<Routes>
  <Route path="/admin" element={<AdminLogin />} />

  <Route
    path="/admin/news-events"
    element={<AdminNewsEvents />}
  />

  <Route
    path="*"
    element={
      <>
        <Layout onEnquiryClick={openEnquiry} />
        <EnquiryModal
          isOpen={enquiryOpen}
          onClose={closeEnquiry}
        />
      </>
    }
  />
</Routes>


    </BrowserRouter>
  );
}
