import heroImagePortrait from '../assets/images/nigatua_portrait.jpeg';
import projectLuxuryRetail from '../assets/images/project_luxury_retail_dubai_1790876827548.jpg';
import projectConsularOperations from '../assets/images/project_consular_operations_1790876837319.jpg';
import projectRamisMerchandising from '../assets/images/project_ramis_merchandising_1790876848259.jpg';
import projectClientMediation from '../assets/images/project_client_mediation_1790876858771.jpg';

export interface ExperienceItem {
  id: string;
  index: string;
  role: string;
  organization: string;
  locations: string;
  domain: 'Retail Sales' | 'Consular Service';
  period: string;
  summary: string;
  highlights: string[];
  keyMetric: {
    value: string;
    label: string;
  };
}

export interface ProjectCaseStudy {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'Retail Sales' | 'Consular Work' | 'Customer Care';
  location: string;
  year: string;
  featured?: boolean;
  image: string;
  imageAlt: string;
  metricValue: string;
  metricContext: string;
  challenge: string;
  approach: string[];
  outcome: string;
  competenciesUsed: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Sales & Supervision' | 'Office & Operator' | 'Customer Care';
  context: string;
  proficiencyLabel: string;
  proofPoint: string;
}

export interface LanguageItem {
  language: string;
  nativeScript: string;
  level: string;
  percentage: number;
  applicationContext: string;
}

export interface AchievementItem {
  id: string;
  index: string;
  metric: string;
  title: string;
  context: string;
  description: string;
}

export interface EducationItem {
  id: string;
  index: string;
  qualification: string;
  institutionScope: string;
  status: string;
  focusAreas: string[];
  description: string;
}

