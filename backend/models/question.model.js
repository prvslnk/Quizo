import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    question: { type: String, required: true },
    image: { type: String }, // optional image (URL or path)
    options: [{ type: String, required: true }],
    correctAnswers: [{ type: Number, required: true }], // indexes of correct options
    type: { type: String, enum: ['MCQ', 'MSQ'], required: true }
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
