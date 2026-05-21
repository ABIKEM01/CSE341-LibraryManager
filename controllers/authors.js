const Author = require('../models/authors');

// GET all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single author by ID
const getSingleAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new author
const createAuthor = async (req, res) => {
  try {
    const { firstName, lastName, email, nationality, birthDate, biography, genres } = req.body;

    // Manual validation for required fields
    if (!firstName || !lastName || !email || !nationality || !birthDate || !biography || !genres) {
      return res.status(400).json({
        message: 'Missing required fields: firstName, lastName, email, nationality, birthDate, biography, and genres are all required.'
      });
    }

    if (!Array.isArray(genres) || genres.length === 0) {
      return res.status(400).json({ message: 'genres must be a non-empty array of strings.' });
    }

    const author = await Author.create(req.body);

    res.status(201).json({
      message: 'Author created successfully',
      id: author._id
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'An author with that email already exists.' });
    }
    res.status(400).json({ message: error.message });
  }
};

// UPDATE author
const updateAuthor = async (req, res) => {
  try {
    const { firstName, lastName, email, nationality, birthDate, biography, genres } = req.body;

    // Manual validation — at least one field must be provided
    if (!firstName && !lastName && !email && !nationality && !birthDate && !biography && !genres) {
      return res.status(400).json({ message: 'No valid fields provided for update.' });
    }

    if (genres !== undefined && (!Array.isArray(genres) || genres.length === 0)) {
      return res.status(400).json({ message: 'genres must be a non-empty array of strings.' });
    }

    const author = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(204).send();
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'An author with that email already exists.' });
    }
    res.status(400).json({ message: error.message });
  }
};

// DELETE author
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
};