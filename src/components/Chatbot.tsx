
import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  X,
  Send,
  Bot,
  Building2,
  BookOpen,
  FileText,
  Phone,
  Smile,
  Activity,
  Info,
  GraduationCap,
  ClipboardList,
  Clock,
  Wallet,
  ChevronRight,
  ArrowLeft,
  Home,
  RotateCcw,
} from 'lucide-react';

interface ChatbotProps {
  navigate?: (page: string) => void;
}

interface Message {
  role: 'bot' | 'user';
  text: string;
}

interface ChatOption {
  label: string;
  value: string;
  icon?: ReactNode;
}

type Menu =
  | 'main'
  | 'courses'
  | 'course-actions'
  | 'departments'
  | 'facilities'
  | 'student-facilities'
  | 'about'
  | 'contact'
  | 'admission';

const mainOptions: ChatOption[] = [
  { label: 'Admissions', value: 'admission', icon: <FileText size={19} /> },
  { label: 'Courses', value: 'courses', icon: <BookOpen size={19} /> },
  { label: 'Departments', value: 'departments', icon: <Activity size={19} /> },
  { label: 'Campus & Facilities', value: 'facilities', icon: <Building2 size={19} /> },
  { label: 'About the College', value: 'about', icon: <Info size={19} /> },
  { label: 'Contact Us', value: 'contact', icon: <Phone size={19} /> },
];

const courseOptions: ChatOption[] = [
  { label: 'Bachelor of Physiotherapy (BPT)', value: 'bpt', icon: <GraduationCap size={19} /> },
  { label: 'Master of Physiotherapy (MPT)', value: 'mpt', icon: <GraduationCap size={19} /> },
  { label: 'Ph.D. in Physiotherapy', value: 'phd', icon: <BookOpen size={19} /> },
];

const courseActionOptions: ChatOption[] = [
  { label: 'Course Overview', value: 'course-overview', icon: <Info size={19} /> },
  { label: 'Eligibility Criteria', value: 'eligibility', icon: <ClipboardList size={19} /> },
  { label: 'Course Duration', value: 'duration', icon: <Clock size={19} /> },
  { label: 'Fees Information', value: 'fees', icon: <Wallet size={19} /> },
];

const departmentOptions: ChatOption[] = [
  { label: 'Musculoskeletal Physiotherapy', value: 'musculoskeletal', icon: <Activity size={19} /> },
  { label: 'Neurological Physiotherapy', value: 'neurological', icon: <Activity size={19} /> },
  { label: 'Cardiorespiratory Physiotherapy', value: 'cardiorespiratory', icon: <Activity size={19} /> },
  { label: 'Sports Physiotherapy', value: 'sports', icon: <Activity size={19} /> },
  { label: 'Community-Based Rehabilitation', value: 'community', icon: <Building2 size={19} /> },
];

const facilityOptions: ChatOption[] = [
  { label: 'Physiotherapy Laboratories', value: 'labs', icon: <Activity size={19} /> },
  { label: 'Clinical Training', value: 'clinical', icon: <Building2 size={19} /> },
  { label: 'Library & Learning Resources', value: 'library', icon: <BookOpen size={19} /> },
  { label: 'Classrooms', value: 'classrooms', icon: <Building2 size={19} /> },
  { label: 'Rehabilitation Equipment', value: 'equipment', icon: <Activity size={19} /> },
  { label: 'Student Facilities', value: 'student-facilities', icon: <GraduationCap size={19} /> },
];

const studentFacilityOptions: ChatOption[] = [
  { label: 'Hostel Information', value: 'hostel', icon: <Building2 size={19} /> },
  { label: 'Transport Information', value: 'transport', icon: <Building2 size={19} /> },
  { label: 'Other Student Facilities', value: 'other-student', icon: <Smile size={19} /> },
];

const aboutOptions: ChatOption[] = [
  { label: 'College Overview', value: 'about-overview', icon: <Info size={19} /> },
  { label: 'Vision & Mission', value: 'mission', icon: <BookOpen size={19} /> },
  { label: 'Achievements', value: 'achievements', icon: <GraduationCap size={19} /> },
];

