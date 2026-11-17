---
version: alpha
name: AMY — Ahmad Meijlan Yasir Portfolio
description: Design system and responsive UI guidance for a personal portfolio positioned around applied systems, instrumentation, software engineering, and applied research.
colors:
  brand-primary: "#214A40"
  brand-secondary: "#E9EEE8"
  brand-accent: "#C7E76A"
  background-primary: "#F7F7F2"
  foreground-primary: "#1D2925"
  foreground-secondary: "#68736D"
  border-subtle: "#DEE4DC"
typography:
  sans:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "1rem"
    lineHeight: "1.65"
    fontWeight: 400
  display:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "clamp(2.75rem, 6vw, 5rem)"
    lineHeight: "1.04"
    fontWeight: 700
    letterSpacing: "-0.045em"
  heading:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    lineHeight: "1.15"
    fontWeight: 600
  mono:
    fontFamily: "IBM Plex Mono"
    fontSize: "0.75rem"
    lineHeight: "1.5"
    fontWeight: 500
    letterSpacing: "0.04em"
spacing:
  page-gutter: "clamp(1.25rem, 5vw, 4rem)"
  section-gap: "clamp(4rem, 7vw, 7rem)"
  content-gap: "clamp(1.25rem, 2.5vw, 2rem)"
---

## Overview

AMY is the personal portfolio of Ahmad Meijlan Yasir, positioned as a **Pengembang Sistem Terapan**: a practitioner who connects instrumentation, software engineering, data systems, and applied research to solve operational and environmental problems. The site should feel like an editorial technology portfolio with a quiet scientific character: clear, human, precise, and visually distinctive without looking like a generic developer template. Bahasa Indonesia is the default language for navigation, interface labels, project explanations, and calls to action; keep official publication titles, technology names, and proper nouns in their original form.

The visual system is light-first, using warm paper-like surfaces, deep green as the main brand color, and a restrained lime accent. Technical details may influence the visual language through real diagrams, measurement lines, map contours, and data imagery, but clarity and project evidence take priority over decoration.

## Colors

Use `brand-primary` for primary actions, selected navigation states, and important brand anchors. Use `brand-secondary` as a soft supporting surface for grouped information rather than as a competing brand color. Reserve `brand-accent` for small, high-signal moments such as a short underline, active marker, selected data point, or a small highlighted phrase; it must not become a full-page background or the default fill for every button.

Use `background-primary` as the default canvas and `foreground-primary` for headings and body copy. Use `foreground-secondary` for supporting descriptions and metadata only when the contrast remains readable. Use `border-subtle` to separate surfaces and content groups without introducing heavy card outlines. The brand palette is limited to deep green, muted sage, and lime; photography and project media may introduce their own source colors, but interface chrome should not add unrelated accent colors.

## Typography

Use Plus Jakarta Sans for headings, body copy, navigation, buttons, and form controls. It gives the site one consistent voice and supports Indonesian text comfortably. Use IBM Plex Mono only for small technical metadata such as project indices, dates, category labels, coordinates that genuinely belong to a project, and compact identifiers; never use it for paragraphs or long descriptions.

Keep the display scale expressive but controlled. Hero copy should wrap into a deliberate, readable block rather than span the full viewport. Section headings should establish hierarchy without competing with the hero. Body copy should use comfortable line length and generous line height. Use sentence case for Indonesian headings and labels; reserve uppercase and increased tracking for short eyebrow labels only. Avoid all-caps paragraphs, excessive bolding, and decorative text effects that reduce readability.

## Layout

### Global structure

Use a centered content frame with fluid page gutters. Keep paragraphs and project descriptions within a readable measure; do not stretch text across the full screen on wide monitors. Build the page from clearly separated sections with a consistent vertical rhythm, but do not force every section to fill the viewport. The header, hero, content sections, and footer should share the same alignment system so that the page feels intentionally composed rather than assembled from unrelated templates.

The homepage should use this content order:

1. **Beranda / Hero** — a direct introduction with the role “Pengembang Sistem Terapan”, a concise headline, a short explanation, and two clear actions: “Lihat Karya” and “Unduh CV”.
2. **Fokus** — three connected domains: Instrumentasi & Pengukuran, Sistem Digital & Otomasi, and Data & Riset. Explain each in one sentence; do not turn this into a long skills catalogue.
3. **Karya Pilihan** — lead with the PET Thermal Comfort Forecasting & WebGIS project and JEJAK, then show Inventro and other substantiated work as supporting projects. A project that is not documented with a clear role, contribution, or outcome should not be promoted as a flagship case study.
4. **Riset & Publikasi** — present selected journal and conference work as a readable publication list, with publication type, year, author position when relevant, and a DOI or source link when available.
5. **Tentang & Perjalanan** — combine a concise personal introduction with a compact experience and education timeline. Keep leadership and awards as supporting evidence, not a second CV wall.
6. **Catatan** — show this section only when there are real, published articles to display. Do not render an empty blog placeholder.
7. **Kontak** — finish with a friendly invitation to connect, a visible email action, and relevant professional links.

