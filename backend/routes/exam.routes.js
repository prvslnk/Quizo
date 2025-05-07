import express from 'express';
import {
    createExam,
    getAllExams,
    getExamById,
    updateExamById,
    deleteExamById,
    getExamsAttemptedByUserId
} from '../controllers/exam.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Admin: Create an exam
router.post('/', protect, adminOnly, createExam);

// Admin: Get all exams
router.get('/', protect, adminOnly, getAllExams);

// User: Get exams by ID (public)
router.get('/:id', protect, getExamById);

// Admin: Update an exam
router.put('/:id', protect, adminOnly, updateExamById);

// Admin: Delete an exam
router.delete('/:id', protect, adminOnly, deleteExamById);

// User: Get Exams attempted by a user
router.get('/attempts/:userId', protect, getExamsAttemptedByUserId);

export default router;
