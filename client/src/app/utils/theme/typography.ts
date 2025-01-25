import "@fontsource-variable/inter"; // Import Inter
import "@fontsource/poppins"; // Import Poppins
import "@fontsource/nunito"; // Import Great Vibes

// Function to convert rem to px
export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

// Function to convert px to rem
export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

// Function to define responsive font sizes
export function responsiveFontSizes({
  sm,
  md,
  lg,
}: {
  sm: number;
  md: number;
  lg: number;
}) {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

// Define Inter font properties
export const primaryFont = {
  style: {
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
};

// Define Poppins font properties
export const secondaryFont = {
  style: {
    fontFamily: "Poppins, Helvetica, Arial, sans-serif",
  },
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
};

// Define Great Vibes font properties
export const nunitoFont = {
  style: {
    fontFamily: "Nunito, Helvetica, Arial, sans-serif",
  },
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
};

// Extend MUI's TypographyVariants and TypographyPropsVariantOverrides
declare module "@mui/material/styles" {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties["fontFamily"];
    fontNunito: React.CSSProperties["fontFamily"];
    fontWeightSemiBold: React.CSSProperties["fontWeight"];
    nunito: React.CSSProperties;
  }

  // Allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    fontSecondaryFamily?: React.CSSProperties["fontFamily"];
    fontNunitoFamily?: React.CSSProperties["fontFamily"];
    fontWeightSemiBold?: React.CSSProperties["fontWeight"];
    nunito?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    nunito: true;
  }
}

// Define the typography object
export const typography = {
  fontFamily: primaryFont.style.fontFamily,
  fontSecondaryFamily: secondaryFont.style.fontFamily,
  fontNunitoFamily: nunitoFont.style.fontFamily,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  h7: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(16),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 16, md: 16, lg: 16 }),
  },
  nunito: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    fontFamily: nunitoFont.style.fontFamily,
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    fontFamily: primaryFont.style.fontFamily,
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    fontFamily: primaryFont.style.fontFamily,
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    fontFamily: primaryFont.style.fontFamily,
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    fontFamily: primaryFont.style.fontFamily,
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    fontFamily: primaryFont.style.fontFamily,
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: "uppercase",
    fontFamily: primaryFont.style.fontFamily,
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: "capitalize",
    fontFamily: primaryFont.style.fontFamily,
  },
} as const;
