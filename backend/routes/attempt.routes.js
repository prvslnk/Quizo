import express from 'express';
import { submitAttempt, getAttemptsByExamId, getAllAttemptsByUser, getAttemptDetailByUser } from '../controllers/attempt.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

// USER: Submit an attempt
router.post('/submit', protect, submitAttempt);

// ADMIN: Get all attempts for an exam
router.get('/exam/:examId', protect, adminOnly, getAttemptsByExamId);

// ADMIN: Get all attempts by a user
router.get('/user/:userId', protect, adminOnly, getAllAttemptsByUser);

// USER: Get detailed attempt (user+exam)
router.get('/exam/:examId/user/:userId', protect, getAttemptDetailByUser);

export default router;
