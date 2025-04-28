import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin
    startTime: { type: Date },
    endTime: { type: Date },
    isActive: { type: Boolean, default: false },
    allowedStandards: [{ type: String }], // Class wise exam allowed
    allowedEmails: [{ type: String }], // Optional: selected emails
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);
