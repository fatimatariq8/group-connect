// seedCourses.js
import mongoose from 'mongoose';
import Course from './models/courses.js'; // Adjust path based on your folder structure

const courses = [
    { title: 'Web and Mobile Development-L1', term: 'Fall Semester 2024', code: 'CS301' },
    { title: 'Natural Language Processing-L1', term: 'Fall Semester 2024', code: 'CS301' },
    { title: 'Intro to Deep Learning-L2', term: 'Fall Semester 2024', code: 'CS303' },
    { title: 'Graph Data Science-L1', term: 'Fall Semester 2024', code: 'CS224' },
    // Add more courses here if needed
];

const seedCourses = async () => {
    try {
        await mongoose.connect('mongodb+srv://fatimatariq8:AIebicgo8wqu3sf8@cluster0.gmcfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Clear existing courses
        await Course.deleteMany();

        // Insert new courses
        await Course.insertMany(courses);
        console.log('Courses have been successfully seeded.');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding courses:', error);
        mongoose.connection.close();
    }
};

seedCourses();
