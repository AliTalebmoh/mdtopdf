import type { PDFOptions } from "puppeteer";

export interface Theme {
  label: string;
  css: string;
  // Only needed for full-bleed (dark) backgrounds: md-to-pdf's default page
  // margin is never painted by CSS at all, so a dark body can only ever fill
  // the inset content box, leaving the actual page margins white. Themes that
  // set this to a zero margin make up the lost edge gutter with CSS padding.
  pdfOptions?: Partial<PDFOptions>;
  // highlight.js theme name for code blocks (md-to-pdf default: 'github',
  // a light palette — wrong on a dark background, so dark themes override it).
  highlightStyle?: string;
}

// Applied before every theme's CSS. Without break-inside: avoid, Chromium's
// PDF pagination happily slices a paragraph, list item, code block, or table
// mid-content across a page break — including leaving a single orphaned line
// stranded alone on the next page. This moves the whole block to the next
// page instead whenever it doesn't fit, at the cost of some trailing
// whitespace on the page before it — the standard tradeoff every print/book
// layout engine makes.
export const PRINT_SAFETY_CSS = `
  p, li, pre, table, blockquote, img { break-inside: avoid; page-break-inside: avoid; }
  h1, h2, h3, h4, h5, h6 { break-after: avoid; page-break-after: avoid; }
`;

// A page-number footer, styled to blend into each theme. Chromium shows a
// default header (title/URL) once displayHeaderFooter is on, so every theme
// also passes an empty headerTemplate to suppress it.
function footerTemplate(color: string, background = "transparent"): string {
  return `<div style="width:100%; font-size:9px; font-family:Helvetica,Arial,sans-serif; color:${color}; background:${background}; text-align:center; padding:4px 0; -webkit-print-color-adjust:exact;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`;
}
const NO_HEADER = "<div></div>";

