import express from "express";
import { convertMarkdownToPdf } from "./convert.js";
import { isThemeName } from "./themes.js";

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.static("public"));

const MAX_CUSTOM_CSS_LENGTH = 50_000;

app.post("/convert", async (req, res) => {
  const { markdown, theme = "default", customCss } = req.body ?? {};
  if (typeof markdown !== "string" || !markdown.trim()) {
    res.status(400).json({ error: "markdown text is required" });
    return;
  }

  const hasCustomCss = typeof customCss === "string" && customCss.trim().length > 0;
  if (customCss !== undefined && !hasCustomCss) {
    res.status(400).json({ error: "custom CSS is empty" });
    return;
  }
  if (hasCustomCss && customCss.length > MAX_CUSTOM_CSS_LENGTH) {
    res.status(400).json({ error: `custom CSS exceeds ${MAX_CUSTOM_CSS_LENGTH} characters` });
    return;
  }
  if (!hasCustomCss && (typeof theme !== "string" || !isThemeName(theme))) {
    res.status(400).json({ error: "invalid theme" });
    return;
  }

  try {
    const pdf = await convertMarkdownToPdf(markdown, hasCustomCss ? "default" : theme, hasCustomCss ? customCss : undefined);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="document.pdf"');
    res.send(pdf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "conversion failed" });
  }
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`mdtopdf listening on http://localhost:${port}`));
