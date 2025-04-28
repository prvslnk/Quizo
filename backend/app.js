import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import examRoutes from './routes/exam.routes.js';
import questionRoutes from './routes/question.routes.js';
import attemptRoutes from './routes/attempt.routes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploads
const __dirnamePath = path.resolve();
app.use('/uploads', express.static(path.join(__dirnamePath, '/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/attempts', attemptRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling (optional but good)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running :) http://localhost:${PORT}`));
