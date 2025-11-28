# Portfolio Deployment Guide

This guide explains how to deploy your portfolio to GitHub Pages, Netlify, and Vercel.

## Prerequisites

- A [GitHub](https://github.com/) account.
- Git installed on your computer.
- Your project code pushed to a GitHub repository.

## 1. Deploying to GitHub Pages

GitHub Pages is the easiest way to host static sites directly from your repository.

1.  **Push your code to GitHub**:
    - Create a new repository on GitHub.
    - Run the following commands in your project folder (if you haven't already):
      ```bash
      git init
      git add .
      git commit -m "Initial commit"
      git branch -M main
      git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
      git push -u origin main
      ```
2.  **Enable GitHub Pages**:
    - Go to your repository on GitHub.
    - Click on **Settings**.
    - Scroll down to the **Pages** section (on the left sidebar).
    - Under **Source**, select `Deploy from a branch`.
    - Under **Branch**, select `main` and `/ (root)`.
    - Click **Save**.
3.  **Visit your site**:
    - After a few minutes, your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

## 2. Deploying to Netlify

Netlify offers a very simple drag-and-drop deployment or Git integration.

### Option A: Drag and Drop (No Git required)
1.  Go to [Netlify Drop](https://app.netlify.com/drop).
2.  Drag your project folder (`kkportfolio`) onto the page.
3.  Netlify will upload and deploy it instantly.

### Option B: Git Integration (Recommended)
1.  Log in to [Netlify](https://www.netlify.com/).
2.  Click **Add new site** > **Import an existing project**.
3.  Select **GitHub**.
4.  Authorize Netlify to access your repositories.
5.  Search for and select your portfolio repository.
6.  **Build Settings**:
    - **Build command**: (Leave empty for this static site)
    - **Publish directory**: (Leave empty or set to `/` or `.`)
7.  Click **Deploy site**.

## 3. Deploying to Vercel

Vercel is another excellent platform for static sites.

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **Add New...** > **Project**.
3.  Select **Continue with GitHub**.
4.  Import your portfolio repository.
5.  **Configure Project**:
    - **Framework Preset**: Other (or just leave as is).
    - **Root Directory**: `./` (default).
6.  Click **Deploy**.

## Important Notes

- **Image Paths**: Ensure all your image paths in `index.html` use forward slashes `/` (e.g., `Assets/myimg.jpg`) instead of backslashes `\`. This has already been fixed in your code.
- **Case Sensitivity**: Linux servers (used by these platforms) are case-sensitive. Ensure your folder name `Assets` matches exactly what is in your code (`src="Assets/..."`).
