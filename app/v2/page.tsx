"use client";

import React, { useState, useEffect } from "react";
import { TOKENS } from "./tokens";

const COLOR_SCHEMES = [
    { name: "Swiss Red", accent: "#E8422F" },
    { name: "Safety Orange", accent: "#E05C1A" },
    { name: "Deep Cobalt", accent: "#1D4ED8" },
    { name: "Forest", accent: "#15803D" },
    { name: "Teal", accent: "#0F766E" },
    { name: "Warm Purple", accent: "#7C3AED" },
    { name: "Terracotta", accent: "#C2410C" },
    { name: "Steel Blue", accent: "#0369A1" },
    { name: "Crimson", accent: "#BE123C" },
    { name: "Olive", accent: "#4D7C0F" },
];

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
    imageSrc: string;
    images: string[];
}

const PROJECTS: ProjectData[] = [
    {
        id: "officetask",
        title: "Office Task Tool",
        category: "Real-time Operations & Team Portal",
        status: "live",
        statusText: "Active Dev",
        metric: "Solo-built · Deployed & used daily across office teams",
        context:
            "Built and maintained solo. Every department uses it daily — tasks get picked up, progress is tracked in real-time, and nothing falls through the cracks across team shifts.",
        built:
            "A real-time workspace portal with live commenting, instant web push notifications, team documentation hubs, and task assignment workflows that keep entire departments coordinated.",
        summary:
            "An internal tool I built and maintain solo. Used daily across the office — it keeps task progress visible, team communication in one place, and ensures work continues automatically between shifts.",
        imageSrc: "/project-screenshots/office-task/image.png",
        logoSrc: "/project-screenshots/logo/oficetask.png",
        images: [
            "/project-screenshots/office-task/image.png",
            "/project-screenshots/office-task/image_1.png",
            "/project-screenshots/office-task/image_2.png",
        ],
        features: [
            {
                title: "Real-time Collaboration",
                description: "Instant socket commenting, task allocations, and web push notifications.",
                icon: "activity",
            },
            {
                title: "Knowledge Hub & Docs",
                description: "Shared workspace wiki guides and team-wide documentation hubs.",
                icon: "database",
            },
        ],
        stack: [
            "Next.js 16 (App Router)",
            "TypeScript",
            "React 19",
            "Express.js",
            "Prisma ORM",
            "PostgreSQL",
            "Socket.io",
            "Web Push API",
            "Tailwind CSS",
            "@xyflow/react",
            "@hello-pangea/dnd",
        ],
        links: [{ label: "Live site", url: "https://daily-task.aiteamtwo.com" }],
    },
    {
        id: "icepots",
        title: "Icepots.in",
        category: "Telehealth & E-Commerce",
        status: "live",
        statusText: "Production",
        metric: "~300 MAU · ₹400k sales in 2 months",
        context:
            "An active private e-commerce and telehealth platform with restricted access control for doctor consultations and medical product ordering.",
        built:
            "An invite-only onboarding system with email domain validation, role-based doctor/patient portals, and a Next.js middleware route protection layer.",
        summary:
            "An active private e-commerce and telehealth platform with restricted access control for doctor consultations and medical product ordering, serving verified healthcare practices.",
        imageSrc: "/project-screenshots/icepots/image.png",
        logoSrc: "/project-screenshots/logo/icepots.png",
        images: [
            "/project-screenshots/icepots/image.png",
            "/project-screenshots/icepots/image2.png",
            "/project-screenshots/icepots/image1.png",
            "/project-screenshots/icepots/image4.png",
        ],
        features: [
            {
                title: "Restricted Access Control",
                description: "Invite-only onboarding with email domain validation to restrict platform access.",
                icon: "lock",
            },
            {
                title: "Appointment Scheduling",
                description: "System for booking, canceling, and managing doctor consultation slots.",
                icon: "activity",
            },
        ],
        stack: [
            "Next.js",
            "TypeScript",
            "React Query",
            "PostgreSQL",
            "Express.js",
            "Prisma ORM",
            "Tailwind CSS",
        ],
        links: [
            { label: "Live site (India only)", url: "https://icepots.in" },
            { label: "Case Study Doc", url: "https://docs.google.com/document/d/1K1vMXs9i039Lu_1lAl5GnoWYh18PyTlVIGbP4WDX9ZE/edit?tab=t.0" },
        ],
    },
    {
        id: "cian",
        title: "CIAN Collective",
        category: "Music Streaming & Distribution",
        status: "live",
        statusText: "Production",
        metric: "Persistent playback · Stripe payment flows · Redux Toolkit caching",
        context:
            "A music streaming and distribution web application where users can stream, license, and purchase audio tracks, albums, and devotions.",
        built:
            "A persistent audio player with playlist queues, Redux state synchronization, Stripe checkout models, and Recharts analytics dashboards.",
        summary:
            "A music streaming and distribution web application where users can stream, license, and purchase audio tracks, albums, and devotions.",
        imageSrc: "/project-screenshots/cian/image_1.png",
        logoSrc: "/project-screenshots/logo/cian.svg",
        images: [
            "/project-screenshots/cian/image_1.png",
            "/project-screenshots/cian/image_2.png",
            "/project-screenshots/cian/image_3.png",
            "/project-screenshots/cian/image_4.png",
        ],
        features: [
            {
                title: "Audio Playback",
                description: "Persistent audio player with playlist management, favorites, and downloads.",
                icon: "activity",
            },
            {
                title: "Payment Integration",
                description: "Integrated Stripe and cart systems for subscriptions, team licenses, and checkouts.",
                icon: "lock",
            },
        ],
        stack: [
            "Next.js App Router",
            "TypeScript",
            "Redux Toolkit",
            "RTK Query",
            "Stripe API",
            "Recharts",
            "Tailwind CSS",
            "PostgreSQL",
        ],
        links: [{ label: "Live site", url: "https://ciancollective.org" }],
    },
];

