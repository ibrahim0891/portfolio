// Swiss Design Tokens System v2
// Built strictly according to design-guide.md rules

export const TOKENS = {
  colors: {
    paper: "#F3F2ED",
    ink: "#141414",
    signal: "#E8422F", // Swiss Red
    border: "rgba(20, 20, 20, 0.15)", // Faint 1px ink rule at 15% opacity
    textMuted: "#92928E",
    textSecondary: "#5C5C59",
  },
  spacing: {
    unit8: "8px",
    unit16: "16px",
    unit24: "24px",
    unit32: "32px",
    unit48: "48px",
    unit64: "64px",
    unit96: "96px",
    unit128: "128px",
    
    // Grid parameters
    marginDesktop: "64px",
    marginMobile: "24px",
    gutterDesktop: "24px",
    gutterMobile: "16px",
  },
  typography: {
    heroName: {
      desktop: {
        fontSize: "96px",
        lineHeight: "88px", // Snap to multiple of 8px (11 * 8)
        letterSpacing: "-0.03em",
      },
      mobile: {
        fontSize: "72px",
        lineHeight: "64px", // (8 * 8)
        letterSpacing: "-0.02em",
      }
    },
    sectionHeader: {
      desktop: {
        fontSize: "80px",
        lineHeight: "80px", // (10 * 8)
      },
      tablet: {
        fontSize: "56px",
        lineHeight: "56px", // (7 * 8)
      },
      mobile: {
        fontSize: "36px",
        lineHeight: "40px", // snap to 8px multiple (5 * 8)
      },
      letterSpacing: "-0.03em",
      textTransform: "uppercase" as const,
    },
    projectTitle: {
      fontSize: "64px",
      lineHeight: "64px", // (8 * 8)
    },
    contactCTA: {
      fontSize: "88px",
      lineHeight: "80px", // (10 * 8)
    },
    bodyCopy: {
      fontSize: "16px",
      lineHeight: "24px", // Snaps to 3x 8px
    },
    metaLabel: {
      fontSize: "11px",
      lineHeight: "16px",
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
    }
  }
};
