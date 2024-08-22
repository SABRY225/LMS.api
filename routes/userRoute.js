const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { getUser, getUsers, editUser, deleteUser } = require('../controllers/userController');

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get the authenticated user's details
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/', isAuth, getUser);

/**
 * @swagger
 * /api/user/edit-user/{userId}:
 *   put:
 *     summary: Edit a user's details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               userImg:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/edit-user/:userId', isAuth, editUser);

/**
 * @swagger
 * /api/user/delete-user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/delete-user/:userId', isAuth, deleteUser);

/**
 * @swagger
 * /api/user/users:
 *   get:
 *     summary: Get a list of all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */
router.get('/users', isAuth, getUsers);

module.exports = router;