export const PROFILE_DATA = {
  fullName: 'Nigatua Bizuneh Tsegaye',
  headline: 'Sales Supervisor, Office Assistant & Customer Service Professional',
  shortBio:
    'Experienced in retail sales and team supervision at Dubai Mall, Marina Mall Abu Dhabi, and Ramis, as well as office assistance, telephone operations, and customer service at the Ethiopian Consulate.',
  extendedBio: [
    'I am a dedicated and friendly professional with hands-on experience in both busy UAE shopping malls and diplomatic office service.',
    'In retail, I worked in Sales and as a Sales Supervisor at Dubai Mall, Marina Mall Abu Dhabi, and Ramis. I helped customers find the right products, supported and guided sales staff on the floor, handled cash registers, and kept store displays neat and welcoming.',
    'At the Ethiopian Consulate, I worked as an Office Assistant, Telephone Operator, and Customer Service Representative. I answered daily phone calls, welcomed visitors at the front desk, checked documents, and solved problems calmly and respectfully.'
  ],
  heroImage: heroImagePortrait,
  location: 'Dubai & Abu Dhabi, UAE',
  availability: 'Available for Sales Supervisor, Receptionist, Office Assistant & Customer Service Roles',
  contact: {
    whatsappDisplay: '+971 52 775 4270',
    whatsappNumberClean: '971527754270',
    email: 'Nigatwabizuneh@gmail.com'
  },
  heroStats: [
    {
      value: '3 Major Malls',
      unit: 'UAE Retail',
      context: 'Dubai Mall · Marina Mall · Ramis'
    },
    {
      value: '3 Languages',
      unit: 'Spoken',
      context: 'Amharic · English · Basic Arabic'
    },
    {
      value: 'Grade 12',
      unit: 'Completed',
      context: 'High School Diploma & Work Training'
    }
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-retail-uae',
    index: '01',
    role: 'Sales & Sales Supervisor',
    organization: 'Dubai Mall, Marina Mall Abu Dhabi & Ramis',
    locations: 'Dubai & Abu Dhabi, UAE',
    domain: 'Retail Sales',
    period: 'UAE Retail Experience',
    summary:
      'Led daily store sales, helped customers from around the world, and guided the sales team across three well-known shopping centers in the UAE.',
    highlights: [
      'Welcomed customers warmly and helped them choose products in English, Amharic, and basic Arabic.',
      'Supervised sales staff on the shop floor, organized daily shift tasks, and helped the team reach sales goals.',
      'Solved customer questions, returns, and exchanges calmly and politely.',
      'Handled the cash register (POS), checked daily stock levels, and kept shelves clean and well-organized.'
    ],
    keyMetric: {
      value: 'Strong Sales & Teamwork',
      label: 'Trusted to supervise busy store shifts in Dubai and Abu Dhabi'
    }
  },
  {
    id: 'exp-ethiopian-consulate',
    index: '02',
    role: 'Office Assistant, Operator & Customer Service',
    organization: 'Ethiopian Consulate',
    locations: 'Consular Office',
    domain: 'Consular Service',
    period: 'Consulate Experience',
    summary:
      'Welcomed visitors at the front desk, answered busy telephone lines, organized office files, and assisted citizens with their daily paperwork.',
    highlights: [
      'Worked as the telephone operator, answering calls politely and connecting people to the right office quickly.',
      'Guided visitors at the reception desk and checked their forms before their appointments.',
      'Used strong conflict resolution skills to calm down stressed visitors and explain steps clearly.',
      'Kept office letters, records, and daily schedules neat, accurate, and organized.'
    ],
    keyMetric: {
      value: '150+ People Helped Daily',
      label: 'Supported visitors on the phone and in person at the front desk'
    }
  }
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'proj-flagship-retail',
    index: '01',
    title: 'Leading Store Sales & Helping VIP Shoppers',
    subtitle: 'Supervising busy retail shifts and customer service in major UAE malls',
    category: 'Retail Sales',
    location: 'Dubai Mall & Marina Mall Abu Dhabi',
    year: 'Sales Supervision',
    featured: true,
    image: projectLuxuryRetail,
    imageAlt: 'Bright, modern retail store interior in Dubai Mall',
    metricValue: 'Higher Store Sales',
    metricContext: 'Helped the sales team meet and beat daily targets',
    challenge:
      'During weekends and holidays at Dubai Mall and Marina Mall Abu Dhabi, the store became very busy, and customers needed fast, friendly help.',
    approach: [
      'Organized the sales team clearly so every staff member knew their area on the floor.',
      'Gave short, encouraging morning briefings to keep the team focused and friendly.',
      'Stepped in personally to assist VIP shoppers and handle busy checkout lines.'
    ],
    outcome:
      'Kept customers happy, reduced waiting times, and helped the store achieve strong daily sales.',
    competenciesUsed: [
      'Sales Supervision',
      'Customer Service',
      'Teamwork',
      'Product Display'
    ]
  },
  {
    id: 'proj-consular-reception',
    index: '02',
    title: 'Front-Desk Reception & Telephone Operator Support',
    subtitle: 'Helping visitors faster and answering busy phone lines at the Consulate',
    category: 'Consular Work',
    location: 'Ethiopian Consulate',
    year: 'Office & Customer Service',
    featured: false,
    image: projectConsularOperations,
    imageAlt: 'Organized consulate reception desk and waiting area',
    metricValue: 'Faster Visitor Help',
    metricContext: 'Shorter waiting lines and clear guidance for citizens',
    challenge:
      'Many visitors arrived with missing paperwork or urgent questions, while phone lines rang all day.',
    approach: [
      'Checked visitor forms right at the front desk so they knew everything they needed before waiting.',
      'Answered phone calls quickly and gave clear information in Amharic, English, and basic Arabic.',
      'Kept daily files and appointment lists neatly organized for office staff.'
    ],
    outcome:
      'Visitors finished their appointments much faster, and the reception area stayed calm and orderly.',
    competenciesUsed: [
      'Telephone Operator',
      'Office Assistance',
      'Document Checking',
      'Front-Desk Reception'
    ]
  },
  {
    id: 'proj-ramis-merchandising',
    index: '03',
    title: 'Store Organization, Stock & Cash Register Accuracy',
    subtitle: 'Keeping shelves full and checkout counters running smoothly at Ramis',
    category: 'Retail Sales',
    location: 'Ramis, UAE',
    year: 'Store Operations',
    featured: false,
    image: projectRamisMerchandising,
    imageAlt: 'Clean department store aisles and customer service desk',
    metricValue: '100% Accurate Cash & Stock',
    metricContext: 'Clean daily register counts and well-stocked shelves',
    challenge:
      'During big store promotions at Ramis, products sold quickly and checkout counters stayed busy until closing time.',
    approach: [
      'Watched store shelves closely and worked with the team to restock popular items right away.',
      'Checked cash register totals and receipts carefully at the end of every shift.',
      'Helped train new team members on pricing, exchanges, and polite checkout service.'
    ],
    outcome:
      'Shelves stayed full during busy hours and daily cash register counts were 100% accurate.',
    competenciesUsed: [
      'Stock Restocking',
      'Cash Register (POS)',
      'Store Display',
      'Staff Support'
    ]
  },
  {
    id: 'proj-conflict-mediation',
    index: '04',
    title: 'Calm Conflict Resolution & Problem Solving',
    subtitle: 'Turning upset customers and stressed visitors into happy, thankful people',
    category: 'Customer Care',
    location: 'UAE Malls & Ethiopian Consulate',
    year: 'Conflict Resolution',
    featured: false,
    image: projectClientMediation,
    imageAlt: 'Warm, welcoming customer consultation area',
    metricValue: '98% Problems Solved',
    metricContext: 'Handled calmly on the first conversation',
    challenge:
      'Sometimes shoppers or consulate visitors feel stressed, hurried, or upset about a delay or product issue.',
    approach: [
      'Listened patiently with a warm, respectful tone without interrupting.',
      'Spoke in the person’s comfortable language (Amharic, English, or basic Arabic) so they felt understood.',
      'Explained the rules simply and offered fair, quick solutions right away.'
    ],
    outcome:
      'Solved problems peacefully on the spot and built lasting trust with customers and visitors.',
    competenciesUsed: [
      'Conflict Resolution',
      'Patient Listening',
      'Multilingual Care',
      'Problem Solving'
    ]
  }
];

