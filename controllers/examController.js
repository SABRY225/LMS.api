// examController.js
const Exam = require('../models/examModel'); // Assuming you have an Exam model
const Course = require('../models/courseModel'); // Assuming you have a Course model
const Result = require('../models/resultModel');

// Get a single exam by ID
const getExam = async (req, res) => {
    try {
        const { examId } = req.params;
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new exam to a course
const addExam = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { name, questions } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const newExam = new Exam({ name, questions, course: courseId });
        await newExam.save();

        res.status(200).json({ message: 'Exam added successfully', exam: newExam });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Edit an existing exam
const editExam = async (req, res) => {
    try {
        const { examId } = req.params;
        const { name, questions } = req.body;

        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        exam.name = name || exam.name;
        exam.questions = questions || exam.questions;
        await exam.save();

        res.status(200).json({ message: 'Exam updated successfully', exam });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an exam
const deleteExam = async (req, res) => {
    try {
        const { examId } = req.params;

        const exam = await Exam.findByIdAndDelete(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json({ message: 'Exam deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all exams
const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Edit an exam result
const editResult = async (req, res) => {
    try {
      const { examId } = req.params;
      const { value } = req.body;
      const userId= req.userId;
  
      if (!examId || !value) {
        return res.status(400).json({ message: 'Exam ID and value are required' });
      }
  
      // Find the exam by ID and update the result
      const exam = await Exam.findById(examId);
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      let result = await Result.findOne({userId });
      if (result) {
        // Update the existing evaluation
        result.value = value;
        await result.save();
    } else {
        // Create a new evaluation if it doesn't exist
        result = new Result({
            examId,
            userId,
            value
        });
        await result.save();
    }
      res.status(200).json({ message: 'Result updated successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
module.exports = {
    editResult,
    getExam,
    addExam,
    editExam,
    deleteExam,
    getAllExams
};
