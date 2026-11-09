# Nomadica Event Travel Planning — Endterm
 
Nomadica is a responsive multi-page travel-planning website for people travelling to concerts, festivals, sports events, business events and city breaks. This endterm version continues our midterm project (same topic, group, pages and Bootstrap layout) and adds interactive **JavaScript** and **jQuery** features.
 
**Group:** Gauhar · Beksultan · Nazar  
**Live site:** https://gauharb.github.io/web-endterm/ — the home page is `index.html` at the site root.
 
## Team contributions
 
The work is split in three roughly equal parts (about 1,550–1,800 lines of HTML, CSS and JavaScript each). Each member builds, commits and explains the HTML, CSS and JavaScript of their own pages, plus the shared files and images listed for them.
 
| Member | Pages | Files |
|--------|-------|-------|
| **Gauhar** | Home, Plan a trip, Sitemap, README | `index.html`, `css/index.css`, `images/queensland-australia.jpg` · `pages/plan.html`, `css/plan.css`, `js/pages/plan.js`, `images/plane.jpg` · `pages/sitemap.html`, `css/sitemap.css` · `README.md` |
| **Beksultan** | Discover, Timeline, shared data and helpers | `pages/discover.html`, `css/discover.css`, `js/pages/discover.js` · `pages/timeline.html`, `css/timeline.css`, `js/pages/timeline.js` · `js/data/data.js` (arrays) · `js/core/main.js` (theme, menu, back-to-top) |
| **Nazar** | About & contact, Route options, validation | `pages/about.html`, `css/about.css`, `js/pages/contact.js`, `images/about.jpeg` · `pages/routes.html`, `css/routes.css`, `js/pages/routes.js` · `js/core/validation.js` (form validation) |
 
## Project structure
 
```
index.html            Home page (main page, site root)
pages/                plan, routes, timeline, discover, about, sitemap (.html)
css/                  One stylesheet per page: index, plan, routes, timeline, discover, about, sitemap
js/
  data/data.js        Arrays: routeOptions, places, tripPurposes, placeCategories
  core/main.js        Shared helpers, theme switcher, mobile menu, back-to-top
  core/validation.js  Reusable form-validation functions
  pages/              One script per page: plan, routes, discover, contact, timeline (home and sitemap use only main.js)
images/               queensland-australia.jpg (Home), plane.jpg (Plan), about.jpeg (About)
```
 
## Independent CSS per page
 
Each HTML page loads only its own stylesheet from `css/`: `index.css`, `plan.css`, `routes.css`, `timeline.css`, `discover.css`, `about.css`, `sitemap.css`. A file contains the shared base (header, footer, buttons, dark theme, responsive rules) plus the styles used only by that page and its scripts; rules for other pages were removed. No shared `styles.css` dependency remains, so every team member can explain the whole look of their own page from one file.
 
## Pages
 
| Page | What it does |
|------|--------------|
| index.html | Overview. "Plan a … trip" cards open the form with the purpose preselected. |
| pages/plan.html | Trip form with full JavaScript validation and a success summary. |
| pages/routes.html | Route table built from an array: filter, sort, price slider, shortlist. |
| pages/timeline.html | jQuery accordion itinerary, "ready" checklist with progress bar, add/remove activities. |
| pages/discover.html | Place cards built from an array, category filter, live search, saved places. |
| pages/about.html | Contact form validation, character counter, jQuery FAQ accordion. |
| pages/sitemap.html | Links to all pages. |
 
Every page has a dark/light theme switcher, a mobile menu (jQuery `slideToggle`) and a back-to-top button (jQuery `fadeIn`/`fadeOut` + `animate`).
 
## Where each requirement is used
 
**Arrays** — `js/data/data.js` (4 arrays); `shortlist` (routes.js) and `savedPlaces` (discover.js).
 
**Loops** — `for...of` (routes.js `renderTable`, discover.js `renderSaved`), `forEach` (routes.js `renderShortlist`, plan.js purpose options, discover.js `renderPlaces`), classic `for` (discover.js `renderFilterButtons`), `for...in` (plan.js `validateForm`).
 
**Functions (parameters / return values)** — `formatPrice(amount)`, `isValidEmail(value)`, `validateField(input, checkFunction)`, `calculateTripTotal(price, travellers)`, `getBudgetPerPerson(budget, travellers)`, `matchesFilters(place, category, text)`, `getVisibleRoutes()`.
 
**DOM manipulation** — `querySelector`, `createElement`, `appendChild`, `innerHTML`, `textContent`, `classList`, `setAttribute`, `dataset`, `style`, `hidden`. Table rows, cards, list items and filter buttons are generated from arrays; shortlist items, saved places and timeline activities are added and removed.
 
**Interface features** — theme switcher, mobile menu, route filter + sort, shortlist (simple cart), category filter, live search, favourites list, timeline accordion, checklist + progress bar, FAQ accordion, toast notifications.
 
**Events (`addEventListener`)** — `DOMContentLoaded`, `click`, `input`, `change`, `submit`, `reset`, `keydown`, `blur`; jQuery `scroll`, `resize`, `mouseover`. The event object is used (`event.target`, `event.key`, `event.preventDefault()`), with event delegation for buttons created by JavaScript.
 
**Form validation** — plan.html: name (min 3), e-mail format, origin/destination (min 3, must differ), departure not in the past, return after departure, travellers 1–10, budget 300–50,000, purpose required. about.html: name, e-mail, topic, message 20–500 characters. Forms use `novalidate`; messages come from our code, appear under each field, and submission is blocked until fixed. A success message is shown when valid.
 
**jQuery (3.7.1, CDN)**
- Selectors: ID `#main-nav`, class `.back-top`, descendant `#timeline-list .timeline`, attribute `input[type='checkbox']`, element `html, body`
- Traversal: `next()`, `closest()`, `find()`, `siblings()`, `children()`, `parent()`, `filter()`
- Events: `.on("click")`, `.on("submit")`, `.on("change")`, `.on("scroll")`, `.on("mouseover")`
- Effects: `slideToggle`, `slideUp/slideDown`, `fadeIn/fadeOut`, `animate`
## How to test
 
1. **Theme** — click "☾ Dark" in the header; reload: the choice is remembered.
2. **Mobile menu** — narrow the window, click "☰ Menu"; press Esc to close.
3. **Plan a trip** — submit the empty form → red messages. Try a past date, return before departure, 15 travellers, budget 50. Fix them → green success box → "See route options".
4. **Routes** — move the price slider, tick "Direct flights only", change sorting, click "+ Shortlist", change travellers, click "Remove".
5. **Discover** — click categories, type "camden" in search, press Esc; click "♡ Save" and remove from "Saved places".
6. **Timeline** — click a day title, "Expand all / Collapse all", tick "Ready" (progress bar), add an activity (empty text shows an error), remove it.
7. **About** — send an empty contact form, watch the character counter, send a valid one, open the FAQ questions.
8. DevTools → Console: no errors during normal use.
## Run locally
 
Open `index.html` in a browser (internet needed for the Bootstrap and jQuery CDNs). Shortlist, saved places and theme are stored in localStorage only.
 
## Publish
 
GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.
