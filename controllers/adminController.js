const Course = require("../models/courseModel");
const CourseStudent = require("../models/courseStudentModel");
const User = require("../models/userModel");


const addStudent = async (req, res) => {
    try {
        const { courseId, email } = req.body;

        // Check if the course exists
        const course = await Course.findById(courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user exists by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userId=user._id;
        const courseStudent = await CourseStudent.findOne({userId});

        console.log(courseStudent);
        
        // Check if the user is already enrolled in the course
        if (courseStudent) {
            return res.status(400).json({ message: 'Student already enrolled in this course' });
        }

        // Add the student to the course
      
        const newStudent=await CourseStudent({courseId,userId,courseStudent})
        await newStudent.save();
        res.status(201).json({ message: 'Student added to course successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    addStudent
};
