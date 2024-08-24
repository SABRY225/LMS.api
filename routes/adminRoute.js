const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { addStudent } = require('../controllers/adminController');

/**
 * @swagger
 * tags:
 *   name: Admin
 */

/**
 * @swagger
 * /api/admin/add-student-in-course:
 *   post:
 *     summary: Add Student in  course
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codeCourse:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course added
 */
router.post('/add-student-in-course', isAuth, addStudent);

module.exports = router;

