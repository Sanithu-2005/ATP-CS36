# SPARK LAB

SPARK LAB is a learning platform designed around different minds, with a calm,
inclusive study space and an AI study-buddy named Spark. This repository
currently contains the **landing and download website**. The product itself
will be added in a later sprint.

## Team (Scrum Team)
| Name | Role |
|------|------|
| Dunith Peiris | (add role, e.g. Product Owner) |
| Sanithu Kudaliyana | (add role, e.g. Scrum Master) |
| Navindu Fernando | Developer |
| Vanuja Liyanage | Developer |
| Yohan Singappulige | Developer |

## Repository structure
- `website/`: landing page and (future) download page
- `docs/`: sprint notes and wireframes (add when needed)
- `app/`: the product itself (will be added in a future sprint)

## Running the website locally
No installation or build step is needed.

1. Clone the repository.
2. Open `website/index.html` in your browser.

Optional, to run a local server:

```
cd website
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Features on the site
- Responsive navy and purple design with larger, accessible typography
- A / A+ controls to increase text size across the page
- Interactive task and energy check-in demo, reader with read-aloud, and privacy panel
- 3D study-buddy companion (with a CSS fallback if WebGL isn't supported)
- Team section with expandable role descriptions and LinkedIn links

## Tech
HTML, CSS, vanilla JavaScript, Three.js (included locally in
`website/assets/js/three.local.js`)

## Project status
- **Sprint 1:** Landing page complete
- The AI service, learner accounts, and downloadable product are **not yet
  implemented**. The download button currently shows "coming soon."
- **Next:** Add the `app/` folder and link the download button to GitHub
  Releases when the first build is ready.

## Where to edit
- `website/index.html`: page copy, section order, team details
- `website/assets/css/upgrade.css`: colours, font sizes, spacing, mobile layouts
- `website/assets/css/style.css`: base styles and 3D fallback artwork
- `website/assets/js/app.js`: check-in, progress, read-aloud, tabs, navigation
- `website/assets/js/upgrade.js`: text sizing and navigation accessibility
- `website/assets/js/scene.js`: interactive companion and WebGL fallback

## Contributing (team workflow)
- Work on a feature branch, e.g. `website/navbar-fix`
- Open a pull request and get one teammate's review before merging into `main`
- Track tasks as GitHub Issues on the project board
