import express from 'express';
import { submitAttempt, getUserAttempts, getLeaderboard } from '../controllers/attempt.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Submit Exam Attempt
router.post('/:examId', protect, submitAttempt);

// See Past Attempts
router.get('/user', protect, getUserAttempts);

// Leaderboard for Exam
router.get('/leaderboard/:examId', protect, getLeaderboard);

export default router;
