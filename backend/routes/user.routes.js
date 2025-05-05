import express from 'express';
import { getUserProfile, updateUserProfile, updateUserByAdmin, deleteUserByAdmin } from '../controllers/user.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';
import { uploadAvatar } from '../utils/multerConfig.js';

const router = express.Router();

// Admin-only
router.get('/profile', protect, adminOnly, getUserProfile);
router.put('/profile/:id', protect, adminOnly, uploadAvatar.single('avatar'), updateUserByAdmin);
router.delete('/profile/:id', protect, adminOnly, deleteUserByAdmin);

// Self-updation
router.put('/myprofile/:id', protect, uploadAvatar.single('avatar'), updateUserProfile);


export default router;
