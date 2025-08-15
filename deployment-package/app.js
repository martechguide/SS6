import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import * as schema from './shared/schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup (optional - will work without DB)
let db = null;
let pool = null;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.log('⚠️ Database connection failed, running without DB:', error.message);
  }
}

// Session setup (if database available)
if (db && pool) {
  const pgStore = connectPg(session);
  app.use(session({
    store: new pgStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
  }));
}

// Basic middleware
app.use(express.json());
app.use(express.static('dist'));
app.use(express.static('dist/public'));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'LearnHereFree Production Server',
    database: db ? 'connected' : 'not connected',
    timestamp: new Date().toISOString()
  });
});

// Admin login route (simple version)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple admin check (replace with database check later)
  if (username === 'admin' && password === 'admin123') {
    if (req.session) {
      req.session.user = { id: 'admin', role: 'admin', email: 'admin@learnherefree.online' };
    }
    res.json({ success: true, user: { id: 'admin', role: 'admin' } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get current user
app.get('/api/auth/user', (req, res) => {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  } else {
    res.json({ success: true });
  }
});

// Batches API (simple version)
app.get('/api/batches', (req, res) => {
  res.json([
    {
      id: 'sample-batch-1',
      title: 'Sample Batch 1',
      description: 'This is a sample batch for testing',
      createdAt: new Date().toISOString()
    }
  ]);
});

// Catch-all route for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 LearnHereFree Production Server running on port ${PORT}`);
  console.log(`🌐 Access at: http://learnherefree.online:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`💾 Database: ${db ? 'Connected' : 'Not connected (running in demo mode)'}`);
});