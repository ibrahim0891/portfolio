"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ProjectData } from "./ProjectModal";
import { ActivityIcon, CpuIcon, ExternalLinkIcon, CodeIcon, LockIcon, GitBranchIcon, ServerIcon, DatabaseIcon, AwardIcon } from "./Icons";

interface ProjectShowcaseProps {
    project: ProjectData & {
        context: string;
        built: string;
        imageSrc: string;
        images?: string[];
        features: { title: string; description: string; icon?: string }[];
    };
    onOpenSpec: () => void;
}

// Helper to map string keys to custom thin-line SVG icons
function getFeatureIcon(key?: string, size = 14) {
    switch (key) {
        case "lock":
            return <LockIcon size={size} className="text-[#282826] shrink-0 mt-0.5" />;
        case "cpu":
            return <CpuIcon size={size} className="text-[#282826] shrink-0 mt-0.5" />;
        case "activity":
            return <ActivityIcon size={size} className="text-[#282826] shrink-0 mt-0.5" />;
        case "git-branch":
            return <GitBranchIcon size={size} className="text-[#282826] shrink-0 mt-0.5" />;
        case "server":
            return <ServerIcon size={size} className="text-[#282826] shrink-0 mt-0.5" />;
        case "database":
            return <DatabaseIcon size={size} className="text-[#282826] shrink-0 mt-0.5" />;
        case "award":
            return <AwardIcon size={size} className="text-[#282826] shrink-0 mt-0.5" />;
        default:
            return <CodeIcon size={size} className="text-[#282826] shrink-0 mt-0.5" />;
    }
}

