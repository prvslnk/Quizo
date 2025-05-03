import express from 'express';
import { uploadAvatar, uploadQuestionImage } from '../utils/multerConfig.js';

const router = express.Router();

router.post('/avatar', uploadAvatar.single('file'), (req, res) => {
    res.json({ filePath: `/uploads/avatars/${req.file.filename}` });
});

router.post('/question-image', uploadQuestionImage.single('file'), (req, res) => {
    res.json({ filePath: `/uploads/exam/questions/${req.file.filename}` });
});

export default router;
