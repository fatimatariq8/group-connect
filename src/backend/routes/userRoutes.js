// userRoutes.js
import express from 'express';
import { createUser, loginUser, getProfile, updateProfile, upload, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', getProfile);       // Fetch user profile
router.put('/:id', upload.single('profileImage'), updateProfile); // Update profile with image
router.delete('/:id', deleteUser);

export default router;
