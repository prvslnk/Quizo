import express from 'express';
import {
    addQuestionToExam,
    getQuestionsByExamId,
    modifyQuestionById,
    deleteQuestionById,
    getQuestionsofExam
} from '../controllers/question.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Admin: Add question to exam
router.post('/:examId', protect, adminOnly, addQuestionToExam);

// Admin: Get question by ExamID (include not assigned also)
router.get('/admin/:examId', protect, adminOnly, getQuestionsByExamId);

// Admin: Modify question
router.put('/:questionId', protect, adminOnly, modifyQuestionById);

// Admin: Delete question
router.delete('/:questionId', protect, adminOnly, deleteQuestionById);

// Get questions by exam ID user who ARE ASSIGNED to the exam
// (i.e. not admin for the user who is assigned to the exam)
router.get('/:examId', protect, getQuestionsofExam);

export default router;
