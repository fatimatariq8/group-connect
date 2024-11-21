// src/models/course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: String,
    term: String,
    code: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    groups: [
        {
          members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        },
      ],
});

const Course = mongoose.model('Course', courseSchema);
export default Course;


