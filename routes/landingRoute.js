const express = require('express');
const { getNumOfStudents, getNumOfTeachers, getNumOfCourses } = require('../controllers/landingController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Landing
 */

/**
 * @swagger
 * /api/landing/num-of-teachers:
 *   get:
 *     summary: Get a list of all teachers
 *     tags: [Landing]
 *     responses:
 *       200:
 *         description: List of teachers
 *       500:
 *         description: Server error
 */
router.get('/num-of-teachers', getNumOfTeachers);

/**
 * @swagger
 * /api/landing/num-of-students:
 *   get:
 *     summary: Get a list of all students
 *     tags: [Landing]
 *     responses:
 *       200:
 *         description: List of students
 *       500:
 *         description: Server error
 */
router.get('/num-of-students', getNumOfStudents);

/**
 * @swagger
 * /api/landing/num-of-courses:
 *   get:
 *     summary: Get a list of all courses
 *     tags: [Landing]
 *     responses:
 *       200:
 *         description: List of courses
 *       500:
 *         description: Server error
 */
router.get('/num-of-courses', getNumOfCourses);

module.exports = router;
