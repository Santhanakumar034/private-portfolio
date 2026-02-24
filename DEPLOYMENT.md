# Deployment Guide - Santhanakumar Portfolio

Your portfolio with visitor tracking is ready to deploy! Choose one of the following options:

---

## ✅ Local Testing Summary

**Status:** Working Perfectly  
- Portfolio: http://localhost:3000 ✅
- Analytics: http://localhost:3000/analytics.html?pass=your_secure_password_here ✅
- Visitors Tracked: 8+
- Visitor Data: Being stored in `visitors.json`

---

## Option 1: Deploy to Vercel (Recommended ⭐)

Vercel is best for full-stack Node.js apps with persistent storage.

### Prerequisites
- Vercel account (free at https://vercel.com)
- Git installed

### Steps

1. **Create `vercel.json` in root of portfolio folder:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

2. **Initialize Git and push to GitHub** (Vercel integrates with GitHub):
```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

3. **Deploy via Vercel:**
```bash
npm install -g vercel
vercel
# Follow prompts, select your GitHub repo
# Set environment variable: ADMIN_PASS=your_secure_password
```

4. **Share your live URL:**
- Portfolio: `https://your-portfolio.vercel.app`
- Analytics: `https://your-portfolio.vercel.app/analytics.html?pass=your_secure_password`

---

## Option 2: Deploy to Heroku

### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed

### Steps

1. **Create `Procfile` in portfolio folder:**
```
web: node server.js
```

2. **Login and deploy:**
```bash
cd portfolio
heroku login
heroku create your-portfolio-app
heroku config:set ADMIN_PASS=your_secure_password
git push heroku main
```

3. **Your portfolio is live at:**
- `https://your-portfolio-app.herokuapp.com`
- Analytics: `https://your-portfolio-app.herokuapp.com/analytics.html?pass=your_secure_password`

---

## Option 3: Deploy Frontend to GitHub Pages + Backend to Vercel

If you want static hosting for frontend and serverless for backend:

### Frontend (GitHub Pages)

1. Create `docs/` folder with `index.html`, `styles.css`, `script.js`
2. Push to GitHub
3. Enable GitHub Pages in repo settings

### Backend (Vercel)

Deploy only `server.js` to Vercel (see Option 1)

---

## 📊 Visitor Tracking After Deployment

### How it works:
1. When users visit your portfolio, their IP, location, and timestamp are tracked
2. Data is stored on the server (in `visitors.json`)
3. Access analytics dashboard to see visitor details

### Analytics Dashboard
Navigate to: `https://your-deployed-url/analytics.html?pass=YOUR_PASSWORD`

**Shows:**
- Total visitors count
- Unique visitors (by IP)
- Breakdown by country
- Recent visitors list with IP, location, timestamp, user agent

---

## 🔒 Important Security Notes

1. **Change admin password before deploying!**
   - In `server.js`, line: `const ADMIN_PASSWORD = process.env.ADMIN_PASS || 'change_this_password';`
   - Use environment variables in production (never hardcode)

2. **Set environment variable on your hosting:**
   - Vercel: Project Settings → Environment Variables → Add `ADMIN_PASS`
   - Heroku: `heroku config:set ADMIN_PASS=your_secure_password`

3. **Visitor data persistence:**
   - Vercel: Data persists in `/tmp` (ephemeral) - consider upgrading to KV database
   - Heroku: Data persists on dyno filesystem
   - Production: Use PostgreSQL/MongoDB for permanent storage

---

## 📱 Share on LinkedIn

1. Copy your deployed URL
2. Add to LinkedIn profile:
   - **Website:** https://your-portfolio-app.herokuapp.com
   - **About:** "Interactive portfolio with live visitor analytics tracking"

3. Mention in posts:
   - "Check out my new portfolio with real-time visitor tracking! Built with Node.js, Express, and analytics dashboard. [link]"

---

## 📈 Monitor Visitor Analytics

- Dashboard updates every 30 seconds
- View visitor countries, IPs, timestamps, and user agents
- Track portfolio views over time
- Measure LinkedIn/networking impact

---

## Troubleshooting

### Visitors not tracking?
- Check if `/api/visitors` endpoint is receiving POST requests
- Verify browser console for errors
- Check server logs

### Analytics not loading?
- Verify correct admin password
- Check network tab in browser DevTools
- Ensure server is running

### Port conflicts?
```bash
# Change PORT in .env or use:
PORT=3001 npm start
```

---

## Next Steps

1. ✅ Choose deployment option
2. ✅ Deploy portfolio
3. ✅ Test visitor tracking
4. ✅ Share URL on LinkedIn
5. ✅ Monitor analytics dashboard
6. ✅ Update portfolio as needed

---

**Questions or issues?** Check the README.md or review the code in:
- `server.js` - Backend tracking logic
- `script.js` - Frontend visitor tracking call
- `analytics.html` route - Dashboard implementation
