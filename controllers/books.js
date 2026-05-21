const Book = require('../models/books');

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).populate('authorId', 'firstName lastName');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single book by ID
const getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('authorId', 'firstName lastName');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new book
const createBook = async (req, res) => {
  try {
    const { title, isbn, authorId, genre, publishedYear, pageCount, language, publisher, summary } = req.body;

    // Manual validation for required fields
    if (!title || !isbn || !authorId || !genre || !publishedYear || !pageCount || !language || !publisher || !summary) {
      return res.status(400).json({
        message: 'Missing required fields: title, isbn, authorId, genre, publishedYear, pageCount, language, publisher, summary are all required.'
      });
    }

    const book = await Book.create(req.body);

    res.status(201).json({
      message: 'Book created successfully',
      id: book._id
    });
  } catch (error) {
    // Duplicate key error (e.g. isbn already exists)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A book with that ISBN already exists.' });
    }
    res.status(400).json({ message: error.message });
  }
};

// UPDATE book
const updateBook = async (req, res) => {
  try {
    const { title, isbn, authorId, genre, publishedYear, pageCount, language, publisher, summary } = req.body;

    // Manual validation — at least one field must be provided
    if (!title && !isbn && !authorId && !genre && !publishedYear && !pageCount && !language && !publisher && !summary) {
      return res.status(400).json({ message: 'No valid fields provided for update.' });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(204).send();
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A book with that ISBN already exists.' });
    }
    res.status(400).json({ message: error.message });
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};