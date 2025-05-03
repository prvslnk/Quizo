import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { uploadAvatar } from '../utils/multerConfig.js';

const router = express.Router();

router.post('/register', uploadAvatar.single('avatar'), registerUser);
router.post('/login', loginUser);

export default router;