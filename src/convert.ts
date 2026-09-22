import { mdToPdf } from "md-to-pdf";

export async function convertMarkdownToPdf(markdown: string): Promise<Buffer> {
  const pdf = await mdToPdf({ content: markdown });
  return Buffer.from(pdf.content);
}
