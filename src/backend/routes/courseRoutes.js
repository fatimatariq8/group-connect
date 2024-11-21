import express from 'express';
import {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCourseById,
    unenrollCourse
} from '../controllers/courseController.js'; // Import controller functions
import Course from '../models/courses.js';
import User from '../models/user.js';

const router = express.Router();

/**
 * Route: GET /api/courses
 * Description: Fetch all courses (supports pagination if implemented in the controller).
 */
router.get('/', getAllCourses);

/**
 * Route: GET /api/courses/:id
 * Description: Fetch a specific course by ID.
 */
router.get('/:id', getCourseById);

/**
 * Route: POST /api/courses
 * Description: Create a new course.
 */
router.post('/', createCourse);

/**
 * Route: PUT /api/courses/:id
 * Description: Update an existing course by ID.
 */
router.put('/:id', updateCourseById);

/**
 * Route: DELETE /api/courses/:id
 * Description: Delete a specific course by ID.
 */
router.delete('/:id', deleteCourseById);

/**
 * Route: POST /api/courses/enroll/:userId/:courseId
 * Description: Enroll a user in a course.
 */

router.delete('/unenroll/:userId/:courseId', unenrollCourse);

router.post('/enroll/:userId/:courseId', async (req, res) => {
    const { userId, courseId } = req.params;

    try {
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!user || !course) {
            return res.status(404).json({ message: 'User or Course not found' });
        }

        // // Prevent duplicate enrollment
        // if (user.courses.includes(courseId)) {
        //     return res.status(400).json({ message: 'User already enrolled in this course' });
        // }

        // if (user.courses.includes(courseId)) {
        //     return res.status(400).json({
        //       message: 'You are already enrolled in this course!',
        //       errorCode: 'DUPLICATE_ENROLLMENT',
        //     });
        // }

        if (user.courses.some((id) => id.toString() === courseId)) {
            return res.status(400).json({
                message: 'You are already enrolled in this course!',
                errorCode: 'DUPLICATE_ENROLLMENT',
            });
        }
        


        user.courses.push(courseId);
        await user.save();

        course.students.push(userId);
        await course.save();

        res.status(200).json({ message: 'Enrollment successful' });
    } catch (error) {
        console.error('Enrollment error:', error);
        res.status(500).json({ message: 'Failed to enroll user' });
    }
});


/**
 * Route: GET /api/courses/:courseId/students
 * Description: Get all students enrolled in a specific course.
 */
// router.get('/:courseId/students', async (req, res) => {
//     const { courseId } = req.params;

//     try {
//         const course = await Course.findById(courseId).populate('students'); // Populate student details
//         if (!course) {
//             return res.status(404).json({ message: 'Course not found' });
//         }

//         res.status(200).json(course.students); // Return the list of students
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to fetch course students' });
//     }
// });

router.get('/:courseId/students', async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate('students'); // Populate student details
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Separate available and unavailable students
        const availableStudents = course.students.filter(student => student.isAvailable===true);
        const unavailableStudents = course.students.filter(student => student.isAvailable===false);

        res.status(200).json({
            availableStudents,
            unavailableStudents,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch course students' });
    }
});




export default router;