Do not create separate full-page sections for every skill, award, or activity. Integrate skills into the three focus domains and show them in context within project case studies. Integrate professional journey and leadership into the About area.

### Desktop layout

Use an editorial split hero: copy occupies the larger text area and one meaningful visual occupies the supporting area. The visual may be an authentic portrait, an actual project interface, or a restrained scientific graphic derived from real work. Keep the text and visual in separate layout areas; never allow the headline, portrait, or floating decoration to collide. Align the hero content vertically and give the headline enough width to form a deliberate two- or three-line composition.

Use a flexible project grid rather than making every project an identical card. Give the primary case study more visual weight and let secondary projects use narrower or simpler placements. Keep publication entries in a list or table-like editorial structure instead of repeating the project-card pattern. Keep the About timeline compact and aligned with the main content frame.

The desktop navigation should remain a single clear row with the wordmark on one side and a small number of primary links on the other. Use a restrained active state such as a thin underline or a small accent marker. Keep the navigation height and position consistent between sections.

### Tablet layout

Reduce the number of columns before content becomes cramped. Allow the hero visual to move below or beside the copy according to available width, but keep the headline and actions together. Reflow project grids into fewer columns and let metadata wrap naturally. Navigation may collapse into a menu before links become crowded; never shrink labels until they are difficult to read.

### Mobile layout

Use a single-column reading flow. Place the hero copy first, then the visual, then the primary action group. Keep the headline within the viewport and avoid fixed-height hero panels that cut off text. Stack project cards and publication entries; images must keep their intended aspect ratio and must not be stretched. Project filters may scroll horizontally with touch support, but the page itself must not gain horizontal overflow.

Collapse navigation into an accessible menu with a clear open/close state. Keep tap targets comfortable and leave enough room around the menu, buttons, and floating controls. Move metadata below titles when a side-by-side arrangement becomes narrow. Timeline dates should sit above their corresponding entries. Remove or reposition any fixed element that overlaps content, browser controls, or the mobile navigation.

### Responsive behavior and content slicing

Use a mobile-first layout and the existing project breakpoints where available. Change the structure when the content needs it, not just at arbitrary device labels. Grid columns must collapse before cards become too narrow; text must wrap without clipping; images must use intentional cropping; and buttons must wrap or stack without colliding. Test the longest real project title, the longest Indonesian navigation label, publication titles, and multi-line button labels at narrow widths.

Use semantic section landmarks and a logical heading order. Anchor navigation must account for the sticky header so a section heading is not hidden after scrolling. On long pages, maintain a visible but unobtrusive path back to the top; it must not compete with the contact action or cover content.

## Elevation & Depth

Prefer surface contrast, whitespace, and subtle borders over shadows. Use elevation only when an element genuinely floats above the page, such as an open navigation panel or a modal. Project cards should feel like editorial surfaces, not dashboard widgets. Avoid layered glass panels, heavy blur, glowing borders, and multiple shadow levels.

## Shapes

Use restrained geometry: mostly clean rectangular surfaces with a consistent soft corner treatment. Pills are reserved for compact category filters or status labels, not used as the shape for every card and button. Scientific motifs may include a fine grid, a contour line, a measurement arc, or a small coordinate marker, but each graphic must connect to the content beside it. Keep large decorative forms out of the reading path and preserve generous negative space around the main visual.

## Components

### Navigation

Use Indonesian labels: **Beranda**, **Karya**, **Riset**, **Tentang**, and **Kontak**. Add **Catatan** only when the writing section contains published content. The wordmark returns to the top of the homepage. On mobile, expose the menu state to assistive technology, close it after navigation, and keep keyboard focus inside an open modal-style menu when appropriate.

### Hero

Use one role label, one primary headline, one short supporting paragraph, and no more than two actions. The headline should communicate the relationship between instrumentation, software, and data; avoid generic labels such as “Tech Enthusiast” or “Lifelong Learner”. Keep one dominant visual only. Do not overlay charts, maps, decorative coordinates, and multiple badges on top of the same image.

### Focus areas and skills

