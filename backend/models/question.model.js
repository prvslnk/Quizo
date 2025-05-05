import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true,
    },
    questionText: {
        type: String
    },
    questionImage: {
        type: String,
        default: null,
    },
    questionType: {
        type: String,
        enum: ['MCQ', 'MSQ'],
        required: true,
    },
    options: [
        {
            optionText: {
                type: String,
                required: true,
            },
            isCorrect: {
                type: Boolean,
                default: false,
            },
        },
    ],
    correctAnswers: [
        {
            type: String,
            required: true,
        },
    ],
    mark: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);