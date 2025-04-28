import express from 'express';
import { addQuestionToExam, getQuestionsByExam } from '../controllers/question.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Admin Only
router.post('/:examId', protect, adminOnly, addQuestionToExam);

// Public
router.get('/:examId', protect, getQuestionsByExam);

export default router;
