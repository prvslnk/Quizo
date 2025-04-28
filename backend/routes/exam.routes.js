import express from 'express';
import { createExam, getAllExams, getExamById } from '../controllers/exam.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Admin Only
router.post('/', protect, adminOnly, createExam);

// Public
router.get('/', protect, getAllExams);
router.get('/:id', protect, getExamById);

export default router;
