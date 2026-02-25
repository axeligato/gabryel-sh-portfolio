# Gabryel SH - Photography Portfolio

A professionally designed photography portfolio website with an editorial/archival aesthetic, Instagram integration, and responsive design.

**🌐 Live Site:** [gabryel-sh-portfolio.vercel.app](https://gabryel-sh-portfolio.vercel.app)

---

## 🎨 Design Features

- **Editorial/Archival Aesthetic** - Inspired by vintage photography archives and fashion magazines
- **Raw & Handmade Feel** - Enhanced grain texture, thin lines, bold typography
- **Fully Responsive** - Mobile-first design works on all devices
- **Fast & Lightweight** - No frameworks, pure HTML/CSS/JavaScript
- **Instagram Integration** - Automatically pulls photos from Instagram feed
- **Live Countdown** - Real-time countdown to dream shoot

---

## 📄 Pages

1. **Home** - Randomize view, media grid, questionnaire CTA
2. **Gallery** - Complete Instagram feed with filtering
3. **Contact** - Comprehensive shoot questionnaire form
4. **???** - Mystery countdown page with archival aesthetic
5. **About** - Bio, profile image, gear list

---

## 🚀 Quick Start

### Deploy to Vercel (Recommended - 2 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New → Project**
3. **Import Git Repository:** (paste this repo URL)
4. Click **Deploy**
5. Done! Your site is live

### Local Testing

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/gabryel-sh-portfolio.git
cd gabryel-sh-portfolio

# Simple HTTP server (Python 3)
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

---

## 🛠️ Technology

- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, animations, grain texture
- **JavaScript** - Instagram integration, countdown timer, filtering
- **Fonts** - Playfair Display, Space Mono, Courier Prime
- **Hosting** - Vercel (free, auto-deploy on push)

---

## 📸 Instagram Integration

The site pulls photos directly from your Instagram feed. To set up:

1. **Get Credentials:**
   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Create a Business App
   - Get Business Account ID & Access Token
   - See [INSTAGRAM_SETUP.md](INSTAGRAM_SETUP.md) for detailed guide

2. **Add to Vercel:**
   - Project Settings → Environment Variables
   - Add: `INSTAGRAM_BUSINESS_ACCOUNT_ID`
   - Add: `INSTAGRAM_ACCESS_TOKEN`
   - Redeploy

3. **Watch It Work:**
   - Your Instagram photos automatically appear
   - Updates whenever you post
   - No manual work needed

**Currently using placeholder images** - these update when Instagram credentials are added.

---

## 📝 File Structure

```
gabryel-sh-portfolio/
├── photographer-portfolio.html    Main HTML
├── styles.css                     Design system & responsive
├── script.js                      Functionality & Instagram integration
├── package.json                   NPM configuration
├── vercel.json                    Vercel config
├── .gitignore                     Git ignore rules
└── README.md                      This file
```

---

## 🔄 Workflow

### Edit & Deploy

```bash
# Make your changes locally
# Then commit and push

git add .
git commit -m "Update: describe your change"
git push
```

**Vercel automatically:**
1. Detects the push
2. Builds your site
3. Deploys live
4. All in 1-2 minutes

No manual uploads. No waiting. Just push and done! 🎉

---

## 🎨 Customization

### Change Brand Name
In `photographer-portfolio.html` (line 14):
```html
<a href="#home">Your Name</a>
```

### Change Colors
In `styles.css` (lines 14-22):
```css
--color-bg: #f5f1ed;      /* Background */
--color-text: #1a1a1a;    /* Text */
--color-cream: #f9f7f4;   /* Cards */
```

### Change Countdown Date
In `script.js` (line 342):
```javascript
const targetDate = new Date('YOUR_DATE').getTime();
```

---

## 📚 Documentation

- [GitHub & Vercel Setup](GITHUB_VERCEL_GUIDE.md) - Complete deployment guide
- [Instagram Setup](INSTAGRAM_SETUP.md) - How to connect Instagram
- [Find Credentials](FIND_INSTAGRAM_CREDENTIALS.md) - Where to get Instagram credentials
- [Design Philosophy](DESIGN_PHILOSOPHY.md) - Design decisions explained
- [Design System](DESIGN_SYSTEM.md) - Colors, fonts, specifications
- [Quick Reference](INSTAGRAM_QUICK_SETUP.txt) - Fast setup guide

---

## ✨ Features

✅ **Responsive Design** - Mobile, tablet, desktop
✅ **Fast Loading** - No external dependencies
✅ **Accessible** - WCAG 2.1 AA compliant
✅ **Instagram Integration** - Auto-pull your feed
✅ **Live Countdown** - Real-time timer
✅ **Contact Forms** - Lead generation ready
✅ **Gallery Filtering** - Sort by date/type
✅ **Animations** - Smooth transitions & effects
✅ **Editorial Aesthetic** - Professional, memorable design
✅ **Easy to Customize** - Well-organized code

---

## 🔐 Security

- No sensitive data in repo
- Instagram credentials stored in Vercel environment variables
- Public repository is safe
- Access token never exposed

---

## 📊 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |
| Mobile | ✅ All modern |

---

## 📞 Support

Check these files for help:
- **Setup Issues?** → GITHUB_VERCEL_GUIDE.md
- **Instagram Questions?** → INSTAGRAM_SETUP.md
- **Design Questions?** → DESIGN_PHILOSOPHY.md
- **Customization?** → Check specific file documentation

---

## 📄 License

MIT License - Feel free to fork and use as your own portfolio!

---

## 🙌 Credits

- **Design**: Editorial/archival aesthetic
- **Fonts**: Playfair Display, Space Mono, Courier Prime
- **Hosting**: Vercel
- **Version Control**: GitHub

---

## 🚀 You're Live!

Your portfolio is now deployed and live:
```
https://gabryel-sh-portfolio.vercel.app
```

**Every time you push code:**
```bash
git push
```

**Vercel automatically:**
- Pulls your changes
- Rebuilds your site
- Deploys live
- All in 1-2 minutes

No waiting. No manual work. Just push and done! 📸✨

---

Made with intention and care for photography portfolios.
