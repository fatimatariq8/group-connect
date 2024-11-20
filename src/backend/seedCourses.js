// seedCourses.js
import mongoose from 'mongoose';
import Course from './models/courses.js'; // Adjust path based on your folder structure

const courses = [
    { title: 'Probabilistic Graphical Models', term: 'Fall Semester 2024', code: 'CS452' },
    { title: 'Capstone (Kaavish) I', term: 'Fall Semester 2024', code: 'CS491' },
    { title: 'Data Science', term: 'Fall Semester 2024', code: 'CS457/464' },
    { title: 'Natural Language Processing', term: 'Fall Semester 2024', code: 'CS458/463' },
    { title: 'Capstone Design Project - I', term: 'Fall Semester 2024', code: 'CE491' },
    { title: 'Cryptography and Network Security', term: 'Fall Semester 2024', code: 'CE/EE442/426' },
    { title: 'Cryptography and Network Security Lab', term: 'Fall Semester 2024', code: 'CE/EE442L/426L' },
    { title: 'Electric Vehicles', term: 'Fall Semester 2024', code: 'EE434' },
    { title: 'Principles of Management', term: 'Fall Semester 2024', code: 'MGMT320' },
    { title: 'Supply Chain Management', term: 'Fall Semester 2024', code: 'MGMT323' },
    { title: 'Probability and Statistics', term: 'Fall Semester 2024', code: 'MATH310' },
    { title: 'Physics of Semiconductor Devices', term: 'Fall Semester 2024', code: 'PHY304' },
    { title: 'Service-Learning: Climate Change Awareness', term: 'Fall Semester 2024', code: 'DEV328' },
    { title: 'Political Economy of Development', term: 'Fall Semester 2024', code: 'ECON313' },
    { title: 'Political Economy of Agriculture and Food', term: 'Fall Semester 2024', code: 'POLI313' },
    { title: 'Comparative Urbanisms', term: 'Fall Semester 2024', code: 'POLI314' },
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
