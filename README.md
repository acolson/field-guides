# Field Guide

A series of editorial city guides for traveling well — restaurants, hotels, bars, and things to do, organized for how trips actually unfold.

## Structure

```
field-guides/
├── index.html              ← series landing page
├── README.md
├── shared/
│   └── styles.css          ← design system, loaded by every page
├── boston/                 ← Issue 01
│   ├── index.html          ← city cover (TL;DR + section navigation)
│   ├── eat/index.html      ← restaurants (40 places, 5 tiers)
│   ├── stay/index.html     ← hotels (in progress)
│   ├── drink/index.html    ← bars (coming soon)
│   └── do/index.html       ← activities (coming soon)
└── toronto/                ← Issue 02
    ├── index.html          ← city cover
    ├── eat/index.html      ← restaurants (32 places, 5 tiers)
    ├── stay/index.html     ← hotels (in progress)
    ├── drink/index.html    ← bars (coming soon)
    └── do/index.html       ← activities (coming soon)
```

## Adding a new city

1. Copy `boston/` to `[city]/` and update content
2. Add a `.city-feature` block to the root `index.html`, linking to `[city]/`
3. Commit and push — GitHub Pages picks it up within a minute

All cities share the same `shared/styles.css`, so the look is automatically consistent.

## Adding a new section to a city

Each section is a single self-contained `index.html` that loads `../../shared/styles.css`. To add a new section:

1. Create `[city]/[section]/index.html` modeled after `boston/stay/index.html`
2. Update the `section-nav` block in every existing section to include the new one
3. Update the section card on the city's `index.html` from `placeholder` to `live`

## Methodology

Cross-reference the publications that still do real reporting (NYT, Eater, Boston Magazine, Condé Nast Traveler, Infatuation, Resy, local Globes), find what they agree on, organize by neighborhood and time of day. No affiliate links. No paid placements.

## Print

Every page has print styles. Hit Cmd+P on any section to get a clean B&W PDF — useful for hotel rooms with no wifi.

## Local development

It's static HTML. Open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy

GitHub Pages from `main` branch, root folder. No build step.
