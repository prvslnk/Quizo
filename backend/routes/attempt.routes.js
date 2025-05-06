import express from 'express';
import {
    submitAttempt,
    getAttemptsByExamId,
    getAllAttemptsByUser,
    getAttemptDetailByUser
} from '../controllers/attempt.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

// User: Submit an attempt
router.post('/submit', protect, submitAttempt);

// Admin: Get all users who attempted for an exam
router.get('/exam/:examId', protect, adminOnly, getAttemptsByExamId);

// Admin: Get all Exams attempted by a specific user
router.get('/user/:userId', protect, adminOnly, getAllAttemptsByUser);

// User/Admin: Get detailed attempt of a user
router.get('/user/:userId/exam/:examId', protect, getAttemptDetailByUser);

export default router;
