import { mdToPdf } from "md-to-pdf";
import { THEMES, PRINT_SAFETY_CSS, type ThemeName } from "./themes.js";

export async function convertMarkdownToPdf(markdown: string, theme: ThemeName = "default"): Promise<Buffer> {
  const pdf = await mdToPdf(
    { content: markdown },
    {
      css: PRINT_SAFETY_CSS + THEMES[theme].css,
      ...(process.env.CI ? { launch_options: { args: ["--no-sandbox", "--disable-setuid-sandbox"] } } : {}),
    }
  );
  return Buffer.from(pdf.content);
}