export default function ProjectShowcase({ project, onOpenSpec }: ProjectShowcaseProps) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [overlayImgSrc, setOverlayImgSrc] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!project.images || project.images.length <= 1 || isHovered) return;
        const interval = setInterval(() => {
            setActiveIdx((prev) => (prev === project.images!.length - 1 ? 0 : prev + 1));
        }, 4500);
        return () => clearInterval(interval);
    }, [project.images, isHovered]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOverlayOpen(false);
            }
        };
        if (isOverlayOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOverlayOpen]);

    return (
        <article className="space-y-10">
            {/* Brand logo at the very top, outside the grid, to align title with description */}
            {project.logoSrc && (
                <div className="mb-6 no-print">
                    <img
                        src={project.logoSrc}
                        alt={`${project.title} Logo`}
                        className="h-7 md:h-8 w-auto object-contain shrink-0"
                    />
                </div>
            )}
            {/* Intro Block: Title, Category, Status and Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_0.8fr] gap-6 lg:gap-8 items-start border-b border-[#D8D6D0] pb-6">
                <div>
                    <h3 className="text-4xl font-serif font-light text-[#282826] tracking-tight leading-tight">
                        {project.title}
                    </h3>
                    <p className="text-[9px] font-mono text-[#92928E] mt-1.5 flex items-center gap-1.5 capitalize tracking-[0.15em]">
                        <ActivityIcon size={12} />
                        {project.category}
                    </p>
                </div>

                <p className="text-sm text-[#5C5C59] leading-relaxed">
                    {project.summary}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono lg:justify-end">
                    {project.links?.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#282826] hover:underline cursor-pointer"
                        >
                            {link.label}
                            <ExternalLinkIcon size={12} />
                        </a>
                    ))}
                    <button
                        onClick={onOpenSpec}
                        className="inline-flex items-center gap-1 text-[#282826] hover:underline cursor-pointer"
                    >
                        Spec
                        <CodeIcon size={12} />
                    </button>
                </div>
            </div>

            {/* Mockup Display Banner / Carousel */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group border border-[#D8D6D0] p-1.5 bg-[#FAF9F6] rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden"
            >
                {project.images && project.images.length > 0 ? (
                    <div className="relative w-full overflow-hidden aspect-[3/2] sm:aspect-[16/10] md:aspect-[3/2]">
                        {project.images.map((imgSrc, idx) => (
                            <img
                                key={idx}
                                src={imgSrc}
                                alt={`${project.title} Interface Preview ${idx + 1}`}
                                onClick={() => {
                                    setOverlayImgSrc(imgSrc);
                                    setIsOverlayOpen(true);
                                }}
                                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 rounded-[2px] grayscale hover:grayscale-0 cursor-zoom-in ${idx === activeIdx ? "opacity-100 z-10" : "opacity-0 z-0"
                                    }`}
                            />
                        ))}

                        {/* Carousel Navigation UI */}
                        {project.images.length > 1 && (
                            <>
                                {/* Left/Right Buttons */}
                                <button
                                    onClick={() => setActiveIdx((prev) => (prev === 0 ? project.images!.length - 1 : prev - 1))}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-[#FAF9F6]/90 border border-[#D8D6D0] text-[#282826] text-xs font-mono rounded-[2px] opacity-0 group-hover:opacity-100 hover:bg-[#282826] hover:text-[#FAF9F6] transition-all duration-200 cursor-pointer shadow-sm"
                                    aria-label="Previous image"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={() => setActiveIdx((prev) => (prev === project.images!.length - 1 ? 0 : prev + 1))}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-[#FAF9F6]/90 border border-[#D8D6D0] text-[#282826] text-xs font-mono rounded-[2px] opacity-0 group-hover:opacity-100 hover:bg-[#282826] hover:text-[#FAF9F6] transition-all duration-200 cursor-pointer shadow-sm"
                                    aria-label="Next image"
                                >
                                    →
                                </button>

                                {/* Monospace Indicator Pill */}
                                <div className="absolute bottom-4 right-4 z-20 px-2 py-1 bg-[#FAF9F6]/90 border border-[#D8D6D0] text-[#282826] text-[10px] font-mono rounded-[2px] shadow-sm select-none">
                                    {String(activeIdx + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <img
                        src={project.imageSrc}
                        alt={`${project.title} Interface Preview`}
                        onClick={() => {
                            setOverlayImgSrc(project.imageSrc);
                            setIsOverlayOpen(true);
                        }}
                        className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500 rounded-[2px] cursor-zoom-in"
                    />
                )}
            </div>

            {/* Full Page Overlay for Image Preview (Rendered in Portal to bypass CSS Stacking Contexts) */}
            {isOverlayOpen && mounted && createPortal(
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-sm no-print cursor-zoom-out"
                    onClick={() => setIsOverlayOpen(false)}
                >
                    {/* Close button fixed at the top-right */}
                    <button
                        onClick={() => setIsOverlayOpen(false)}
                        className="fixed top-6 right-8 text-white text-3xl font-mono hover:text-gray-300 transition-colors cursor-pointer select-none z-[120] bg-black/40 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xs"
                        aria-label="Close image preview"
                    >
                        ✕
                    </button>

                    {/* Active Image wrapper - top-aligned, horizontally centered with scrolling */}
                    <div className="w-full min-h-screen py-16 flex justify-center items-start">
                        <div className="max-w-5xl w-full px-6 flex justify-center">
                            <img
                                src={overlayImgSrc}
                                alt="Full screen preview"
                                className="w-full h-auto rounded-[3px] shadow-2xl border border-white/10"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Typographical Details Rows */}
            <div className="grid grid-cols-1 md:grid-cols-[33%_40%_27%] gap-y-8 md:gap-y-0 md:divide-x md:divide-[#D8D6D0] pt-4">
                {/* Column 1: Scope & Metrics */}
                <div className="space-y-2 min-w-0 md:pr-6">
                    <span className="text-[9px] font-mono capitalize tracking-[0.15em] text-[#92928E] block">
                        01 // METRICS & SCOPE
                    </span>
                    <p className="text-2xl font-serif font-light text-[#282826] tracking-tight leading-normal">
                        {project.metric.split("·")[0].trim()}
                    </p>
                    <p className="text-xs text-[#5C5C59] font-mono leading-loose mt-1">
                        {project.metric.includes("·") ? project.metric.split("·").slice(1).join(" · ").trim() : project.summary}
                    </p>
                </div>

                {/* Column 2: Key Implementations */}
                <div className="space-y-2 min-w-0 md:px-6">
                    <span className="text-[9px] font-mono capitalize tracking-[0.15em] text-[#92928E] block">
                        02 // IMPLEMENTATIONS
                    </span>
                    <ul className="space-y-3.5 text-xs text-[#5C5C59] font-mono">
                        {project.features.slice(0, 2).map((feat, i) => (
                            <li key={i} className="flex items-start gap-2">
                                {getFeatureIcon(feat.icon)}
                                <div>
                                    <strong className="text-[#282826] block font-sans text-sm mb-0.5">
                                        {feat.title}
                                    </strong>
                                    {feat.description}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Tech Stack */}
                <div className="space-y-2 min-w-0 md:pl-6">
                    <span className="text-[9px] font-mono capitalize tracking-[0.15em] text-[#92928E] block">
                        03 // SYSTEM STACK
                    </span>
                    <p className="text-xs text-[#5C5C59] font-mono leading-relaxed">
                        {project.stack.join(" · ")}
                    </p>
                </div>
            </div>
        </article>
    );
}
