# Field Guide — Project Handoff Brief

Paste this into a new Cowork or Claude Code conversation to continue building out the Field Guide field-guides project.

---

## What this project is

**Field Guide** is a series of editorial city guides Aaron Olson is building, designed to be shared with friends planning group trips. Issue 01 is Boston, complete. More cities will follow.

The guide style is intentional: long-form, neighborhood-organized, magazine-aesthetic (Oliver Wyman meets Eater). The methodology is cross-publication consensus — find what NYT, Eater, Boston Magazine, Infatuation, CN Traveler, Resy, and the Boston Globe all agree on, then organize for how a trip actually unfolds.

**The use case:** when Aaron is planning a trip with friends, he shares the field guide URL. The group reads it, decisions happen elsewhere (group chat, Google Doc). The guide is a stable, opinionated reference — not a planning tool with state.

## What's been built

### The repo

```
field-guides/                       # On GitHub at Aaron's username; GitHub Pages enabled
├── index.html                       # Series landing page
├── README.md
├── shared/
│   └── styles.css                   # Design system, loaded by every page
└── boston/                          # Issue 01 — complete
    ├── index.html                   # City cover with trip summary + 4 section cards
    ├── eat/index.html               # 45 restaurants across 5 tiers (97KB, the meat)
    ├── stay/index.html              # Placeholder — hotels in progress
    ├── drink/index.html             # Placeholder — bars coming
    └── do/index.html                # Placeholder — activities coming
```

### The cities

- **Issue 01 — Boston** (40 restaurants, sushi cuts applied), **Issue 02 — Toronto** (32 restaurants, couple-by-train framing)
- **Tier 1-4** by critical consensus (number of publications listing them)
- **Tier 5** organized by neighborhood/area for breakfast and lunch (different framework — built around the day, not consensus)
- **No photos.** Cards are text-only. Decision made after iteration — the image-on-card pattern created empty-space problems with placeholder gradients, and the editorial copy carries the page on its own. **Do not reintroduce photos** unless Aaron explicitly asks. The `.r-image` / `.r-image-placeholder` blocks remain in the markup but are hidden via `display: none` in the stylesheet, so the markup is portable if the decision ever reverses.
- **Filter UI on the eat pages** — neighborhood and cuisine chips, JS-driven. Map markers link to the corresponding list entry on click.
- **Leaflet map** at the top of each eat page with restaurants pinned, color-coded by tier
- **Sources for Boston:** NYT, CN Traveler, Eater 38, Bon Appétit, Boston Magazine, The Infatuation, Resy Hit List, plus Boston Globe Best of the Best for Tier 5
- **Sources for Toronto:** Toronto Life (Best New + 100 Best), NYT 36 Hours, Canada's 100 Best, Michelin Guide Toronto, Air Canada enRoute, The Infatuation, CN Traveler, blogTO, Toronto Star, Foodism

### Design system

The shared stylesheet (`shared/styles.css`) defines everything. Key design tokens:

```css
--ink: #0a0a0a            /* primary text */
--paper: #fff             /* page background */
--canvas: #fafaf8         /* alt background, off-white */
--accent: #c8463a         /* the signature red — used for italics, kickers, links */
--rule: #e5e3df           /* hairlines */
--rule-strong: #1a1a1a    /* strong borders */
```

Fonts: **Source Serif 4** (display, with italic accent treatment) + **Inter** (body, UI). Loaded from Google Fonts.

The whole stylesheet includes print styles — every page works as a clean B&W PDF via Cmd+P. Maps and nav are stripped, restaurant cards reflow, links get their URLs printed after them. Useful for hotel rooms with no wifi.

## Aaron's hard rules (apply to all writing)

- **En dashes (–) over em dashes (—) and hyphens.** Non-negotiable.
- **No bold in body prose.** Bold exists in chips and `<dt>` labels, not in paragraphs.
- **Short flowing paragraphs.** 2-4 sentences. Active voice.
- **Sign emails "Aaron" only.** Not "Best, Aaron" or "Thanks, Aaron."
- **No consultant-speak.** No "leverage," "robust," "world-class," "elevate," "curate," "best-in-class."