export const SKILLS: SkillItem[] = [
  {
    id: 'skill-1',
    name: 'Sales & Store Supervision',
    category: 'Sales & Supervision',
    context: 'Dubai Mall · Marina Mall Abu Dhabi · Ramis',
    proficiencyLabel: 'Experienced Leader',
    proofPoint: 'Guided sales staff on the shop floor, organized shifts, and helped the team reach daily sales goals.'
  },
  {
    id: 'skill-2',
    name: 'Friendly Customer Assistance',
    category: 'Sales & Supervision',
    context: 'Dubai Mall · Marina Mall Abu Dhabi',
    proficiencyLabel: 'Strong Strength',
    proofPoint: 'Welcomed shoppers warmly, understood what they needed, and recommended the best products.'
  },
  {
    id: 'skill-3',
    name: 'Cash Register (POS) & Stock Checking',
    category: 'Sales & Supervision',
    context: 'Ramis · Marina Mall Abu Dhabi',
    proficiencyLabel: 'Careful & Accurate',
    proofPoint: 'Handled cash and card payments, processed returns, and counted store inventory accurately.'
  },
  {
    id: 'skill-4',
    name: 'Neat Store & Product Display',
    category: 'Sales & Supervision',
    context: 'Dubai Mall · Ramis',
    proficiencyLabel: 'High Standard',
    proofPoint: 'Kept shelves, racks, and promotional displays clean, attractive, and easy for customers to browse.'
  },
  {
    id: 'skill-5',
    name: 'Telephone & Switchboard Operator',
    category: 'Office & Operator',
    context: 'Ethiopian Consulate',
    proficiencyLabel: 'Fast & Polite',
    proofPoint: 'Answered busy multi-line phones, took clear messages, and connected callers to the right department.'
  },
  {
    id: 'skill-6',
    name: 'Office Assistance & Filing',
    category: 'Office & Operator',
    context: 'Ethiopian Consulate',
    proficiencyLabel: 'Well Organized',
    proofPoint: 'Checked forms and applications, organized office files, and supported daily administrative tasks.'
  },
  {
    id: 'skill-7',
    name: 'Front-Desk Reception & Visitor Care',
    category: 'Office & Operator',
    context: 'Ethiopian Consulate · UAE Retail',
    proficiencyLabel: 'Warm & Welcoming',
    proofPoint: 'Greeted visitors with respect, managed waiting lines, and kept the reception area calm.'
  },
  {
    id: 'skill-8',
    name: 'Conflict Resolution & Staying Calm',
    category: 'Customer Care',
    context: 'Consulate & UAE Malls',
    proficiencyLabel: 'Top Skill',
    proofPoint: 'Listened patiently to upset customers or visitors and solved issues peacefully and fairly.'
  },
  {
    id: 'skill-9',
    name: 'Speaking Amharic, English & Basic Arabic',
    category: 'Customer Care',
    context: 'Daily Work in the UAE',
    proficiencyLabel: '3 Languages',
    proofPoint: 'Communicated clearly with people from different backgrounds so everyone felt welcome.'
  }
];

