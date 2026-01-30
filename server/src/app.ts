import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import projectRoutes from './routes/project.routes';
import clientRoutes from './routes/client.routes';
import contactRoutes from './routes/contact.routes';
import newsletterRoutes from './routes/newsletter.routes';
import { errorHandler, notFound } from './middlewares/error.middleware';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files with absolute path
const uploadsPath = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Resolve frontend dist path (prefer local packaged assets, then client-legacy, then client)
const localClientDist = path.join(process.cwd(), 'public-client', 'dist');
const legacyClientDist = path.join(process.cwd(), '../client-legacy/dist');
const altClientDist = path.join(process.cwd(), '../client/dist');
const clientBuildPath =
  [localClientDist, legacyClientDist, altClientDist].find((p) => fs.existsSync(p)) || legacyClientDist;

// Serve images from whichever dist/public exists
const imageCandidates = [
  path.join(localClientDist, 'images'),
  path.join(legacyClientDist, 'images'),
  path.join(altClientDist, 'images'),
  path.join(process.cwd(), '../client-legacy/public/images'),
  path.join(process.cwd(), '../client/public/images'),
];
for (const imgPath of imageCandidates) {
  if (fs.existsSync(imgPath)) {
    app.use('/images', express.static(imgPath));
  }
}

app.use(express.static(clientBuildPath));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
// Alias for subscribers as required by task spec
app.use('/api/subscribers', newsletterRoutes);

// Frontend Routes (SPA/Multi-page support)
app.get('/', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'pages', 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.redirect('/');
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'pages', 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.redirect('/admin');
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
