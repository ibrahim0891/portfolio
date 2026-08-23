"use client";

import React, { useEffect } from "react";
import { ExternalLinkIcon, CodeIcon } from "./Icons";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  status: "live" | "amber" | "neutral";
  statusText: string;
  metric: string;
  summary: string;
  context: string;
  built: string;
  features: { title: string; description: string; icon?: string }[];
  stack: string[];
  links?: { label: string; url: string }[];
  logoSrc?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAF9F6] border border-[#D8D6D0] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D8D6D0]">
          <span className="text-[11px] font-mono uppercase tracking-[0.06em] text-[#92928E] flex items-center gap-1.5">
            <CodeIcon size={14} />
            {project.category}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-xs font-mono text-[#92928E] hover:text-[#282826] transition-colors cursor-pointer"
          >
            ESC / CLOSE ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto space-y-5">
          <div>
            <div className="space-y-2">
              {project.logoSrc && (
                <img
                  src={project.logoSrc}
                  alt={`${project.title} Logo`}
                  className="h-6 w-auto object-contain shrink-0 no-print block"
                />
              )}
              <h3
                id="modal-title"
                className="text-2xl font-serif text-[#282826] leading-snug"
              >
                {project.title}
              </h3>
            </div>
            <p className="text-xs font-mono text-[#92928E] mt-1.5">
              {project.metric}
            </p>
          </div>

          <p className="text-sm text-[#5C5C59] leading-relaxed border-l-2 border-[#282826] pl-4">
            {project.summary}
          </p>

          {/* Engineering Highlights */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.06em] text-[#92928E]">
              Engineering Highlights
            </h4>
            <div className="space-y-2">
              {project.features.map((f, i) => (
                <div key={i} className="text-sm">
                  <span className="font-mono text-[11px] text-[#92928E] mr-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <strong className="text-[#282826] font-medium">
                    {f.title}
                  </strong>
                  <span className="text-[#5C5C59]"> — {f.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-[0.06em] text-[#92928E] mb-2">
              Stack
            </h4>
            <p className="text-sm font-mono text-[#5C5C59]">
              {project.stack.join(" · ")}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#D8D6D0]">
          {project.links?.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-[#282826] hover:underline"
            >
              {link.label}
              <ExternalLinkIcon size={12} />
            </a>
          ))}
          <button
            onClick={onClose}
            className="text-xs font-mono text-[#92928E] hover:text-[#282826] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
