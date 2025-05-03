import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes
    classFilter: [{ type: String, enum: ['III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'] }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examStatus: { type: String, enum: ['active', 'upcoming', 'finished'], default: 'upcoming' }
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);
