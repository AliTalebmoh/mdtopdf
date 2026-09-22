import express from "express";
import { convertMarkdownToPdf } from "./convert.js";

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.static("public"));

app.post("/convert", async (req, res) => {
  const { markdown } = req.body ?? {};
  if (typeof markdown !== "string" || !markdown.trim()) {
    res.status(400).json({ error: "markdown text is required" });
    return;
  }

  try {
    const pdf = await convertMarkdownToPdf(markdown);
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
