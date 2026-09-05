# cv.dawidolko.pl

My CV as a website, in Polish and English, published at
**[cv.dawidolko.pl](https://cv.dawidolko.pl)**.

| Version | URL                                                       |
| :------ | :-------------------------------------------------------- |
| Polish  | [cv.dawidolko.pl](https://cv.dawidolko.pl/)               |
| English | [cv.dawidolko.pl/en](https://cv.dawidolko.pl/en/)         |

## Why a page and not just a PDF

The page is the source of truth; the PDFs in this repository are generated from
it. One layout means the two never drift apart, and the print stylesheet is
tuned so the browser's own "Save as PDF" produces the same single A4 page as
the checked-in files.

## Layout

```
index.html          Polish version
en/index.html       English version
assets/cv.css       one stylesheet for both languages, screen and print
Dawid_Olko_CV_PL.pdf
Dawid_Olko_CV_EN.pdf
```

There is no build step and no JavaScript. Two static pages, one stylesheet.

## Regenerating the PDFs

Serve the directory and print both pages to A4 with backgrounds enabled:

```bash
python3 -m http.server 8080
# then, in the browser: Print → Save as PDF → A4, margins 11mm/12mm
```

The print stylesheet forces the light palette regardless of the viewer's system
theme — a dark CV wastes toner and reads badly on paper.

## Accessibility and SEO

One `<h1>` per page, a skip link, landmarks, `:focus-visible` rings, and a
palette that clears WCAG 2.2 AA contrast in both themes. Each language has its
own canonical URL, `hreflang` pair and `Person` JSON-LD block.

## Deployment

GitHub Pages, served from `main`. `CNAME` holds the custom domain; the DNS side
is a `CNAME` record from `cv` to `dawidolko.github.io`.
