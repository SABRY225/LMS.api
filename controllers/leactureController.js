const Lecture = require('../models/leactureModel'); 
const Course = require('../models/courseModel'); 
const mongoose = require('mongoose');

// Get a single lesson
const getLecture = async (req, res) => {
    try {
        const lectureId = req.params.lectureId;

        // Validate the lecture ID
        if (!lectureId ) {
            return res.status(400).json({ message: 'Invalid lecture ID' });
        }

        // Find the lecture by ID
        const lecture = await Lecture.findById(lectureId);

        // Check if the lecture exists
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        // Successfully found the lecture
        res.status(200).json(lecture);
    } catch (error) {
        // Log the error for debugging
        console.error('Error retrieving lecture:', error);

        // Send a more detailed error response in development mode
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }

        // Send a generic error message in production mode
        res.status(500).json({ message: 'Server error' });
    }
};
// Get all Lectures
const getLectures = async (req, res) => {
    try {
        const { courseId } = req.params;
        const Lectures = await Lecture.find({courseId});
        res.status(200).json(Lectures);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all Lectures by teacher
const getLecturesByTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;

        // Convert teacherId (string) to ObjectId
        // const teacherObjectId = mongoose.Types.ObjectId(teacherId);
        // console.log(teacherObjectId);
        
        // Find courses associated with the teacher
        const courses = await Course.find({ userId: teacherId });
        
        
        // Prepare an array to hold course details (id and name)
        const courseDetails = courses.map(course => ({
            courseId: course._id,
            courseName: course.name,
        }));

        // Extract just the course IDs
        const courseIds = courses.map(course => course._id);

        // Find lectures that belong to these courses
        const lectures = await Lecture.find({ courseId: { $in: courseIds } });

        // Combine the lecture details with the course information
        const result = lectures.map(lecture => {
            const course = courseDetails.find(c => c.courseId.equals(lecture.courseId));
            return {
                ...lecture.toObject(),
                courseId: course.courseId,
                courseName: course.courseName,
            };
        });
        
        // Respond with the lectures along with course details
        res.status(200).json(courseDetails);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};




// Edit an existing Lecture
const editLecture = async (req, res) => {
    try {
        const { name, videoUrl } = req.body;
        const lectureId = req.params.lectureId;

        // Check if the lecture ID is valid (Optional, but recommended)
        if (!lectureId) {
            return res.status(400).json({ message: 'Invalid lecture ID' });
        }

        // Ensure required fields are provided
        if (!name || !videoUrl) {
            return res.status(400).json({ message: 'Name and video URL are required' });
        }

        // Update the lecture
        const lecture = await Lecture.findByIdAndUpdate(
            lectureId,
            { name, videoUrl },
            { new: true }
        );

        // Check if the lecture was found
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        // Successfully updated
        res.status(200).json(lecture);
    } catch (error) {
        // Log the error for debugging
        console.error('Error updating lecture:', error);

        // Send a more detailed error response in development mode
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }

        // Send a generic error message in production mode
        res.status(500).json({ message: 'Server error' });
    }
};


// Delete a Lecture
const deleteLecture = async (req, res) => {
    try {
        const lectureId = req.params.lectureId;

        // Validate the lecture ID
        if (!lectureId) {
            return res.status(400).json({ message: 'Invalid lecture ID' });
        }

        // Delete the lecture by ID
        const lecture = await Lecture.findByIdAndDelete(lectureId);

        // Check if the lecture was found and deleted
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        // Successfully deleted the lecture
        res.status(200).json({ message: 'Lecture deleted successfully' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error deleting lecture:', error);

        // Send a more detailed error response in development mode
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }

        // Send a generic error message in production mode
        res.status(500).json({ message: 'Server error' });
    }
};


// Add a new Lecture
const addLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId); 
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const { name, videoUrl } = req.body;
        const newLecture = new Lecture({name, videoUrl ,courseId});
        const savedLecture = await newLecture.save();

        res.status(201).json(savedLecture);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getLecture,
    getLectures,
    editLecture,
    deleteLecture,
    addLecture,
    getLecturesByTeacher
};
