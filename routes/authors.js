const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

const {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authors');

// PUBLIC — anyone can read
router.get('/', getAllAuthors);
router.get('/:id', getSingleAuthor);

// PROTECTED — must be logged in via OAuth
router.post('/', isAuthenticated, createAuthor);
router.put('/:id', isAuthenticated, updateAuthor);
router.delete('/:id', isAuthenticated, deleteAuthor);

module.exports = router;