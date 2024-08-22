const Book = require('../models/bookModel'); 
const Course = require('../models/courseModel'); 

// Get a single Book
const getBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;

        // Validate the Book ID
        if (!bookId ) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        // Find the lecture by ID
        const book = await Book.findById(bookId);

        // Check if the lecture exists
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Successfully found the lecture
        res.status(200).json(book);
    } catch (error) {
        // Log the error for debugging
        console.error('Error retrieving book:', error);

        // Send a generic error message in production mode
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all Lectures
const getBooks = async (req, res) => {
    try {
        const Books = await Book.find({});
        res.status(200).json(Books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Edit an existing Lecture
const editBook = async (req, res) => {
    try {
        const { name, fileUrl } = req.body;
        const BookId = req.params.bookId;

        // Check if the Book ID is valid (Optional, but recommended)
        if (!BookId) {
            return res.status(400).json({ message: 'Invalid Book ID' });
        }

        // Ensure required fields are provided
        if (!name || !fileUrl) {
            return res.status(400).json({ message: 'Name and video URL are required' });
        }

        // Update the Book
        const book = await Book.findByIdAndUpdate(
            BookId,
            { name, fileUrl },
            { new: true }
        );

        // Check if the Book was found
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Successfully updated
        res.status(200).json(book);
    } catch (error) {
        // Log the error for debugging
        console.error('Error updating Book:', error);
        // Send a generic error message in production mode
        res.status(500).json({ message: 'Server error' });
    }
};


// Delete a Book
const deleteBook = async (req, res) => {
    try {
        const BookId = req.params.bookId;

        // Validate the Book ID
        if (!BookId) {
            return res.status(400).json({ message: 'Invalid Book ID' });
        }

        // Delete the Book by ID
        const book = await Book.findByIdAndDelete(BookId);

        // Check if the Book was found and deleted
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Successfully deleted the Book
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error deleting Book:', error);
        // Send a generic error message in production mode
        res.status(500).json({ message: 'Server error' });
    }
};


// Add a new Book
const addBook = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId); 
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const { name, fileUrl } = req.body;
        const newBook = new Book({name, fileUrl });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getBook,
    getBooks,
    editBook,
    deleteBook,
    addBook,
};
