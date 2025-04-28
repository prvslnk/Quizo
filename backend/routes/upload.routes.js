import express from 'express';
import { upload, uploadSingleFile } from '../controllers/upload.controller.js';

const router = express.Router();

// Upload single file (field name = "file")
router.post('/', upload.single('file'), uploadSingleFile);

export default router;
