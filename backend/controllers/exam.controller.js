import Exam from '../models/exam.model.js';

export const createExam = async (req, res) => {
    const { title, description, startTime, endTime, duration, classFilter, examStatus } = req.body;
    try {
        const exam = await Exam.create({
            title,
            description,
            createdBy: req.user.id,
            startTime,
            duration,
            classFilter,  // match field name with schema
            examStatus,
        });
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ message: 'Error creating exam', error });
    }
};

export const getAllExams = async (req, res) => {
    const exams = await Exam.find({ examStatus: 'active' });  // changed to 'examStatus'
    res.json(exams);
};

export const getExamById = async (req, res) => {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
};