const contactOptions: ChatOption[] = [
  { label: 'Contact Details', value: 'details', icon: <Phone size={19} /> },
  { label: 'Admission Enquiry', value: 'admission-enquiry', icon: <FileText size={19} /> },
  { label: 'Open Contact Page', value: 'contact-page', icon: <ChevronRight size={19} /> },
];

const admissionOptions: ChatOption[] = [
  { label: 'Admission Process', value: 'admission-process', icon: <ClipboardList size={19} /> },
  { label: 'Required Documents', value: 'documents', icon: <FileText size={19} /> },
  { label: 'Fees Information', value: 'fees-information', icon: <Wallet size={19} /> },
  { label: 'Admission Enquiry Form', value: 'admission-enquiry', icon: <Phone size={19} /> },
];

const menuTitles: Record<Menu, string> = {
  main: 'HOW CAN I HELP YOU?',
  courses: 'CHOOSE A COURSE',
  'course-actions': 'COURSE INFORMATION',
  departments: 'PHYSIOTHERAPY AREAS',
  facilities: 'CAMPUS & FACILITIES',
  'student-facilities': 'STUDENT FACILITIES',
  about: 'ABOUT THE COLLEGE',
  contact: 'CONTACT & ENQUIRIES',
  admission: 'ADMISSION ASSISTANCE',
};

const courseNames: Record<string, string> = {
  bpt: 'Bachelor of Physiotherapy (BPT)',
  mpt: 'Master of Physiotherapy (MPT)',
  phd: 'Ph.D. in Physiotherapy',
};

const courseInfo: Record<string, Record<string, string>> = {
  bpt: {
    'course-overview':
      'The Bachelor of Physiotherapy is an undergraduate programme focused on human movement, therapeutic exercise, physical rehabilitation, and improving functional ability. Please contact the college for its current approved curriculum.',
    eligibility:
      'BPT eligibility depends on the applicable university and regulatory requirements, including prescribed subjects and qualifying marks. Contact the admissions office to confirm the current criteria.',
    duration:
      'The BPT programme includes academic study and practical or clinical training. Please confirm the current programme duration and internship requirements with the college.',
    fees:
      'For the current BPT tuition fees, examination fees, and other charges, please contact the college admissions office. An official fee schedule has not been configured in this chatbot.',
  },
  mpt: {
    'course-overview':
      'The Master of Physiotherapy is a postgraduate programme focused on advanced physiotherapy knowledge, clinical practice, and rehabilitation. Please contact the college to confirm programme and specialization availability.',
    eligibility:
      'MPT admission generally requires a recognised BPT qualification and may involve additional university-specific requirements. Contact the admissions office to confirm the current criteria.',
    duration:
      'MPT duration and programme requirements depend on the approved course and applicable university regulations. Please confirm the current details with the college.',
    fees:
      'Please contact the college admissions office for current MPT fees and available specializations.',
  },
  phd: {
    'course-overview':
      'A Ph.D. is a research-focused qualification. Programme availability, research areas, supervisors, and admission procedures must be confirmed with the college or its affiliated university.',
    eligibility:
      'Ph.D. eligibility depends on the applicable university research regulations and current admission notification. Contact the relevant institution for the official criteria.',
    duration:
      'Research programme duration depends on university regulations, registration requirements, and research progress. Please check the current rules with the relevant university.',
    fees:
      'Contact the college or affiliated university for verified Ph.D. availability, admission details, and current fees.',
  },
};

const departmentDescriptions: Record<string, string> = {
  musculoskeletal:
    'Musculoskeletal physiotherapy focuses on bones, joints, muscles, posture, mobility, and rehabilitation after musculoskeletal injuries. Please confirm the department and its current services with the college.',
  neurological:
    'Neurological physiotherapy focuses on movement, balance, coordination, and functional rehabilitation for people with neurological conditions.',
  cardiorespiratory:
    'Cardiorespiratory physiotherapy focuses on breathing, exercise tolerance, and rehabilitation related to heart and lung conditions.',
  sports:
    'Sports physiotherapy focuses on injury prevention, physical performance, recovery, and safe return to activity.',
  community:
    'Community-based rehabilitation focuses on improving participation, independence, and access to rehabilitation within community settings.',
};

