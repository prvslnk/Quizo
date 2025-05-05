import Question from '../models/question.model.js';
import Exam from '../models/exam.model.js';

// Add a new question to an exam
export const addQuestionToExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        const question = new Question({
            ...req.body,
            examId: req.params.examId,
        });

        await question.save();

        // Fetch the exam title after saving the question
        const populatedQuestion = await Question.findById(question._id).populate('examId', 'title');

        res.status(201).json(populatedQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Admin: Get all questions for an exam by ExamID
export const getQuestionsByExamId = async (req, res) => {
    try {
        const questions = await Question.find({ examId: req.params.examId })
            .populate('examId', 'title')
            .sort({ createdAt: -1 });

        if (!questions.length) return res.status(404).json({ message: 'No questions found for this exam' });
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Modify a question by its ID (Admin view)
export const modifyQuestionById = async (req, res) => {
    try {
        const updated = await Question.findByIdAndUpdate(req.params.questionId, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a question by its ID (Admin view)
export const deleteQuestionById = async (req, res) => {
    try {
        const deleted = await Question.findByIdAndDelete(req.params.questionId);
        if (!deleted) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get questions for an exam for assigned users only (User  view)
export const getQuestionsofExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId);
        if (!exam || !exam.assignedto.includes(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized to access these questions.' });
        }

        const questions = await Question.find({ examId: req.params.examId })
            .populate('examId', 'examTitle');

        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
