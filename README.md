# Morrow

Morrow is a static, mobile-first teen mental wellbeing website. It offers educational topic guides, a private five-question self-check, general suggestions, and a 60 Second Reset breathing tool.

## Project structure

- `index.html`: homepage, purpose, workflow, privacy, support and verified statistics
- `learn.html`: five expandable wellbeing topic guides and support section
- `self-check.html`: one-question-at-a-time reflection tool, results and breathing tool
- `styles.css`: responsive visual system, components, focus states and reduced-motion rules
- `script.js`: mobile navigation, in-memory quiz logic, personalized suggestions and breathing timer
- `PROJECT-BRIEF.txt`: original project requirements

## Run locally

No build step or dependencies are required. Open `index.html` directly in a browser, or serve the folder with any static server, for example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Publish with a GitHub Pages domain

You can publish this website for free at a GitHub Pages address such as `https://your-username.github.io/morrow/`.

### Option A: Upload the ZIP in your browser

1. Sign in to [GitHub](https://github.com/) and select **New repository**.
2. Give the repository a short name, such as `morrow`, and choose **Public** if you want anybody to view or download it.
3. Create the repository without changing the website files.
4. Open the new repository, choose **Add file**, then **Upload files**.
5. Upload the contents of the ZIP, not the ZIP file itself. `index.html` must be visible in the top level of the repository.
6. Choose **Commit changes**.
7. Open **Settings**, then **Pages**.
8. Under **Build and deployment**, choose **Deploy from a branch**.
9. Select the `main` branch and the `/ (root)` folder, then choose **Save**.
10. Wait a few minutes. GitHub will show the website address in the Pages section.

The final address normally looks like:

```text
https://your-username.github.io/repository-name/
```

### Option B: Upload with Git

After creating an empty GitHub repository, run these commands from this folder:

```sh
git init
git add index.html learn.html self-check.html styles.css script.js README.md PROJECT-BRIEF.txt
git commit -m "Publish Morrow website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Then enable **Settings > Pages > Deploy from a branch**, select `main` and `/ (root)`, and save.

### Important upload detail

Keep `index.html`, `learn.html`, `self-check.html`, `styles.css`, and `script.js` together in the repository's top level. Do not put them inside an extra nested folder, or the GitHub Pages links may not work correctly.

The ZIP can also be extracted and uploaded to another static host. No server, database, build process or package installation is needed.

## Before publishing

The statistics and source links in the homepage numbers section and Learn page source notes have been checked against the linked WHO, WHO Bangladesh, DGHS, and PLOS ONE pages. Bangladesh context is clearly labelled: the Dhaka adolescent study is not nationally representative, and the official 16263, 999, and 333 services are general services rather than dedicated teen mental-health crisis lines. Do not add identifying data collection or unverified helpline details.

The self-check stores responses only in JavaScript memory. It does not use accounts, browser persistence, network requests, analytics or external APIs. It is educational and reflective, not diagnostic or a substitute for professional care.
