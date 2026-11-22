# SPARK LAB

SPARK LAB is a learning platform designed around different minds, with a calm,
inclusive study space and an AI study-buddy named Spark. This repository
currently contains the **landing website with working browser prototypes**.
The full downloadable learning application is still in development.

**Live site:** https://sparklabedu.com/

## Team (Scrum Team)

| Name               | Role          |
| ------------------ | ------------- |
| Dunith Peiris      | Product Owner |
| Sanithu Kudaliyana | Scrum Master  |
| Navindu Fernando   | Developer     |
| Vanuja Liyanage    | Developer     |
| Yohan Singappulige | Developer     |

## Repository structure

- `website/`: landing page and prototypes

## Running the website locally

The live version is at https://sparklabedu.com/. To run it on your own machine, no installation or build step is needed.

1. Clone the repository.
2. Open `website/index.html` in your browser.

Optional, to run a local server:

```
cd website
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Demo sign-in

Use **Demo sign in** in the header, then choose Learner or Educator. The role
buttons fill in the sample credentials automatically.

- Learner: `learner@sparklab.demo`
- Educator: `educator@sparklab.demo`
- Password (both): `Spark123!`

This is a client-side demonstration, **not secure authentication**. Do not
enter real passwords. No accounts are created or stored, and reloading the page
resets the demo session.

## Features

- Responsive navy and purple design, larger accessible text and A / A+ text-size controls
- Micro-learning feed with swipeable cards (four sample lessons)
- Visual math blocks (addition and subtraction, 0 to 10)
- Active recall quizzes with badges (First Spark, Curious Mind, Recall Star)
- "I need a pause" panic button that opens a calm modal
- Educator dashboard with fictional sample learners, search and filters
- 3D study-buddy companion, with a CSS fallback if WebGL is unavailable
- Team section with expandable role descriptions

## Tech

HTML, CSS, vanilla JavaScript, Three.js (included locally in
`website/assets/js/three.local.js`)

## Project status

- **Sprint 1:** Landing page and browser prototypes complete
- Not yet implemented: secure authentication, server database, connected
  classroom records, production AI service, downloadable app. The download
  button currently shows "coming soon."
- **Next:** Add the `app/` folder and link the download button to GitHub
  Releases when the first build is ready.

## Where to edit

- `website/index.html`: page content, feature descriptions, team and FAQs
- `website/assets/js/auth.js`: sample logins, role switching, sign-out
- `website/assets/js/learning.js`: cards, quizzes, badges, maths, modal, dashboard samples
- `website/assets/js/app.js`: navigation, audience selector, motion preference, privacy dialog
- `website/assets/js/upgrade.js`: A / A+ text controls and navigation accessibility
- `website/assets/js/scene.js`: 3D companion and fallback
- `website/assets/css/refined.css`: logo, header, login dialogs, latest visual tweaks
- `website/assets/css/learning.css`: styles for the learning prototypes
- `website/assets/css/upgrade.css` and `style.css`: base landing-page styles
