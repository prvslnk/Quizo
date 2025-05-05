import Question from '../models/question.model.js';
import Exam from '../models/exam.model.js';

// Add a new question to an exam
export const addQuestionToExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        const question = new Question({ ...req.body, examId: req.params.examId });
        await question.save();
        res.status(201).json(question);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all questions of an exam (admin view)
export const getQuestionsByExamId = async (req, res) => {
    try {
        const questions = await Question.find({ examId: req.params.examId });
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Modify a question by ID
export const modifyQuestionById = async (req, res) => {
    try {
        const updated = await Question.findByIdAndUpdate(req.params.questionId, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a question
export const deleteQuestionById = async (req, res) => {
    try {
        const deleted = await Question.findByIdAndDelete(req.params.questionId);
        if (!deleted) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// User-accessible: Get questions of exam if assigned
export const getQuestionsofExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId);
        if (!exam || !exam.assignedto.equals(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized to access these questions.' });
        }

        const questions = await Question.find({ examId: req.params.examId });
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
