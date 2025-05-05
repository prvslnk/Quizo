import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    responses: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        selectedOptions: [{ type: Number }],
        markedForReview: { type: Boolean, default: false },
    }],
    totalQuestions: { type: Number },
    correctAnswers: { type: Number },
    wrongAnswers: { type: Number },
    score: { type: Number, default: 0 }, // total score after evaluation
    timeTaken: { type: Number },
    submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Attempt', attemptSchema);
