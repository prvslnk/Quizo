import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rollNo: { type: String, required: true },
    standard: { type: String, required: true },
    profilePic: { type: String }, // URL or file path
    password: { type: String, required: true }, // hashed
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
