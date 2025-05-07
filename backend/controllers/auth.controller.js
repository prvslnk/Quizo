import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to generate JWT token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' });

export const registerUser = async (req, res) => {
    try {
        const { name, email, rollNo, standard, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Handle the profile picture upload
        const avatar = req.file ? `/uploads/avatars/${req.file.filename}` : '/uploads/avatars/user.png';

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            name,
            email,
            rollNo,
            standard,
            password: hashedPassword,
            avatar,
        });

        // Save the user to the database
        await user.save();

        // Respond with user details and token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user._id),
            rollNo: user.rollNo,
            standard: user.standard,
            role: user.role,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            avatar: user.avatar,
            rollNo: user.rollNo,
            standard: user.standard,
            role: user.role,
        });
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
};

// Get User Profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
