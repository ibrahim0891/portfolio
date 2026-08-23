"use client";

import React, { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function Section({ id, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full border-b border-[#D8D6D0] relative scroll-mt-12 bg-[#F4F3EF] ${className}`}
    >
      <div className="max-w-7xl mx-auto relative w-full">
        {/* Absolute vertical divider lines running the full height of this section */}
        {/* Line 1 (18%) */}
        <div className="absolute top-0 bottom-0 left-[18%] w-px bg-[#D8D6D0] hidden md:block" />
        {/* Line 2 (45%) */}
        <div className="absolute top-0 bottom-0 left-[45%] w-px bg-[#D8D6D0] hidden md:block" />
        {/* Line 3 (78%) */}
        <div className="absolute top-0 bottom-0 left-[78%] w-px bg-[#D8D6D0] hidden md:block" />

        {/* L-bracket feet stoppers at the bottom of the vertical lines */}
        {/* Line 1 Foot */}
        <div
          className="absolute bottom-0 left-[18%] hidden md:block"
          aria-hidden="true"
        >
          <div className="w-px h-2 bg-[#92928E]" />
          <div className="absolute bottom-0 left-0 w-3 h-px bg-[#92928E]" />
        </div>

        {/* Line 2 Foot */}
        <div
          className="absolute bottom-0 left-[45%] hidden md:block"
          aria-hidden="true"
        >
          <div className="w-px h-2 bg-[#92928E]" />
          <div className="absolute bottom-0 left-0 w-3 h-px bg-[#92928E]" />
        </div>

        {/* Line 3 Foot */}
        <div
          className="absolute bottom-0 left-[78%] hidden md:block"
          aria-hidden="true"
        >
          <div className="w-px h-2 bg-[#92928E]" />
          <div className="absolute bottom-0 right-0 w-3 h-px bg-[#92928E]" />
        </div>

        {/* Inner Content Area */}
        <div className="pt-8 pb-16 sm:pt-10 sm:pb-24 relative z-10">
          {children}
        </div>
      </div>
    </section>
  );
}