The voice guide in the skill (see below) goes deeper.

## The skill

A skill called **`field-guide-builder`** has been created. It encodes:
- The full research methodology (publications to use, how to tier, how to organize)
- The voice guide (with examples of what's good and what's not)
- Section-specific methodology (eat vs. stay vs. drink vs. do — they work differently)
- HTML templates for new eat sections and new city covers
- A quick-reference cheat sheet for common markup blocks

**Note:** The skill's "Phase 5: Photos" section is no longer in scope for this project. Cards are text-only. Skip the photo-sourcing pass entirely.

The skill files are bundled with this handoff. Install them at the standard skills path before starting work (typically `~/.claude/skills/` or wherever your local environment expects).

## How to continue the work

### Most likely next steps

1. **Build Boston's other sections.** Stay first (hardest methodologically — see `section-methodology.md`), then Drink, then Do. Each is its own conversation; don't try to do all three in one session.

2. **Add a second city.** NYC, Miami, and Tokyo are likely candidates based on Aaron's travel pattern. The skill walks through scoping, research, and build for a new city.

3. **Refine the filter taxonomy.** As the guide grows, the cuisine and neighborhood filter chips might need consolidation or grouping. Watch how the filter UI scales when a third city is added.

### Standard workflow

For any new section or city:

1. **Read the SKILL.md** for `field-guide-builder` first. It tells you which phase you're in.
2. **Scope with Aaron.** Don't research without confirming city + section + trip shape + publications.
3. **Research.** Build a tally, score into tiers, capture editorial data. Stop and review the tier list with Aaron before generating HTML.
4. **Build.** Use the templates from the skill. Match `boston/eat/index.html` for any markup question.
5. **Test.** Local server, print preview, mobile viewport, deep-link anchors.
6. **Hand off.** Tell Aaron what was built, what's still placeholder, photo coverage as a number not percentage, and the git commands. He pushes; don't auto-push.

### File path conventions

From `[city]/[section]/index.html`:
- `../../shared/styles.css` for the CSS
- `../` for the city cover
- `../../` for the landing page
- `../[sibling]/` for a sibling section

From `[city]/index.html`:
- `../shared/styles.css` for the CSS
- `../` for the landing
- `[section]/` for a section

### Things to NOT do

- Don't redesign the visual system. Aaron tuned the cards and tier structure carefully. Use the existing markup.
- Don't add features beyond editorial content. No voting, no interactive shortlists, no auth, no comments. The guide is meant to be read, not interacted with.
- Don't auto-commit or auto-push. Aaron reviews in the browser first.
- Don't pad sections with weak signals. A 30-restaurant guide built on thin research is worse than a 15-restaurant guide built on real consensus.
- Don't use Instagram, Tripadvisor, Yelp, or Flickr photos. Copyright problems. Placeholders are fine.

## Quick context on Aaron

CTO at GSTV in Detroit, runs a tech and product management org. Travels a lot (DTW ↔ LGA/NYC weekly, Coachella in April, Ultra Miami in March). Sharp on editorial voice and design — has strong opinions about how the guide should look and read. Values honest framing over feel-good language. Will push back on consultant-speak immediately.

## Reference: what to ask Aaron when you start

If picking this up cold, three questions to confirm before doing any work:

1. **Which city + section?** (Don't assume; Aaron may have shifted priorities.)
2. **Repo path on local machine?** (Default `~/code/field-guides` but confirm.)
3. **Is the repo synced with GitHub?** (Pull before starting; he may have edited from another machine.)

After that, the SKILL.md is the operating manual. Start there.

---

## What to paste into the new conversation

Copy everything above this line. Then add:

> I'm continuing work on the Field Guide field-guides project. The skill `field-guide-builder` should be installed; if not, you can find it bundled with this handoff. Start by reading the SKILL.md to understand the workflow, then ask me what I want to work on first.

That's enough to bootstrap. The skill takes over from there.
