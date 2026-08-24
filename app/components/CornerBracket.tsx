import React from "react";

interface CornerBracketProps {
  type:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "cross"
    | "t-up"
    | "t-down"
    | "t-left"
    | "t-right";
  className?: string;
  size?: number; // size in pixels, default is 14px
  color?: string; // default is #92928E
}

export default function CornerBracket({
  type,
  className = "",
  size = 14,
  color = "#92928E",
}: CornerBracketProps) {
  const halfSize = size / 2;

  return (
    <div
      className={`absolute pointer-events-none select-none z-20 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      aria-hidden="true"
    >
      {/* Horizontal Line */}
      {["top-left", "bottom-left", "t-right", "cross", "t-up", "t-down"].includes(type) && (
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: "50%",
            width: `${halfSize}px`,
            height: "1px",
            backgroundColor: color,
          }}
        />
      )}
      {["top-right", "bottom-right", "t-left", "cross", "t-up", "t-down"].includes(type) && (
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            right: "50%",
            width: `${halfSize}px`,
            height: "1px",
            backgroundColor: color,
          }}
        />
      )}

      {/* Vertical Line */}
      {["bottom-left", "bottom-right", "t-up", "cross", "t-left", "t-right"].includes(type) && (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: "50%",
            height: `${halfSize}px`,
            width: "1px",
            backgroundColor: color,
          }}
        />
      )}
      {["top-left", "top-right", "t-down", "cross", "t-left", "t-right"].includes(type) && (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "50%",
            height: `${halfSize}px`,
            width: "1px",
            backgroundColor: color,
          }}
        />
      )}
    </div>
  );
}
