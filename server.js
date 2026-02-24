const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const geoip = require('geoip-lite');

const app = express();
const PORT = process.env.PORT || 3000;
const VISITORS_FILE = path.join(__dirname, 'visitors.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASS || 'your_secure_password_here'; // Change in production!

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize visitors file
function initializeVisitors() {
    if (!fs.existsSync(VISITORS_FILE)) {
        fs.writeFileSync(VISITORS_FILE, JSON.stringify({ visitors: [] }, null, 2));
    }
}

// Get visitors data
function getVisitors() {
    try {
        const data = fs.readFileSync(VISITORS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { visitors: [] };
    }
}

// Save visitors data
function saveVisitors(data) {
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(data, null, 2));
}

// Track visitor
app.post('/api/visitors', (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const geo = geoip.lookup(ip);
        
        const visitor = {
            ip: ip.split(',')[0],
            country: geo ? geo.country : 'Unknown',
            city: geo ? geo.city : 'Unknown',
            timestamp: new Date().toISOString(),
            userAgent: userAgent,
            hostname: req.hostname
        };

        const data = getVisitors();
        data.visitors.push(visitor);
        saveVisitors(data);

        res.json({
            status: 'tracked',
            totalVisitors: data.visitors.length,
            latestVisitor: visitor
        });
    } catch (error) {
        console.error('Error tracking visitor:', error);
        res.status(500).json({ error: 'Failed to track visitor' });
    }
});

// Get analytics (password protected)
app.get('/api/analytics', (req, res) => {
    const password = req.query.pass;
    
    if (password !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    try {
        const data = getVisitors();
        const uniqueIPs = new Set(data.visitors.map(v => v.ip));
        const countries = {};
        
        data.visitors.forEach(v => {
            countries[v.country] = (countries[v.country] || 0) + 1;
        });

        res.json({
            totalVisitors: data.visitors.length,
            uniqueVisitors: uniqueIPs.size,
            countrieBreakdown: countries,
            recentVisitors: data.visitors.slice(-10).reverse(),
            allVisitors: data.visitors
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

// Get visitor count only
app.get('/api/visitors/count', (req, res) => {
    try {
        const data = getVisitors();
        res.json({ totalVisitors: data.visitors.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get visitor count' });
    }
});

// Analytics dashboard
app.get('/analytics.html', (req, res) => {
    const password = req.query.pass;
    if (password !== ADMIN_PASSWORD) {
        return res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Analytics - Access Denied</title>
                <style>
                    body { font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0; }
                    .container { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); width: 300px; }
                    h1 { color: #e74c3c; margin-bottom: 1rem; }
                    form { display: flex; flex-direction: column; gap: 1rem; }
                    input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px; }
                    button { padding: 0.75rem; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
                    button:hover { background: #2980b9; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🔒 Admin Access</h1>
                    <form method="get">
                        <label>Enter Password:</label>
                        <input type="password" name="pass" required>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </body>
            </html>
        `);
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Portfolio Analytics Dashboard</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, sans-serif; background: #f5f5f5; padding: 2rem; }
                .container { max-width: 1200px; margin: 0 auto; }
                h1 { color: #2563eb; margin-bottom: 2rem; text-align: center; }
                .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem; }
                .stat-card { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .stat-card h3 { color: #666; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 1rem; }
                .stat-card .number { font-size: 2.5rem; font-weight: bold; color: #2563eb; }
                .visitors-table { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow-x: auto; }
                .visitors-table h2 { color: #2563eb; margin-bottom: 1rem; }
                table { width: 100%; border-collapse: collapse; }
                th { background: #f0f0f0; padding: 1rem; text-align: left; font-weight: 600; color: #333; }
                td { padding: 1rem; border-bottom: 1px solid #eee; }
                tr:hover { background: #f9f9f9; }
                .badge { display: inline-block; background: #2563eb; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem; }
                .refresh-btn { background: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
                .refresh-btn:hover { background: #1e40af; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📊 Portfolio Analytics Dashboard</h1>
                
                <div class="stats">
                    <div class="stat-card">
                        <h3>Total Visitors</h3>
                        <div class="number" id="total">0</div>
                    </div>
                    <div class="stat-card">
                        <h3>Unique Visitors</h3>
                        <div class="number" id="unique">0</div>
                    </div>
                    <div class="stat-card">
                        <h3>Countries</h3>
                        <div class="number" id="countries">0</div>
                    </div>
                </div>

                <div class="visitors-table">
                    <h2>Recent Visitors</h2>
                    <button class="refresh-btn" onclick="loadAnalytics()">🔄 Refresh</button>
                    <table id="visitors-table">
                        <thead>
                            <tr>
                                <th>IP Address</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>Time</th>
                                <th>User Agent</th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            <tr><td colspan="5" style="text-align: center;">Loading...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <script>
                function loadAnalytics() {
                    fetch('/api/analytics?pass=${password}')
                        .then(r => r.json())
                        .then(data => {
                            document.getElementById('total').textContent = data.totalVisitors;
                            document.getElementById('unique').textContent = data.uniqueVisitors;
                            document.getElementById('countries').textContent = Object.keys(data.countrieBreakdown).length;
                            
                            const tbody = document.getElementById('table-body');
                            tbody.innerHTML = data.recentVisitors.map(v => \`
                                <tr>
                                    <td><code>\${v.ip}</code></td>
                                    <td><span class="badge">\${v.country}</span></td>
                                    <td>\${v.city || 'Unknown'}</td>
                                    <td>\${new Date(v.timestamp).toLocaleString()}</td>
                                    <td style="font-size: 0.85rem; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">\${v.userAgent}</td>
                                </tr>
                            \`).join('');
                        })
                        .catch(err => alert('Failed to load analytics: ' + err));
                }

                loadAnalytics();
                setInterval(loadAnalytics, 30000); // Refresh every 30 seconds
            </script>
        </body>
        </html>
    `);
});

initializeVisitors();

// Local development
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════╗
║  Portfolio Tracker Server Running      ║
╠════════════════════════════════════════╣
║  Local:   http://localhost:${PORT}        
║  Frontend: http://localhost:${PORT}/index.html
║  Analytics: http://localhost:${PORT}/analytics.html?pass=${ADMIN_PASSWORD}
╚════════════════════════════════════════╝
        `);
    });
}

// Export for Vercel/serverless
module.exports = app;
