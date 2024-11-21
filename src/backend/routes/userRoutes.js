// userRoutes.js
import express from 'express';
import { createUser, loginUser, getProfile, updateProfile, upload, deleteUser } from '../controllers/userController.js';
import Course from '../models/courses.js';
import User from '../models/user.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', getProfile);       // Fetch user profile
router.put('/:id', upload.single('profileImage'), updateProfile); // Update profile with image
router.delete('/:id', deleteUser);

router.get('/:id/courses', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).populate('courses'); // Populate course details
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.courses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user courses' });
    }
});

export default router;
