# Deployment & Testing Guide

## Quick Start - Local Testing (Recommended First)

### 1. Test Local Deployment

```bash
# Navigate to portfolio folder
cd c:\PlayWrightAutomation\portfolio

# Start server
npm start
```

Visit: `http://localhost:3000`
Analytics: `http://localhost:3000/analytics.html?pass=your_secure_password_here`

### 2. Test Visitor Tracking

Open multiple browser windows:
- `http://localhost:3000` (triggers visitor tracking)
- `http://localhost:3000/analytics.html?pass=your_secure_password_here`

Check visitor count increases in real-time.

---

## Deployment to Vercel (Recommended ⭐)

### Prerequisites
- Vercel account (free at vercel.com)
- Git repository with portfolio code
- Node.js 16+ installed locally

### Step 1: Create Git Repository

```bash
cd c:\PlayWrightAutomation\portfolio

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial portfolio deployment"
```

### Step 2: Push to GitHub

1. Create new repo on GitHub
2. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to **https://vercel.com/new**
2. Select "Import Git Repository"
3. Enter your GitHub repo URL
4. Set Environment Variables:
   - `ADMIN_PASS`: Your chosen analytics password
5. Click "Deploy"

### Step 4: Configure Vercel for Serverless

vercel.json is already configured. Verify in project settings:
- **Build Command**: `npm run build` (or leave blank)
- **Output Directory**: `./`
- **Node Version**: 18.x or 20.x

### Step 5: Test Live Deployment

After deployment completes:

1. **Test Portfolio**:
   ```
   https://YOUR_PROJECT.vercel.app
   ```

2. **Test Analytics Dashboard**:
   ```
   https://YOUR_PROJECT.vercel.app/analytics.html?pass=YOUR_ADMIN_PASS
   ```

3. **Test Visitor Tracking**:
   - Open portfolio in multiple incognito windows
   - Visit analytics dashboard
   - Verify visitor count increases

---

## Deployment to Heroku

### Step 1: Install Heroku CLI
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Deploy

```bash
cd c:\PlayWrightAutomation\portfolio
heroku create YOUR_APP_NAME
heroku config:set ADMIN_PASS="your_secure_password"
git push heroku main
```

### Step 3: Test

```
https://YOUR_APP_NAME.herokuapp.com
https://YOUR_APP_NAME.herokuapp.com/analytics.html?pass=your_secure_password
```

---

## GitHub Pages Deployment (Static Frontend Only)

This deploys only the frontend without visitor tracking.

```bash
cd c:\PlayWrightAutomation\portfolio

# Create gh-pages branch
git checkout -b gh-pages

# Remove server files
rm server.js package.json package-lock.json

# Push to GitHub Pages
git push origin gh-pages
```

Visit: `https://YOUR_USERNAME.github.io/portfolio`

---

## Testing Checklist

- [ ] Portfolio loads at deployment URL
- [ ] All sections visible (hero, about, skills, experience, projects, education, contact)
- [ ] Navigation links work
- [ ] Responsive design works on mobile/tablet
- [ ] Visitor tracking API responds (check Network tab in DevTools)
- [ ] Analytics dashboard accessible with password
- [ ] Visitor count increases when visiting portfolio from different IPs
- [ ] Geolocation data shows in analytics (country, city)
- [ ] Auto-refresh works on analytics dashboard

---

## Post-Deployment: LinkedIn Integration

1. Add portfolio URL to LinkedIn Profile:
   - Edit Profile → Add "Website" link
   - Use: `https://YOUR_PROJECT.vercel.app`

2. Create LinkedIn Post:
   ```
   🚀 Excited to share my new interactive QA portfolio!
   
   Features:
   ✅ Real-time visitor analytics dashboard
   ✅ Detailed testing experience & methodologies
   ✅ Portfolio with geolocation tracking
   
   Check it out and let me know what you think!
   [Link to portfolio]
   
   #QA #Testing #Portfolio #ManualTesting
   ```

3. Monitor Analytics:
   - Visit `/analytics.html` to see visitor insights
   - Track which sections get most attention
   - Use data to optimize portfolio content

---

## Troubleshooting

### Deployment fails
- Check Node version requirements (16+)
- Verify package.json exists
- Check file permissions

### Visitor tracking not working
- Check browser console for errors
- Verify `/api/visitors` endpoint is accessible
- Check analytics password is correct

### Analytics dashboard blank
- Clear browser cache
- Try incognito window
- Check admin password in URL

### CORS errors
- Verify CORS middleware in server.js
- Check API endpoint is on same domain

---

## Security Notes

### Production Security

1. **Change Admin Password**:
   - Set environment variable `ADMIN_PASS` to strong password
   - Don't share in public repositories

2. **API Protection**:
   - Consider rate limiting on `/api/visitors`
   - Add request validation

3. **Data Privacy**:
   - Review geolocation data collection
   - Consider GDPR compliance if tracking EU visitors

### Example Vercel Environment Setup
```
ADMIN_PASS=Your_SuperSecure_Password_123!
```

---

## Performance Monitoring

### Vercel Analytics
- Dashboard.vercel.com shows:
  - Page load times
  - Core Web Vitals
  - Error tracking

### Custom Analytics
- Check `/analytics.html` for:
  - Visitor count
  - Geographic distribution
  - Recent visitor timestamps
  - User agents

