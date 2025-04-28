import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const registerUser = async (req, res) => {
    const { name, email, password, rollNo, standard } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword, rollNo, standard });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
};

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
};
