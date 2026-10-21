# City Schools Division of Carmona (DepEd SDO Carmona) - Enhanced Web Portal

A modernized, high-performance, plugin-free web portal clone of [depedcarmona.edu.ph](https://depedcarmona.edu.ph) conforming to the Philippine Government Web Design Standard (GWDS 2.0).

---

## 🌟 Key Features

- **Default / Plugin-Free Architecture**: Engineered purely with HTML5, modern Vanilla CSS, and lightweight Vanilla JavaScript. No heavy WordPress plugins, external sliders, or bloated frameworks.
- **Philippine Standard Time (PST)**: Live synchronized clock (UTC+8 / DOST-PAGASA format).
- **Native Hero Announcement Carousel**: Hardware-accelerated auto-playing slider with pause-on-hover and touch swipe support.
- **Interactive Issuances & Memorandum Hub**: Real-time instant search and category filters (Division Memoranda, Advisories, Notices of Meeting) with document view/download modal.
- **Online Document Tracking System (DTS)**: Real-time interactive document status and routing history simulator.
- **Full WCAG 2.1 Accessibility Suite**: One-click high-contrast mode, dynamic font resizer (`A-`, `A`, `A+`), dyslexia-friendly typography toggle, and accessibility statement modal.
- **Client Satisfaction Measurement (CSM)**: Built-in 5-star rating survey with service categorization and official SDO Carmona QR code.
- **Enterprise Portals Fast-Track**: Direct links to LIS, BEIS, LRMS, Transparency Seal (NBC 542), and Citizen's Charter.

---

## 🚀 Live Deployment to Vercel via GitHub

Because this project is built as a pure, lightweight static web application, it is **100% compatible with Vercel and GitHub** with zero build configuration required.

### Step 1: Create a Repository on GitHub

1. Go to [GitHub.com](https://github.com) and log in.
2. Click **New Repository** (or visit [github.com/new](https://github.com/new)).
3. Name your repository (e.g., `deped-carmona-portal`).
4. Set the repository visibility to **Public** (or **Private**).
5. Click **Create repository**.

### Step 2: Push Files to GitHub

If you have `git` installed on your machine:

```bash
cd /home/lyrch/Documents/depedacarmona
git init
git add .
git commit -m "Initial commit: Enhanced DepEd Carmona City portal"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/deped-carmona-portal.git
git push -u origin main
```

*(Alternatively, you can click **"uploading an existing file"** directly on the GitHub repository page and drag-and-drop the files and `assets` folder).*

### Step 3: Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com) and sign in (you can sign in with your GitHub account).
2. Click **"Add New..."** in the top-right corner, then select **"Project"**.
3. Under **"Import Git Repository"**, find and select your `deped-carmona-portal` repository.
4. Keep the default settings:
   - **Framework Preset**: *Other* (Static HTML)
   - **Root Directory**: `./`
   - **Build Command**: *(leave empty)*
   - **Output Directory**: *(leave empty)*
5. Click **"Deploy"**.

Within **5 to 10 seconds**, your website will be live with a free SSL certificate at:
```
https://deped-carmona-portal.vercel.app
```

Every time you commit changes to your GitHub repository, Vercel will automatically re-deploy your updates instantly!

---

## 🌐 Alternative: Deploy with GitHub Pages

You can also host this directly on GitHub for free:
1. In your GitHub repository, click **Settings**.
2. Go to **Pages** in the left sidebar.
3. Under **Build and deployment > Source**, select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)` folder, then click **Save**.
5. Your site will be live at: `https://<YOUR-USERNAME>.github.io/deped-carmona-portal/`

---

## 💻 Local Development

To run the portal locally using Python:

```bash
python3 -m http.server 8080
```

Open your browser and navigate to:
```
http://localhost:8080/
```
