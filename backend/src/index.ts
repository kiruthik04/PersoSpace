import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

import healthRoutes from './routes/health';
import academicRoutes from './routes/academic';
import financeRoutes from './routes/finance';
import wellbeingRoutes from './routes/wellbeing';

// Basic health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/health', healthRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/wellbeing', wellbeingRoutes);

import { startKeepAlive } from './keepAlive';

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startKeepAlive();
});
