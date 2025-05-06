import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedOptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question.options' }],
    markedForReview: { type: Boolean, default: false },
    isCorrect: { type: Boolean },
}, { _id: false });

const attemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    responses: [responseSchema],
    totalQuestions: { type: Number },
    correctAnswers: { type: Number },
    wrongAnswers: { type: Number },
    score: { type: Number, default: 0 },
    timeTaken: { type: Number }, // in seconds
    submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Prevent duplicate attempts
attemptSchema.index({ userId: 1, examId: 1 }, { unique: true });

export default mongoose.model('Attempt', attemptSchema);
