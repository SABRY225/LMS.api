const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const { getCourse, getCourses, editCourse, deleteCourse, addCourse, addEvalCourse, getCoursesByTeacher, getCoursesByStudent } = require('../controllers/courseController');

/**
 * @swagger
 * /api/course/{courseId}:
 *   get:
 *     summary: Get a single course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single course
 */
router.get('/:courseId', isAuth, getCourse);


/**
 * @swagger
 * /api/course/add-course:
 *   post:
 *     summary: Add a new course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               courseImg:
 *                 type: string
 *               price:
 *                 type: string
 *               level:
 *                 type: string
 *               nameMaterial:
 *                 type: string
 *               semester:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course added
 */
router.post('/add-course', isAuth, addCourse);

/**
 * @swagger
 * /api/course/edit-course/{courseId}:
 *   put:
 *     summary: Edit an existing course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
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
 *               name:
 *                 type: string
 *               courseImg:
 *                 type: string
 *               price:
 *                 type: string
 *               level:
 *                 type: string
 *               nameMaterial:
 *                 type: string
 *               semester:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated
 */
router.put('/edit-course/:courseId', isAuth, editCourse);

/**
 * @swagger
 * /api/course/delete-course/{courseId}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course deleted
 */
router.delete('/delete-course/:courseId', isAuth, deleteCourse);

/**
 * @swagger
 * /api/course/courses/all:
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get('/courses/all', isAuth, getCourses);

/**
 * @swagger
 * /api/course/courses-by-teacher/{teacherId}:
 *   get:
 *     summary: Get a single course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get courses by teacher
 */
router.get('/courses-by-teacher/:teacherId', isAuth, getCoursesByTeacher);

/**
 * @swagger
 * /api/course/courses-by-student/{studentId}:
 *   get:
 *     summary: Get a single course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get courses by student
 */
router.get('/courses-by-student/:studentId', isAuth, getCoursesByStudent);

module.exports = router;
