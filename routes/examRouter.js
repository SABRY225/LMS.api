const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const {
    getExam,
    addExam,
    editExam,
    deleteExam,
    getAllExamsByCourse,
    getAllExamsByTeacher,
    editResult,
    addResult
} = require('../controllers/examController');

/**
 * @swagger
 * tags:
 *   name: Exam
 */

/**
 * @swagger
 * /api/exam/{examId}:
 *   get:
 *     summary: Get a single exam
 *     tags: [Exam]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Exam description
 *       404:
 *         description: Exam not found
 */
router.get('/:examId', isAuth, getExam);

/**
 * @swagger
 * /api/exam/{courseId}/add-exam:
 *   post:
 *     summary: Add a new exam to a course
 *     tags: [Exam]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     selectAnswer1:
 *                       type: string
 *                     selectAnswer2:
 *                       type: string
 *                     selectAnswer3:
 *                       type: string
 *                     selectAnswer4:
 *                       type: string
 *                     answer:
 *                       type: string
 *     responses:
 *       200:
 *         description: exam added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/:courseId/add-exam', isAuth, addExam);

/**
 * @swagger
 * /api/exam/edit-exam/{examId}:
 *   put:
 *     summary: Edit an existing exam
 *     tags: [Exam]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     selectAnswer1:
 *                       type: string
 *                     selectAnswer2:
 *                       type: string
 *                     selectAnswer3:
 *                       type: string
 *                     selectAnswer4:
 *                       type: string
 *                     answer:
 *                       type: string
 *     responses:
 *       200:
 *         description: exam updated successfully
 *       404:
 *         description: exam not found
 */
router.put('/edit-exam/:examId', isAuth, editExam);

/**
 * @swagger
 * /api/exam/delete-exam/{examId}:
 *   delete:
 *     summary: Delete an exam
 *     tags: [Exam]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: exam deleted successfully
 *       404:
 *         description: exam not found
 */
router.delete('/delete-exam/:examId', isAuth, deleteExam);

/**
 * @swagger
 * /api/exam/exams/{courseId}:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of exams
 */
router.get('/exams/:courseId', isAuth, getAllExamsByCourse);


/**
 * @swagger
 * /api/exam/examsbyteacher/{teacherId}:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of exams by teacher
 */
router.get('/examsbyteacher/:teacherId', isAuth, getAllExamsByTeacher);


/**
 * @swagger
 * /api/exam/add-result/{examId}:
 *   post:
 *     summary: Edit an result of Student in course
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: result updated
 */
router.post('/add-result/:examId', isAuth, addResult);


/**
 * @swagger
 * /api/exam/edit-result/{resultId}:
 *   put:
 *     summary: Edit an result of Student in course
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resultId
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: result updated
 */
router.put('/edit-result/:resultId', isAuth, editResult);

module.exports = router;
