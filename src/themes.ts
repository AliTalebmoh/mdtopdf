export interface Theme {
  label: string;
  css: string;
}

export const THEMES = {
  default: {
    label: "Default",
    css: "",
  },
  minimal: {
    label: "Minimal",
    css: `
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; color: #222; max-width: 680px; margin: 0 auto; line-height: 1.7; }
      h1, h2, h3 { font-weight: 600; color: #111; border: none; }
      h1 { font-size: 1.8em; } h2 { font-size: 1.4em; } h3 { font-size: 1.15em; }
      hr { border: none; border-top: 1px solid #ddd; }
      blockquote { border-left: 2px solid #ddd; color: #555; padding-left: 1em; margin-left: 0; }
      code { background: #f3f3f3; padding: 0.1em 0.3em; border-radius: 3px; }
      pre { background: #f7f7f7; border-radius: 4px; }
      table { border-collapse: collapse; }
      th, td { border: 1px solid #e2e2e2; padding: 0.4em 0.7em; }
    `,
  },
  serif: {
    label: "Serif",
    css: `
      body { font-family: Georgia, "Times New Roman", serif; color: #1a1a1a; max-width: 700px; margin: 0 auto; line-height: 1.8; font-size: 15px; }
      h1, h2, h3 { font-family: Georgia, serif; font-weight: 700; }
      h1 { border-bottom: 2px solid #1a1a1a; padding-bottom: 0.2em; }
      blockquote { font-style: italic; border-left: 3px solid #999; padding-left: 1em; color: #444; }
      code, pre { font-family: "Courier New", monospace; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ccc; padding: 0.5em 0.8em; }
      th { background: #f0f0f0; }
    `,
  },
  dark: {
    label: "Dark",
    css: `
      html, body { background: #0a0a0a; color: #f0f0f0; }
      body { font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif; max-width: 700px; margin: 0 auto; line-height: 1.7; }
      h1, h2, h3, h4 { color: #ffffff; border-color: #333 !important; }
      a { color: #22c55e; }
      hr { border-color: #333; }
      blockquote { border-left: 3px solid #22c55e; color: #a0a0a0; padding-left: 1em; margin-left: 0; }
      code { background: #1a1a1a !important; color: #22c55e !important; padding: 0.1em 0.35em; border-radius: 3px; }
      pre, pre.hljs, .hljs { background: #161616 !important; border: 1px solid #262626; }
      pre code, pre code.hljs { color: #f0f0f0 !important; background: transparent !important; }
      table, tr { border-collapse: collapse; background: #0a0a0a !important; }
      th, td { border: 1px solid #333; padding: 0.4em 0.7em; color: #f0f0f0 !important; background: #0a0a0a !important; }
      th { background: #161616 !important; }
    `,
  },
} satisfies Record<string, Theme>;

export type ThemeName = keyof typeof THEMES;

export function isThemeName(value: string): value is ThemeName {
  return Object.hasOwn(THEMES, value);
}
