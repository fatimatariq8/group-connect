import express from 'express';
import Group from '../models/group.js';
import Course from '../models/courses.js';

const router = express.Router();

// Add student to group
router.post('/add', async (req, res) => {
  const { courseId, studentId } = req.body;

  try {
    let group = await Group.findOne({ course: courseId });

    if (!group) {
      group = new Group({ course: courseId, students: [] });
    }

    if (!group.students.includes(studentId)) {
      group.students.push(studentId);
      await group.save();
      res.status(200).json({ message: 'Student added to group', group });
    } else {
      res.status(400).json({ message: 'Student already in the group' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding student to group', error });
  }
});

// Get group details
router.get('/:courseId', async (req, res) => {
  try {
    const group = await Group.findOne({ course: req.params.courseId }).populate('students');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching group', error });
  }
});

// Clear group
router.delete('/:courseId', async (req, res) => {
  try {
    const group = await Group.findOneAndDelete({ course: req.params.courseId });
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json({ message: 'Group cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing group', error });
  }
});

export default router;