const facilityDescriptions: Record<string, string> = {
  labs:
    'Physiotherapy practical learning may involve exercise therapy, electrotherapy, assessment, and rehabilitation equipment. Contact the college to confirm the laboratories and equipment currently available.',
  clinical:
    'Clinical training helps students develop assessment, treatment, communication, and patient-care skills under appropriate supervision. Ask the college about its current clinical training arrangements.',
  library:
    'Library resources may include textbooks, journals, and other learning materials. Please confirm the available resources and access timings with the college.',
  classrooms:
    'Classrooms support lectures, discussions, demonstrations, and academic learning. Contact the college for information about its current teaching facilities.',
  equipment:
    'Rehabilitation equipment supports practical physiotherapy education. Contact the college to confirm the specific equipment currently available.',
  hostel:
    'For hostel availability, accommodation charges, rules, and room facilities, please contact the college administration.',
  transport:
    'For bus routes, transport availability, schedules, and fees, please contact the college administration.',
  'other-student':
    'For student support, campus amenities, and other student facilities, please contact the college for the latest details.',
};

const aboutDescriptions: Record<string, string> = {
  'about-overview':
    'Madha College of Physiotherapy focuses on physiotherapy education and the development of rehabilitation knowledge and practical skills. For the official institutional history and affiliations, please refer to the college website or administration.',
  mission:
    'For the college’s officially published vision and mission statements, please consult its About page or contact the administration.',
  achievements:
    'For verified awards, recognitions, research achievements, and institutional milestones, please refer to the college’s official announcements.',
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/[?.!,]/g, '').trim();
}

