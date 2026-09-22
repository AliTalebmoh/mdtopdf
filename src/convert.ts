import { mdToPdf } from "md-to-pdf";

export async function convertMarkdownToPdf(markdown: string): Promise<Buffer> {
  const pdf = await mdToPdf(
    { content: markdown },
    process.env.CI ? { launch_options: { args: ["--no-sandbox", "--disable-setuid-sandbox"] } } : {}
  );
  return Buffer.from(pdf.content);
}
