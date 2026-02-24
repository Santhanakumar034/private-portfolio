# Santhanakumar V - Dynamic Portfolio

A modern, responsive portfolio website with **visitor tracking and analytics dashboard**. Perfect for showcasing your QA testing expertise on LinkedIn and professional networks.

## Features

✨ **Dynamic Portfolio**
- Responsive design (mobile, tablet, desktop)
- Smooth animations and scrolling
- Modern UI with glassmorphism effects
- Sections: Home, About, Skills, Experience, Projects, Education, Contact

📊 **Visitor Tracking**
- Track every visitor with IP, location, and timestamp
- Geolocation data (country, city)
- User agent tracking
- Real-time visitor count display on footer

🔒 **Admin Analytics Dashboard**
- Password-protected analytics page
- View total & unique visitors
- Breakdown by country
- Recent visitors list with details
- Auto-refresh every 30 seconds

## Setup Instructions

### Prerequisites
- Node.js 14+ and npm installed
- Port 3000 available (or set `PORT` environment variable)

### Local Development

1. **Install dependencies:**
```bash
cd portfolio
npm install
```

2. **Start the server:**
```bash
npm start
```

3. **Open in browser:**
- Portfolio: `http://localhost:3000`
- Analytics: `http://localhost:3000/analytics.html?pass=your_secure_password_here`

### File Structure
```
portfolio/
├── index.html           # Main portfolio page
├── styles.css          # Styling & responsive design
├── script.js           # Frontend logic & animations
├── server.js           # Backend server with tracking
├── package.json        # Dependencies
├── visitors.json       # Visitor data (auto-created)
└── README.md          # This file
```

## Analytics Dashboard

Access the password-protected dashboard:
```
http://localhost:3000/analytics.html?pass=your_secure_password_here
```

Replace `your_secure_password_here` with your chosen password (default in server.js).

### What You Can See
- ✅ Total visitors count
- ✅ Unique visitors (by IP)
- ✅ Visitors by country breakdown
- ✅ Recent visitors with IP, location, timestamp, user agent
- ✅ Live refresh every 30 seconds

## Deployment

### Option 1: GitHub Pages (Frontend Only - No Tracking)
1. Push frontend files to GitHub Pages repo
2. Share link on LinkedIn
3. (No visitor tracking without backend)

### Option 2: Vercel (Full Stack - With Tracking)
1. Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {"src": "server.js", "use": "@vercel/node"}
  ],
  "routes": [
    {"src": "/(.*)", "dest": "server.js"}
  ]
}
```

2. Deploy:
```bash
npm install -g vercel
vercel
```

3. Share deployed URL on LinkedIn

### Option 3: Heroku
```bash
heroku create your-app-name
heroku config:set ADMIN_PASS=secure_password
git push heroku main
```

## Environment Variables

Create a `.env` file or set environment variables:
```bash
PORT=3000
ADMIN_PASS=your_very_secure_password
```

## Security Notes

⚠️ **Important for Production:**
1. Change default `ADMIN_PASS` in `server.js`
2. Use environment variables for sensitive data
3. Consider rate limiting for `/api/visitors` endpoint
4. Encrypt sensitive visitor data if using in production

## Visitor Data Format

Each visitor entry includes:
```json
{
  "ip": "192.168.1.1",
  "country": "IN",
  "city": "Chennai",
  "timestamp": "2025-02-24T10:30:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "hostname": "localhost:3000"
}
```

## Customization

### Change Portfolio Content
Edit `index.html` sections:
- Update hero title/subtitle
- Modify skills, experience, projects
- Add your social links
- Change contact information

### Styling
Edit `styles.css` to:
- Change colors (see `:root` variables)
- Modify layout and spacing
- Adjust fonts and sizes
- Add custom animations

### Analytics Password
In `server.js`, change:
```javascript
const ADMIN_PASSWORD = process.env.ADMIN_PASS || 'change_this_password';
```

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance
- Optimized CSS with CSS Grid/Flexbox
- Smooth animations with CSS transitions
- Lazy loading for visitor tracking
- Lightweight (~50KB with analytics)

## Next Steps for LinkedIn

1. ✅ Build portfolio site locally
2. ✅ Test visitor tracking
3. ✅ Deploy to Vercel/Heroku
4. ✅ Share URL on LinkedIn profile
5. ✅ Monitor analytics dashboard regularly
6. ✅ Highlight "portfolio with visitor analytics" as a skill

## Support & Tips

- Use browser DevTools to monitor network requests
- Check `visitors.json` to see raw visitor data
- Analytics auto-refreshes - no manual refresh needed
- Visitor count persists even after server restart

---

**Created for:** Santhanakumar V  
**Date:** 2025-02-24  
**Purpose:** Professional portfolio showcase with analytics
