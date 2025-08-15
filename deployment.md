# VPS Deployment Guide for LearnHereFree.online

## Current Website Status
✅ Admin dashboard complete with all features
✅ Ads monetization system ready
✅ Video platform management working
✅ User authentication system functional
✅ All React hooks errors fixed
✅ Ready for production deployment

## Prerequisites
- Node.js 18+ installed on VPS
- PostgreSQL database setup
- Domain name configured (learnherefree.online)
- SSL certificate setup
- PM2 for process management

## Environment Variables Required
```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Session
SESSION_SECRET=your_secure_session_secret

# Server
PORT=5000
NODE_ENV=production
```

## Deployment Steps

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd your-project-folder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
# Edit .env with your production values
```

### 4. Database Setup
```bash
npm run db:push
```

### 5. Build Application
```bash
npm run build
```

### 6. Start with PM2
```bash
# Using ecosystem config file
pm2 start ecosystem.config.js
pm2 startup
pm2 save

# OR simple command
pm2 start npm --name "learnherefree" -- run start
```

## Nginx Configuration
```nginx
server {
    listen 80;
    server_name learnherefree.online www.learnherefree.online;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name learnherefree.online www.learnherefree.online;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/private.key;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Database Migration Commands
```bash
# Push schema changes
npm run db:push

# Generate migration
npm run db:generate

# Reset database (if needed)
npm run db:reset
```

## Monitoring & Maintenance
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs learnherefree

# Restart application
pm2 restart learnherefree

# Stop application
pm2 stop learnherefree
```

## Security Checklist
- [ ] Firewall configured (only ports 22, 80, 443 open)
- [ ] SSL certificate installed and auto-renewal setup
- [ ] Database secured with strong password
- [ ] Environment variables properly set
- [ ] Regular backups configured
- [ ] PM2 process monitoring active
- [ ] Nginx security headers configured