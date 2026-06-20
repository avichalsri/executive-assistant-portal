# Executive Assistant Allocation Portal

A very simple, single-page static web app for the **Government of Bihar** to allocate
executive assistants to administrative **blocks**.

Each executive has a **Current**, **Previous**, and **Home** block. The **Allocate**
button assigns every executive a new block that is **never** one of those three. The
result can be **printed / exported as a PDF** with official Government of Bihar branding.

## Features

- Add / remove executives with Current, Previous, and Home block dropdowns
- One-click allocation — assigns a block excluding each executive's current/previous/home
- Keeps allocations unique (one executive per block) when enough blocks exist
- Print / Export to PDF with header, emblem, date, and totals
- No login, no database, no build step — pure HTML/CSS/JS

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<you>/executive-assistant-portal.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)**
3. Your portal will be live at `https://<you>.github.io/executive-assistant-portal/`.

## Customising blocks

Edit the list in [`js/blocks.js`](js/blocks.js). The default set is the blocks of
Saharsa district, Bihar — replace them with your own district's blocks.

## Project structure

```
index.html        # single page
css/style.css      # styling + print/PDF rules
js/blocks.js       # editable list of blocks
js/app.js          # add/remove, allocation algorithm, print
```
