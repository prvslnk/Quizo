import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import examRoutes from './routes/exam.routes.js';
import questionRoutes from './routes/question.routes.js';
import attemptRoutes from './routes/attempt.routes.js';

dotenv.config();
connectDB();

const app = express();

// Add this line to parse JSON bodies
app.use(express.json());

// CORS setup
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Static folder for uploads
const __dirnamePath = path.resolve();
app.use('/uploads', express.static(path.join(__dirnamePath, '/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/attempts', attemptRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Quiz API is running...');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));
