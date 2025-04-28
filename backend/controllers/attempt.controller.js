import Attempt from '../models/attempt.model.js';
import Question from '../models/question.model.js';

export const submitAttempt = async (req, res) => {
    const { responses } = req.body;
    const examId = req.params.examId;

    let totalScore = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    for (const response of responses) {
        const question = await Question.findById(response.questionId);
        const correct = JSON.stringify(question.correctAnswers.sort()) === JSON.stringify(response.selectedOptions.sort());
        if (correct) {
            totalScore += question.marks;
            correctAnswers++;
        } else {
            totalScore -= question.negativeMarks;
            wrongAnswers++;
        }
    }

    const attempt = await Attempt.create({
        userId: req.user.id,
        examId,
        responses,
        score: totalScore,
        totalQuestions: responses.length,
        correctAnswers,
        wrongAnswers,
        percentage: (correctAnswers / responses.length) * 100,
    });

    res.status(201).json(attempt);
};

export const getUserAttempts = async (req, res) => {
    const attempts = await Attempt.find({ userId: req.user.id }).populate('examId', 'title');
    res.json(attempts);
};

export const getLeaderboard = async (req, res) => {
    const attempts = await Attempt.find({ examId: req.params.examId })
        .sort({ score: -1 })
        .populate('userId', 'name email');
    res.json(attempts);
};
