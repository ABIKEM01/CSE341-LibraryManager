const express = require('express');
const router = express.Router();

const {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authors');

// GET all authors
router.get('/', getAllAuthors);

// GET single author
router.get('/:id', getSingleAuthor);

// POST new author
router.post('/', createAuthor);

// PUT update author
router.put('/:id', updateAuthor);

// DELETE author
router.delete('/:id', deleteAuthor);

module.exports = router;