const Lecture = require('../models/leactureModel'); 
const Course = require('../models/courseModel'); 

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
        const Lectures = await Lecture.find({});
        res.status(200).json(Lectures);
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
        // console.log('LectureContent',LectureContent);
        const newLecture = new Lecture({name, videoUrl });
        // console.log('newLecture',newLecture);
        const LectureId=newLecture._id
        const savedLecture = await newLecture.save();
        // console.log(savednewLectureDetailes);
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
};
