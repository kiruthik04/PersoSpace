import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all workouts for a user
router.get('/workouts/:userId', async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: { userId: req.params.userId },
      include: { exercises: true }
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Create a workout with exercises
router.post('/workouts', async (req, res) => {
  const { userId, type, duration, notes, exercises } = req.body;
  try {
    const workout = await prisma.workout.create({
      data: {
        userId,
        type,
        duration,
        notes,
        exercises: {
          create: exercises
        }
      },
      include: { exercises: true }
    });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// Create a diet log
router.post('/diet', async (req, res) => {
  try {
    const log = await prisma.dietLog.create({ data: req.body });
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to log diet' });
  }
});

export default router;
