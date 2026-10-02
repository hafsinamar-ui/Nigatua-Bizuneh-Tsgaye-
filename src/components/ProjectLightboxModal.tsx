import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ProjectCaseStudy, PROFILE_DATA } from '../data/portfolioData';
import { SafeImage } from './SafeImage';

interface ProjectLightboxModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onSelectProject: (project: ProjectCaseStudy) => void;
  allProjects: ProjectCaseStudy[];
}

export const ProjectLightboxModal: React.FC<ProjectLightboxModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = allProjects.findIndex((p) => p.id === project.id);
        const nextIndex = (currentIndex + 1) % allProjects.length;
        onSelectProject(allProjects[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = allProjects.findIndex((p) => p.id === project.id);
        const prevIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
        onSelectProject(allProjects[prevIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onSelectProject, allProjects]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const whatsappInquiryUrl = `https://wa.me/${PROFILE_DATA.contact.whatsappNumberClean}?text=${encodeURIComponent(
    `Hello Nigatua, I saw your work highlight "${project.title}" on your website and would love to talk with you.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white text-slate-900 border border-slate-200 rounded-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#FAF8F5] shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-mono-tabular">
            <span>Highlight {project.index}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
              aria-label="Previous work highlight"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
              aria-label="Next work highlight"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors whitespace-nowrap"
              aria-label="Close window"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-slate-900">
            <SafeImage
              src={project.image}
              alt={project.imageAlt}
              fallbackTitle={project.title}
              fallbackSubtitle={project.location}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-6">
              <div className="text-xs text-amber-300 font-medium mb-1">
                {project.location} · {project.metricValue}
              </div>
              <h2
                id="lightbox-project-title"
                className="text-2xl md:text-3xl font-bold text-white"
              >
                {project.title}
              </h2>
              <p className="mt-1 text-sm text-slate-200">{project.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-slate-200/80 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">The Situation</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{project.challenge}</p>
            </div>
            <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200/70 space-y-2">
              <h3 className="text-sm font-bold text-blue-950">The Result</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">How I Handled It</h3>
            <ul className="space-y-2.5">
              {project.approach.map((step, index) => (
                <li
                  key={index}
                  className="p-3.5 rounded-xl bg-[#FAF8F5] border border-slate-200/70 text-sm text-slate-800 flex gap-3"
                >
                  <span className="font-mono-tabular font-bold text-blue-700 shrink-0">
                    0{index + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              Skills used: {project.competenciesUsed.join(' · ')}
            </div>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Message Nigatua on WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