Present the three focus domains as concise text-led blocks with one simple icon or small visual cue each. Skills should be grouped by practical capability and shown in context, not as progress bars or a wall of technology logos. Distinguish core strengths from tools used in individual projects; do not imply equal proficiency across every technology.

### Project cards and case studies

Every featured project should answer, in this order: what problem it addresses, what Yasir contributed, what was built, and what evidence or outcome supports it. Keep card copy concise and link to a fuller case study only when supporting detail exists. Use authentic screenshots, diagrams, photographs, or output samples from the project. Keep image crops consistent within a row and never distort application screenshots. Show a small number of relevant technology labels; the labels must not overpower the project title or outcome.

Prioritize these CV-supported stories: PET Thermal Comfort Forecasting & WebGIS as an end-to-end environmental system; JEJAK as an operational calibration workflow system; Inventro as a laboratory management application; and the Coding Camp AI capstone as supporting applied AI experience. The CV documents PET coverage across 49 tourism destinations in 45 villages and 179 successful runs from 180 scheduled executions; it documents JEJAK digitizing 10 workflow stages across 7 user roles. Use these figures only with their original scope. Do not convert a system metric into a personal achievement unless the contribution is clear.

### Research and publications

Separate journal publications from conference papers when the collection supports that distinction. Use the original publication title, publication name, year, author information, and DOI or source link when available. Keep this area typographic and compact; cover images are optional and should only be used when they add useful context. Do not rewrite paper titles into marketing headlines.

### About and journey

Write in the first person with a calm, direct, and friendly tone. Explain the connection between the Instrumentation MKG background and the development of practical software and data systems. Use a compact timeline for education and relevant experience, with each entry focused on contribution rather than a copied list of duties. The timeline must remain readable on mobile and must not use a horizontal scroller for essential career information.

### Buttons, links, and filters

Use `brand-primary` for the main action with a clear text label. Use an outlined or text-style treatment for the secondary action. Reserve `brand-accent` for small emphasis and selected states. Every action must have a clear destination or outcome; avoid decorative buttons and vague labels. Project filters must be keyboard-operable, have a visible selected state, and communicate the active filter without color alone.

### Contact and footer

Use a friendly invitation rather than a hard sales pitch. Present email, LinkedIn, and GitHub as clear text links with descriptive labels. Keep the footer compact and avoid repeating the full navigation, social links, and copyright information multiple times.

### Accessibility and forms

Maintain WCAG AA contrast for text and controls; never use the lime accent as the only way to communicate a state. Provide a visible keyboard focus style, semantic headings, meaningful link labels, descriptive alternative text for informative images, and empty alternative text for purely decorative imagery. Contact fields must have persistent labels, clear required/optional states, inline validation, and a confirmation or error message that is announced to assistive technology. Do not rely on placeholder text as the only field label.

### Motion and interaction

Use motion to clarify transitions or provide feedback, not as a constant background effect. Use subtle entrance and hover transitions; avoid parallax or cursor effects that compete with reading. Respect `prefers-reduced-motion`, preserve keyboard interaction, and ensure hover-only information is also available on touch and keyboard.

If the existing theme switcher is retained, light mode must be the default and every component, image treatment, border, focus state, and overlay must have a coherent dark-mode equivalent. Remove the switcher rather than showing a control that changes only part of the interface.

## Do's and Don'ts

- Lead with specific work and demonstrated outcomes; do not lead with generic self-descriptions.
- Keep Bahasa Indonesia as the default UI language. Preserve original titles for papers, products, and proper nouns.
- Use the project evidence in the CV as the source for roles, dates, metrics, and claims; distinguish internship, project, publication, and employment accurately.
- Keep the palette to the defined brand colors and neutral surfaces; do not add unrelated gradients or multiple competing accent colors.
- Use one focal visual per section and leave enough negative space for the content hierarchy to remain clear.
- Do not use a uniform three-column card grid for every section, a giant skill-logo wall, skill percentage bars, or repeated decorative badges.
- Do not use a permanently fixed vertical “Know Me” tab; it distracts from content and risks covering the viewport edge.
- Do not use a tall empty hero whose only content is a centered name and a generic slogan.
- Do not add fake charts, fabricated coordinates, invented metrics, stock weather dashboards, or abstract graphics that imply data the project does not contain.
- Do not show duplicate skill or soft-skill lists to create a marquee effect; repeated visual loops must not create duplicate screen-reader content.
- Do not show empty project, publication, or article sections. Hide sections until real content is available.
- Do not use heavy glassmorphism, glowing effects, oversized gradients, noisy backgrounds, or animation that delays access to the main content.
- Do not let sticky navigation, floating controls, filters, or fixed buttons overlap content at any viewport width.
