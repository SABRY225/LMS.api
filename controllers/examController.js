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
        console.log(course);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found',status: 404  });
        }

        const newExam = new Exam({ name, questions, courseId });
        await newExam.save();

        res.status(200).json({ message: 'Exam added successfully', status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'Server error' ,status: 500});
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
const getAllExamsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // جلب جميع الامتحانات المرتبطة بمعرف الكورس
        const exams = await Exam.find({ courseId });
        const userId =req.userId
        // console.log(userId);
        // // جلب جميع النتائج الخاصة بالطالب لنفس الامتحانات
        const results = await Result.find({ 
            userId,
            // examId: exams.map(exam => exam._id )
        });
        //  console.log(exams.map(exam => exam._id));
         
        // دمج النتائج مع الامتحانات
        const examsWithResults = exams.map(exam => {
            const result = results.find(res => res.examId.toString() === exam._id.toString());
            // console.log(result.userId.toString() == userId );
            return {
                ...exam._doc,
                result: result && result.userId.toString() === userId.toString() ? result : null,
            };
        });

        res.status(200).json(examsWithResults);
        // res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// Get all exams by teacher
const getAllExamsByTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const courses = await Course.find({ userId: teacherId });

        const examsWithResults = await Promise.all(courses.map(async (course) => {
            const exams = await Exam.find({ courseId: course.id });
            return { course, exams };
        }));

        console.log(examsWithResults);
        res.status(200).json(examsWithResults);
    } catch (error) {
        res.status(500).json({ message: 'Server error', status: 500 });
    }
};

// Edit an exam result
const addResult = async (req, res) => {
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

        result = new Result({
            examId,
            userId,
            value
        });
        await result.save();

      res.status(200).json({ message: 'Result updated successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Edit an exam result
const editResult = async (req, res) => {
    try {
        const { resultId } = req.params;
        const { value } = req.body;
        const userId = req.userId;

        if (!resultId || !value) {
            return res.status(400).json({ message: 'Result ID and value are required' });
        }

        // Find the result by ID
        const result = await Result.findById(resultId);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        // Check if the user has permission to edit the result (optional based on your use case)
        console.log(userId);
        
        if (result.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to edit this result' });
        }

        // Update the result with the new value
        result.value = value;
        await result.save();

        res.status(200).json({ message: 'Result updated successfully', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

  
module.exports = {
    editResult,
    addResult,
    getExam,
    addExam,
    editExam,
    deleteExam,
    getAllExamsByCourse,
    getAllExamsByTeacher
};