export default function Chatbot({ navigate }: ChatbotProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [menu, setMenu] = useState<Menu>('main');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Hello! Welcome to Madha College of Physiotherapy. I’m your virtual assistant. Choose a topic below to learn about courses, admissions, departments, facilities, and contact information.',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages, typing, open, menu]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const addBotMessage = (text: string, nextMenu?: Menu) => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    setTyping(true);

    timerRef.current = window.setTimeout(() => {
      setMessages((previous) => [...previous, { role: 'bot', text }]);

      if (nextMenu) {
        setMenu(nextMenu);
      }

      setTyping(false);
      timerRef.current = null;
    }, 400);
  };

  const goToMainMenu = () => {
    setSelectedCourse('');
    addBotMessage('Here are the main topics I can help you with.', 'main');
  };

  const goToPreviousMenu = () => {
    if (menu === 'course-actions') {
      setSelectedCourse('');
      addBotMessage('Please choose a course.', 'courses');
    } else if (menu === 'student-facilities') {
      addBotMessage('Choose a campus facility to explore.', 'facilities');
    } else {
      goToMainMenu();
    }
  };

  const handleOption = (value: string, label: string) => {
    if (typing) return;

    setMessages((previous) => [...previous, { role: 'user', text: label }]);
    setInput('');

    if (value === 'main-menu') {
      goToMainMenu();
      return;
    }

    if (value === 'previous-menu') {
      goToPreviousMenu();
      return;
    }

    if (value === 'reset') {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setTyping(false);
      setMenu('main');
      setSelectedCourse('');
      setMessages([
        {
          role: 'bot',
          text: 'Welcome back to Madha College of Physiotherapy! How can I help you today?',
        },
      ]);
      return;
    }

    if (value === 'courses') {
      addBotMessage('Choose a programme to learn more about it.', 'courses');
      return;
    }

    if (value === 'admission') {
      addBotMessage(
        'I can help you understand the admission process, required documents, fees, and enquiry options.',
        'admission',
      );
      return;
    }

    if (value === 'departments') {
      addBotMessage(
        'Explore these common areas of physiotherapy practice. Please confirm which departments are currently offered by the college.',
        'departments',
      );
      return;
    }

    if (value === 'facilities') {
      addBotMessage(
        'Choose a campus facility to learn more. Please confirm specific facility availability with the college.',
        'facilities',
      );
      return;
    }

    if (value === 'student-facilities') {
      addBotMessage('Choose the student facility you would like to ask about.', 'student-facilities');
      return;
    }

    if (value === 'about') {
      addBotMessage('What would you like to know about the college?', 'about');
      return;
    }

    if (value === 'contact') {
      addBotMessage('Choose a contact or enquiry option below.', 'contact');
      return;
    }

    if (value in courseNames) {
      setSelectedCourse(value);
      addBotMessage(
        `You selected ${courseNames[value]}. Choose the information you need.`,
        'course-actions',
      );
      return;
    }

    if (
      ['course-overview', 'eligibility', 'duration', 'fees'].includes(value) &&
      menu === 'course-actions' &&
      selectedCourse
    ) {
      addBotMessage(courseInfo[selectedCourse]?.[value] ?? 'Please contact the college for further information.');
      return;
    }

    if (departmentDescriptions[value]) {
      addBotMessage(departmentDescriptions[value]);
      return;
    }

    if (facilityDescriptions[value]) {
      addBotMessage(facilityDescriptions[value]);
      return;
    }

    if (aboutDescriptions[value]) {
      addBotMessage(aboutDescriptions[value]);
      return;
    }

    if (value === 'details') {
      addBotMessage(
        'For the official telephone number, email address, postal address, and office hours, please visit the Contact page on the college website. Verified contact details have not been configured in this chatbot.',
      );
      return;
    }

    if (value === 'admission-enquiry' || value === 'apply') {
      addBotMessage(
        'Please use the Admission Enquiry form on the website to submit your details. The admissions team can confirm the official application procedure and current requirements.',
      );
      navigate?.('contact');
      return;
    }

    if (value === 'contact-page') {
      addBotMessage('Opening the Contact page, if navigation is available.');
      navigate?.('contact');
      return;
    }

    if (value === 'admission-process') {
      addBotMessage(
        'Start by submitting an admission enquiry. The college can confirm programme availability, eligibility, required documents, deadlines, and application steps.',
      );
      return;
    }

    if (value === 'documents') {
      addBotMessage(
        'Required documents depend on the programme and current admission rules. Ask the admissions office for its official checklist before applying.',
      );
      return;
    }

    if (value === 'fees-information') {
      addBotMessage(
        'Please contact the admissions office for the current approved fee structure and payment details.',
      );
    }
  };

  const handleSend = (text?: string) => {
    const message = (text ?? input).trim();
    if (!message || typing) return;

    setMessages((previous) => [...previous, { role: 'user', text: message }]);
    setInput('');

    const normalized = normalize(message);

    if (/^(hi|hello|hey)\b/.test(normalized)) {
      addBotMessage(
        'Hello! Welcome to Madha College of Physiotherapy. Choose a topic below and I’ll help you find the relevant information.',
        'main',
      );
      return;
    }

    if (
      normalized.includes('course') ||
      normalized.includes('bpt') ||
      normalized.includes('mpt') ||
      normalized.includes('phd') ||
      normalized.includes('programme') ||
      normalized.includes('program')
    ) {
      addBotMessage('Here are the programmes you can ask about.', 'courses');
      return;
    }

    if (
      normalized.includes('eligibility') ||
      normalized.includes('qualification') ||
      normalized.includes('eligible') ||
      normalized.includes('marks')
    ) {
      addBotMessage(
        'Eligibility depends on the programme and current university or regulatory requirements. Select a course for more specific guidance.',
        'courses',
      );
      return;
    }

    if (
      normalized.includes('admission') ||
      normalized.includes('apply') ||
      normalized.includes('application')
    ) {
      addBotMessage('Choose an admission topic below.', 'admission');
      return;
    }

    if (
      normalized.includes('fee') ||
      normalized.includes('tuition') ||
      normalized.includes('cost')
    ) {
      addBotMessage(
        'Fees depend on the programme and current approved fee schedule. Select a course for fee guidance.',
        'courses',
      );
      return;
    }

    if (
      normalized.includes('department') ||
      normalized.includes('specialization') ||
      normalized.includes('specialisation')
    ) {
      addBotMessage('Choose an area of physiotherapy practice to explore.', 'departments');
      return;
    }

    if (
      normalized.includes('facility') ||
      normalized.includes('laboratory') ||
      normalized.includes('lab') ||
      normalized.includes('library') ||
      normalized.includes('equipment') ||
      normalized.includes('campus') ||
      normalized.includes('hostel') ||
      normalized.includes('transport')
    ) {
      addBotMessage('Choose a campus or student facility below.', 'facilities');
      return;
    }

    if (
      normalized.includes('contact') ||
      normalized.includes('phone') ||
      normalized.includes('email') ||
      normalized.includes('address') ||
      normalized.includes('location')
    ) {
      addBotMessage('Choose a contact option below.', 'contact');
      return;
    }

    if (
      normalized.includes('about') ||
      normalized.includes('mission') ||
      normalized.includes('vision') ||
      normalized.includes('achievement') ||
      normalized.includes('history')
    ) {
      addBotMessage('Choose an About College topic below.', 'about');
      return;
    }

    addBotMessage(
      'I can help with courses, eligibility, admissions, departments, facilities, and contact information. Please choose a topic below or contact the college for official information.',
      'main',
    );
  };

  const renderOptions = (options: ChatOption[]) => (
    <div className="madha-quick-questions madha-icon-menu">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="madha-icon-menu-option"
          onClick={() => handleOption(option.value, option.label)}
          disabled={typing}
        >
          <span className="madha-icon-menu-symbol">
            {option.icon ?? <BookOpen size={19} />}
          </span>

          <span className="madha-icon-menu-label">{option.label}</span>

          <span className="madha-icon-menu-arrow">
            <ChevronRight size={17} />
          </span>
        </button>
      ))}
    </div>
  );

  const renderCurrentMenu = () => {
    switch (menu) {
      case 'main':
        return renderOptions(mainOptions);
      case 'courses':
        return renderOptions(courseOptions);
      case 'course-actions':
        return renderOptions(courseActionOptions);
      case 'departments':
        return renderOptions(departmentOptions);
      case 'facilities':
        return renderOptions(facilityOptions);
      case 'student-facilities':
        return renderOptions(studentFacilityOptions);
      case 'about':
        return renderOptions(aboutOptions);
      case 'contact':
        return renderOptions(contactOptions);
      case 'admission':
        return renderOptions(admissionOptions);
      default:
        return null;
    }
  };

  return (
    <div className="madha-chatbot-root">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className={`madha-chat-toggle ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
      >
        {open ? <X size={25} /> : <Bot size={28} />}
        {!open && <span className="madha-chat-notification" />}
      </button>

      {open && (
        <section className="madha-chat-panel" aria-label="Madha Assistant chat">
          <header className="madha-chat-header">
            <div className="madha-chat-avatar">
              <Bot size={25} strokeWidth={2.2} />
            </div>

            <div className="madha-chat-heading">
              <p className="madha-chat-title">Madha Assistant</p>
              <p className="madha-chat-status">
                <span />
                Online
              </p>
            </div>

            <button
              type="button"
              className="madha-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={21} />
            </button>
          </header>

          <div className="madha-chat-messages">
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`madha-message-row ${message.role}`}
              >
                {message.role === 'bot' && (
                  <div className="madha-message-avatar">
                    <Bot size={17} />
                  </div>
                )}

                <div className="madha-message-content">
                  <div className={`madha-message-bubble ${message.role}`}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="madha-message-row bot">
                <div className="madha-message-avatar">
                  <Bot size={17} />
                </div>
                <div className="madha-typing" aria-label="Assistant is typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {!typing && (
              <>
                <p className="madha-section-label">{menuTitles[menu]}</p>
                {renderCurrentMenu()}

                {menu !== 'main' && (
                  <div className="madha-chat-navigation">
                    <button
                      type="button"
                      onClick={() => handleOption('previous-menu', 'Previous Menu')}
                      disabled={typing}
                    >
                      <ArrowLeft size={15} />
                      Previous Menu
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOption('main-menu', 'Main Menu')}
                      disabled={typing}
                    >
                      <Home size={15} />
                      Main Menu
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  className="madha-reset-button"
                  onClick={() => handleOption('reset', 'Start New Conversation')}
                  disabled={typing}
                >
                  <RotateCcw size={14} />
                  Start New Conversation
                </button>
              </>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            className="madha-chat-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
          >
            <span className="madha-input-smile" aria-hidden="true">
              <Smile size={19} />
            </span>

            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your message..."
              aria-label="Type your message"
              disabled={typing}
            />

            <button
              type="submit"
              className="madha-send-button"
              aria-label="Send message"
              disabled={!input.trim() || typing}
            >
              <Send size={19} />
            </button>
          </form>
        </section>
      )}

      <style>{`
        .madha-chatbot-root {
          --madha-forest: #063d2e;
          --madha-forest-deep: #02291f;
          --madha-gold: #e8c66d;
          --madha-gold-light: #fff0b0;
          font-family: inherit;
        }

        .madha-chat-toggle {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 9990;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--madha-gold-light);
          border: 1.5px solid var(--madha-gold-light);
          border-radius: 50%;
          background: linear-gradient(145deg, rgba(10,83,59,.55), rgba(2,37,28,.45));
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          backdrop-filter: blur(14px) saturate(160%);
          box-shadow: 0 0 0 2px rgba(232,198,109,.22), 0 0 20px rgba(232,198,109,.32), inset 0 0 14px rgba(255,240,176,.08);
          cursor: pointer;
          transition: transform .28s ease, box-shadow .28s ease;
        }

        .madha-chat-toggle:hover {
          transform: translateY(-3px) scale(1.035);
          box-shadow: 0 0 0 3px rgba(232,198,109,.25), 0 0 28px rgba(232,198,109,.5);
        }

        .madha-chat-toggle.is-open {
          width: 52px;
          height: 52px;
        }

        .madha-chat-notification {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 12px;
          height: 12px;
          border: 2px solid #063d2e;
          border-radius: 50%;
          background: #d9b64e;
          box-shadow: 0 0 9px rgba(255,224,125,.7);
          animation: madha-pulse 2s infinite;
        }

        .madha-chat-panel {
          position: fixed;
          right: 24px;
          bottom: 102px;
          z-index: 9989;
          width: 370px;
          max-width: calc(100vw - 32px);
          height: min(610px, calc(100dvh - 132px));
          min-height: 350px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: #f9f8ef;
          border: 1px solid rgba(255,224,143,.85);
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(4,49,35,.35), rgba(5,64,45,.23), rgba(8,77,53,.31));
          -webkit-backdrop-filter: blur(12px) saturate(155%);
          backdrop-filter: blur(12px) saturate(155%);
          box-shadow: 0 0 0 1px rgba(232,198,109,.2), 0 0 24px rgba(232,198,109,.24), 0 18px 55px rgba(0,0,0,.2), inset 0 0 30px rgba(255,239,184,.08);
          animation: madha-chat-enter .3s cubic-bezier(.2,.8,.2,1) both;
        }

        .madha-chat-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(125deg, rgba(255,255,255,.09), transparent 28%, transparent 72%, rgba(255,224,143,.045));
        }

        .madha-chat-header {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          padding: 16px;
          border-bottom: 1px solid rgba(255,232,167,.48);
          background: linear-gradient(120deg, rgba(2,42,31,.40), rgba(8,77,54,.25));
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
        }

        .madha-chat-avatar,
        .madha-message-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--madha-forest);
          background: linear-gradient(145deg,#fff7d8,#e7c566);
          border: 1px solid #fff0b0;
          box-shadow: 0 0 12px rgba(232,198,109,.2);
        }

        .madha-chat-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          outline: 1px solid rgba(232,198,109,.48);
          outline-offset: 3px;
        }

        .madha-chat-heading {
          min-width: 0;
          flex: 1;
        }

        .madha-chat-title {
          margin: 0;
          color: #fffdf5;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .01em;
        }

        .madha-chat-status {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 4px 0 0;
          color: #d5e9dc;
          font-size: 11px;
        }

        
