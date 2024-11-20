// src/routes/courseRoutes.js
import express from 'express';
import {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCourseById,
} from '../controllers/courseController.js'; // Import controller functions

const router = express.Router();

// Route to get all courses (with optional pagination)
router.get('/', getAllCourses);

// Route to get a specific course by ID
router.get('/:id', getCourseById);

// Route to create a new course
router.post('/', createCourse);

// Route to update an existing course by ID
router.put('/:id', updateCourseById);

// Route to delete a course by ID
router.delete('/:id', deleteCourseById);

export default router;
