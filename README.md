# mdtopdf

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

`POST /convert` takes `{ markdown: string }`, renders it to a PDF with [md-to-pdf](https://github.com/simonhaenisc/md-to-pdf) (Puppeteer under the hood, so output gets real CSS and page breaks), and returns the PDF as a download.

Note: first `npm install` pulls down a bundled Chromium via Puppeteer (a couple hundred MB) — that's what renders the PDF.

## License

MIT — see [LICENSE](LICENSE).
