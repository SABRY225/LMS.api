const User = require('../models/userModel'); 
const Course = require('../models/courseModel'); 

// Get the number of teachers
const getNumOfTeachers = async (req, res) => {
    try {
        const numOfTeachers = await User.countDocuments({ role: 'Teacher' });
        res.status(200).json({ numOfTeachers });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get the number of students
const getNumOfStudents = async (req, res) => {
    try {
        const numOfStudents = await User.countDocuments({ role: 'Student' });
        res.status(200).json({ numOfStudents });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get the number of courses
const getNumOfCourses = async (req, res) => {
    try {
        const numOfCourses = await Course.countDocuments();
        res.status(200).json({ numOfCourses });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getNumOfTeachers,
    getNumOfStudents,
    getNumOfCourses
};
