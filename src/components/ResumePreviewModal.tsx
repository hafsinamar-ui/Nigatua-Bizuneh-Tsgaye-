import React, { useEffect, useState } from 'react';
import { X, Download, Check, Copy } from 'lucide-react';
import {
  PROFILE_DATA,
  EXPERIENCES,
  EDUCATION_AND_CREDENTIALS,
  LANGUAGES,
  ACHIEVEMENTS
} from '../data/portfolioData';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({ isOpen, onClose }) => {
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getPlainTextResume = () =>
    [
      `${PROFILE_DATA.fullName} — ${PROFILE_DATA.headline}`,
      `Location: ${PROFILE_DATA.location}`,
      `WhatsApp: ${PROFILE_DATA.contact.whatsappDisplay} | Email: ${PROFILE_DATA.contact.email}`,
      '',
      'WORK EXPERIENCE:',
      ...EXPERIENCES.map(
        (e) => `- ${e.role} (${e.organization} — ${e.locations}): ${e.summary}`
      ),
      '',
      'LANGUAGES: Amharic (Fluent), English (Fluent), Arabic (Basic)',
      'KEY SKILLS: Sales Supervision, Customer Service, Office Assistant, Switchboard Operator, Conflict Resolution',
      'EDUCATION: High School Diploma (Grade 12 Completed)'
    ].join('\n');

  const handleCopySummary = () => {
    navigator.clipboard.writeText(getPlainTextResume());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([getPlainTextResume()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Nigatua_Bizuneh_Tsegaye_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white text-slate-900 border border-slate-200 rounded-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#FAF8F5] shrink-0">
          <div className="text-xs font-semibold text-slate-700">
            Resume / CV · {PROFILE_DATA.fullName}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-slate-300 bg-white rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-3.5 h-3.5 text-blue-700" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy CV Text</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save CV</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
              aria-label="Close CV window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 md:p-8 space-y-6 bg-white">
          <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 id="cv-modal-title" className="text-2xl font-bold text-slate-900">
                {PROFILE_DATA.fullName}
              </h2>
              <p className="mt-1 text-sm text-blue-700 font-medium">
                {PROFILE_DATA.headline}
              </p>
            </div>
            <div className="text-xs text-slate-600 font-mono-tabular space-y-1 md:text-right">
              <div>WhatsApp: {PROFILE_DATA.contact.whatsappDisplay}</div>
              <div>Email: {PROFILE_DATA.contact.email}</div>
              <div>Location: {PROFILE_DATA.location}</div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 mb-2">About Me</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {PROFILE_DATA.shortBio}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 mb-3">Work Experience</h3>
            <div className="space-y-5">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="pb-5 border-b border-slate-100 last:border-b-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-base font-bold text-slate-900">
                      {exp.role} — {exp.organization}
                    </h4>
                    <span className="text-xs text-slate-500">{exp.locations}</span>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-700 list-disc list-inside">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
            <div>
              <h3 className="text-xs font-bold text-slate-500 mb-2">Education</h3>
              <div className="space-y-2">
                {EDUCATION_AND_CREDENTIALS.map((edu) => (
                  <div key={edu.id}>
                    <div className="text-sm font-bold text-slate-900">{edu.qualification}</div>
                    <div className="text-xs text-slate-600">{edu.institutionScope}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-500 mb-2">Languages & Key Strengths</h3>
              <div className="space-y-1.5 text-sm text-slate-700">
                {LANGUAGES.map((lang) => (
                  <div key={lang.language} className="flex justify-between">
                    <span className="font-semibold text-slate-900">{lang.language}</span>
                    <span className="text-xs text-slate-600">{lang.level}</span>
                  </div>
                ))}
                <div className="pt-2 text-xs text-slate-600">
                  Conflict Resolution · Team Supervision · Customer Care · Telephone Operator
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 mb-2">Key Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACHIEVEMENTS.map((ach) => (
                <div key={ach.id} className="text-xs text-slate-700">
                  <strong className="text-blue-700">{ach.metric}</strong> — {ach.title} ({ach.context})
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
