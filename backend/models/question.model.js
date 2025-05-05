import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true,
    },
    questionText: {
        type: String,
        required: true,
    },
    questionImage: {
        type: String,
        default: null,
    },
    questionType: {
        type: String,
        enum: ['mcq', 'msq'],
        required: true,
    },
    options: {
        type: [
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
        validate: {
            validator: function (v) {
                return v.length >= 2 && v.length <= 4;
            },
            message: 'Options should be between 2 and 4.',
        },
    },
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