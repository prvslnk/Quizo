import Exam from '../models/exam.model.js';

// Create a new exam
export const createExam = async (req, res) => {
    try {
        const exam = new Exam({ ...req.body, assignedto: req.user._id });
        await exam.save();
        res.status(201).json(exam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all exams (admin)
export const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find().populate('assignedto', 'name email');
        res.status(200).json(exams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single exam by ID
export const getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id).populate('assignedto', 'name email');
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        res.status(200).json(exam);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update exam by ID
export const updateExamById = async (req, res) => {
    try {
        const updated = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Exam not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete exam by ID
export const deleteExamById = async (req, res) => {
    try {
        const deleted = await Exam.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Exam not found' });
        res.status(200).json({ message: 'Exam deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get exams assigned to a user
export const getExamsByUserId = async (req, res) => {
    try {
        const exams = await Exam.find({ assignedto: req.params.userId });
        res.status(200).json(exams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get exams attempted by a user
export const getExamsAttemptedByUserId = async (req, res) => {
    try {
        const exams = await Exam.find({ 'attendees.userId': req.params.userId });
        res.status(200).json(exams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
