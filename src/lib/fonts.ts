// Self-hosted build-safe configuration.
//
// Google Fonts are loaded through <link> in the root layout only in the
// browser, so the Next.js production build never needs network access to
// fonts.googleapis.com. The CSS variable stacks below fall back to system
// fonts when Google is unreachable (e.g. the preview sandbox), while the
// deployed site will use Cormorant Garamond / IBM Plex Sans / IBM Plex Sans
// Arabic as soon as fonts load.

export const fontVariables = "";

export const fontLinks = [
  {
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&display=swap",
    rel: "stylesheet"
  }
];
