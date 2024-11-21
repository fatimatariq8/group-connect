// import React, { useState, useEffect } from 'react';

// const CourseAdder = ({ onAddCourse }) => {
//     const [courses, setCourses] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//     const fetchCourses = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/courses');
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log("Fetched courses:", data.courses);
//             setCourses(data.courses);
//         } catch (error) {
//             console.error('Failed to fetch courses:', error);
//         }
//     };

//     const handleToggleDropdown = () => {
//         setIsDropdownVisible(!isDropdownVisible);
//         if (!isDropdownVisible) {
//             fetchCourses();
//         }
//     };

//     const handleAddCourse = () => {
//         console.log("Course added:", course);
//         console.log("Selected Course ID:", selectedCourse);
//         const course = courses.find(course => course._id === selectedCourse);
//         console.log("Selected Course Object:", course);
//         if (course) {
//             onAddCourse(course);
//             setSelectedCourse('');
//             setIsDropdownVisible(false);
//         }
//     };

//     return (
//         <div className="course-adder">
//             <button onClick={handleToggleDropdown}>
//                 {isDropdownVisible ? 'Close Course List' : 'Add Course'}
//             </button>
//             {isDropdownVisible && (
//                 <div className="dropdown">
//                     <select
//                         value={selectedCourse}
//                         onChange={(e) => setSelectedCourse(e.target.value)}
//                     >
//                         <option value="">Select a course</option>
//                         {courses.map(course => (
//                             <option key={course._id} value={course._id}>
//                                 {course.title}
//                             </option>
//                         ))}
//                     </select>
//                     <button onClick={handleAddCourse}>Adds Course</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CourseAdder;
