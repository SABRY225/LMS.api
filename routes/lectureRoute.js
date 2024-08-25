const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { getLecture, addLecture, editLecture, deleteLecture, getLectures, getLecturesByTeacher } = require('../controllers/leactureController');

/**
 * @swagger
 * tags:
 *   name: Lecture
 */

/**
 * @swagger
 * /api/lecture/{lectureId}:
 *   get:
 *     summary: Get a single lesson
 *     tags: [Lecture]
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The lesson description
 *       404:
 *         description: Lesson not found
 */
router.get('/:lectureId', isAuth, getLecture);

/**
 * @swagger
 * /api/lecture/{courseId}/add-lecture:
 *   post:
 *     summary: Add a new lesson to a course
 *     tags: [Lecture]
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
 *               videoUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lesson added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/:courseId/add-lecture', isAuth, addLecture);

/**
 * @swagger
 * /api/lecture/edit-lecture/{lectureId}:
 *   put:
 *     summary: Edit an existing lesson
 *     tags: [Lecture]
 *     parameters:
 *       - in: path
 *         name: lectureId
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
 *               videoUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       404:
 *         description: Lesson not found
 */
router.put('/edit-lecture/:lectureId', isAuth, editLecture);

/**
 * @swagger
 * /api/lecture/delete-lecture/{lectureId}:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Lecture]
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       404:
 *         description: Lesson not found
 */
router.delete('/delete-lecture/:lectureId', isAuth, deleteLecture);

/**
 * @swagger
 * /api/lecture/lectures/{courseId}:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lecture]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of lessons
 */
router.get('/lectures/:courseId', isAuth, getLectures);

/**
 * @swagger
 * /api/lecture/lecturesbyteacer/{teacherId}:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lecture]
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of lessons
 */
router.get('/lecturesbyteacer/:teacherId', isAuth, getLecturesByTeacher);

module.exports = router;