export const LANGUAGES: LanguageItem[] = [
  {
    language: 'Amharic',
    nativeScript: 'አማርኛ',
    level: 'Fluent / Native Speaker',
    percentage: 100,
    applicationContext: 'Used daily for helping Ethiopian citizens, reading documents, and explaining procedures clearly.'
  },
  {
    language: 'English',
    nativeScript: 'English',
    level: 'Fluent Professional',
    percentage: 95,
    applicationContext: 'Used every day in Dubai and Abu Dhabi malls for sales, team supervision, and office work.'
  },
  {
    language: 'Arabic',
    nativeScript: 'العربية',
    level: 'Basic Conversational',
    percentage: 45,
    applicationContext: 'Used for polite greetings, welcoming local and Arab shoppers, and basic store directions.'
  }
];

export const EDUCATION_AND_CREDENTIALS: EducationItem[] = [
  {
    id: 'edu-highschool',
    index: '01',
    qualification: 'High School Diploma (Grade 12 Completed)',
    institutionScope: 'Full Secondary School Education',
    status: 'Grade 12 Completed',
    focusAreas: [
      'English Communication',
      'Everyday Mathematics',
      'Civics & Ethics',
      'General Studies'
    ],
    description:
      'Completed full Grade 12 high school education with strong skills in reading, writing, communication, and working with numbers.'
  },
  {
    id: 'edu-retail-leadership',
    index: '02',
    qualification: 'Retail Sales & Team Supervision Experience',
    institutionScope: 'Dubai Mall, Marina Mall Abu Dhabi & Ramis',
    status: 'UAE Work Experience',
    focusAreas: [
      'Store Floor Supervision',
      'Customer Service',
      'Cash Register (POS)',
      'Stock & Display Care'
    ],
    description:
      'Hands-on leadership and sales experience in top UAE malls, working with international customers and leading store teams.'
  },
  {
    id: 'edu-consular-protocol',
    index: '03',
    qualification: 'Office Assistant, Operator & Customer Service',
    institutionScope: 'Ethiopian Consulate',
    status: 'Diplomatic Office Experience',
    focusAreas: [
      'Telephone Operator',
      'Front-Desk Reception',
      'Document Checking',
      'Conflict Resolution'
    ],
    description:
      'Practical office and public service experience helping citizens, managing phone lines, and keeping office records organized.'
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    index: '01',
    metric: 'Top Sales',
    title: 'Helped Store Teams Beat Sales Goals',
    context: 'Dubai Mall & Marina Mall Abu Dhabi',
    description:
      'Supported sales staff and guided shoppers during busy seasons to achieve strong daily sales results.'
  },
  {
    id: 'ach-2',
    index: '02',
    metric: '98%',
    title: 'Peaceful Problem & Conflict Resolution',
    context: 'Consulate & Retail Malls',
    description:
      'Solved customer complaints and visitor questions calmly and respectfully on the very first conversation.'
  },
  {
    id: 'ach-3',
    index: '03',
    metric: 'Fast Service',
    title: 'Shorter Waiting Times at Reception',
    context: 'Ethiopian Consulate',
    description:
      'Checked documents early and answered phone calls quickly so visitors received faster help.'
  },
  {
    id: 'ach-4',
    index: '04',
    metric: '100%',
    title: 'Accurate Cash Register & Stock Counts',
    context: 'Ramis & UAE Stores',
    description:
      'Kept daily cash register totals and store stock checks accurate and honest across every shift.'
  }
];
