import Exam from '../models/exam.model.js';
import User from '../models/user.model.js';

export const createExam = async (req, res) => {
    try {
        const {
            title,
            description,
            examStatus,
            startTime,
            duration,
            classFilter,
            subject
        } = req.body;


        // Combine users from classFilter and directly assigned user IDs
        const usersInStandard = await User.find({ standard: { $in: classFilter } }).select('_id');
        const assignedUserIdsFromClassFilter = usersInStandard.map(user => user._id);

        // Include directly assigned user IDs from the request body
        const assignedUserIdsFromRequest = req.body.assignedto || [];

        // Merge and remove duplicates
        const assignedUserIds = [...new Set([...assignedUserIdsFromClassFilter, ...assignedUserIdsFromRequest])];

        if (assignedUserIds.length === 0) {
            return res.status(400).json({ message: 'No users found in the selected standard(s) or assignedto.' });
        }

        // Create new exam
        const newExam = new Exam({
            title,
            description,
            examStatus,
            startTime,
            duration,
            classFilter,
            subject,
            assignedto: assignedUserIds
        });

        const savedExam = await newExam.save();
        res.status(201).json(savedExam);
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all exams (admin)
export const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find()
            .populate('assignedto', 'name email')
            .populate('attendees.userId', 'name')
            .exec();  // Execute the query
        res.status(200).json(exams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single exam by ID
export const getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id)
            .populate('assignedto', 'name email')
            .populate('attendees.userId', 'name')
            .exec();

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        res.status(200).json(exam);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update exam by ID
export const updateExamById = async (req, res) => {
    try {
        const examId = req.params.id;
        const {
            title,
            description,
            examStatus,
            startTime,
            duration,
            classFilter,
            subject
        } = req.body;

        const exam = await Exam.findById(examId);

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        // If classFilter is provided and changed, reassign users
        let assignedUserIds = exam.assignedto; // default: keep existing assignments
        if (Array.isArray(classFilter) && classFilter.length > 0) {
            const usersInStandard = await User.find({ standard: { $in: classFilter } }).select('_id');
            assignedUserIds = usersInStandard.map(user => user._id);

            if (assignedUserIds.length === 0) {
                return res.status(400).json({ message: 'No users found in the selected standard(s).' });
            }

            exam.classFilter = classFilter;
        }

        // Update exam fields if provided
        if (title !== undefined) exam.title = title;
        if (description !== undefined) exam.description = description;
        if (examStatus !== undefined) exam.examStatus = examStatus;
        if (startTime !== undefined) exam.startTime = startTime;
        if (duration !== undefined) exam.duration = duration;
        if (subject !== undefined) exam.subject = subject;

        // Update assigned users (only if classFilter was updated)
        exam.assignedto = assignedUserIds;

        const updatedExam = await exam.save();
        res.status(200).json(updatedExam);
    } catch (error) {
        console.error('Error updating exam:', error);
        res.status(500).json({ message: 'Server error' });
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

// Get exams attempted by a user
export const getExamsAttemptedByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find exams where user has attempted (i.e., is listed in attendees)
        const attemptedExams = await Exam.find({ 'attendees.userId': userId });

        res.status(200).json(attemptedExams);
    } catch (error) {
        console.error('Error fetching attempted exams:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
