import { test } from "node:test";
import assert from "node:assert/strict";
import { convertMarkdownToPdf } from "./convert.js";

test("converts markdown to a PDF buffer", async () => {
  const pdf = await convertMarkdownToPdf("# Hello\n\nThis is **markdown**.");
  assert.ok(Buffer.isBuffer(pdf));
  assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
});
