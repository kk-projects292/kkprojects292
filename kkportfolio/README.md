# Portfolio Website

A modern, responsive portfolio website for showcasing projects and skills.

## 🌟 Features

- Responsive design that works on all devices
- Clean and modern UI
- Easy to customize
- Multiple deployment options

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kkportfolio.git
cd kkportfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📦 Deployment

### Option 1: Deploy Build Folder (Recommended)

**Why?** The build folder contains only essential files (~1-5 MB) without `node_modules` (~100+ MB), making it perfect for GitHub's file limits.

1. **Create the build:**
```bash
npm run build
```

2. **Deploy the build folder:**
```bash
# Windows
deploy-build.bat

# Linux/Mac
./deploy-build.sh
```

3. **Or manually:**
```bash
cd build
git init
git add .
git commit -m "Production build"
git remote add origin https://github.com/yourusername/kkportfolio-deploy.git
git push -u origin main
```

See [BUILD_GUIDE.md](./BUILD_GUIDE.md) for detailed instructions.

### Option 2: Deploy Full Project

This project is configured to deploy on multiple platforms. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to:

- **GitHub Pages** - Static hosting
- **Vercel** - Full-stack with Node.js support
- **Netlify** - Static + serverless functions
- **Render** - Full Node.js applications
- **Railway** - Full-stack with database support

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js

## 📁 Project Structure

```
kkportfolio/
├── Assets/              # Images and media files
├── index.html          # Main portfolio page
├── resume.html         # Resume page
├── style.css           # Styles
├── script.js           # Client-side JavaScript
├── server.js           # Express server
├── package.json        # Dependencies
├── vercel.json         # Vercel configuration
├── netlify.toml        # Netlify configuration
└── DEPLOYMENT.md       # Deployment guide
```

## 🎨 Customization

1. **Update Personal Information:**
   - Edit `index.html` to add your details
   - Update `resume.html` with your experience

2. **Add Projects:**
   - Add project images to the `Assets/` folder
   - Update the projects section in `index.html`

3. **Styling:**
   - Modify `style.css` to change colors, fonts, and layout

## 📝 License

ISC

## 👤 Author

Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ by [Your Name]
