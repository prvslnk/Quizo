import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/auth.controller.js';
import { uploadAvatar } from '../utils/multerConfig.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', uploadAvatar.single('avatar'), registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

export default router;