# LearnHereFree - Production Deployment Package

## Complete Manual Upload Guide

### Step 1: Clear VPS Directory
```bash
# SSH into your VPS
ssh learnherefree2025@88.222.212.135

# Navigate to htdocs
cd /home/learnherefree2025/htdocs

# Clear all files
rm -rf *
ls -la
```

### Step 2: Upload All Files
Upload these files/folders via CloudPanel File Manager to `/home/learnherefree2025/htdocs/`:

**📁 Required Files & Folders:**
- `package.json` (dependencies)
- `app.js` (main server file)
- `.env` (environment variables)
- `drizzle.config.js` (database config)
- `dist/` (folder - frontend files)
- `shared/` (folder - database schemas)

### Step 3: Install Dependencies
```bash
# In VPS terminal
cd /home/learnherefree2025/htdocs
npm install
```

### Step 4: Setup Database (Optional)
```bash
# If database is available
npm run db:push

# Or skip for demo mode
```

### Step 5: Start Server
```bash
# Start production server
node app.js

# Or with background process
nohup node app.js > server.log 2>&1 &
```

### Step 6: Configure CloudPanel
1. **CloudPanel → Sites → learnherefree.online**
2. **Vhost → Edit**
3. **Add reverse proxy for port 3000**

### Step 7: Access Website
- **Direct Access:** `http://learnherefree.online:3000`
- **With Vhost:** `http://learnherefree.online`

## Default Credentials
- **Admin Login:** admin / admin123
- **Database:** As configured in .env file

## Features Included
✅ Complete Express.js server
✅ React frontend (production build)
✅ Database integration (PostgreSQL)
✅ Session management
✅ Authentication system
✅ Admin dashboard
✅ Health check API
✅ Static file serving
✅ Demo mode (works without database)

## Troubleshooting
- **Port Access:** Ensure CloudPanel firewall allows port 3000
- **Database Issues:** App runs in demo mode if DB not available
- **File Permissions:** Check htdocs folder permissions
- **Logs:** Check `server.log` for errors

## Contact
For support: admin@learnherefree.online