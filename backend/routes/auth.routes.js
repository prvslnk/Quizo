import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Route
router.get('/profile', protect, getUserProfile);

export default router;
