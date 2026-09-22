import { mdToPdf } from "md-to-pdf";
import { THEMES, PRINT_SAFETY_CSS, type Theme, type ThemeName } from "./themes.js";

export async function convertMarkdownToPdf(
  markdown: string,
  theme: ThemeName = "default",
  customCss?: string
): Promise<Buffer> {
  // Custom CSS fully replaces the preset's styling (but not the page-break
  // safety rules) — it's a clean slate, not a layer on top of a theme.
  const { css, pdfOptions }: Theme = customCss ? { label: "Custom", css: customCss } : THEMES[theme];
  const pdf = await mdToPdf(
    { content: markdown },
    {
      css: PRINT_SAFETY_CSS + css,
      ...(pdfOptions ? { pdf_options: pdfOptions } : {}),
      ...(process.env.CI ? { launch_options: { args: ["--no-sandbox", "--disable-setuid-sandbox"] } } : {}),
    }
  );
  return Buffer.from(pdf.content);
}
