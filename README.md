# Pulse — Responsive Analytics Dashboard

Pulse is a portfolio-ready analytics dashboard built with **HTML5, CSS3 and Vanilla JavaScript**. The layout is designed mobile-first and tested against the required 320px, 480px, 768px, 1024px and 1440px breakpoints.

## Files

```text
pulse-dashboard/
├── index.html
├── style.css
├── script.js
├── README.md
├── assets/
│   └── architecture-preview.svg
└── screenshots/
    └── README.md
```

## What works

- Responsive sidebar with mobile drawer, backdrop and Escape-to-close
- Light/dark mode with localStorage persistence
- Responsive hero section and floating visual
- Responsive 4-card metrics grid that becomes 2 columns and then 1 column
- Responsive SVG analytics chart
- Responsive activity and project sections
- Responsive team cards
- Responsive Reports, Settings and Help cards
- Period buttons with active state and feedback
- Chart-range button with changing labels and feedback
- Workspace, search and demo action feedback
- Keyboard focus states and reduced-motion support
- No intentional horizontal scrollbar at the supported mobile widths
- CSS Grid and Flexbox used throughout
- Design tokens are centralized in `:root`

## Responsive behavior

### 1440px+
Full sidebar, wide hero, four metric cards and two-column lower content.

### 1024px
Sidebar becomes a drawer and the main dashboard uses the available width without a fixed desktop sidebar.

### 768px
The hero becomes stacked, lower sections become single-column, and metric cards remain compact two-column cards.

### 520px and below
The dashboard becomes single-column, buttons become full-width, chart controls wrap, activity values move below their text, project status moves below the project name, and team cards stack.

### 320–359px
Extra-tight spacing, smaller hero visual and text wrapping rules prevent clipped content.

## Run

Open `index.html` directly, or use VS Code Live Server.

## GitHub

```bash
git init
git add .
git commit -m "Build responsive Pulse analytics dashboard"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```
