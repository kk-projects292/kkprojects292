# Deployment Guide

This portfolio website can be deployed on multiple platforms. Choose the one that best fits your needs.

## 📋 Prerequisites

- Git installed on your machine
- A GitHub account (for all deployment methods)
- Your code pushed to a GitHub repository

---

## 🚀 Deployment Options

### 1. GitHub Pages (Static Hosting - Free)

**Best for:** Simple static sites without backend functionality

#### Steps:
1. Push your code to a GitHub repository
2. Go to your repository on GitHub
3. Click on **Settings** → **Pages**
4. Under **Source**, select the branch you want to deploy (usually `main` or `master`)
5. Click **Save**
6. Your site will be available at: `https://yourusername.github.io/repository-name/`

#### Notes:
- GitHub Pages only supports static files (HTML, CSS, JS)
- The `.nojekyll` file is included to prevent Jekyll processing
- Server.js won't run on GitHub Pages (static only)

---

### 2. Vercel (Full-Stack - Free Tier Available)

**Best for:** Full-stack applications with Node.js backend

#### Steps:
1. Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click **Deploy**
6. Your site will be live at: `https://your-project-name.vercel.app`

#### Configuration:
- `vercel.json` is already configured
- Supports Node.js backend (server.js will work)
- Automatic HTTPS and CDN

#### Custom Domain (Optional):
1. Go to your project settings on Vercel
2. Navigate to **Domains**
3. Add your custom domain and follow DNS instructions

---

### 3. Netlify (Full-Stack - Free Tier Available)

**Best for:** Static sites with serverless functions

#### Steps:

**Option A: Deploy via Git**
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to your GitHub repository
4. Netlify will auto-detect settings from `netlify.toml`
5. Click **Deploy**
6. Your site will be live at: `https://your-site-name.netlify.app`

**Option B: Deploy via Drag & Drop**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder (excluding node_modules)
3. Your site will be deployed instantly

#### Configuration:
- `netlify.toml` is already configured
- For backend functionality, you'll need to convert to Netlify Functions
- Automatic HTTPS and CDN

#### Custom Domain (Optional):
1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Follow the DNS configuration instructions

---

### 4. Render (Full-Stack - Free Tier Available)

**Best for:** Full Node.js applications with persistent backend

#### Steps:
1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **Create Web Service**
6. Your site will be live at: `https://your-service-name.onrender.com`

---

### 5. Railway (Full-Stack - Free Trial)

**Best for:** Full Node.js applications with database support

#### Steps:
1. Go to [railway.app](https://railway.app) and sign up/login
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect Node.js and deploy
5. Your site will be live at the provided Railway URL

---

## 🔧 Environment Variables

If you add environment variables in the future:

- **Vercel:** Project Settings → Environment Variables
- **Netlify:** Site Settings → Build & Deploy → Environment
- **Render:** Environment → Environment Variables
- **Railway:** Variables tab in your project

---

## 📝 Quick Comparison

| Platform | Backend Support | Free Tier | Custom Domain | Best For |
|----------|----------------|-----------|---------------|----------|
| **GitHub Pages** | ❌ No | ✅ Yes | ✅ Yes | Static sites |
| **Vercel** | ✅ Yes | ✅ Yes | ✅ Yes | Next.js, Node.js |
| **Netlify** | ⚠️ Functions | ✅ Yes | ✅ Yes | Static + JAMstack |
| **Render** | ✅ Yes | ✅ Yes | ✅ Yes | Full-stack apps |
| **Railway** | ✅ Yes | ⚠️ Trial | ✅ Yes | Apps with databases |

---

## 🎯 Recommended Platform

For your portfolio website:
- **If static only:** GitHub Pages (simplest, free)
- **If you need backend:** Vercel (best developer experience)
- **If you want flexibility:** Netlify (great for static + functions)

---

## 🐛 Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version compatibility
- Check build logs for specific errors

### Site Not Loading
- Verify the build completed successfully
- Check that `index.html` is in the root directory
- Review deployment logs

### 404 Errors
- For SPAs, ensure redirects are configured
- Check file paths are correct (case-sensitive on Linux servers)

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **GitHub Pages Docs:** https://docs.github.com/pages
- **Render Docs:** https://render.com/docs
- **Railway Docs:** https://docs.railway.app

---

**Happy Deploying! 🚀**
