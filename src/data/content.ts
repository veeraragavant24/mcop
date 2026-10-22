export interface Course {
  id: string;
  name: string;
  duration: string;
  eligibility: string;
  description: string;
  highlights: string[];
  icon: string;
}

export const courses: Course[] = [
  {
    id: 'bpt',
    name: 'Bachelor of Physiotherapy (BPT)',
    duration: '4½ Years (including 6 months internship)',
    eligibility: '10+2 with Physics, Chemistry, Biology (or Botany & Zoology) with minimum 50% marks',
    description:
      'A comprehensive undergraduate program designed to build strong foundations in human anatomy, physiology, biomechanics, and therapeutic techniques. Students progress through structured clinical rotations to become confident, evidence-based physiotherapy practitioners.',
    highlights: [
      'Foundational sciences in Year 1–2',
      'Clinical rotations from Year 3',
      'Six-month compulsory rotatory internship',
      'Evidence-based practice curriculum',
    ],
    icon: 'GraduationCap',
  },
  {
    id: 'mpt',
    name: 'Master of Physiotherapy (MPT)',
    duration: '2 Years',
    eligibility: 'BPT degree from a recognized institution with minimum 50% marks',
    description:
      'Advanced postgraduate program offering specialization in key physiotherapy disciplines. Designed to develop clinical reasoning, research methodology, and advanced therapeutic skills for specialist practice and academic careers.',
    highlights: [
      'Specialization in Orthopedics, Neurology, Sports, or Cardio-pulmonary',
      'Research dissertation component',
      'Advanced clinical reasoning modules',
      'Teaching and academic training',
    ],
    icon: 'Award',
  },
  {
    id: 'phd',
    name: 'Doctor of Philosophy (Ph.D.) in Physiotherapy',
    duration: '3–5 Years',
    eligibility: 'MPT degree from a recognized university with minimum 55% marks',
    description:
      'Doctoral research program for those pursuing academic leadership, advanced clinical research, and scholarly contributions to the physiotherapy profession. Candidates undertake original research under faculty guidance.',
    highlights: [
      'Original research contribution',
      'Faculty mentorship and guidance',
      'Opportunities for publication',
      'Preparation for academic and research careers',
    ],
    icon: 'BookOpen',
  },
  
];

export const courseSpecializations = [
  'Orthopedics & Sports Physiotherapy',
  'Neurological & Psychosomatic Physiotherapy',
  'Cardio-Respiratory Physiotherapy',
  'Pediatric Physiotherapy',
  'Obstetrics & Gynecological Physiotherapy',
  'Community-Based Rehabilitation',
];


export interface Department {
  id: string;
  name: string;
  image: string;
  description: string;
  focus: string[];
}

