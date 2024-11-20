// controllers/course.controller.js
import Course from '../models/courses.js';

// Get all courses (with optional pagination)
export const getAllCourses = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const courses = await Course.find()
            .skip((page - 1) * limit) // Skip documents for pagination
            .limit(parseInt(limit)); // Limit the number of documents

        const total = await Course.countDocuments(); // Total number of courses
        res.json({
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            courses,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
    }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch course', error: error.message });
    }
};

// Create a new course
export const createCourse = async (req, res) => {
    const { title, code, term } = req.body;

    try {
        const newCourse = new Course({ title, code, term });
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create course', error: error.message });
    }
};

// Update a course by ID
export const updateCourseById = async (req, res) => {
    const { id } = req.params;
    const { title, code, term } = req.body;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { title, code, term },
            { new: true } // Return the updated document
        );

        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update course', error: error.message });
    }
};

// Delete a course by ID
export const deleteCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete course', error: error.message });
    }
};
