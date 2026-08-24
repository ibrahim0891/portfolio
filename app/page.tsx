"use client";

import React, { useState, useEffect } from "react";
import Section from "./components/Section";
import FadeIn from "./components/FadeIn";
import ProjectModal, { ProjectData } from "./components/ProjectModal";
import ProjectShowcase from "./components/ProjectShowcase";
import CornerBracket from "./components/CornerBracket";
import {
    MailIcon,
    PhoneIcon,
    ExternalLinkIcon,
    GithubIcon,
    LinkedinIcon,
    CpuIcon,
    ServerIcon,
    DatabaseIcon,
    GitBranchIcon,
    AwardIcon,
    CodeIcon,
    ActivityIcon,
    LockIcon,
} from "./components/Icons";

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const PROJECTS: (ProjectData & {
    imageSrc: string;
    images?: string[];
    features: { title: string; description: string; icon?: string }[];
})[] = [
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
            imageSrc: "/officetask_mockup.jpg",
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
            imageSrc: "/icepots_mockup.jpg",
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
            imageSrc: "/cian_mockup.jpg",
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

export default function Home() {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
        null
    );
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [dhakaTime, setDhakaTime] = useState("");

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

    const copyEmail = () => {
        navigator.clipboard.writeText("muhammadibrahim98297996@gmail.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2200);
    };

    return (
        <div className="relative min-h-screen bg-[#F4F3EF] text-[#282826] selection:bg-[#DCDAD4]">

            {/* ============================================================ */}
            {/* HEADER                                                       */}
            {/* ============================================================ */}
            <header className="sticky top-0 z-40 bg-[#F4F3EF]/90 backdrop-blur-[2px] w-full border-b border-[#D8D6D0] no-print">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between text-xs font-mono text-[#92928E]">
                    <span className="text-[#282826] font-medium tracking-wide">
                        Muhammad Ibrahim
                    </span>

                    <nav className="hidden sm:flex items-center gap-8">
                        <a href="#work" className="hover:text-[#282826] transition-colors">
                            Work
                        </a>
                        <a
                            href="#capabilities"
                            className="hover:text-[#282826] transition-colors"
                        >
                            Capabilities
                        </a>
                        <a
                            href="#experience"
                            className="hover:text-[#282826] transition-colors"
                        >
                            Experience
                        </a>
                        <a
                            href="#contact"
                            className="hover:text-[#282826] transition-colors"
                        >
                            Contact
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <span className="hidden md:inline text-[#92928E]">
                            Dhaka {dhakaTime}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[#2F7C40]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2F7C40]" />
                            Available
                        </span>
                    </div>
                </div>
            </header>

            {/* ============================================================ */}
            {/* SECTIONS                                                     */}
            {/* ============================================================ */}

            {/* ---- HERO SECTION ---- */}
            <Section id="hero">
                <div className="grid grid-cols-1 md:grid-cols-[18%_82%] w-full gap-y-6 md:gap-y-0 md:divide-x md:divide-[#D8D6D0]">
                    {/* Column 1: Eyebrow Metadata */}
                    <div className="pl-6 md:pl-12 pr-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn>
                            <p className="text-[9px] font-mono capitalize tracking-[0.15em] text-[#92928E]">
                                REF // SUBJECT_01
                            </p>
                            <p className="text-[9px] font-mono tracking-[0.15em] text-[#92928E] mt-1">
                                DHAKA · 23.77°N 90.42°E
                            </p>
                        </FadeIn>
                    </div>

                    {/* Column 2+3+4: Spans Multiple Columns */}
                    <div className="px-6 md:px-12 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn delay={60}>
                            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[1.0] text-[#282826] max-w-4xl">
                                Muhammad Ibrahim
                            </h1>
                            <p className="text-[9px] font-mono text-[#92928E] mt-4 capitalize tracking-[0.15em]">
                                Fullstack Web Developer · SM Technology
                            </p>
                        </FadeIn>

                        <FadeIn delay={120}>
                            <p className="mt-6 text-lg sm:text-xl text-[#5C5C59] max-w-2xl leading-relaxed">
                                Building practical, maintainable web applications — from client
                                analysis through production deployment — with Next.js, TypeScript,
                                PostgreSQL, and Express.
                            </p>
                        </FadeIn>

                        {/* Micro-telemetry and CTAs */}
                        <FadeIn delay={180}>
                            <div className="mt-10 pt-6 border-t border-[#D8D6D0] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[11px] font-mono tracking-[0.15em] text-[#5C5C59]">
                                    <span className="flex items-center gap-1.5">
                                        <AwardIcon size={14} />
                                        ~1 YR EXPERIENCE
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <CodeIcon size={14} />
                                        02 PRODUCTION APPS
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <ActivityIcon size={14} />
                                        300+ MAU SCALED
                                    </span>
                                </div>

                                <div className="flex items-center gap-8 ml-12">
                                    <a
                                        href="#work"
                                        className="text-xs font-mono text-[#282826] underline underline-offset-4 decoration-[#D8D6D0] hover:decoration-[#282826] transition-colors"
                                    >
                                        Selected work ↓
                                    </a>
                                    <a
                                        href="mailto:muhammadibrahim98297996@gmail.com"
                                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#282826] underline underline-offset-4 decoration-[#D8D6D0] hover:decoration-[#282826] transition-colors"
                                    >
                                        <MailIcon size={13} />
                                        Get in touch
                                    </a>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </Section>

            <Section id="experience">
                <div className="grid grid-cols-1 md:grid-cols-[18%_27%_33%_22%] w-full gap-y-6 md:gap-y-0 md:divide-x md:divide-[#D8D6D0] relative">
                    {/* Column 1 */}
                    <div className="pl-6 md:pl-12 pr-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn>
                            <div className="space-y-1">
                                <span className="text-[9px] font-mono capitalize tracking-[0.15em] text-[#92928E] block">
                                    01 //
                                </span>
                                <h2 className="text-xl md:text-2xl font-serif font-light tracking-tight text-[#282826]">
                                    Experience
                                </h2>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Column 2 */}
                    <div className="px-6 md:px-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn delay={40}>
                            <div className="text-xs font-mono text-[#92928E] mb-1">
                                Dec 2025 — Present · Dhaka, BD
                            </div>
                            <h3 className="text-2xl font-serif font-light text-[#282826] tracking-tight leading-tight flex items-center gap-2">
                                <CodeIcon size={18} />
                                Frontend Developer
                            </h3>
                            <p className="text-sm text-[#5C5C59] font-mono mt-1">
                                SM Technology
                            </p>
                        </FadeIn>
                    </div>

                    {/* Column 3+4 (col-span-2) */}
                    <div className="col-span-2 px-6 md:px-12 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn delay={80}>
                            <div className="space-y-3.5 text-xs text-[#5C5C59] font-mono">
                                <div>
                                    <strong className="text-[#282826] block font-sans text-sm mb-0.5">Fullstack Feature Delivery</strong>
                                    Building and deploying client-facing web components using Express.js and PostgreSQL.
                                </div>
                                <div>
                                    <strong className="text-[#282826] block font-sans text-sm mb-0.5">REST API Integration</strong>
                                    Connecting client frontend layers to REST endpoints with caching and validation.
                                </div>
                                <div>
                                    <strong className="text-[#282826] block font-sans text-sm mb-0.5">Collaborative Launching</strong>
                                    Partnering with design and systems teams throughout implementation.
                                </div>
                                <div>
                                    <strong className="text-[#282826] block font-sans text-sm mb-0.5">Codebase Stewardship</strong>
                                    Refactoring legacy structures and optimizing application stability.
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Intersection Brackets at 45% */}
                    <CornerBracket
                        type="top-left"
                        className="top-0 left-[45%] -translate-x-1/2 -translate-y-1/2 hidden md:block"
                    />
                    <CornerBracket
                        type="bottom-left"
                        className="bottom-0 left-[45%] -translate-x-1/2 translate-y-1/2 hidden md:block"
                    />
                </div>
            </Section>

            {/* ---- SELECTED WORK SECTION (EDITORIAL SHOWCASE) ---- */}
            <Section id="work">
                <div className="w-full">
                    {/* Section Header Row */}
                    <div className="grid grid-cols-1 md:grid-cols-[18%_82%] w-full gap-y-4 md:gap-y-0 md:divide-x md:divide-[#D8D6D0] border-b border-[#D8D6D0]">
                        <div className="pl-6 md:pl-12 pr-6 pt-8 pb-8 sm:pt-10 sm:pb-10">
                            <FadeIn>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-mono capitalize tracking-[0.15em] text-[#92928E] block">
                                        02 //
                                    </span>
                                    <h2 className="text-xl md:text-2xl font-serif font-light tracking-tight text-[#282826]">
                                        Selected Work
                                    </h2>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="px-6 md:px-12 pt-8 pb-8 sm:pt-10 sm:pb-10" />
                    </div>

                    {/* Project Rows */}
                    {PROJECTS.map((project, index) => (
                        <React.Fragment key={project.id}>
                            <div className="grid grid-cols-1 md:grid-cols-[18%_82%] w-full gap-y-4 md:gap-y-0 md:divide-x md:divide-[#D8D6D0] border-b border-[#D8D6D0] last:border-b-0 relative">
                                {/* Left side of the 18% line: Serial Number */}
                                <div className="pl-6 md:pl-12 pr-6 pt-16 pb-16 sm:pt-20 sm:pb-20">
                                    <FadeIn>
                                        <span className="text-xs font-mono text-[#92928E] pt-1.5 select-none block capitalize tracking-wider">
                                            {String(index + 1).padStart(2, "0")} //
                                        </span>
                                    </FadeIn>
                                </div>
                                {/* Right side of the 18% line: Project Showcase */}
                                <div className="px-6 md:px-12 pt-16 pb-16 sm:pt-20 sm:pb-20">
                                    <FadeIn>
                                        <ProjectShowcase
                                            project={project}
                                            onOpenSpec={() => setSelectedProject(project)}
                                        />
                                    </FadeIn>
                                </div>

                                {/* Intersection Bracket Marker */}
                                {index < PROJECTS.length - 1 && (
                                    <CornerBracket
                                        type="bottom-left"
                                        className="bottom-0 left-[18%] -translate-x-1/2 translate-y-1/2 hidden md:block"
                                    />
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </Section>

            {/* ---- CAPABILITIES SECTION ---- */}
            <Section id="capabilities">
                <div className="grid grid-cols-1 md:grid-cols-[18%_27%_33%_22%] w-full gap-y-8 md:gap-y-0 md:divide-x md:divide-[#D8D6D0] relative">
                    {/* Column 1 */}
                    <div className="pl-6 md:pl-12 pr-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn>
                            <div className="space-y-1">
                                <span className="text-[9px] font-mono capitalize tracking-[0.15em] text-[#92928E] block">
                                    03 //
                                </span>
                                <h2 className="text-xl md:text-2xl font-serif font-light tracking-tight text-[#282826]">
                                    Capabilities
                                </h2>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Column 2: Frontend */}
                    <div className="px-6 md:px-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn>
                            <h3 className="text-xs font-mono font-semibold text-[#282826] capitalize tracking-[0.06em] mb-2.5 pb-1.5 border-b border-[#D8D6D0] flex items-center gap-1.5">
                                <CpuIcon size={14} />
                                Frontend
                            </h3>
                            <ul className="space-y-1.5 text-xs text-[#5C5C59] font-mono">
                                <li>Next.js (App & Pages)</li>
                                <li>TypeScript</li>
                                <li>React 19 Core</li>
                                <li>Tailwind CSS</li>
                                <li>React Query</li>
                                <li>Redux Toolkit</li>
                            </ul>
                        </FadeIn>
                    </div>

                    {/* Column 3: Backend & APIs */}
                    <div className="px-6 md:px-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn>
                            <h3 className="text-xs font-mono font-semibold text-[#282826] capitalize tracking-[0.06em] mb-2.5 pb-1.5 border-b border-[#D8D6D0] flex items-center gap-1.5">
                                <ServerIcon size={14} />
                                Backend & APIs
                            </h3>
                            <ul className="space-y-1.5 text-xs text-[#5C5C59] font-mono">
                                <li>Express.js / Node.js</li>
                                <li>REST API Design</li>
                                <li>Edge Middleware</li>
                                <li>OAuth / JWT / OTP</li>
                                <li>Stripe API Integration</li>
                            </ul>
                        </FadeIn>
                    </div>

                    {/* Column 4: Data Modeling & Workflow stacked */}
                    <div className="pl-6 md:pl-6 pr-6 md:pr-12 space-y-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn>
                            <div>
                                <h3 className="text-xs font-mono font-semibold text-[#282826] capitalize tracking-[0.06em] mb-2.5 pb-1.5 border-b border-[#D8D6D0] flex items-center gap-1.5">
                                    <DatabaseIcon size={14} />
                                    Data Modeling
                                </h3>
                                <ul className="space-y-1.5 text-xs text-[#5C5C59] font-mono">
                                    <li>PostgreSQL SQL</li>
                                    <li>Prisma ORM</li>
                                    <li>MongoDB</li>
                                    <li>Schema Migrations</li>
                                </ul>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <div>
                                <h3 className="text-xs font-mono font-semibold text-[#282826] capitalize tracking-[0.06em] mb-2.5 pb-1.5 border-b border-[#D8D6D0] flex items-center gap-1.5">
                                    <GitBranchIcon size={14} />
                                    Workflow
                                </h3>
                                <ul className="space-y-1.5 text-xs text-[#5C5C59] font-mono">
                                    <li>Git / GitHub</li>
                                    <li>CI/CD Automation</li>
                                    <li>Linux VPS Terminal</li>
                                    <li>Postman / Figma</li>
                                </ul>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Intersection Brackets at 45% */}
                    <CornerBracket
                        type="top-left"
                        className="top-0 left-[45%] -translate-x-1/2 -translate-y-1/2 hidden md:block"
                    />
                    <CornerBracket
                        type="bottom-left"
                        className="bottom-0 left-[45%] -translate-x-1/2 translate-y-1/2 hidden md:block"
                    />

                    {/* Intersection Brackets at 78% */}
                    <CornerBracket
                        type="top-right"
                        className="top-0 left-[78%] -translate-x-1/2 -translate-y-1/2 hidden md:block"
                    />
                    <CornerBracket
                        type="bottom-right"
                        className="bottom-0 left-[78%] -translate-x-1/2 translate-y-1/2 hidden md:block"
                    />
                </div>
            </Section>

            {/* ---- EDUCATION & CREDENTIALS SECTION ---- */}
            <Section id="education">
                <div className="grid grid-cols-1 md:grid-cols-[18%_27%_33%_22%] w-full gap-y-8 md:gap-y-0 md:divide-x md:divide-[#D8D6D0] relative">
                    {/* Column 1 */}
                    <div className="pl-6 md:pl-12 pr-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn>
                            <div className="space-y-1">
                                <span className="text-[9px] font-mono capitalize tracking-[0.15em] text-[#92928E] block">
                                    04 //
                                </span>
                                <h2 className="text-xl md:text-2xl font-serif font-light tracking-tight text-[#282826]">
                                    Credentials
                                </h2>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Column 2: B.Sc */}
                    <div className="px-6 md:px-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn delay={40}>
                            <p className="text-xs font-mono text-[#92928E] mb-1">
                                2026 — Present
                            </p>
                            <h3 className="text-base font-serif font-light text-[#282826] flex items-center gap-1.5">
                                <AwardIcon size={16} />
                                B.Sc in Computer Science & Engineering
                            </h3>
                            <p className="text-xs font-mono text-[#5C5C59] mt-0.5">
                                Canadian University of Bangladesh
                            </p>
                        </FadeIn>
                    </div>

                    {/* Column 3: Diploma */}
                    <div className="px-6 md:px-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn delay={80}>
                            <p className="text-xs font-mono text-[#92928E] mb-1">
                                2021 — 2025 · CGPA 3.49 / 4.00
                            </p>
                            <h3 className="text-base font-serif font-light text-[#282826] flex items-center gap-1.5">
                                <AwardIcon size={16} />
                                Diploma in Computer Science & Technology
                            </h3>
                            <p className="text-xs font-mono text-[#5C5C59] mt-0.5">
                                Dhaka Polytechnic Institute
                            </p>
                        </FadeIn>
                    </div>

                    {/* Column 4: Communication */}
                    <div className="pl-6 md:pl-6 pr-6 md:pr-12 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn delay={120}>
                            <p className="text-xs font-mono text-[#92928E] mb-1">
                                Communication
                            </p>
                            <p className="text-xs text-[#383836]">
                                <strong className="text-[#282826] font-medium font-mono">English:</strong> Fluent (Independent)
                            </p>
                            <p className="text-xs text-[#383836] mt-1">
                                <strong className="text-[#282826] font-medium font-mono">Bengali:</strong> Native
                            </p>
                        </FadeIn>
                    </div>

                    {/* Intersection Brackets at 45% */}
                    <CornerBracket
                        type="top-left"
                        className="top-0 left-[45%] -translate-x-1/2 -translate-y-1/2 hidden md:block"
                    />
                    <CornerBracket
                        type="bottom-left"
                        className="bottom-0 left-[45%] -translate-x-1/2 translate-y-1/2 hidden md:block"
                    />

                    {/* Intersection Brackets at 78% */}
                    <CornerBracket
                        type="top-right"
                        className="top-0 left-[78%] -translate-x-1/2 -translate-y-1/2 hidden md:block"
                    />
                    <CornerBracket
                        type="bottom-right"
                        className="bottom-0 left-[78%] -translate-x-1/2 translate-y-1/2 hidden md:block"
                    />
                </div>
            </Section>

            {/* ---- CONTACT SECTION ---- */}
            <Section id="contact" className="no-print">
                <div className="grid grid-cols-1 md:grid-cols-[18%_27%_33%_22%] w-full gap-y-6 md:gap-y-0 md:divide-x md:divide-[#D8D6D0] relative">
                    {/* Column 1 */}
                    <div className="pl-6 md:pl-12 pr-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn>
                            <div className="space-y-1">
                                <span className="text-[9px] font-mono capitalize tracking-[0.15em] text-[#92928E] block">
                                    05 //
                                </span>
                                <h2 className="text-xl md:text-2xl font-serif font-light tracking-tight text-[#282826]">
                                    Contact
                                </h2>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Column 2 */}
                    <div className="px-6 md:px-8 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn delay={40}>
                            <p className="text-2xl sm:text-3xl font-serif text-[#282826] leading-snug font-light">
                                Let&apos;s build something precise, reliable, and high-velocity.
                            </p>

                            <div className="mt-6 flex items-center gap-4 text-xs font-mono">
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[#282826] hover:underline"
                                >
                                    <GithubIcon size={14} />
                                    GitHub ↗
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[#282826] hover:underline"
                                >
                                    <LinkedinIcon size={14} />
                                    LinkedIn ↗
                                </a>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Column 3+4 (col-span-2) */}
                    <div className="col-span-2 px-6 md:px-12 pt-8 pb-16 sm:pt-10 sm:pb-24">
                        <FadeIn delay={80}>
                            <div className="border border-[#D8D6D0] bg-[#FAF9F6] rounded-[3px] divide-y divide-[#D8D6D0] text-xs font-mono max-w-xl">
                                {/* Email Item */}
                                <div className="p-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <MailIcon size={18} className="text-[#92928E] flex-shrink-0" />
                                        <div className="min-w-0">
                                            <span className="text-[#92928E] block text-[10px] tracking-wider">EMAIL ADDRESS</span>
                                            <a
                                                href="mailto:muhammadibrahim98297996@gmail.com"
                                                className="text-sm font-serif text-[#282826] hover:underline break-all"
                                            >
                                                muhammadibrahim98297996@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <button
                                        onClick={copyEmail}
                                        className="text-xs bg-white hover:bg-neutral-50 border border-[#D8D6D0] px-2.5 py-1 rounded-[2px] transition-colors cursor-pointer text-[#282826] flex-shrink-0"
                                    >
                                        {copiedEmail ? "COPIED ✓" : "COPY"}
                                    </button>
                                </div>

                                {/* Phone Item */}
                                <div className="p-4 flex items-center gap-3">
                                    <PhoneIcon size={18} className="text-[#92928E] flex-shrink-0" />
                                    <div>
                                        <span className="text-[#92928E] block text-[10px] tracking-wider">PHONE & WHATSAPP</span>
                                        <a
                                            href="tel:+8801834667996"
                                            className="text-sm font-serif text-[#282826] hover:underline"
                                        >
                                            +880 1834 667 996
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Intersection Brackets at 45% */}
                    <CornerBracket
                        type="top-left"
                        className="top-0 left-[45%] -translate-x-1/2 -translate-y-1/2 hidden md:block"
                    />
                    <CornerBracket
                        type="bottom-left"
                        className="bottom-0 left-[45%] -translate-x-1/2 translate-y-1/2 hidden md:block"
                    />
                </div>
            </Section>

            {/* ============================================================ */}
            {/* FOOTER                                                       */}
            {/* ============================================================ */}
            <footer className="w-full border-t border-black/[0.08] bg-[#F4F3EF] no-print">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#92928E] gap-4">
                    <span>© 2026 Muhammad Ibrahim · Dhaka, Bangladesh</span>
                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline">COLUMNS: 18% · 82%</span>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="text-[#92928E] hover:text-[#282826] cursor-pointer"
                        >
                            Back to top ↑
                        </button>
                    </div>
                </div>
            </footer>

            {/* Project specification modal */}
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );

}
