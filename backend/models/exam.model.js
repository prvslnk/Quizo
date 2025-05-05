import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    examStatus: {
        type: String,
        enum: ['active', 'upcoming', 'completed'],
        default: 'active',
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number, // in minutes
        required: true,
    },
    classFilter: {
        type: String,
        enum: ['V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
        required: true,
    },
    subject: {
        type: String,
        enum: ['Math', 'Science', 'English', 'History', 'Geography'],
        required: true,
    },
    assignedto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    attendees: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            timeTaken: { type: Number }, // Time taken in minutes
            dateTaken: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);