export const departments: Department[] = [
  {
    id: 'orthopedics',
    name: 'Orthopedics & Sports Physiotherapy',
    image: 'https://images.pexels.com/photos/4506110/pexels-photo-4506110.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Focuses on the assessment and treatment of musculoskeletal conditions including fractures, joint disorders, sports injuries, post-surgical rehabilitation, and postural dysfunctions. Students learn manual therapy, therapeutic exercise prescription, and evidence-based injury management protocols.',
    focus: ['Manual therapy techniques', 'Sports injury rehabilitation', 'Post-surgical recovery', 'Posture and ergonomics'],
  },
  {
    id: 'neurology',
    name: 'Neurological Physiotherapy',
    image: 'https://images.pexels.com/photos/39192362/pexels-photo-39192362.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Dedicated to rehabilitation of patients with neurological conditions such as stroke, spinal cord injuries, Parkinson\'s disease, and cerebral palsy. The department emphasizes neuro-developmental treatment approaches and motor relearning strategies.',
    focus: ['Stroke rehabilitation', 'Spinal cord injury management', 'Neuro-developmental therapy', 'Balance and coordination training'],
  },
  {
    id: 'cardio-respiratory',
    name: 'Cardio-Respiratory Physiotherapy',
    image: 'https://images.pexels.com/photos/8460228/pexels-photo-8460228.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Addresses pulmonary and cardiac rehabilitation, peri-operative care, and intensive care physiotherapy. Students train in chest physiotherapy, breathing exercises, and exercise prescription for patients with cardiac and respiratory conditions.',
    focus: ['Pulmonary rehabilitation', 'Post-operative chest care', 'ICU physiotherapy', 'Cardiac fitness programs'],
  },
  {
    id: 'pediatrics',
    name: 'Pediatric Physiotherapy',
    image: 'https://images.pexels.com/photos/18830315/pexels-photo-18830315.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Specializes in the assessment and early intervention for children with developmental delays, congenital disorders, and neuromuscular conditions. Family-centered care and play-based therapy approaches are integral to this department.',
    focus: ['Early intervention programs', 'Cerebral palsy management', 'Developmental delay therapy', 'Family-centered care'],
  },
  {
    id: 'obstetrics',
    name: 'Obstetrics & Gynecological Physiotherapy',
    image: 'https://images.pexels.com/photos/20860622/pexels-photo-20860622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Focuses on antenatal and postnatal care, pelvic floor rehabilitation, and management of pregnancy-related musculoskeletal conditions. Students learn safe exercise protocols and education for expectant and new mothers.',
    focus: ['Antenatal exercise programs', 'Postnatal rehabilitation', 'Pelvic floor therapy', 'Pregnancy-related pain management'],
  },
  {
    id: 'community',
    name: 'Community-Based Rehabilitation',
    image: 'https://images.pexels.com/photos/20860617/pexels-photo-20860617.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Promotes accessible rehabilitation services in community settings. Students engage in outreach programs, disability awareness, and training of community health workers to deliver sustainable rehabilitation in underserved populations.',
    focus: ['Rural outreach programs', 'Disability awareness', 'Home-based therapy', 'Community health worker training'],
  },
];

export interface Facility {
  id: string;
  name: string;
  image: string;
  description: string;
  icon: string;
}

export const facilities: Facility[] = [
  {
    id: 'exercise-therapy',
    name: 'Exercise Therapy Laboratory',
    image: 'https://images.pexels.com/photos/20860579/pexels-photo-20860579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'A fully equipped exercise therapy lab with parallel bars, suspension therapy frames, progressive resistance equipment, and therapeutic exercise stations. Students practice supervised hands-on techniques and develop individualized exercise prescriptions.',
    icon: 'Dumbbell',
  },
  {
    id: 'electrotherapy',
    name: 'Electrotherapy & Diagnostics Lab',
    image: 'https://images.pexels.com/photos/13185368/pexels-photo-13185368.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Houses modern electrotherapy modalities including ultrasound, TENS, interferential therapy, shortwave diathermy, and EMG/NCS diagnostic equipment. Students gain practical experience with therapeutic electrical modalities and nerve conduction studies.',
    icon: 'Activity',
  },
  {
    id: 'library',
    name: 'Central Library',
    image: 'https://images.pexels.com/photos/28463480/pexels-photo-28463480.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'A well-stocked library with an extensive collection of physiotherapy textbooks, international journals, anatomical models, and digital resources. The reading hall provides a quiet, comfortable space for independent study and research.',
    icon: 'Library',
  },
  {
    id: 'classrooms',
    name: 'Smart Classrooms',
    image: 'https://images.pexels.com/photos/8197553/pexels-photo-8197553.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Spacious, technology-enabled classrooms with audio-visual aids, interactive displays, and anatomical demonstration equipment. Designed to support an engaging, multimedia-enhanced learning environment.',
    icon: 'Monitor',
  },
  {
    id: 'clinical-training',
    name: 'Clinical Training Facilities',
    image: 'https://images.pexels.com/photos/20860610/pexels-photo-20860610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Dedicated clinical training areas where students practice under faculty supervision with real patients. Rotations include orthopedic, neurological, and general physiotherapy outpatient departments with structured case discussions.',
    icon: 'Stethoscope',
  },
  {
    id: 'rehab-equipment',
    name: 'Rehabilitation Equipment Unit',
    image: 'https://images.pexels.com/photos/24193871/pexels-photo-24193871.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'A specialized unit featuring treadmills, balance trainers, continuous passive motion devices, and mobility aids. Students learn to prescribe and train patients with assistive devices for optimal functional independence.',
    icon: 'Accessibility',
  },
];

export interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: 'Campus' | 'Laboratories' | 'Clinical Training' | 'Events' | 'Students';
}

export const galleryItems: GalleryItem[] = [
  { id: 1, image: 'https://images.pexels.com/photos/19554793/pexels-photo-19554793.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'College Campus', category: 'Campus' },
  { id: 2, image: 'https://images.pexels.com/photos/32213424/pexels-photo-32213424.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Students in Corridor', category: 'Students' },
  { id: 3, image: 'https://images.pexels.com/photos/20860579/pexels-photo-20860579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Exercise Therapy Lab', category: 'Laboratories' },
  { id: 4, image: 'https://images.pexels.com/photos/20860610/pexels-photo-20860610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Clinical Training Session', category: 'Clinical Training' },
  { id: 5, image: 'https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Academic Conference', category: 'Events' },
  { id: 6, image: 'https://images.pexels.com/photos/3985149/pexels-photo-3985149.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Students Collaborating', category: 'Students' },
  { id: 7, image: 'https://images.pexels.com/photos/13185368/pexels-photo-13185368.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Electrotherapy Lab', category: 'Laboratories' },
  { id: 8, image: 'https://images.pexels.com/photos/20860622/pexels-photo-20860622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Patient Care Training', category: 'Clinical Training' },
  { id: 9, image: 'https://images.pexels.com/photos/30562665/pexels-photo-30562665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Graduation Ceremony', category: 'Events' },
  { id: 10, image: 'https://images.pexels.com/photos/28463480/pexels-photo-28463480.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Central Library', category: 'Campus' },
  { id: 11, image: 'https://images.pexels.com/photos/40117755/pexels-photo-40117755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Anatomy Study Session', category: 'Students' },
  { id: 12, image: 'https://images.pexels.com/photos/8197553/pexels-photo-8197553.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Smart Classroom', category: 'Campus' },
  { id: 13, image: 'https://images.pexels.com/photos/35645518/pexels-photo-35645518.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Clinical Skills Practice', category: 'Laboratories' },
  { id: 14, image: 'https://images.pexels.com/photos/20860587/pexels-photo-20860587.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Hands-on Therapy Training', category: 'Clinical Training' },
  { id: 15, image: 'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Guest Lecture', category: 'Events' },
  { id: 16, image: 'https://images.pexels.com/photos/40117756/pexels-photo-40117756.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', title: 'Practical Skills Lab', category: 'Students' },
];

export const galleryCategories = ['All', 'Campus', 'Laboratories', 'Clinical Training', 'Events', 'Students'] as const;

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  type: 'Announcement' | 'Workshop' | 'Seminar' | 'Event';
  excerpt: string;
  content: string;
}

