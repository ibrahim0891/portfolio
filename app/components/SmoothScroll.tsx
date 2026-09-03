"use client";

import React from "react";
import { ReactLenis } from "lenis/react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.10,
        duration: 3,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
