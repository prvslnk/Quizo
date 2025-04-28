import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }], // array of options
    correctAnswers: [{ type: Number, required: true }], // indexes of correct options
    questionType: { type: String, enum: ['MCQ', 'MSQ'], required: true }, // MCQ = single, MSQ = multiple
    marks: { type: Number, default: 1 },
    negativeMarks: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
