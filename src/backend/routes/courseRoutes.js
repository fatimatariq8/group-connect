// src/routes/courseRoutes.js
import express from 'express';
import Course from '../models/courses.js';

const router = express.Router();

// Route to get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch courses' });
    }
});

export default router;
