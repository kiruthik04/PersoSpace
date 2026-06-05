import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Log app usage
router.post('/app-usage', async (req, res) => {
  try {
    const log = await prisma.appUsageLog.create({ data: req.body });
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to log app usage' });
  }
});

export default router;
