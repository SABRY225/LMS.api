const Course = require('../models/courseModel');
const User = require('../models/userModel');
const Evaluation = require('../models/evaluationModel');
const CourseStudent = require('../models/courseStudentModel');

const addCourse = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const { name,courseImg,price, level,nameMaterial,code,semester } = req.body;
        const course = new Course({ name,courseImg,price, level,nameMaterial,code,semester,userId});
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course edit successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        console.log(course);
        
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editEvaluation = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { value } = req.body;
        const userId = req.userId; 
        
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user has already added an evaluation for this course
        let evaluation = await Evaluation.findOne({ courseId, userId });
        if (evaluation) {
            // Update the existing evaluation
            evaluation.value = value;
            await evaluation.save();
        } else {
            // Create a new evaluation if it doesn't exist
            evaluation = new Evaluation({
                courseId,
                userId,
                value
            });
            await evaluation.save();
        }

        // Recalculate the average rating
        const evaluations = await Evaluation.find({ courseId });
        const averageRating = evaluations.reduce((sum, eval) => sum + eval.value, 0) / evaluations.length;

        // Update the course with the new average rating
        course.evaluation = averageRating;
        await course.save();

        res.status(200).json({ message: 'Evaluation updated successfully', evaluation, averageRating });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getCoursesByTeacher = async (req, res) => {
    try {
        const teacherId=req.params.teacherId
        const courses = await Course.find({userId:teacherId});
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCoursesByStudent = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        
        const courses = await CourseStudent.find({ userId: studentId }).populate('courseId');

        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    getCourse, getCourses, editCourse, deleteCourse, addCourse,editEvaluation,getCoursesByTeacher,getCoursesByStudent
};