export const THEMES = {
  default: {
    label: "Default",
    pdfOptions: { displayHeaderFooter: true, headerTemplate: NO_HEADER, footerTemplate: footerTemplate("#888") },
    css: "",
  },
  minimal: {
    label: "Minimal",
    pdfOptions: { displayHeaderFooter: true, headerTemplate: NO_HEADER, footerTemplate: footerTemplate("#999") },
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; color: #222; max-width: 680px; margin: 0 auto; line-height: 1.7; }
      p { margin: 0 0 1.1em; }
      h1, h2, h3, h4, h5, h6 { font-weight: 600; color: #111; border: none; }
      h1 { font-size: 1.8em; margin: 0 0 0.6em; }
      h2 { font-size: 1.4em; margin: 1.8em 0 0.5em; }
      h3 { font-size: 1.15em; margin: 1.5em 0 0.4em; }
      h4 { font-size: 1em; margin: 1.3em 0 0.4em; }
      h5, h6 { font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.05em; color: #555; margin: 1.2em 0 0.4em; }
      strong, b { color: #111; font-weight: 600; }
      a { color: #222; text-decoration: underline; text-decoration-color: #bbb; }
      hr { border: none; border-top: 1px solid #ddd; margin: 2.2em 0; }
      blockquote { border-left: 2px solid #ddd; color: #555; padding-left: 1em; margin: 1.1em 0; }
      code { font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; background: #f3f3f3; padding: 0.15em 0.4em; border-radius: 3px; font-size: 0.85em; }
      pre, pre.hljs, .hljs { background: #f7f7f7 !important; border-radius: 4px; border: 1px solid #eee; padding: 14px 16px; margin: 1.1em 0; }
      pre code, pre code.hljs { background: transparent !important; }
      table { border-collapse: collapse; width: 100%; margin: 1.1em 0; }
      th, td { border: 1px solid #e2e2e2; padding: 0.5em 0.8em; text-align: left; }
      th { background: #fafafa; font-weight: 600; }
      ul, ol { padding-left: 1.3em; margin: 0 0 1.1em; }
      li { margin: 0.35em 0; }
      li::marker { color: #999; }
      img { max-width: 100%; border-radius: 4px; }
    `,
  },
  serif: {
    label: "Serif",
    pdfOptions: { displayHeaderFooter: true, headerTemplate: NO_HEADER, footerTemplate: footerTemplate("#888") },
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap');

      body { font-family: 'Lora', Georgia, serif; color: #1a1a1a; max-width: 700px; margin: 0 auto; line-height: 1.8; font-size: 15px; }
      p { margin: 0 0 1.2em; }
      h1, h2, h3, h4, h5, h6 { font-family: 'Lora', Georgia, serif; font-weight: 700; color: #111; }
      h1 { border-bottom: 2px solid #1a1a1a; padding-bottom: 0.2em; font-size: 2em; margin: 0 0 0.7em; }
      h2 { font-size: 1.5em; margin: 1.8em 0 0.5em; }
      h3 { font-size: 1.2em; margin: 1.5em 0 0.4em; }
      h4 { font-size: 1.05em; font-style: italic; margin: 1.3em 0 0.4em; }
      h5, h6 { font-size: 0.95em; text-transform: uppercase; letter-spacing: 0.05em; color: #555; font-style: normal; margin: 1.2em 0 0.4em; }
      a { color: #1a1a1a; text-decoration: underline; }
      hr { border: none; border-top: 1px solid #ccc; margin: 2.4em 0; }
      blockquote { font-style: italic; border-left: 3px solid #999; padding-left: 1em; color: #444; margin: 1.2em 0; }
      code { font-family: 'IBM Plex Mono', "Courier New", monospace; background: #f0ede8; padding: 0.15em 0.4em; border-radius: 2px; font-size: 0.85em; }
      pre, pre.hljs, .hljs { font-family: 'IBM Plex Mono', "Courier New", monospace; background: #f7f5f0 !important; border: 1px solid #e5e0d5; padding: 14px 16px; margin: 1.2em 0; }
      pre code, pre code.hljs { background: transparent !important; }
      table { border-collapse: collapse; width: 100%; margin: 1.2em 0; }
      th, td { border: 1px solid #ccc; padding: 0.5em 0.8em; text-align: left; }
      th { background: #f0f0f0; font-weight: 700; }
      ul, ol { padding-left: 1.4em; margin: 0 0 1.2em; }
      li { margin: 0.4em 0; }
      img { max-width: 100%; }
    `,
  },
  dark: {
    label: "Dark",
    highlightStyle: "github-dark",
    pdfOptions: {
      margin: { top: "0", right: "0", bottom: "14mm", left: "0" },
      displayHeaderFooter: true,
      headerTemplate: NO_HEADER,
      footerTemplate: footerTemplate("#666", "#0a0a0a"),
    },
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap');

      html, body { background: #0a0a0a; color: #f0f0f0; }
      body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; line-height: 1.7; padding: 20mm 25mm; }
      p { margin: 0 0 1.1em; }
      h1, h2, h3, h4, h5, h6 { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; color: #ffffff; border-color: #333 !important; }
      h1 { font-size: 2em; margin: 0 0 0.6em; }
      h2 { font-size: 1.5em; margin: 1.6em 0 0.5em; }
      h3 { font-size: 1.2em; margin: 1.4em 0 0.4em; }
      h4 { font-size: 1.05em; margin: 1.2em 0 0.4em; }
      h5, h6 { font-size: 0.95em; text-transform: uppercase; letter-spacing: 0.08em; color: #a0a0a0; margin: 1.2em 0 0.4em; }
      strong, b { color: #ffffff; font-weight: 600; }
      a { color: #22c55e; }
      hr { border-color: #333; margin: 2.2em 0; }
      blockquote { border-left: 3px solid #22c55e; color: #a0a0a0; padding-left: 1em; margin: 1.1em 0; }
      code { font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; background: #1a1a1a !important; color: #22c55e !important; padding: 0.1em 0.35em; border-radius: 3px; }
      pre, pre.hljs, .hljs { background: #161616 !important; border: 1px solid #262626; padding: 14px 16px; margin: 1.1em 0; }
      pre code, pre code.hljs { color: #f0f0f0 !important; background: transparent !important; }
      table, tr { border-collapse: collapse; background: #0a0a0a !important; }
      th, td { border: 1px solid #333; padding: 0.4em 0.7em; color: #f0f0f0 !important; background: #0a0a0a !important; }
      th { background: #161616 !important; }
      table { margin: 1.1em 0; }
      ul, ol { padding-left: 1.3em; margin: 0 0 1.1em; }
      li { margin: 0.3em 0; }
      li::marker { color: #666; }
      img { max-width: 100%; border-radius: 4px; border: 1px solid #262626; }
    `,
  },
  sitewebk: {
    label: "SiteWebK",
    highlightStyle: "github-dark",
    pdfOptions: {
      margin: { top: "0", right: "0", bottom: "14mm", left: "0" },
      displayHeaderFooter: true,
      headerTemplate: NO_HEADER,
      footerTemplate: footerTemplate("#5C5C5C", "#050505"),
    },
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

      :root {
        --sw-gray-1000: #050505;
        --sw-gray-900: #111111;
        --sw-gray-700: #2A2A2A;
        --sw-gray-600: #3D3D3D;
        --sw-gray-400: #8A8A8A;
        --sw-gray-300: #B4B4B4;
        --sw-white: #FFFFFF;
        --sw-font-display: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        --sw-font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
      }

      html, body { background: var(--sw-gray-1000); }
      body {
        font-family: var(--sw-font-display);
        font-weight: 400;
        font-size: 16px;
        line-height: 1.45;
        color: var(--sw-gray-300);
        padding: 24mm 28mm;
      }
      p { margin: 0 0 16px; }

      h1, h2, h3, h4, h5, h6 {
        font-family: var(--sw-font-display);
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 1.1;
        color: var(--sw-white);
      }
      h1 { font-size: 44px; margin: 0 0 24px; }
      h2 { font-size: 32px; margin: 48px 0 20px; }
      h3 { font-size: 24px; letter-spacing: -0.02em; margin: 40px 0 16px; }
      h4 { font-size: 20px; letter-spacing: -0.02em; margin: 32px 0 12px; }
      h5 { font-size: 18px; letter-spacing: -0.02em; margin: 24px 0 8px; }
      h6 { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--sw-gray-300); margin: 24px 0 8px; }

      strong, b { color: var(--sw-white); font-weight: 600; }

      a { color: var(--sw-white); text-decoration: underline; text-decoration-color: var(--sw-gray-600); text-underline-offset: 2px; }

      hr { border: none; border-top: 1px solid var(--sw-gray-700); margin: 48px 0; }

      blockquote {
        border-left: 2px solid var(--sw-gray-600);
        padding-left: 20px;
        margin: 24px 0 24px 0;
        color: var(--sw-gray-400);
      }

      code {
        font-family: var(--sw-font-mono);
        font-size: 0.85em;
        background: var(--sw-gray-900) !important;
        color: var(--sw-white) !important;
        border: 1px solid var(--sw-gray-700);
        border-radius: 2px;
        padding: 0.15em 0.4em;
      }
      pre, pre.hljs, .hljs {
        background: var(--sw-gray-900) !important;
        border: 1px solid var(--sw-gray-700);
        border-radius: 4px;
        padding: 16px;
        margin: 16px 0;
      }
      pre code, pre code.hljs {
        font-family: var(--sw-font-mono);
        background: transparent !important;
        border: none;
        color: var(--sw-white) !important;
        padding: 0;
        font-size: 13px;
        line-height: 1.6;
      }

      table, tr { border-collapse: collapse; background: var(--sw-gray-1000) !important; }
      table { margin: 16px 0; }
      th, td {
        border: 1px solid var(--sw-gray-700);
        padding: 8px 12px;
        color: var(--sw-gray-300) !important;
        background: var(--sw-gray-1000) !important;
        text-align: left;
      }
      th {
        color: var(--sw-white) !important;
        background: var(--sw-gray-900) !important;
        font-weight: 600;
        font-size: 11px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      ul, ol { padding-left: 1.3em; margin: 0 0 16px; }
      li { margin: 6px 0; }
      li::marker { color: var(--sw-gray-400); }

      img { max-width: 100%; border-radius: 4px; border: 1px solid var(--sw-gray-700); }
    `,
  },
} satisfies Record<string, Theme>;

export type ThemeName = keyof typeof THEMES;

export function isThemeName(value: string): value is ThemeName {
  return Object.hasOwn(THEMES, value);
}
