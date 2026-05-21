const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/books');

// GET all books
router.get('/', getAllBooks);

// GET single book
router.get('/:id', getSingleBook);

// POST new book
router.post('/', createBook);

// PUT update book
router.put('/:id', updateBook);

// DELETE book
router.delete('/:id', deleteBook);

module.exports = router;