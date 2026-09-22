import { test } from "node:test";
import assert from "node:assert/strict";
import { convertMarkdownToPdf } from "./convert.js";
import { THEMES, isThemeName } from "./themes.js";

test("converts markdown to a PDF buffer", async () => {
  const pdf = await convertMarkdownToPdf("# Hello\n\nThis is **markdown**.");
  assert.ok(Buffer.isBuffer(pdf));
  assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
});

test("converts markdown to a PDF buffer with a named theme", async () => {
  const pdf = await convertMarkdownToPdf("# Hello", "dark");
  assert.ok(Buffer.isBuffer(pdf));
  assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
});

test("isThemeName rejects unknown themes", () => {
  assert.ok(isThemeName("default"));
  assert.ok(!isThemeName("nonexistent"));
  assert.deepEqual(Object.keys(THEMES), ["default", "minimal", "serif", "dark", "sitewebk"]);
});