.madha-chat-status span {
  width: 8px;
  height: 8px;
  display: inline-block;
  flex-shrink: 0;
  border-radius: 50%;
  background: #63f59a;
  box-shadow:
    0 0 4px rgba(99, 245, 154, 0.9),
    0 0 9px rgba(99, 245, 154, 0.8),
    0 0 16px rgba(99, 245, 154, 0.55);
  animation: madha-online-glow 1.8s ease-in-out infinite;
}

@keyframes madha-online-glow {
  0%, 100% {
    opacity: 0.75;
    box-shadow:
      0 0 4px rgba(99, 245, 154, 0.7),
      0 0 8px rgba(99, 245, 154, 0.5),
      0 0 13px rgba(99, 245, 154, 0.3);
    transform: scale(0.95);
  }

  50% {
    opacity: 1;
    box-shadow:
      0 0 5px rgba(99, 245, 154, 1),
      0 0 12px rgba(99, 245, 154, 0.95),
      0 0 22px rgba(99, 245, 154, 0.7);
    transform: scale(1.12);
  }
}


        .madha-chat-close {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          color: #fff4ce;
          border: 0;
          border-radius: 9px;
          background: transparent;
          cursor: pointer;
        }

        .madha-chat-close:hover {
          background: rgba(255,255,255,.1);
        }

        .madha-chat-messages {
          position: relative;
          z-index: 1;
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 17px 13px 16px;
          display: flex;
          flex-direction: column;
          gap: 13px;
          background: rgba(4,47,34,.06);
          scrollbar-width: thin;
          scrollbar-color: rgba(232,198,109,.6) transparent;
        }

        .madha-chat-messages::-webkit-scrollbar {
          width: 5px;
        }

        .madha-chat-messages::-webkit-scrollbar-thumb {
          background: rgba(232,198,109,.55);
          border-radius: 10px;
        }

        .madha-message-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          width: 100%;
        }

        .madha-message-row.user {
          justify-content: flex-end;
        }

        .madha-message-avatar {
          width: 27px;
          height: 27px;
          margin-top: 2px;
          border-radius: 50%;
          background: linear-gradient(145deg,#fffdf1,#e9dba8);
        }

        .madha-message-content {
          max-width: 83%;
          min-width: 0;
        }

        .madha-message-bubble {
          padding: 10px 12px;
          border-radius: 15px;
          font-size: 12px;
          line-height: 1.55;
          overflow-wrap: anywhere;
        }

        .madha-message-bubble.bot {
          color: #1c2922;
          background: linear-gradient(135deg, rgba(255,255,250,.91), rgba(238,241,229,.82));
          border: 1px solid rgba(255,255,255,.78);
          border-bottom-left-radius: 5px;
          box-shadow: 0 4px 12px rgba(0,0,0,.06);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
        }

        .madha-message-bubble.user {
          color: #fffdf5;
          background: linear-gradient(135deg, rgba(9,87,61,.55), rgba(2,51,37,.43));
          border: 1px solid rgba(255,220,125,.86);
          border-bottom-right-radius: 5px;
          box-shadow: 0 0 12px rgba(232,198,109,.1);
        }

        .madha-section-label {
          position: relative;
          z-index: 1;
          margin: 2px 0 0 35px;
          color: #f0d98f;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .14em;
        }

        .madha-quick-questions {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-left: 35px;
        }

        .madha-icon-menu .madha-icon-menu-option {
          display: flex;
          align-items: center;
          gap: 11px;
          width: 100%;
          min-height: 43px;
          padding: 9px 12px;
          margin: 0;
          text-align: left;
          color: #fff9e7;
          border: 1px solid rgba(232,198,109,.8);
          border-radius: 11px;
          background: rgba(3,50,37,.22);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          backdrop-filter: blur(10px) saturate(140%);
          box-shadow: inset 0 0 12px rgba(255,240,176,.025), 0 0 8px rgba(232,198,109,.045);
          cursor: pointer;
          transition: background .25s ease, border-color .25s ease, box-shadow .25s ease, transform .25s ease;
        }

        .madha-icon-menu .madha-icon-menu-option:hover:not(:disabled) {
          transform: translateX(2px);
          background: rgba(232,198,109,.12);
          border-color: #fff0b0;
          box-shadow: 0 0 13px rgba(232,198,109,.15);
        }

        .madha-icon-menu .madha-icon-menu-option:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .madha-icon-menu-symbol {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #f0d176;
        }

        .madha-icon-menu-label {
          flex: 1;
          min-width: 0;
          color: #fff9e7;
          font-size: 11px;
          font-weight: 500;
          line-height: 1.5;
        }

        .madha-icon-menu-arrow {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          color: #e8c66d;
        }

        .madha-chat-navigation {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 8px;
          margin-left: 35px;
        }

        .madha-chat-navigation button,
        .madha-reset-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 10px;
          color: #fff4ce;
          font-size: 10px;
          border: 1px solid rgba(232,198,109,.5);
          border-radius: 9px;
          background: rgba(3,50,37,.2);
          cursor: pointer;
        }

        .madha-chat-navigation button:hover,
        .madha-reset-button:hover {
          background: rgba(232,198,109,.12);
          border-color: #fff0b0;
        }

        .madha-reset-button {
          align-self: flex-start;
          margin-left: 35px;
        }

        .madha-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 13px;
          border: 1px solid rgba(255,255,255,.7);
          border-radius: 14px;
          border-bottom-left-radius: 5px;
          background: rgba(255,255,250,.86);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
        }

        .madha-typing span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #997b32;
          animation: madha-typing 1s infinite ease-in-out;
        }

        .madha-typing span:nth-child(2) {
          animation-delay: .15s;
        }

        .madha-typing span:nth-child(3) {
          animation-delay: .3s;
        }

        .madha-chat-input-area {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          margin: 0 11px 12px;
          padding: 6px 6px 6px 10px;
          border: 1px solid rgba(255,232,167,.8);
          border-radius: 17px;
          background: rgba(255,255,255,.06);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          box-shadow: inset 0 0 15px rgba(255,255,255,.05), 0 0 12px rgba(232,198,109,.07);
        }

        .madha-input-smile {
          display: flex;
          flex-shrink: 0;
          color: #f5df9d;
        }

        .madha-chat-input-area input {
          flex: 1;
          width: 0;
          min-width: 0;
          padding: 9px 0;
          color: #fffdf5;
          font: inherit;
          font-size: 12px;
          border: 0;
          outline: 0;
          background: transparent;
        }

        .madha-chat-input-area input::placeholder {
          color: rgba(255,255,245,.76);
        }

        .madha-send-button {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          width: 39px;
          height: 39px;
          color: #123a2b;
          border: 1px solid #fff0b0;
          border-radius: 50%;
          background: linear-gradient(145deg,#fff0b0,#d9b64e);
          box-shadow: 0 0 12px rgba(232,198,109,.28);
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .madha-send-button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 0 18px rgba(232,198,109,.5);
        }

        .madha-send-button:disabled {
          opacity: .55;
          cursor: not-allowed;
        }

        @keyframes madha-chat-enter {
          from { opacity: 0; transform: translateY(12px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes madha-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(232,198,109,.38); }
          50% { box-shadow: 0 0 0 5px rgba(232,198,109,0); }
        }

        @keyframes madha-typing {
          0%, 60%, 100% { opacity: .35; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }

        @media (max-width: 480px) {
          .madha-chat-toggle {
            right: 16px;
            bottom: 18px;
            width: 57px;
            height: 57px;
          }

          .madha-chat-toggle.is-open {
            width: 48px;
            height: 48px;
          }

          .madha-chat-panel {
            right: 10px;
            bottom: 86px;
            width: calc(100vw - 20px);
            max-width: 400px;
            height: min(590px, calc(100dvh - 105px));
            min-height: 320px;
            border-radius: 21px;
          }

          .madha-chat-header {
            padding: 13px 14px;
          }

          .madha-chat-messages {
            padding: 14px 11px 12px;
            gap: 12px;
          }

          .madha-icon-menu .madha-icon-menu-option {
            min-height: 41px;
            padding: 9px 10px;
            gap: 9px;
          }

          .madha-chat-navigation {
            flex-wrap: wrap;
          }

          .madha-chat-input-area {
            margin: 0 9px 9px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .madha-chatbot-root *,
          .madha-chatbot-root *::before,
          .madha-chatbot-root *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