export const newsItems: NewsItem[] = [
  
  {
    id: 'physiotherapy-awareness-2026',
    title: 'Physiotherapy Awareness Programme',
    date: '2026-11-15',
    type: 'Event',
    excerpt:
      'An awareness programme highlighting the importance of physiotherapy and rehabilitation.',
    content:
      'Madha College of Physiotherapy will conduct a physiotherapy awareness programme featuring educational activities and discussions about rehabilitation.',
  },

  {
    id: 'admissions-2026',
    title: 'Admissions Open for 2026–2027 Academic Year',
    date: '2026-01-15',
    type: 'Announcement',
    excerpt: 'Applications are now being accepted for the BPT and MPT programs for the upcoming academic year. Limited seats available.',
    content: 'Madha College of Physiotherapy invites applications for admission to the Bachelor of Physiotherapy (BPT) and Master of Physiotherapy (MPT) programs for the 2026–2027 academic session. Prospective candidates may submit their applications through the college admission office. The admission process includes verification of eligibility criteria, an entrance assessment, and a personal interview. Early application is recommended as seats are limited.',
  },
  {
    id: 'manual-therapy-workshop',
    title: 'Workshop on Advanced Manual Therapy Techniques',
    date: '2026-02-20',
    type: 'Workshop',
    excerpt: 'A three-day hands-on workshop covering contemporary manual therapy approaches for practicing physiotherapists and final-year students.',
    content: 'The Department of Orthopedics & Sports Physiotherapy is organizing a three-day intensive workshop on advanced manual therapy techniques. The workshop will cover joint mobilization, soft tissue manipulation, and neuromeningeal techniques. Sessions will be conducted by experienced faculty with clinical demonstrations and supervised practice opportunities for all participants.',
  },
  {
    id: 'neuro-rehab-seminar',
    title: 'Seminar: Recent Advances in Neurological Rehabilitation',
    date: '2026-03-10',
    type: 'Seminar',
    excerpt: 'An academic seminar featuring presentations on emerging evidence in stroke rehabilitation, robotics-assisted therapy, and motor relearning.',
    content: 'The Department of Neurological Physiotherapy will host a seminar on recent advances in neurological rehabilitation. The program includes presentations on evidence-based stroke rehabilitation protocols, robotics-assisted therapy, constraint-induced movement therapy, and contemporary motor relearning approaches. The seminar is open to students, faculty, and practicing clinicians.',
  },
  {
    id: 'world-physiotherapy-day',
    title: 'World Physiotherapy Day Celebration',
    date: '2026-09-08',
    type: 'Event',
    excerpt: 'The college community will observe World Physiotherapy Day with awareness programs, community health screenings, and student presentations.',
    content: 'Madha College of Physiotherapy will celebrate World Physiotherapy Day with a series of activities including community awareness programs, free physiotherapy screening camps, poster presentations by students, and a keynote address by a distinguished clinician. The event aims to promote awareness of the physiotherapy profession and its contribution to community health.',
  },
  {
    id: 'research-symposium',
    title: 'Annual Student Research Symposium',
    date: '2026-04-25',
    type: 'Event',
    excerpt: 'Postgraduate and undergraduate students will present their research projects and case studies before a panel of faculty reviewers.',
    content: 'The Annual Student Research Symposium provides a platform for BPT and MPT students to present their research projects, case reports, and clinical case studies. Presentations will be evaluated by a faculty panel, with recognition for outstanding contributions. The symposium encourages scholarly inquiry and evidence-based practice among students.',
  },
  {
    id: 'cpr-certification',
    title: 'BLS & CPR Certification Training Program',
    date: '2026-02-05',
    type: 'Workshop',
    excerpt: 'A certified Basic Life Support and CPR training program organized for all physiotherapy students in collaboration with clinical partners.',
    content: 'All physiotherapy students are required to complete Basic Life Support (BLS) and CPR certification as part of their clinical preparedness training. The certification program includes didactic sessions and hands-on practice with manikins, covering adult, child, and infant CPR techniques, choking management, and use of automated external defibrillators.',
  },
];

export const heroSlides = [
  {
    image: '/slides/campus.png',
    title: 'Empowering Movement. Transforming Lives.',
    subtitle: 'Shaping skilled, compassionate rehabilitation professionals through evidence-based education and hands-on clinical training.',
  },
  {
    image: '/slides/graduation2.png',
    title: 'Learning Through Practice.',
    subtitle: 'State-of-the-art laboratories and clinical facilities where theory meets hands-on patient care.',
  },
  {
    image: '/slides/graduation1.png',
    title: 'A Future in Rehabilitation.',
    subtitle: 'Join a community dedicated to advancing physiotherapy through education, research, and ethical practice.',
  },
];

export const collegeInfo = {
  name: 'Madha College of Physiotherapy',
  tagline: 'Excellence in Physiotherapy Education',
  group: 'Madha Educational Group',
  email: 'info@madhaphysiotherapy.edu.in',
  phone: '+91 (contact office for details)',
  address: 'Madha Educational Group Campus, Chennai, Tamil Nadu, India',
  established: 'Affiliated institution under the Madha Educational Group',
};
