#!/usr/bin/env node
/*
 * api.mjs: writes the small read-only API of cv.dawidolko.pl that other sites (olkodawid.dawidolko.pl) read the CV
 * from, so the CV lives in this repository only. From the two checked-in PDFs it renders the first page of each to WebP
 * previews in three widths (api/preview/<lang>-<width>.webp) and writes api/cv.json: the PDF, page and preview
 * addresses, the preview size, each PDF's SHA-256 and the date of this export.
 * Run it after printing new PDFs: node tools/api.mjs. With --check it changes nothing and exits 1 when api/cv.json no
 * longer matches the PDFs. Needs Node 20+, poppler (pdftoppm) and cwebp (brew install poppler webp).
 */
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = 'https://cv.dawidolko.pl'
const WIDTHS = [714, 1012, 2024]
const LANGS = {
  pl: { pdf: 'Dawid_Olko_CV_PL.pdf', page: '/' },
  en: { pdf: 'Dawid_Olko_CV_EN.pdf', page: '/en/' }
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const apiDir = join(root, 'api')
const jsonPath = join(apiDir, 'cv.json')
const sha = (file) => createHash('sha256').update(readFileSync(join(root, file))).digest('hex')

if (process.argv.includes('--check')) {
  const current = existsSync(jsonPath) ? JSON.parse(readFileSync(jsonPath, 'utf8')) : null
  const stale = Object.entries(LANGS).filter(([lang, { pdf }]) => current?.languages?.[lang]?.sha256 !== sha(pdf))
  if (stale.length) {
    process.stderr.write(`api/cv.json is older than ${stale.map(([, { pdf }]) => pdf).join(', ')}: run node tools/api.mjs\n`)
    process.exit(1)
  }
  process.stdout.write('api/cv.json matches the PDFs\n')
  process.exit(0)
}

const previewDir = join(apiDir, 'preview')
mkdirSync(previewDir, { recursive: true })
const tmp = mkdtempSync(join(tmpdir(), 'cv-api-'))
let height = 0
const languages = {}
for (const [lang, { pdf, page }] of Object.entries(LANGS)) {
  const preview = {}
  for (const width of WIDTHS) {
    const png = join(tmp, `${lang}-${width}`)
    execFileSync('pdftoppm', ['-png', '-singlefile', '-f', '1', '-l', '1', '-scale-to-x', String(width), '-scale-to-y', '-1', join(root, pdf), png])
    if (width === 1012) height = readFileSync(`${png}.png`).readUInt32BE(20)
    execFileSync('cwebp', ['-quiet', '-q', '72', '-m', '6', `${png}.png`, '-o', join(previewDir, `${lang}-${width}.webp`)])
    preview[width] = `${SITE}/api/preview/${lang}-${width}.webp`
  }
  languages[lang] = { pdf: `${SITE}/${pdf}`, page: `${SITE}${page}`, preview, sha256: sha(pdf) }
}
rmSync(tmp, { recursive: true })

const api = {
  name: 'Dawid Olko',
  title: 'Fullstack / AI Developer',
  updated: new Date().toISOString().slice(0, 10),
  previewSize: { width: 1012, height },
  languages
}
writeFileSync(jsonPath, `${JSON.stringify(api, null, 2)}\n`)
process.stdout.write(`api/cv.json written (${Object.keys(languages).join(', ')}, previews ${WIDTHS.join(', ')} px)\n`)
