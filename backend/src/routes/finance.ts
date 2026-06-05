import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get transactions
router.get('/transactions/:userId', async (req, res) => {
  try {
    const tx = await prisma.transaction.findMany({
      where: { userId: req.params.userId }
    });
    res.json(tx);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Add transaction
router.post('/transactions', async (req, res) => {
  try {
    const tx = await prisma.transaction.create({ data: req.body });
    res.json(tx);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

export default router;
