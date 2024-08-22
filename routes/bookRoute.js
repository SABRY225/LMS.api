const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const { getBook, getBooks, editBook, deleteBook, addBook } = require('../controllers/bookController');

/**
 * @swagger
 * /api/book/{bookId}:
 *   get:
 *     summary: Get a single Book
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single Book
 */
router.get('/:bookId', isAuth, getBook);
/**
 * @swagger
 * /api/book/{courseId}/add-book:
 *   post:
 *     summary: Add a new Book
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book added
 */
router.post('/:courseId/add-book', isAuth, addBook);

/**
 * @swagger
 * /api/book/edit-book/{bookId}:
 *   put:
 *     summary: Edit an existing Book
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated
 */
router.put('/edit-book/:bookId', isAuth, editBook);

/**
 * @swagger
 * /api/book/delete-book/{bookId}:
 *   delete:
 *     summary: Delete a Book
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Book ID
 *     responses:
 *       200:
 *         description: Book deleted
 */
router.delete('/delete-book/:bookId', isAuth, deleteBook);

/**
 * @swagger
 * /api/book/book/all:
 *   get:
 *     summary: Get all books
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Books
 */
router.get('/book/all', isAuth, getBooks);

module.exports = router;
