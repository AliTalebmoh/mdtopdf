# mdtopdf

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Paste markdown, get a PDF. A tiny web app — no account, no upload to a third party, runs on your machine.

Placeholder name — rename freely (just update `package.json`).

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000, paste or upload a `.md` file, and click **Convert to PDF**.

## Scripts

- `npm run dev` — run the server with auto-reload
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run the compiled server (`dist/server.js`)
- `npm test` — run the conversion smoke test

## How it works

`POST /convert` takes `{ markdown: string, theme?: string, customCss?: string }`, renders it to a PDF with [md-to-pdf](https://github.com/simonhaenisc/md-to-pdf) (Puppeteer under the hood, so output gets real CSS and page breaks), and returns the PDF as a download.

Note: first `npm install` pulls down a bundled Chromium via Puppeteer (a couple hundred MB) — that's what renders the PDF.

## Themes

Pick a look from the dropdown before converting: `default` (GitHub-style), `minimal`, `serif`, `dark`, or `sitewebk` (monochrome, Space Grotesk + JetBrains Mono, hairline borders — pulled from the SiteWebK design system). Every theme loads its fonts from Google Fonts rather than relying on whatever's installed on the machine running it, so output looks the same wherever it's deployed. Defined as plain CSS in [src/themes.ts](src/themes.ts) — add a new key there and a matching `<option>` in [public/index.html](public/index.html) to add one.

Need full control instead? Pick **Custom CSS…** in the dropdown and write your own — it fully replaces the preset (page-break safety rules still apply), capped at 50k characters. There's no full-bleed dark background support for custom CSS yet (that needs a zero PDF margin, which only the built-in dark themes set) — copy `dark` or `sitewebk`'s `pdfOptions` in [src/themes.ts](src/themes.ts) as a starting point if you need that.

## License

MIT — see [LICENSE](LICENSE).
