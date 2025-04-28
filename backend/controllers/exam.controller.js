import Exam from '../models/exam.model.js';

export const createExam = async (req, res) => {
    const { title, description, startTime, endTime, allowedStandards, allowedEmails } = req.body;
    const exam = await Exam.create({
        title,
        description,
        createdBy: req.user.id,
        startTime,
        endTime,
        allowedStandards,
        allowedEmails,
        isActive: true,
    });
    res.status(201).json(exam);
};

export const getAllExams = async (req, res) => {
    const exams = await Exam.find({ isActive: true });
    res.json(exams);
};

export const getExamById = async (req, res) => {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
};
