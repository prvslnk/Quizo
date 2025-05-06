import Attempt from '../models/attempt.model.js';
import Exam from '../models/exam.model.js';
import Question from '../models/question.model.js';

// User: Submit an attempt for an exam
export const submitAttempt = async (req, res) => {
    try {
        const { examId, answers, timeTaken } = req.body;
        const userId = req.user._id;

        // 1. Prevent duplicate attempt
        const existingAttempt = await Attempt.findOne({ examId, userId });
        if (existingAttempt) {
            return res.status(400).json({ message: 'You have already submitted this exam.' });
        }

        // 2. Fetch exam and validate
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        // 3. Check if user is assigned to the exam
        const isAssigned = exam.assignedto.map(id => id.toString()).includes(userId.toString());
        if (!isAssigned) {
            return res.status(403).json({ message: 'You are not assigned to this exam.' });
        }

        // 4. Check exam status and timing
        if (exam.examStatus !== 'active') {
            return res.status(403).json({ message: 'Exam is not active. Submission not allowed.' });
        }

        // const now = new Date();
        // const examEndTime = new Date(exam.startTime.getTime() + exam.duration * 60000);

        // if (now < exam.startTime) {
        //     return res.status(400).json({ message: 'Exam has not started yet.' });
        // }

        // if (now > examEndTime) {
        //     return res.status(400).json({ message: 'Exam time is over.' });
        // }

        // 5. Fetch questions for the exam
        const questions = await Question.find({ examId });
        const totalQuestions = questions.length;

        const answerMap = new Map();
        answers.forEach(ans => answerMap.set(ans.questionId.toString(), ans));

        let correctAnswers = 0;
        let wrongAnswers = 0;
        let score = 0;

        const evaluatedAnswers = [];

        for (const question of questions) {
            const userAnswer = answerMap.get(question._id.toString());
            if (!userAnswer) continue;

            const selected = userAnswer.selectedOptions || [];

            // Convert correct option texts to option IDs
            const correctOptionIds = question.options
                .filter(opt => question.correctAnswers.includes(opt.optionText))
                .map(opt => opt._id.toString())
                .sort();

            const selectedSorted = selected.map(id => id.toString()).sort();

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

        // 6. Save the attempt
        const attempt = new Attempt({
            userId,
            examId,
            responses: evaluatedAnswers,
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            score,
            timeTaken,
        });

        await attempt.save();

        // 7. Record in exam's attendees
        await Exam.findByIdAndUpdate(examId, {
            $push: {
                attendees: {
                    userId,
                    name: req.user.name,
                    timeTaken,
                    dateTaken: new Date(),
                },
            },
        });

        res.status(201).json({ message: 'Attempt submitted successfully', attempt });

    } catch (err) {
        console.error('Submit Attempt Error:', err);
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Duplicate attempt.' });
        }
        res.status(500).json({ message: 'Server error while submitting attempt.' });
    }
};


// Admin: Get all users who attempted for the exam with name, rollNo, score, and time taken in response
export const getAttemptsByExamId = async (req, res) => {
    try {
        const { examId } = req.params;

        // Validate if the exam exists
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        const attempts = await Attempt.find({ examId })
            .populate('userId', 'name rollNo email avatar standard')
            .select('userId score timeTaken');

        if (attempts.length === 0) {
            return res.status(404).json({ message: 'No attempts found for this exam.' });
        }

        const response = attempts.map(attempt => ({
            name: attempt.userId.name,
            rollNo: attempt.userId.rollNo,
            email: attempt.userId.email,
            avatar: attempt.userId.avatar,
            standard: attempt.userId.standard,
            score: attempt.score,
            timeTaken: attempt.timeTaken,
        }));

        res.status(200).json({ examTitle: exam.title, attempts: response });
    } catch (err) {
        console.error('Get Attempts By Exam ID Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Admin: Get all Exams attempted by a specific user

export const getAllAttemptsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const attempts = await Attempt.find({ userId })
            .populate('examId', 'title subject startTime')
            .select('examId timeTaken score');

        if (attempts.length === 0) {
            return res.status(404).json({ message: 'No exams attempted by this user.' });
        }

        const response = attempts.map(attempt => ({
            title: attempt.examId.title,
            subject: attempt.examId.subject,
            startTime: attempt.examId.startTime,
            timeTaken: attempt.timeTaken,
            score: attempt.score,
        }));

        res.status(200).json(response);
    } catch (err) {
        console.error('Error from getAllAttemptByUser:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Admin/User: Get detailed attempt of a user for a specific exam
export const getAttemptDetailByUser = async (req, res) => {
    try {
        const { examId, userId } = req.params;

        // Check if the requesting user is the same as the userId in params or an admin
        if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const attempt = await Attempt.findOne({ examId, userId })
            .populate('userId', 'name email rollNo standard')
            .populate('examId', 'title')
            .populate({
                path: 'responses.questionId',
                select: 'questionText options correctAnswers',
            });

        if (!attempt) {
            return res.status(404).json({ message: 'Attempt not found' });
        }

        const detailedResponses = attempt.responses.map(response => {
            const question = response.questionId;
            return {
                questionText: question.questionText,
                options: question.options,
                correctAnswers: question.correctAnswers,
                selectedOptions: response.selectedOptions,
                isCorrect: response.isCorrect,
                markedForReview: response.markedForReview,
            };
        });

        const detailedAttempt = {
            user: {
                name: attempt.userId.name,
                email: attempt.userId.email,
                rollNo: attempt.userId.rollNo,
                standard: attempt.userId.standard,
            },
            exam: {
                title: attempt.examId.title,
            },
            timeTaken: attempt.timeTaken,
            totalQuestions: attempt.totalQuestions,
            correctAnswers: attempt.correctAnswers,
            wrongAnswers: attempt.wrongAnswers,
            score: attempt.score,
            responses: detailedResponses,
        };

        res.status(200).json(detailedAttempt);
    } catch (err) {
        console.error('Get Attempt Detail Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
