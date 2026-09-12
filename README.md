# CV

> 📄 **The page is the source, the PDF is the export** — a two-language CV as two static files, printed from the same stylesheet

**CV** is my curriculum vitae as a website, in Polish and English. The page is the original; the PDFs in this repository are printed from it. One layout means the two versions cannot drift apart, and the print stylesheet is tuned so the browser's own *Save as PDF* produces exactly the single A4 sheet that is checked in.

There is no build step and no JavaScript — two HTML files and one stylesheet, served by GitHub Pages.

![HTML5](https://img.shields.io/badge/HTML5-two%20pages-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-screen%20%2B%20print-1572B6?logo=css3&logoColor=white)
![No JavaScript](https://img.shields.io/badge/JavaScript-none-lightgrey)
![WCAG](https://img.shields.io/badge/WCAG%202.2-AA-16A34A?logo=accessibleicon&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-222222?logo=githubpages&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

| Version | URL                                                |
| :------ | :------------------------------------------------- |
| Polish  | [cv.dawidolko.pl](https://cv.dawidolko.pl/)         |
| English | [cv.dawidolko.pl/en](https://cv.dawidolko.pl/en/)   |

---

## 🎯 Key Features

- **One layout, two languages** — both pages share `assets/cv.css`, so a change to the design lands on both at once and neither can quietly fall behind.
- **The print output is the deliverable** — the print stylesheet is written for A4 with 11 mm / 12 mm margins, so what the browser saves matches the PDFs in this repository.
- **Light palette forced when printing** — regardless of the viewer's system theme. A dark CV wastes toner and reads badly on paper.
- **No JavaScript at all** — nothing to load, nothing to fail, and the page prints identically with scripting disabled.
- **Accessible by construction** — one `<h1>` per page, a skip link, landmark elements, `:focus-visible` rings and contrast that clears WCAG 2.2 AA in both themes.
- **Correct multilingual SEO** — each language has its own canonical URL, an `hreflang` pair and a `Person` JSON-LD block, so search engines index the right version for the right reader.

---

## 🖨️ Regenerating the PDFs

Serve the directory and print both pages to A4 with backgrounds enabled:

```bash
python3 -m http.server 8080
# then in the browser: Print → Save as PDF → A4, margins 11 mm / 12 mm
```

---

## 📁 Project Structure

```
cv.dawidolko.pl/
├── index.html              # Polish version
├── en/index.html           # English version
├── assets/
│   ├── cv.css              # one stylesheet: screen and print, both languages
│   ├── dawid-olko.jpg
│   └── favicon.svg
├── Dawid_Olko_CV_PL.pdf    # printed from index.html
├── Dawid_Olko_CV_EN.pdf    # printed from en/index.html
└── CNAME                   # the custom domain
```

---

## 🚀 Deployment

GitHub Pages, served from `main`. `CNAME` holds the custom domain; on the DNS side, `cv` is a `CNAME` record pointing at `dawidolko.github.io`.

---

## 📄 License

MIT © [Dawid Olko](https://dawidolko.pl)
