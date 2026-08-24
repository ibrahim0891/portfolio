"use client";

import React, { ReactNode } from "react";

import CornerBracket from "./CornerBracket";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function Section({ id, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full border-b border-[#D8D6D0] bg-[#F4F3EF] scroll-mt-12 ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full relative">
        {children}

        {/* Intersection bracket markers on the bottom border line */}
        <CornerBracket
          type="bottom-left"
          className="bottom-0 left-[18%] -translate-x-1/2 translate-y-1/2 hidden md:block"
        />
      </div>
    </section>
  );
}
