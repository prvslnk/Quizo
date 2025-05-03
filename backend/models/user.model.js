import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rollNo: { type: String, required: true },
    standard: {
        type: String,
        enum: ['III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', '-'],
        required: true
    },
    avatar: { type: String },
    password: { type: String, required: true }, // hashed
    role: { type: String, default: 'user' },
}, { timestamps: true });


// Compound unique index
userSchema.index({ rollNo: 1, standard: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
