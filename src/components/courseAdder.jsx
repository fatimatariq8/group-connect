import React, { useState, useEffect } from 'react';

const CourseAdder = ({ onAddCourse }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        // Fetch courses from the backend
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses');
                const data = await response.json();
                setCourses(data); // Update the courses state with data from backend
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const handleAddCourse = () => {
        if (selectedCourse) {
            const course = courses.find(course => course._id === selectedCourse);
            onAddCourse(course); // Call the onAddCourse function passed as prop
            setSelectedCourse(''); // Reset the selection
        }
    };

    return (
        <div className="course-adder">
            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">Select a course</option>
                {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                        {course.title}
                    </option>
                ))}
            </select>
            <button onClick={handleAddCourse}>Add Course</button>
        </div>
    );
};

export default CourseAdder;