export default function HomeV2() {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [dhakaTime, setDhakaTime] = useState("");
    const [showGridOverlay, setShowGridOverlay] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});
    const [scheme] = useState(() => COLOR_SCHEMES[Math.floor(Math.random() * COLOR_SCHEMES.length)]);

    const nextImage = (projectId: string, total: number) => {
        setActiveImageIndices((prev) => ({
            ...prev,
            [projectId]: ((prev[projectId] || 0) + 1) % total,
        }));
    };

    const prevImage = (projectId: string, total: number) => {
        setActiveImageIndices((prev) => ({
            ...prev,
            [projectId]: ((prev[projectId] || 0) - 1 + total) % total,
        }));
    };

    useEffect(() => {
        const tick = () => {
            try {
                setDhakaTime(
                    new Intl.DateTimeFormat("en-GB", {
                        timeZone: "Asia/Dhaka",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }).format(new Date())
                );
            } catch {
                setDhakaTime("—");
            }
        };
        tick();
        const id = setInterval(tick, 30_000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImageIndices((prev) => {
                const next = { ...prev };
                PROJECTS.forEach((project) => {
                    const current = prev[project.id] || 0;
                    next[project.id] = (current + 1) % project.images.length;
                });
                return next;
            });
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-drawn");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.05,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        const elements = document.querySelectorAll(".draft-line, .draft-grid-col");
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const copyEmail = () => {
        navigator.clipboard.writeText("muhammadibrahim98297996@gmail.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2200);
    };

    return (
        <div className="w-full min-h-screen bg-[#F3F2ED] text-[#141414] selection:bg-[var(--accent)] selection:text-white font-sans relative overflow-x-clip pb-24">
            {showGridOverlay && (
                <div className="fixed inset-y-0 left-0 right-0 pointer-events-none z-50 max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-12 gap-x-4 md:gap-x-6" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-full bg-[var(--accent)]/[0.015] border-x border-[var(--accent)]/[0.08]" />
                    ))}
                </div>
            )}

            <button
                onClick={() => setShowGridOverlay(!showGridOverlay)}
                className="fixed bottom-6 right-6 z-50 bg-[#141414] text-[#F3F2ED] hover:bg-[var(--accent)] hover:text-white px-4 py-2 font-mono text-[11px] capitalize tracking-[0.1em] border border-[#141414] transition-colors cursor-pointer no-print font-bold"
            >
                GRID: {showGridOverlay ? "ON" : "OFF"}
            </button>
            <header className="sticky top-0 z-40 bg-[#F3F2ED]/95 backdrop-blur-[1px] w-full border-b border-[#141414]/15 no-print">
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-4 flex justify-between lg:grid lg:grid-cols-12 gap-y-3 lg:gap-y-0 md:gap-x-6 items-center">
                    <div className="lg:col-span-3">
                        <span className="text-[12px] font-sans font-bold capitalize tracking-[0.2em] text-[#141414]">
                            MUHAMMAD IBRAHIM
                        </span>
                    </div>

                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-[12px] font-sans font-bold capitalize tracking-[0.1em] text-[#141414] hover:text-[var(--accent)] cursor-pointer"
                        >
                            {isMenuOpen ? "CLOSE ✕" : "MENU ☰"}
                        </button>
                    </div>

                    <nav className="hidden lg:flex lg:col-span-5 items-center justify-start gap-8">
                        <a href="#work" className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[#141414]/70 hover:text-[var(--accent)] transition-colors">
                            Work
                        </a>
                        <a href="#capabilities" className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[#141414]/70 hover:text-[var(--accent)] transition-colors">
                            Capabilities
                        </a>
                        <a href="#experience" className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[#141414]/70 hover:text-[var(--accent)] transition-colors">
                            Experience
                        </a>
                        <a href="#contact" className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[#141414]/70 hover:text-[var(--accent)] transition-colors">
                            Contact
                        </a>
                    </nav>

                    <div className="hidden lg:flex lg:col-span-4 items-center justify-end gap-6 text-[12px] font-mono text-[#5C5C59] font-variant-numeric[tabular-nums]">
                        <span>DHAKA {dhakaTime}</span>
                        <span className="inline-flex items-center gap-2 text-[var(--accent)] font-bold">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                            AVAILABLE
                        </span>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="lg:hidden border-t border-[#141414]/15 bg-[#F3F2ED] py-8 px-6 space-y-6">
                        <nav className="flex flex-col gap-6">
                            <a
                                href="#work"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-[28px] font-sans font-extrabold capitalize tracking-tight text-[#141414] hover:text-[var(--accent)] flex items-center gap-4 transition-colors"
                            >
                                <span className="text-[12px] font-mono text-[var(--accent)]">01 //</span>
                                WORK
                            </a>
                            <a
                                href="#capabilities"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-[28px] font-sans font-extrabold capitalize tracking-tight text-[#141414] hover:text-[var(--accent)] flex items-center gap-4 transition-colors"
                            >
                                <span className="text-[12px] font-mono text-[var(--accent)]">02 //</span>
                                CAPABILITIES
                            </a>
                            <a
                                href="#experience"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-[28px] font-sans font-extrabold capitalize tracking-tight text-[#141414] hover:text-[var(--accent)] flex items-center gap-4 transition-colors"
                            >
                                <span className="text-[12px] font-mono text-[var(--accent)]">03 //</span>
                                EXPERIENCE
                            </a>
                            <a
                                href="#contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-[28px] font-sans font-extrabold capitalize tracking-tight text-[#141414] hover:text-[var(--accent)] flex items-center gap-4 transition-colors"
                            >
                                <span className="text-[12px] font-mono text-[var(--accent)]">04 //</span>
                                CONTACT
                            </a>
                        </nav>

                        <div className="pt-6 border-t border-[#141414]/10 flex justify-between items-center text-[11px] font-mono text-[#5C5C59]">
                            <span>DHAKA {dhakaTime}</span>
                            <span className="inline-flex items-center gap-1.5 text-[var(--accent)] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                                AVAILABLE
                            </span>
                        </div>
                    </div>
                )}
            </header>
            <section id="hero" className="w-full relative bg-[#F3F2ED]">
                <div className="absolute inset-y-0 left-0 right-0 pointer-events-none z-0 max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-12 gap-x-4 md:gap-x-6" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            style={{ transitionDelay: `${i * 35}ms` }}
                            className="draft-grid-col h-full border-r border-[#141414]/[0.035] last:border-r-0"
                        />
                    ))}
                </div>

                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-16 lg:py-24 grid grid-cols-12 gap-x-4 md:gap-x-6 relative z-10">
                    <div className="col-span-12 lg:col-span-2 flex flex-col justify-start mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24 flex flex-col gap-1">
                            <span className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                00 // HERO
                            </span>
                            <div className="flex flex-row lg:flex-col gap-x-6 gap-y-1 mt-2 lg:mt-3">
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    REF // SUBJECT_01
                                </span>
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    23.77°N 90.42°E
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-10 flex flex-col justify-center mt-4 lg:mt-0">
                        <h1 className="text-[56px] sm:text-[72px] md:text-[88px] lg:text-[96px] font-serif leading-[0.9] tracking-[-0.03em] text-[#141414] font-light">
                            Muhammad Ibrahim
                        </h1>
                        <span className="text-[12px] font-sans capitalize font-bold tracking-[0.15em] text-[var(--accent)] mt-6 block">
                            FULLSTACK WEB DEVELOPER · SM TECHNOLOGY
                        </span>
                        <p className="text-[18px] md:text-[22px] leading-[30px] font-sans text-[#5C5C59] mt-8 max-w-3xl font-light">
                            Building practical, maintainable web applications — from client analysis through production deployment — with Next.js, TypeScript, PostgreSQL, and Express.
                        </p>

                        <div className="mt-16 pt-8 relative flex flex-wrap gap-x-8 gap-y-4 text-[12px] font-mono text-[#5C5C59]">
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#141414]/10 overflow-hidden" aria-hidden="true">
                                <div className="draft-line h-full bg-[#141414]/25 relative" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[var(--accent)] font-bold">~1 YR</span> EXPERIENCE
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[var(--accent)] font-bold">02</span> PRODUCTION APPS
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[var(--accent)] font-bold">300+</span> MAU SCALED
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#141414]/10 relative overflow-hidden" aria-hidden="true">
                    <div className="draft-line h-full bg-[#141414]/20 relative" />
                </div>
            </section>
            <section id="experience" className="w-full bg-[#F3F2ED] relative">
                <div className="absolute inset-0 pointer-events-none z-0 max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-12 gap-x-4 md:gap-x-6 w-full" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            style={{ transitionDelay: `${i * 35}ms` }}
                            className="draft-grid-col h-full border-r border-[#141414]/[0.035] last:border-r-0"
                        />
                    ))}
                </div>
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24 grid grid-cols-12 gap-x-4 md:gap-x-6 relative z-10">
                    <div className="col-span-12 lg:col-span-2 flex flex-col justify-start mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24 flex flex-col gap-1">
                            <span className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                01 // EXPERIENCE
                            </span>
                            <div className="flex flex-row lg:flex-col gap-x-6 gap-y-1 mt-2 lg:mt-3">
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    REF // ROLES_TIMELINE
                                </span>
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    2025 — PRESENT
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 gap-x-4 md:gap-x-6">
                        <div className="col-span-12 lg:col-span-10 pb-6 mb-16 lg:mb-24 relative">
                            <h2 className="text-[36px] md:text-[56px] lg:text-[80px] font-sans font-extrabold capitalize tracking-[-0.03em] leading-none text-[#141414]">
                                Experience
                            </h2>
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#141414]/10 overflow-hidden" aria-hidden="true">
                                <div className="draft-line h-full bg-[#141414]/25 relative" />
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-4 lg:col-span-4">
                            <span className="text-[11px] font-mono text-[#92928E] block mb-2">
                                DEC 2025 — PRESENT · DHAKA, BD
                            </span>
                            <h3 className="text-[28px] font-serif leading-tight text-[#141414] font-light">
                                Frontend Developer
                            </h3>
                            <span className="text-[12px] font-sans font-bold capitalize tracking-[0.1em] text-[#5C5C59] mt-2 block">
                                SM TECHNOLOGY
                            </span>
                        </div>

                        <div className="col-span-12 md:col-span-8 lg:col-span-6 space-y-6 mt-8 md:mt-0">
                            <div className="border-b border-[#141414]/10 pb-6 last:border-b-0 last:pb-0">
                                <h4 className="text-[14px] font-sans font-bold text-[#141414] capitalize tracking-wider mb-2">
                                    Fullstack Feature Delivery
                                </h4>
                                <p className="text-[16px] leading-[24px] font-sans text-[#5C5C59]">
                                    Building and deploying client-facing web components using Express.js and PostgreSQL.
                                </p>
                            </div>
                            <div className="border-b border-[#141414]/10 pb-6 last:border-b-0 last:pb-0">
                                <h4 className="text-[14px] font-sans font-bold text-[#141414] capitalize tracking-wider mb-2">
                                    REST API Integration
                                </h4>
                                <p className="text-[16px] leading-[24px] font-sans text-[#5C5C59]">
                                    Connecting client frontend layers to REST endpoints with caching and validation.
                                </p>
                            </div>
                            <div className="border-b border-[#141414]/10 pb-6 last:border-b-0 last:pb-0">
                                <h4 className="text-[14px] font-sans font-bold text-[#141414] capitalize tracking-wider mb-2">
                                    Collaborative Launching
                                </h4>
                                <p className="text-[16px] leading-[24px] font-sans text-[#5C5C59]">
                                    Partnering with design and systems teams throughout implementation.
                                </p>
                            </div>
                            <div className="border-b border-[#141414]/10 pb-6 last:border-b-0 last:pb-0">
                                <h4 className="text-[14px] font-sans font-bold text-[#141414] capitalize tracking-wider mb-2">
                                    Codebase Stewardship
                                </h4>
                                <p className="text-[16px] leading-[24px] font-sans text-[#5C5C59]">
                                    Refactoring legacy structures and optimizing application stability.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#141414]/10 relative overflow-hidden" aria-hidden="true">
                    <div className="draft-line h-full bg-[#141414]/20 relative" />
                </div>
            </section>
            <section id="work" className="w-full bg-[#F3F2ED] relative">
                <div className="absolute inset-0 pointer-events-none z-0 max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-12 gap-x-4 md:gap-x-6 w-full" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            style={{ transitionDelay: `${i * 35}ms` }}
                            className="draft-grid-col h-full border-r border-[#141414]/[0.035] last:border-r-0"
                        />
                    ))}
                </div>
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24 grid grid-cols-12 gap-x-4 md:gap-x-6 relative z-10">
                    <div className="col-span-12 lg:col-span-2 flex flex-col justify-start mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24 flex flex-col gap-1">
                            <span className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                02 // SELECTED WORK
                            </span>
                            <div className="flex flex-row lg:flex-col gap-x-6 gap-y-1 mt-2 lg:mt-3">
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    REF // PRODUCTION_APPS
                                </span>
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    03 LIVE DEPLOYMENTS
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-10 mt-8 lg:mt-0">
                        <div className="col-span-12 lg:col-span-10 pb-6 mb-16 lg:mb-24 relative">
                            <h2 className="text-[36px] md:text-[56px] lg:text-[80px] font-sans font-extrabold capitalize tracking-[-0.03em] leading-none text-[#141414]">
                                Selected Work
                            </h2>
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#141414]/10 overflow-hidden" aria-hidden="true">
                                <div className="draft-line h-full bg-[#141414]/25 relative" />
                            </div>
                        </div>

                        <div>
                            {PROJECTS.map((project, idx) => {
                                const serial = `02.${idx + 1} //`;
                                return (
                                    <div key={project.id} className="py-16 first:pt-0 last:pb-0 grid grid-cols-12 lg:grid-cols-10 gap-x-4 md:gap-x-6 relative">
                                        {idx > 0 && (
                                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#141414]/10 overflow-hidden" aria-hidden="true">
                                                <div className="draft-line h-full bg-[#141414]/20 relative" />
                                            </div>
                                        )}
                                        <div className="col-span-12 md:col-span-3 lg:col-span-2 flex flex-col justify-between mb-6 md:mb-0">
                                            <div>
                                                <span className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)] block">
                                                    {serial}
                                                </span>
                                                <span className="text-[36px] md:text-[48px] font-serif text-[#141414] mt-2 block font-light leading-none">
                                                    {idx + 1}
                                                </span>
                                            </div>

                                            <div className="text-[11px] font-mono text-[#92928E] hidden md:block">
                                                {project.id === "officetask" && "BUILD // 2026.04.12"}
                                                {project.id === "icepots" && "BUILD // 2025.11.02"}
                                                {project.id === "cian" && "BUILD // 2025.08.19"}
                                            </div>
                                        </div>

                                        <div className="col-span-12 md:col-span-9 lg:col-span-8 space-y-6">
                                            <div>
                                                <h3 className="text-[36px] md:text-[64px] font-serif text-[#141414] tracking-tighter leading-[0.95] font-light">
                                                    {project.title}
                                                </h3>
                                                <p className="text-[12px] font-sans font-bold text-[var(--accent)] tracking-[0.08em] capitalize mt-2">
                                                    {project.category}
                                                </p>
                                            </div>

                                            <div className="border border-[#141414]/15 overflow-hidden bg-neutral-200 w-full flex flex-col relative">
                                                <span className="absolute top-0 left-0 w-1 h-1 bg-[#141414] translate-x-[-2px] translate-y-[-2px] z-10" />
                                                <span className="absolute top-0 right-0 w-1 h-1 bg-[#141414] translate-x-[2px] translate-y-[-2px] z-10" />
                                                <span className="absolute bottom-0 left-0 w-1 h-1 bg-[#141414] translate-x-[-2px] translate-y-[2px] z-10" />
                                                <span className="absolute bottom-0 right-0 w-1 h-1 bg-[#141414] translate-x-[2px] translate-y-[2px] z-10" />
                                                <div className="bg-white border-b border-[#141414]/15 px-4 py-2.5 flex items-center gap-1.5 no-print select-none">
                                                    <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                                                    <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                                                    <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                                                </div>

                                                <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                                                    <img
                                                        src={project.images[activeImageIndices[project.id] || 0]}
                                                        alt={`${project.title} Interface Screenshot`}
                                                        className="w-full h-full object-cover object-top"
                                                    />

                                                    {project.images.length > 1 && (
                                                        <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-[#F3F2ED] text-[#141414] border border-[#141414] px-2 py-1 text-[11px] font-mono select-none z-10 font-bold">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    prevImage(project.id, project.images.length);
                                                                }}
                                                                className="hover:text-[var(--accent)] transition-colors cursor-pointer"
                                                            >
                                                                ←
                                                            </button>
                                                            <span className="font-variant-numeric[tabular-nums]">
                                                                {String((activeImageIndices[project.id] || 0) + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                                                            </span>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    nextImage(project.id, project.images.length);
                                                                }}
                                                                className="hover:text-[var(--accent)] transition-colors cursor-pointer"
                                                            >
                                                                →
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-[30%_40%_30%] gap-6 pt-6 border-t border-[#141414]/15">
                                                <div className="space-y-2">
                                                    <span className="text-[11px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)] block">
                                                        01 // METRICS & SCOPE
                                                    </span>
                                                    <p className="text-[16px] font-serif leading-snug text-[#141414]">
                                                        {project.metric.split("·")[0].trim()}
                                                    </p>
                                                    <p className="text-[12px] font-mono text-[#5C5C59] leading-relaxed mt-1">
                                                        {project.metric.includes("·") ? project.metric.split("·").slice(1).join(" · ").trim() : project.summary}
                                                    </p>
                                                </div>

                                                <div className="space-y-3">
                                                    <span className="text-[11px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)] block">
                                                        02 // KEY FEATURE UNITS
                                                    </span>
                                                    <ul className="space-y-3 text-[12px] font-mono text-[#5C5C59]">
                                                        {project.features.map((feat, i) => (
                                                            <li key={i} className="flex items-start gap-2">
                                                                <span className="text-[var(--accent)] font-bold shrink-0">↳</span>
                                                                <div>
                                                                    <strong className="text-[#141414] block font-sans text-xs">
                                                                        {feat.title}
                                                                    </strong>
                                                                    {feat.description}
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="space-y-1">
                                                        <span className="text-[11px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)] block">
                                                            03 // SYSTEM STACK
                                                        </span>
                                                        <p className="text-[12px] font-mono text-[#5C5C59] leading-relaxed">
                                                            {project.stack.join(" · ")}
                                                        </p>
                                                    </div>

                                                    <div className="pt-2 flex flex-wrap gap-4 items-center">
                                                        {project.links?.map((link, i) => (
                                                            <a
                                                                key={i}
                                                                href={link.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-[11px] font-sans font-bold capitalize tracking-[0.08em] text-[#141414] hover:text-[var(--accent)] underline decoration-dotted transition-colors"
                                                            >
                                                                {link.label} ↗
                                                            </a>
                                                        ))}
                                                        <button
                                                            onClick={() => setSelectedProject(project)}
                                                            className="text-[11px] font-sans font-bold capitalize tracking-[0.08em] text-[#141414] hover:text-[var(--accent)] underline decoration-dotted cursor-pointer"
                                                        >
                                                            OPEN SPEC ⇲
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#141414]/10 relative overflow-hidden" aria-hidden="true">
                    <div className="draft-line h-full bg-[#141414]/20 relative" />
                </div>
            </section>
            <section id="capabilities" className="w-full bg-[#F3F2ED] relative">
                <div className="absolute inset-0 pointer-events-none z-0 max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-12 gap-x-4 md:gap-x-6 w-full" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            style={{ transitionDelay: `${i * 35}ms` }}
                            className="draft-grid-col h-full border-r border-[#141414]/[0.035] last:border-r-0"
                        />
                    ))}
                </div>
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24 grid grid-cols-12 gap-x-4 md:gap-x-6 relative z-10">
                    <div className="col-span-12 lg:col-span-2 flex flex-col justify-start mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24 flex flex-col gap-1">
                            <span className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                03 // CAPABILITIES
                            </span>
                            <div className="flex flex-row lg:flex-col gap-x-6 gap-y-1 mt-2 lg:mt-3">
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    REF // TECH_STACK
                                </span>
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    FULLSTACK SYSTEMS
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Capabilities Details (Cols 3-12 on desktop, 1-12 on mobile/tablet) */}
                    <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 gap-x-4 md:gap-x-6">
                        <div className="col-span-12 lg:col-span-10 pb-6 mb-16 lg:mb-24 relative">
                            <h2 className="text-[36px] md:text-[56px] lg:text-[80px] font-sans font-extrabold capitalize tracking-[-0.03em] leading-none text-[#141414]">
                                Capabilities
                            </h2>
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#141414]/10 overflow-hidden" aria-hidden="true">
                                <div className="draft-line h-full bg-[#141414]/25 relative" />
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-0 mt-8 md:mt-0">
                            <div className="col-span-12 md:col-span-4 lg:col-span-3">
                                <h3 className="text-[12px] font-sans font-bold text-[#141414] capitalize tracking-[0.08em] mb-4 pb-2 border-b border-[#141414]/15 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#141414] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <rect x="4" y="4" width="16" height="16" rx="0" />
                                        <path d="M9 9h6v6H9z" />
                                        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
                                    </svg>
                                    Frontend
                                </h3>
                                <ul className="space-y-2 text-[12px] text-[#5C5C59] font-mono">
                                    <li>Next.js (App & Pages)</li>
                                    <li>TypeScript</li>
                                    <li>React 19 Core</li>
                                    <li>Tailwind CSS</li>
                                    <li>React Query</li>
                                    <li>Redux Toolkit</li>
                                </ul>
                            </div>

                            <div className="col-span-12 md:col-span-4 lg:col-span-4">
                                <h3 className="text-[12px] font-sans font-bold text-[#141414] capitalize tracking-[0.08em] mb-4 pb-2 border-b border-[#141414]/15 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#141414] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <rect x="2" y="2" width="20" height="6" />
                                        <rect x="2" y="9" width="20" height="6" />
                                        <rect x="2" y="16" width="20" height="6" />
                                        <path d="M6 5h.01M6 12h.01M6 19h.01" />
                                    </svg>
                                    Backend & APIs
                                </h3>
                                <ul className="space-y-2 text-[12px] text-[#5C5C59] font-mono">
                                    <li>Express.js / Node.js</li>
                                    <li>REST API Design</li>
                                    <li>Edge Middleware</li>
                                    <li>OAuth / JWT / OTP</li>
                                    <li>Stripe API Integration</li>
                                </ul>
                            </div>

                            <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-8">
                                <div>
                                    <h3 className="text-[12px] font-sans font-bold text-[#141414] capitalize tracking-[0.08em] mb-4 pb-2 border-b border-[#141414]/15 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-[#141414] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <ellipse cx="12" cy="5" rx="9" ry="3" />
                                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                                        </svg>
                                        Data Modeling
                                    </h3>
                                    <ul className="space-y-2 text-[12px] text-[#5C5C59] font-mono">
                                        <li>PostgreSQL SQL</li>
                                        <li>Prisma ORM</li>
                                        <li>MongoDB</li>
                                        <li>Schema Migrations</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-[12px] font-sans font-bold text-[#141414] capitalize tracking-[0.08em] mb-4 pb-2 border-b border-[#141414]/15 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-[#141414] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <circle cx="18" cy="18" r="3" />
                                            <circle cx="6" cy="6" r="3" />
                                            <circle cx="6" cy="18" r="3" />
                                            <path d="M6 9v6M9 9a9 9 0 0 1 9 9" />
                                        </svg>
                                        Workflow
                                    </h3>
                                    <ul className="space-y-2 text-[12px] text-[#5C5C59] font-mono">
                                        <li>Git / GitHub</li>
                                        <li>CI/CD Automation</li>
                                        <li>Linux VPS Terminal</li>
                                        <li>Postman / Figma</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#141414]/10 relative overflow-hidden" aria-hidden="true">
                    <div className="draft-line h-full bg-[#141414]/20 relative" />
                </div>
            </section>
            <section id="process" className="w-full bg-[#F3F2ED] relative">
                <div className="absolute inset-0 pointer-events-none z-0 max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-12 gap-x-4 md:gap-x-6 w-full" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            style={{ transitionDelay: `${i * 35}ms` }}
                            className="draft-grid-col h-full border-r border-[#141414]/[0.035] last:border-r-0"
                        />
                    ))}
                </div>
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 grid grid-cols-12 gap-x-4 md:gap-x-6 relative z-10">
                    <div className="col-span-12 lg:col-span-2 flex flex-col justify-start mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24 flex flex-col gap-1">
                            <span className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                04 // PROCESS
                            </span>
                            <div className="flex flex-row lg:flex-col gap-x-6 gap-y-1 mt-2 lg:mt-3">
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    REF // WORKFLOW
                                </span>
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    ENGINEERING DISCIPLINE
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 gap-x-4 md:gap-x-6">
                        <div className="col-span-12 lg:col-span-10 pb-6 mb-16 lg:mb-24 relative">
                            <h2 className="text-[36px] md:text-[56px] lg:text-[80px] font-sans font-extrabold capitalize tracking-[-0.03em] leading-none text-[#141414]">
                                Process
                            </h2>
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#141414]/10 overflow-hidden" aria-hidden="true">
                                <div className="draft-line h-full bg-[#141414]/25 relative" />
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-0">
                            <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col gap-2">
                                <div className="border border-[#141414] overflow-hidden aspect-[4/3] relative">
                                    <span className="absolute top-0 left-0 w-1 h-1 bg-[var(--accent)] -translate-x-[2px] -translate-y-[2px] z-10" />
                                    <span className="absolute top-0 right-0 w-1 h-1 bg-[var(--accent)] translate-x-[2px] -translate-y-[2px] z-10" />
                                    <span className="absolute bottom-0 left-0 w-1 h-1 bg-[var(--accent)] -translate-x-[2px] translate-y-[2px] z-10" />
                                    <span className="absolute bottom-0 right-0 w-1 h-1 bg-[var(--accent)] translate-x-[2px] translate-y-[2px] z-10" />
                                    <img
                                        src="/setup_workspace.jpg"
                                        alt="Workspace Workstation Setup"
                                        className="w-full h-full object-cover grayscale contrast-110"
                                    />
                                </div>
                                <span className="text-[11px] font-sans capitalize tracking-[0.08em] text-[#92928E] self-end">
                                    PROCESS_01 // SETUP
                                </span>
                            </div>

                            <div className="col-span-12 md:col-span-4 lg:col-span-4 flex flex-col gap-2">
                                <div className="border border-[#141414] overflow-hidden aspect-[4/3] relative">
                                    <span className="absolute top-0 left-0 w-1 h-1 bg-[var(--accent)] -translate-x-[2px] -translate-y-[2px] z-10" />
                                    <span className="absolute top-0 right-0 w-1 h-1 bg-[var(--accent)] translate-x-[2px] -translate-y-[2px] z-10" />
                                    <span className="absolute bottom-0 left-0 w-1 h-1 bg-[var(--accent)] -translate-x-[2px] translate-y-[2px] z-10" />
                                    <span className="absolute bottom-0 right-0 w-1 h-1 bg-[var(--accent)] translate-x-[2px] translate-y-[2px] z-10" />
                                    <img
                                        src="/whiteboard_process.jpg"
                                        alt="Architectural System Schematics"
                                        className="w-full h-full object-cover grayscale contrast-110"
                                    />
                                </div>
                                <span className="text-[11px] font-sans capitalize tracking-[0.08em] text-[#92928E] self-end">
                                    PROCESS_02 // SYSTEM SCHEMATICS
                                </span>
                            </div>

                            <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col gap-2">
                                <div className="border border-[#141414] overflow-hidden aspect-[4/3] relative">
                                    <span className="absolute top-0 left-0 w-1 h-1 bg-[var(--accent)] -translate-x-[2px] -translate-y-[2px] z-10" />
                                    <span className="absolute top-0 right-0 w-1 h-1 bg-[var(--accent)] translate-x-[2px] -translate-y-[2px] z-10" />
                                    <span className="absolute bottom-0 left-0 w-1 h-1 bg-[var(--accent)] -translate-x-[2px] translate-y-[2px] z-10" />
                                    <span className="absolute bottom-0 right-0 w-1 h-1 bg-[var(--accent)] translate-x-[2px] translate-y-[2px] z-10" />
                                    <img
                                        src="/screen_code.jpg"
                                        alt="Next.js Source Code Screen"
                                        className="w-full h-full object-cover grayscale contrast-110"
                                    />
                                </div>
                                <span className="text-[11px] font-sans capitalize tracking-[0.08em] text-[#92928E] self-end">
                                    PROCESS_03 // IMPLEMENTATION
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#141414]/10 relative overflow-hidden" aria-hidden="true">
                    <div className="draft-line h-full bg-[#141414]/20 relative" />
                </div>
            </section>
            <section id="education" className="w-full bg-[#F3F2ED] relative">
                <div className="absolute inset-0 pointer-events-none z-0 max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-12 gap-x-4 md:gap-x-6 w-full" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            style={{ transitionDelay: `${i * 35}ms` }}
                            className="draft-grid-col h-full border-r border-[#141414]/[0.035] last:border-r-0"
                        />
                    ))}
                </div>
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24 grid grid-cols-12 gap-x-4 md:gap-x-6 relative z-10">
                    <div className="col-span-12 lg:col-span-2 flex flex-col justify-start mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24 flex flex-col gap-1">
                            <span className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                05 // CREDENTIALS
                            </span>
                            <div className="flex flex-row lg:flex-col gap-x-6 gap-y-1 mt-2 lg:mt-3">
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    REF // ACADEMICS
                                </span>
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    B.SC & DIPLOMA
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Credentials details (Cols 3-12 on desktop, 1-12 on mobile/tablet) */}
                    <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 gap-x-4 md:gap-x-6">
                        <div className="col-span-12 lg:col-span-10 pb-6 mb-16 lg:mb-24 relative">
                            <h2 className="text-[36px] md:text-[56px] lg:text-[80px] font-sans font-extrabold capitalize tracking-[-0.03em] leading-none text-[#141414]">
                                Credentials
                            </h2>
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#141414]/10 overflow-hidden" aria-hidden="true">
                                <div className="draft-line h-full bg-[#141414]/25 relative" />
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-0 mt-8 md:mt-0">
                            <div className="col-span-12 md:col-span-4 lg:col-span-3">
                                <span className="text-[11px] font-mono text-[#92928E] block mb-2">2026 — PRESENT</span>
                                <h3 className="text-[18px] font-serif font-light text-[#141414] leading-snug">
                                    B.Sc in Computer Science & Engineering
                                </h3>
                                <p className="text-[12px] font-mono text-[#5C5C59] mt-1">
                                    Canadian University of Bangladesh
                                </p>
                            </div>

                            <div className="col-span-12 md:col-span-4 lg:col-span-4">
                                <span className="text-[11px] font-mono text-[#92928E] block mb-2">2021 — 2025 · CGPA 3.49 / 4.00</span>
                                <h3 className="text-[18px] font-serif font-light text-[#141414] leading-snug">
                                    Diploma in Computer Science & Technology
                                </h3>
                                <p className="text-[12px] font-mono text-[#5C5C59] mt-1">
                                    Dhaka Polytechnic Institute
                                </p>
                            </div>

                            <div className="col-span-12 md:col-span-4 lg:col-span-3">
                                <span className="text-[11px] font-mono text-[#92928E] block mb-2">COMMUNICATION</span>
                                <p className="text-[12px] text-[#5C5C59] font-mono">
                                    <strong className="text-[#141414] font-bold">ENGLISH:</strong> FLUENT (INDEPENDENT)
                                </p>
                                <p className="text-[12px] text-[#5C5C59] font-mono mt-2">
                                    <strong className="text-[#141414] font-bold">BENGALI:</strong> NATIVE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#141414]/10 relative overflow-hidden" aria-hidden="true">
                    <div className="draft-line h-full bg-[#141414]/20 relative" />
                </div>
            </section>
            <section id="contact" className="w-full bg-[#F3F2ED] relative no-print">
                <div className="absolute inset-0 pointer-events-none z-0 max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-12 gap-x-4 md:gap-x-6 w-full" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            style={{ transitionDelay: `${i * 35}ms` }}
                            className="draft-grid-col h-full border-r border-[#141414]/[0.035] last:border-r-0"
                        />
                    ))}
                </div>
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24 grid grid-cols-12 gap-x-4 md:gap-x-6 relative z-10">
                    <div className="col-span-12 lg:col-span-2 flex flex-col justify-start mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24 flex flex-col gap-1">
                            <span className="text-[12px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                06 // CONTACT
                            </span>
                            <div className="flex flex-row lg:flex-col gap-x-6 gap-y-1 mt-2 lg:mt-3">
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    REF // DISPATCH
                                </span>
                                <span className="text-[11px] font-mono text-[#92928E] block">
                                    AVAILABLE
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Layout (Cols 3-12 on desktop, 1-12 on mobile/tablet) */}
                    <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 gap-x-4 md:gap-x-6">
                        <div className="col-span-12 lg:col-span-10 pb-6 mb-16 lg:mb-24 relative">
                            <h2 className="text-[36px] md:text-[56px] lg:text-[80px] font-sans font-extrabold capitalize tracking-[-0.03em] leading-none text-[#141414]">
                                Contact
                            </h2>
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#141414]/10 overflow-hidden" aria-hidden="true">
                                <div className="draft-line h-full bg-[#141414]/25 relative" />
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-10 grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-8 lg:gap-y-0 mt-8 md:mt-0">
                            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between mb-8 lg:mb-0">
                                <p className="text-[36px] md:text-[72px] font-serif text-[#141414] leading-[0.95] tracking-tighter font-light">
                                    Let&apos;s build something precise, reliable, and high-velocity.
                                </p>
                                <div className="mt-8 flex items-center gap-6 text-[12px] font-mono capitalize tracking-[0.08em]">
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#141414] hover:text-[var(--accent)] underline decoration-dotted transition-colors font-bold"
                                    >
                                        GitHub ↗
                                    </a>
                                    <a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#141414] hover:text-[var(--accent)] underline decoration-dotted transition-colors font-bold"
                                    >
                                        LinkedIn ↗
                                    </a>
                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-7 grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-0">
                                <div className="col-span-12 md:col-span-7 lg:col-span-6 border border-[#141414] bg-[#F3F2ED] divide-y divide-[#141414] text-[12px] font-mono">
                                    {/* Email */}
                                    <div className="p-4 space-y-2">
                                        <span className="text-[#92928E] block text-[10px] tracking-wider capitalize font-bold">EMAIL ADDRESS</span>
                                        <a
                                            href="mailto:muhammadibrahim98297996@gmail.com"
                                            className="text-[13px] font-serif text-[#141414] hover:underline block break-all leading-tight"
                                        >
                                            muhammadibrahim98297996@gmail.com
                                        </a>
                                        <button
                                            onClick={copyEmail}
                                            className="border border-[#141414] hover:bg-[#141414] hover:text-[#F3F2ED] px-2 py-1.5 text-[11px] font-mono tracking-wider capitalize transition-colors cursor-pointer mt-2 block w-full text-center font-bold"
                                        >
                                            {copiedEmail ? "COPIED ✓" : "COPY EMAIL"}
                                        </button>
                                    </div>

                                    {/* Phone */}
                                    <div className="p-4 space-y-1">
                                        <span className="text-[#92928E] block text-[10px] tracking-wider capitalize font-bold">PHONE & WHATSAPP</span>
                                        <a
                                            href="tel:+8801834667996"
                                            className="text-[13px] font-serif text-[#141414] hover:underline block"
                                        >
                                            +880 1834 667 996
                                        </a>
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-5 lg:col-span-6 flex flex-col gap-2">
                                    <div className="border border-[#141414] overflow-hidden aspect-square relative">
                                        <span className="absolute top-0 left-0 w-1 h-1 bg-[var(--accent)] -translate-x-[2px] -translate-y-[2px] z-10" />
                                        <span className="absolute top-0 right-0 w-1 h-1 bg-[var(--accent)] translate-x-[2px] -translate-y-[2px] z-10" />
                                        <span className="absolute bottom-0 left-0 w-1 h-1 bg-[var(--accent)] -translate-x-[2px] translate-y-[2px] z-10" />
                                        <span className="absolute bottom-0 right-0 w-1 h-1 bg-[var(--accent)] translate-x-[2px] translate-y-[2px] z-10" />
                                        <img
                                            src="/contact_context.jpg"
                                            alt="Drafting Tools Ink & Paper"
                                            className="w-full h-full object-cover grayscale contrast-110"
                                        />
                                    </div>
                                    <span className="text-[11px] font-sans capitalize tracking-[0.08em] text-[#92928E] self-end">
                                        CONTEXT / INK & PAPER / 2026
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#141414]/10 relative overflow-hidden" aria-hidden="true">
                    <div className="draft-line h-full bg-[#141414]/20 relative" />
                </div>
            </section>
            <footer className="w-full bg-[#F3F2ED] no-print">
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-12 grid grid-cols-12 gap-x-4 md:gap-x-6 border-t border-[#141414]/15 text-[11px] font-mono text-[#92928E] capitalize tracking-wider">
                    <div className="col-span-12 md:col-span-6">
                        © 2026 MUHAMMAD IBRAHIM · DHAKA, BANGLADESH
                    </div>
                    <div className="col-span-12 md:col-span-6 md:text-right mt-2 md:mt-0">
                        BUILT WITH NEXT.JS, TYPESCRIPT & SWISS TYPOGRAPHY SYSTEM v2
                    </div>
                </div>
            </footer>
            {selectedProject && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141414]/30 backdrop-blur-[1px] no-print"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="relative w-full max-w-3xl bg-[#F3F2ED] border border-[#141414] text-[#141414] flex flex-col max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#141414] font-mono text-[11px] capitalize tracking-[0.08em]">
                            <span className="text-[var(--accent)] font-bold">
                                SPEC // {selectedProject.category}
                            </span>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="hover:text-[var(--accent)] transition-colors cursor-pointer font-bold"
                            >
                                CLOSE ✕
                            </button>
                        </div>

                        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                            <div>
                                <h3 className="text-[32px] font-serif leading-none font-light">
                                    {selectedProject.title}
                                </h3>
                                <p className="text-[12px] font-mono text-[#92928E] mt-2">
                                    {selectedProject.metric}
                                </p>
                            </div>

                            <div className="border-l border-[var(--accent)] pl-4 py-1">
                                <p className="text-[16px] leading-[24px] font-sans text-[#5C5C59]">
                                    {selectedProject.summary}
                                </p>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-[#141414]/15">
                                <h4 className="text-[11px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)]">
                                    PROJECT INTERFACE SCREENSHOTS
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedProject.images.map((img, i) => (
                                        <div key={i} className="border border-[#141414] overflow-hidden bg-neutral-200 aspect-[16/10]">
                                            <img
                                                src={img}
                                                alt={`${selectedProject.title} screenshot ${i + 1}`}
                                                className="w-full h-full object-cover transition-all duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-[#141414]/15">
                                <h4 className="text-[11px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)]">
                                    ENGINEERING HIGHLIGHTS
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedProject.features.map((feat, i) => (
                                        <div key={i} className="border border-[#141414]/15 p-4 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-[11px] text-[var(--accent)] font-bold">
                                                    {String(i + 1).padStart(2, "0")} //
                                                </span>
                                                <strong className="text-[14px] font-sans font-bold capitalize tracking-wider text-[#141414]">
                                                    {feat.title}
                                                </strong>
                                            </div>
                                            <p className="text-[12px] font-mono text-[#5C5C59]">
                                                {feat.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-[#141414]/15">
                                <h4 className="text-[11px] font-sans font-bold capitalize tracking-[0.08em] text-[var(--accent)]">
                                    SYSTEM STACK
                                </h4>
                                <p className="text-[12px] font-mono text-[#5C5C59] leading-relaxed">
                                    {selectedProject.stack.join(" · ")}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-6 px-6 py-4 border-t border-[#141414] font-mono text-[11px] capitalize tracking-[0.08em]">
                            {selectedProject.links?.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#141414] hover:text-[var(--accent)] font-bold underline transition-colors"
                                >
                                    {link.label} ↗
                                </a>
                            ))}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="hover:text-[var(--accent)] transition-colors cursor-pointer font-bold"
                            >
                                DISMISS
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
