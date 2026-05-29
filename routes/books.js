const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

const {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/books');

// PUBLIC — anyone can read
router.get('/', getAllBooks);
router.get('/:id', getSingleBook);

// PROTECTED — must be logged in via OAuth
router.post('/', isAuthenticated, createBook);
router.put('/:id', isAuthenticated, updateBook);
router.delete('/:id', isAuthenticated, deleteBook);

module.exports = router;