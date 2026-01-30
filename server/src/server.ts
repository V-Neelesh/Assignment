import app from './app';
import connectDB from './config/db';
import { config } from './config/env';
import { seedData } from './utils/seeder';

const listenWithRetry = async (initialPort: number, maxTries = 5): Promise<number> => {
  let port = initialPort;
  for (let i = 0; i < maxTries; i++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const srv = app.listen(port, () => resolve());
        srv.on('error', (err) => reject(err));
      });
      console.log(`✓ Server running on port ${port}`);
      console.log(`✓ Environment: ${config.nodeEnv}`);
      return port;
    } catch (err: any) {
      if (err && err.code === 'EADDRINUSE') {
        console.warn(`⚠ Port ${port} in use, trying ${port + 1}...`);
        port++;
        continue;
      }
      throw err;
    }
  }
  throw new Error(`No available port found starting from ${initialPort}`);
};

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Seed data
    await seedData();

    // Start server
    const port = Number(config.port);
    await listenWithRetry(port);
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
