import React, { useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Menu,
  X,
  Send,
  Maximize2,
  Camera
} from 'lucide-react';
import {
  PROFILE_DATA,
  EXPERIENCES,
  PROJECTS,
  SKILLS,
  LANGUAGES,
  EDUCATION_AND_CREDENTIALS,
  ACHIEVEMENTS,
  ProjectCaseStudy
} from './data/portfolioData';
import { SafeImage } from './components/SafeImage';
import { ProjectLightboxModal } from './components/ProjectLightboxModal';
import { ResumePreviewModal } from './components/ResumePreviewModal';
import { RevealOnScroll } from './components/RevealOnScroll';

type SkillFilter =
  | 'All'
  | 'Sales & Supervision'
  | 'Office & Operator'
  | 'Customer Care';

type ProjectFilter =
  | 'All'
  | 'Retail Sales'
  | 'Consular Work'
  | 'Customer Care';

const STORAGE_PHOTO_KEY = 'nigatua_custom_profile_photo_v2';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState<SkillFilter>('All');
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeExperienceId, setActiveExperienceId] = useState<string>(EXPERIENCES[0].id);

  // Profile photo state (defaults to generated portrait matching her photo, with instant local upload option)
  const [customPhoto, setCustomPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_PHOTO_KEY);
    } catch {
      return null;
    }
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Contact copy & inquiry states
  const [copiedField, setCopiedField] = useState<'whatsapp' | 'email' | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryOrg, setInquiryOrg] = useState('');
  const [inquiryRoleType, setInquiryRoleType] = useState<string>('Sales & Store Supervisor');
  const [inquiryMessage, setInquiryMessage] = useState(
    'Hello Nigatua, I saw your website and would like to talk with you about a job opportunity.'
  );
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'sent'>('idle');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomPhoto(reader.result);
        try {
          localStorage.setItem(STORAGE_PHOTO_KEY, reader.result);
        } catch {
          // ignore storage quota errors
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredSkills =
    skillFilter === 'All'
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === skillFilter);

  const filteredProjects =
    projectFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === projectFilter);

  const handleCopy = (value: string, field: 'whatsapp' | 'email') => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const buildComposedText = () => {
    const senderLine = inquiryName.trim()
      ? `${inquiryName.trim()}${inquiryOrg.trim() ? ` (${inquiryOrg.trim()})` : ''}`
      : 'Hiring Manager';
    return `Job Area: ${inquiryRoleType}\nFrom: ${senderLine}\n\n${inquiryMessage.trim()}`;
  };

  const composedWhatsAppUrl = `https://wa.me/${
    PROFILE_DATA.contact.whatsappNumberClean
  }?text=${encodeURIComponent(buildComposedText())}`;

  const composedEmailUrl = `mailto:${
    PROFILE_DATA.contact.email
  }?subject=${encodeURIComponent(
    `${inquiryRoleType} — Message for ${PROFILE_DATA.fullName}`
  )}&body=${encodeURIComponent(buildComposedText())}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900">
      {/* Top Bar Contract: Strictly 1 row, 3 zones */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6E1D6]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="text-base md:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            Nigatua Bizuneh Tsegaye
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#about"
              className="hover:text-blue-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#skills"
              className="hover:text-blue-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-blue-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Projects
            </a>
            <a
              href="#education"
              className="hover:text-blue-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Education
            </a>
            <a
              href="#contact"
              className="hover:text-blue-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-[#DCD6C8] rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-blue-700" />
              <span>View CV</span>
            </button>
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              Contact Me
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E6E1D6] bg-[#FAF8F5] px-6 py-4 space-y-3">
            <div className="flex flex-col space-y-2.5 text-sm font-medium text-slate-800">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-blue-700"
              >
                About & Work Experience
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-blue-700"
              >
                Skills & Languages
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-blue-700"
              >
                Projects & Highlights
              </a>
              <a
                href="#education"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-blue-700"
              >
                Education
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-blue-700"
              >
                Contact
              </a>
            </div>
            <div className="pt-2 border-t border-[#E6E1D6]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResumeOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-900 border border-[#DCD6C8] rounded-lg bg-white"
              >
                <FileText className="w-3.5 h-3.5 text-blue-700" />
                <span>View & Save My CV</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* SECTION 1: HOME — Warm, Attractive Split-Screen Hero */}
        <section id="home" className="max-w-7xl mx-auto px-6 pt-10 pb-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Simple, Friendly Introduction */}
            <RevealOnScroll className="lg:col-span-7 space-y-7">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-blue-800">
                <span>{PROFILE_DATA.location}</span>
                <span aria-hidden="true">·</span>
                <span>Sales Supervisor</span>
                <span aria-hidden="true">·</span>
                <span>Office & Customer Service</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                  Hello, I’m{' '}
                  <span className="text-blue-700">Nigatua Bizuneh Tsegaye</span> —{' '}
                  <span className="font-serif-editorial italic font-normal text-amber-700">
                    Dedicated to Great Service.
                  </span>
                </h1>

                <p className="text-base md:text-lg text-slate-700 max-w-2xl leading-relaxed">
                  {PROFILE_DATA.shortBio} I speak <strong className="text-slate-900">Amharic</strong>, <strong className="text-slate-900">English</strong>, and <strong className="text-slate-900">basic Arabic</strong>, and I am known for friendly teamwork and calm conflict resolution.
                </p>
              </div>

              {/* Simple Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href={`https://wa.me/${PROFILE_DATA.contact.whatsappNumberClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors whitespace-nowrap shadow-sm"
                >
                  <span>WhatsApp: {PROFILE_DATA.contact.whatsappDisplay}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-800 border border-[#DCD6C8] bg-white hover:bg-[#F2EFE9] rounded-xl transition-colors whitespace-nowrap"
                >
                  <span>See My Experience</span>
                </a>
              </div>

              {/* Simple Highlights Strip */}
              <div className="pt-8 border-t border-[#E6E1D6] grid grid-cols-1 sm:grid-cols-3 gap-6">
                {PROFILE_DATA.heroStats.map((stat, idx) => (
                  <RevealOnScroll key={stat.unit} delayMs={idx * 80} className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl md:text-2xl font-bold font-mono-tabular text-slate-900">
                        {stat.value}
                      </span>
                      <span className="text-xs font-semibold text-blue-700">
                        {stat.unit}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">
                      {stat.context}
                    </p>
                  </RevealOnScroll>
                ))}
              </div>
            </RevealOnScroll>

            {/* Right Column: Portrait Photo Card */}
            <RevealOnScroll delayMs={140} className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-slate-900 aspect-3/4 max-h-[580px] w-full max-w-md mx-auto">
                <SafeImage
                  src={customPhoto || PROFILE_DATA.heroImage}
                  alt="Portrait of Nigatua Bizuneh Tsegaye in traditional Ethiopian attire"
                  fallbackTitle="Nigatua Bizuneh Tsegaye"
                  fallbackSubtitle="Sales Supervisor & Customer Service"
                  className="w-full h-full object-cover object-top"
                />

                {/* Hidden file input so user can optionally select their exact uploaded file */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-black/65 hover:bg-blue-700 text-white rounded-lg backdrop-blur-xs transition-colors whitespace-nowrap"
                  title="Select your photo from your phone or computer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Change Photo</span>
                </button>

                {/* Measured Scrim Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-6 pt-16">
                  <p className="font-serif-editorial italic text-xl md:text-2xl text-amber-200 leading-snug">
                    “Helping every customer and visitor with a warm smile, patience, and respect.”
                  </p>
                  <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between gap-3 text-xs text-slate-200">
                    <div>
                      <div className="font-bold text-white">{PROFILE_DATA.fullName}</div>
                      <div className="text-slate-300 mt-0.5">
                        Dubai Mall · Marina Mall · Ramis · Ethiopian Consulate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Attractive Warm Color Ribbon Divider */}
        <div
          aria-hidden="true"
          className="border-y border-blue-900/10 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white py-3.5 overflow-hidden select-none"
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-medium whitespace-nowrap">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-8">
                <span>Dubai Mall Sales Supervisor</span>
                <span className="text-amber-300">·</span>
                <span>Marina Mall Abu Dhabi</span>
                <span className="text-amber-300">·</span>
                <span>Ramis Retail Sales</span>
                <span className="text-amber-300">·</span>
                <span>Ethiopian Consulate Office Assistant & Operator</span>
                <span className="text-amber-300">·</span>
                <span>Fluent in Amharic & English + Basic Arabic</span>
                <span className="text-amber-300">·</span>
                <span>Calm Conflict Resolution</span>
                <span className="text-amber-300">·</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: ABOUT & WORK EXPERIENCE */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Simple About Me Story */}
            <RevealOnScroll className="lg:col-span-5 space-y-5">
              <div className="text-xs font-semibold text-blue-700">
                01. About Me & My Work
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Friendly Service in{' '}
                <span className="font-serif-editorial italic font-normal text-blue-700">
                  Major Malls
                </span>{' '}
                & Consulate Offices.
              </h2>
              <div className="space-y-4 text-sm md:text-base text-slate-700 leading-relaxed">
                {PROFILE_DATA.extendedBio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-[#F2EFE9] border border-[#E6E1D6] space-y-1.5">
                <div className="text-xs font-bold text-slate-900">
                  Places I Have Worked
                </div>
                <div className="text-xs text-slate-700 leading-relaxed">
                  Dubai Mall · Marina Mall Abu Dhabi · Ramis · Ethiopian Consulate
                </div>
              </div>
            </RevealOnScroll>

            {/* Clear Work Experience Cards */}
            <RevealOnScroll delayMs={120} className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-4">
                <h3 className="text-sm font-bold text-slate-900">
                  My Work Experience
                </h3>
                <div className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg">
                  {EXPERIENCES.map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setActiveExperienceId(exp.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                        activeExperienceId === exp.id
                          ? 'bg-blue-700 text-white shadow-xs'
                          : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      {exp.index}. {exp.domain}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                {EXPERIENCES.map((exp, idx) => {
                  const isExpanded = activeExperienceId === exp.id;
                  return (
                    <RevealOnScroll key={exp.id} delayMs={idx * 90}>
                      <article
                        className={`p-6 md:p-7 rounded-2xl border transition-colors ${
                          isExpanded
                            ? 'bg-white border-blue-200 shadow-sm'
                            : 'bg-[#F2EFE9]/70 border-[#E6E1D6] hover:bg-white cursor-pointer'
                        }`}
                        onClick={() => setActiveExperienceId(exp.id)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                          <div className="text-xs font-medium text-slate-500">
                            <span>{exp.index}</span>
                            <span className="mx-2" aria-hidden="true">·</span>
                            <span>{exp.domain}</span>
                            <span className="mx-2" aria-hidden="true">·</span>
                            <span>{exp.locations}</span>
                          </div>
                          <span className="text-xs font-semibold text-blue-700">
                            {exp.keyMetric.value}
                          </span>
                        </div>

                        <h4 className="mt-2 text-xl font-bold text-slate-900">
                          {exp.role}
                        </h4>
                        <p className="mt-1 text-sm font-semibold text-amber-800">
                          {exp.organization}
                        </p>

                        <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                          {exp.summary}
                        </p>

                        {isExpanded && (
                          <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
                            <div className="text-xs font-bold text-slate-900">
                              What I Did in This Role:
                            </div>
                            <ul className="space-y-2">
                              {exp.highlights.map((highlight, hIdx) => (
                                <li
                                  key={hIdx}
                                  className="text-sm text-slate-700 leading-relaxed flex gap-3"
                                >
                                  <span className="font-mono-tabular text-xs font-bold text-blue-700 pt-1 shrink-0">
                                    0{hIdx + 1}.
                                  </span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </article>
                    </RevealOnScroll>
                  );
                })}
              </div>
            </RevealOnScroll>
          </div>

          {/* Simple Key Achievements Grid */}
          <div className="mt-16 pt-12 border-t border-[#E6E1D6]">
            <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="text-xs font-semibold text-blue-700">
                  Key Achievements
                </div>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  What I Am Proud Of at Work
                </h3>
              </div>
              <p className="text-xs text-slate-600 max-w-md">
                Results from my work in Dubai Mall, Marina Mall Abu Dhabi, Ramis, and the Ethiopian Consulate.
              </p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ACHIEVEMENTS.map((ach, idx) => (
                <RevealOnScroll
                  key={ach.id}
                  delayMs={idx * 80}
                  className="p-6 rounded-2xl bg-white border border-[#E6E1D6] shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold font-mono-tabular text-blue-700">
                        {ach.metric}
                      </span>
                      <span className="text-xs font-mono-tabular text-slate-400">
                        {ach.index}
                      </span>
                    </div>
                    <h4 className="mt-3 text-base font-bold text-slate-900">
                      {ach.title}
                    </h4>
                    <div className="mt-1 text-xs font-medium text-amber-800">
                      {ach.context}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                    {ach.description}
                  </p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: SKILLS, LANGUAGES & CONFLICT RESOLUTION */}
        <section id="skills" className="border-t border-[#E6E1D6] bg-[#F2EFE9] py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6 space-y-14">
            {/* Header & Simple Filter Tabs */}
            <RevealOnScroll className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs font-semibold text-blue-700">
                  02. My Skills & Languages
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  Skills That Help Customers &{' '}
                  <span className="font-serif-editorial italic font-normal text-blue-700">
                    Support the Team.
                  </span>
                </h2>
              </div>

              {/* Filter Buttons */}
              <div
                role="tablist"
                aria-label="Filter skills"
                className="flex flex-wrap items-center gap-1 p-1 bg-white border border-[#DCD6C8] rounded-xl self-start"
              >
                {(
                  [
                    'All',
                    'Sales & Supervision',
                    'Office & Operator',
                    'Customer Care'
                  ] as SkillFilter[]
                ).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={skillFilter === tab}
                    type="button"
                    onClick={() => setSkillFilter(tab)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      skillFilter === tab
                        ? 'bg-blue-700 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab === 'All' ? `All Skills (${SKILLS.length})` : tab}
                  </button>
                ))}
              </div>
            </RevealOnScroll>

            {/* Simple Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredSkills.map((skill, idx) => (
                <RevealOnScroll
                  key={skill.id}
                  delayMs={(idx % 3) * 60}
                  className="p-6 rounded-2xl bg-white border border-[#E6E1D6] shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono-tabular font-semibold text-blue-700">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{skill.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-800 font-medium">{skill.proficiencyLabel}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {skill.name}
                    </h3>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      {skill.proofPoint}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                    Used at: {skill.context}
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            {/* Languages & Conflict Resolution Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
              {/* Languages I Speak */}
              <RevealOnScroll className="lg:col-span-6 p-7 md:p-8 rounded-2xl bg-white border border-[#E6E1D6] shadow-xs space-y-6">
                <div>
                  <div className="text-xs font-semibold text-blue-700">
                    Languages I Speak
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">
                    Amharic, English & Basic Arabic
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Speaking three languages helps me welcome shoppers and visitors from many countries.
                  </p>
                </div>

                <div className="space-y-5">
                  {LANGUAGES.map((lang) => (
                    <div key={lang.language} className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-bold text-slate-900">
                            {lang.language}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({lang.nativeScript})
                          </span>
                          <span className="text-xs text-slate-400" aria-hidden="true">
                            ·
                          </span>
                          <span className="text-xs font-semibold text-blue-700">
                            {lang.level}
                          </span>
                        </div>
                        <span className="text-xs font-mono-tabular font-semibold text-slate-700">
                          {lang.percentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-700 rounded-full"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {lang.applicationContext}
                      </p>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>

              {/* Simple Conflict Resolution Steps */}
              <RevealOnScroll
                delayMs={120}
                className="lg:col-span-6 p-7 md:p-8 rounded-2xl bg-white border border-[#E6E1D6] shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-amber-800">
                    Special Strength
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Conflict Resolution & Problem Solving
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    When a customer in a busy mall or a visitor at the Consulate is upset or in a hurry, I follow four simple steps to make things right:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E1D6] space-y-1">
                    <div className="text-xs font-bold text-blue-700">01. Listen Patiently</div>
                    <div className="text-sm font-bold text-slate-900">
                      Stay Calm & Kind
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      I listen carefully with a warm, respectful voice so the person feels heard.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E1D6] space-y-1">
                    <div className="text-xs font-bold text-blue-700">02. Explain Simply</div>
                    <div className="text-sm font-bold text-slate-900">
                      Clear Information
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      I explain store rules or office steps in simple words in their language.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E1D6] space-y-1">
                    <div className="text-xs font-bold text-blue-700">03. Offer a Solution</div>
                    <div className="text-sm font-bold text-slate-900">
                      Fair & Quick Help
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      I give helpful options right away so the problem is solved without delay.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E1D6] space-y-1">
                    <div className="text-xs font-bold text-blue-700">04. Check Happiness</div>
                    <div className="text-sm font-bold text-slate-900">
                      End with a Smile
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      I make sure the customer or visitor leaves happy and satisfied.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION 4: PROJECTS & WORK HIGHLIGHTS — Deep Royal Navy Showcase */}
        <section id="projects" className="bg-[#0F172A] text-white py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            {/* Section Header & Filter Controls */}
            <RevealOnScroll className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs font-semibold text-amber-300">
                  03. Work Projects & Highlights
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  Real Examples of{' '}
                  <span className="font-serif-editorial italic font-normal text-amber-300">
                    My Work in Action.
                  </span>
                </h2>
                <p className="text-sm text-slate-300">
                  Click any card below to read the full story of how I helped customers and supported my team.
                </p>
              </div>

              {/* Filter Buttons */}
              <div
                role="tablist"
                aria-label="Filter work highlights"
                className="flex flex-wrap items-center gap-1 p-1 bg-slate-800/90 border border-slate-700 rounded-xl self-start"
              >
                {(
                  [
                    'All',
                    'Retail Sales',
                    'Consular Work',
                    'Customer Care'
                  ] as ProjectFilter[]
                ).map((filter) => (
                  <button
                    key={filter}
                    role="tab"
                    aria-selected={projectFilter === filter}
                    type="button"
                    onClick={() => setProjectFilter(filter)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      projectFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {filter === 'All' ? 'All Highlights' : filter}
                  </button>
                ))}
              </div>
            </RevealOnScroll>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => {
                const isWideBento = project.featured && projectFilter === 'All' && idx === 0;
                return (
                  <RevealOnScroll
                    key={project.id}
                    delayMs={idx * 90}
                    className={isWideBento ? 'md:col-span-2 md:row-span-2 flex' : 'col-span-1 flex'}
                  >
                    <article
                      onClick={() => setSelectedProject(project)}
                      className="group relative w-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 cursor-pointer flex flex-col justify-between transition-transform duration-150 hover:-translate-y-1 shadow-lg"
                    >
                      <div
                        className={`relative w-full overflow-hidden bg-slate-800 ${
                          isWideBento ? 'aspect-16/10 md:aspect-16/9' : 'aspect-4/3'
                        }`}
                      >
                        <SafeImage
                          src={project.image}
                          alt={project.imageAlt}
                          fallbackTitle={project.title}
                          fallbackSubtitle={project.location}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-950/75 hover:bg-blue-600 text-white rounded-lg backdrop-blur-xs transition-colors whitespace-nowrap"
                          aria-label={`Open ${project.title}`}
                        >
                          <span>View Details</span>
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="absolute bottom-4 left-6 right-6 flex items-baseline justify-between gap-2">
                          <div className="text-xs font-medium text-amber-300">
                            <span>{project.index}</span>
                            <span className="mx-2" aria-hidden="true">·</span>
                            <span>{project.category}</span>
                            <span className="mx-2" aria-hidden="true">·</span>
                            <span>{project.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 md:p-7 flex-1 flex flex-col justify-between space-y-5 bg-slate-900">
                        <div className="space-y-2">
                          <h3
                            className={`font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors ${
                              isWideBento ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                            }`}
                          >
                            {project.title}
                          </h3>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {project.subtitle}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                          <div>
                            <div className="text-sm font-bold text-white">
                              {project.metricValue}
                            </div>
                            <div className="text-xs text-slate-400">
                              {project.metricContext}
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 group-hover:underline whitespace-nowrap">
                            <span>Read More</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: EDUCATION & TRAINING */}
        <section id="education" className="max-w-7xl mx-auto px-6 py-20 md:py-24">
          <RevealOnScroll className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#E6E1D6]">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-semibold text-blue-700">
                04. Education & Practical Training
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                High School Diploma &{' '}
                <span className="font-serif-editorial italic font-normal text-blue-700">
                  Real Work Training.
                </span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-900 bg-white border border-[#DCD6C8] hover:bg-[#F2EFE9] rounded-xl transition-colors self-start whitespace-nowrap shadow-xs"
            >
              <FileText className="w-4 h-4 text-blue-700" />
              <span>Open & Download My Full CV</span>
            </button>
          </RevealOnScroll>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-7">
            {EDUCATION_AND_CREDENTIALS.map((edu, idx) => (
              <RevealOnScroll
                key={edu.id}
                as="article"
                delayMs={idx * 90}
                className="p-7 rounded-2xl bg-white border border-[#E6E1D6] shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="font-mono-tabular text-slate-400">{edu.index}</span>
                    <span className="text-blue-700">{edu.status}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {edu.qualification}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-amber-800">
                      {edu.institutionScope}
                    </p>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {edu.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                  <div className="text-xs font-bold text-slate-900">
                    Key Areas Covered
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    {edu.focusAreas.map((area, areaIdx) => (
                      <React.Fragment key={area}>
                        {areaIdx > 0 && (
                          <span className="mx-2 text-slate-400" aria-hidden="true">
                            ·
                          </span>
                        )}
                        <span>{area}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* SECTION 6: SIMPLE, EASY CONTACT SECTION */}
        <section id="contact" className="border-t border-[#E6E1D6] bg-white py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Direct WhatsApp & Email */}
              <RevealOnScroll className="lg:col-span-5 space-y-7">
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-blue-700">
                    05. Contact Me
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                    Let’s Talk on{' '}
                    <span className="font-serif-editorial italic font-normal text-blue-700">
                      WhatsApp or Email.
                    </span>
                  </h2>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    I am ready to start work in Dubai or Abu Dhabi in Sales Supervision, Customer Service, Reception, or Office Assistance. Feel free to message or call me anytime.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* WhatsApp Card */}
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6E1D6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-blue-700">
                        WhatsApp & Phone
                      </div>
                      <div className="mt-1 text-lg font-bold font-mono-tabular text-slate-900">
                        {PROFILE_DATA.contact.whatsappDisplay}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-600">
                        Quick reply in English, Amharic, or basic Arabic
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(PROFILE_DATA.contact.whatsappDisplay, 'whatsapp')
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-[#DCD6C8] rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
                      >
                        {copiedField === 'whatsapp' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-blue-700" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <a
                        href={`https://wa.me/${PROFILE_DATA.contact.whatsappNumberClean}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
                      >
                        <span>WhatsApp</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6E1D6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-amber-800">Email Address</div>
                      <div className="mt-1 text-base sm:text-lg font-bold font-mono-tabular text-slate-900 truncate">
                        {PROFILE_DATA.contact.email}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-600">
                        Send job offers or interview details
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(PROFILE_DATA.contact.email, 'email')}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-[#DCD6C8] rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
                      >
                        {copiedField === 'email' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-blue-700" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <a
                        href={`mailto:${PROFILE_DATA.contact.email}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
                      >
                        <span>Email Me</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Right Column: Simple Quick Message Box */}
              <RevealOnScroll delayMs={120} className="lg:col-span-7">
                <div className="p-7 md:p-9 rounded-2xl bg-[#FAF8F5] border border-[#E6E1D6] space-y-5">
                  <div className="pb-4 border-b border-[#E6E1D6]">
                    <h3 className="text-lg font-bold text-slate-900">
                      Send a Quick Message
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Write your message below and send it straight to my WhatsApp or Email.
                    </p>
                  </div>

                  {/* Simple Role Buttons */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-900">
                      What kind of role is this for?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        'Sales & Store Supervisor',
                        'Reception / Office Assistant',
                        'Customer Service'
                      ].map((roleOption) => (
                        <button
                          key={roleOption}
                          type="button"
                          onClick={() => setInquiryRoleType(roleOption)}
                          className={`px-3 py-2.5 text-xs font-semibold rounded-lg border text-left transition-colors truncate ${
                            inquiryRoleType === roleOption
                              ? 'bg-blue-700 text-white border-blue-700'
                              : 'bg-white text-slate-700 border-[#DCD6C8] hover:border-blue-700'
                          }`}
                        >
                          {roleOption}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-xs font-bold text-slate-900 mb-1.5"
                      >
                        Your Name
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD6C8] rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-blue-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="inquiry-org"
                        className="block text-xs font-bold text-slate-900 mb-1.5"
                      >
                        Company or Store Name
                      </label>
                      <input
                        id="inquiry-org"
                        type="text"
                        value={inquiryOrg}
                        onChange={(e) => setInquiryOrg(e.target.value)}
                        placeholder="Company name"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD6C8] rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-blue-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-xs font-bold text-slate-900 mb-1.5"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD6C8] rounded-lg text-slate-900 focus:outline-2 focus:outline-blue-700"
                    />
                  </div>

                  {inquiryStatus === 'sent' && (
                    <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-300 text-xs text-slate-900 flex items-center justify-between gap-2">
                      <span>
                        Thank you! Your message is ready. You can also call or WhatsApp me directly at{' '}
                        <strong className="font-mono-tabular">
                          {PROFILE_DATA.contact.whatsappDisplay}
                        </strong>
                        .
                      </span>
                      <button
                        type="button"
                        onClick={() => setInquiryStatus('idle')}
                        className="text-blue-700 font-semibold underline shrink-0"
                      >
                        Close
                      </button>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={composedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setInquiryStatus('sent')}
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors whitespace-nowrap shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send on WhatsApp ({PROFILE_DATA.contact.whatsappDisplay})</span>
                    </a>
                    <a
                      href={composedEmailUrl}
                      onClick={() => setInquiryStatus('sent')}
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-slate-900 bg-white border border-[#DCD6C8] hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap"
                    >
                      <span>Send by Email</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="bg-[#FAF8F5] border-t border-[#E6E1D6] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            <span className="font-bold text-slate-900">{PROFILE_DATA.fullName}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Sales Supervisor & Customer Service Professional</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#home" className="hover:text-blue-700 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-blue-700 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-blue-700 transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-blue-700 transition-colors">
              Projects
            </a>
            <a href="#education" className="hover:text-blue-700 transition-colors">
              Education
            </a>
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="hover:text-blue-700 font-semibold underline underline-offset-4 transition-colors"
            >
              View CV
            </button>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectLightboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        allProjects={PROJECTS}
      />

      {/* Simple CV Modal */}
      <ResumePreviewModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
