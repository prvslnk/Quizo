import Question from '../models/question.model.js';

export const addQuestionToExam = async (req, res) => {
    const { questionText, options, correctAnswers, questionType, marks, negativeMarks } = req.body;
    const question = await Question.create({
        examId: req.params.examId,
        questionText,
        options,
        correctAnswers,
        questionType,
        marks,
        negativeMarks,
    });
    res.status(201).json(question);
};

export const getQuestionsByExam = async (req, res) => {
    const questions = await Question.find({ examId: req.params.examId });
    res.json(questions);
};
