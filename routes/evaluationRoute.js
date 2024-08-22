const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const {editEvaluation } = require('../controllers/courseController');

/**
 * @swagger
 * tags:
 *   name: Evaluation
 */

/**
 * @swagger
 * /api/evaluation/{courseId}/edit-evaluation:
 *   put:
 *     summary: Add a new exam to a course
 *     tags: [Evaluation]
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
 *               value:
 *                 type: number
 *     responses:
 *       200:
 *         description: evaluation added successfully
 *       400:
 *         description: Invalid input
 */
router.put('/:courseId/edit-evaluation', isAuth, editEvaluation);

module.exports = router;
