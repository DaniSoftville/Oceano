import { useTheme } from "@mui/material/styles";
import {
  Variant,
  TypographyOptions,
} from "@mui/material/styles/createTypography";
import { useWidth } from "../../hooks/use-responsive";

// ----------------------------------------------------------------------

function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

// Define the type for responsive typography
type ResponsiveTypography = {
  [key: string]: {
    fontSize: string | number;
    lineHeight: number | string;
    fontWeight?: number;
    letterSpacing?: string;
  };
} & TypographyOptions[Variant];

export default function useTypography(variant: Variant) {
  const theme = useTheme();

  const breakpoints = useWidth();

  const key = theme.breakpoints.up(breakpoints === "xl" ? "lg" : breakpoints);

  const hasResponsive =
    variant === "h1" ||
    variant === "h2" ||
    variant === "h3" ||
    variant === "h4" ||
    variant === "h5" ||
    variant === "h6";

  const getFont =
    hasResponsive && (theme.typography[variant] as ResponsiveTypography)[key]
      ? (theme.typography[variant] as ResponsiveTypography)[key]
      : theme.typography[variant];

  // Ensure fontSize is treated as a string
  const fontSizeString =
    typeof getFont.fontSize === "number"
      ? `${getFont.fontSize}px`
      : getFont.fontSize ?? "1rem";
  const fontSize = remToPx(fontSizeString);

  const lineHeight = Number(getFont.lineHeight) * fontSize;

  const { fontWeight, letterSpacing } = getFont;

  return { fontSize, lineHeight, fontWeight, letterSpacing };
}
