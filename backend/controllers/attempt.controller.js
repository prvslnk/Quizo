import Attempt from '../models/attempt.model.js';
import Question from '../models/question.model.js';
import Exam from '../models/exam.model.js';

// User: Submit an attempt for an exam submitAttempt
export const submitAttempt = async (req, res) => {
    try {
        const { examId, answers, timeTaken } = req.body;
        const userId = req.user._id;

        // Prevent duplicate attempts
        const existingAttempt = await Attempt.findOne({ examId, userId });
        if (existingAttempt) {
            return res.status(400).json({ message: 'You have already submitted this exam.' });
        }

        // Check if exam exists and is active
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        if (exam.examStatus !== 'active') {
            return res.status(403).json({ message: 'Exam is not active. Submission not allowed.' });
        }

        // Fetch all questions for the exam
        const questions = await Question.find({ examId });
        const totalQuestions = questions.length;

        let correctAnswers = 0;
        let wrongAnswers = 0;
        let score = 0;

        const answerMap = new Map();
        answers.forEach(ans => answerMap.set(ans.questionId.toString(), ans));

        const evaluatedAnswers = [];

        for (const question of questions) {
            const userAnswer = answerMap.get(question._id.toString());
            if (!userAnswer) continue; // Question was skipped

            const selected = userAnswer.selectedOptions || [];

            // Convert correctAnswers (texts) to matching option IDs
            const correctOptionIds = question.options
                .filter(opt => question.correctAnswers.includes(opt.text))
                .map(opt => opt._id.toString())
                .sort();

            const selectedSorted = [...selected].map(id => id.toString()).sort();

            const isCorrect =
                correctOptionIds.length === selectedSorted.length &&
                correctOptionIds.every((val, idx) => val === selectedSorted[idx]);

            if (isCorrect) {
                correctAnswers++;
                score += question.mark || 1;
            } else {
                wrongAnswers++;
            }

            evaluatedAnswers.push({
                questionId: question._id,
                selectedOptions: selected,
                isCorrect,
                markedForReview: userAnswer.markedForReview || false,
            });
        }

        // Save the attempt
        const attempt = new Attempt({
            userId,
            examId,
            answers: evaluatedAnswers,
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            score,
            timeTaken,
        });

        await attempt.save();

        // Update exam attendees
        await Exam.findByIdAndUpdate(examId, {
            $push: {
                attendees: {
                    userId,
                    timeTaken,
                },
            },
        });

        res.status(201).json({ message: 'Attempt submitted successfully', attempt });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Admin: Get all attempts for a specific exam getAttemptsByExamId
export const getAttemptsByExamId = async (req, res) => {
    try {
        const { examId } = req.params;
        const attempts = await Attempt.find({ examId })
            .populate('userId', 'name email rollNo standard')
            .populate('examId', 'title')
            .select('-__v');
        res.status(200).json(attempts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// Admin: Get all attempts by a specific user getAllAttemptsByUser
export const getAllAttemptsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const attempts = await Attempt.find({ userId })
            .populate('examId', 'title subject startTime duration')
            .select('-__v');
        res.status(200).json(attempts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// User: Get detailed attempt by a user for a specific exam getAttemptDetailByUser

export const getAttemptDetailByUser = async (req, res) => {
    try {
        const { examId, userId } = req.params;
        const attempt = await Attempt.findOne({ examId, userId })
            .populate('userId', 'name email rollNo standard')
            .populate('examId', 'title');

        if (!attempt) {
            return res.status(404).json({ message: 'Attempt not found' });
        }

        res.status(200).json(attempt);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

