// src/models/course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: String,
    term: String,
    code: String,
});

const Course = mongoose.model('Course', courseSchema);
export default Course;


