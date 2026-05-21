const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title:         { type: String, required: [true, 'Title is required'] },
  isbn:          { type: String, required: [true, 'ISBN is required'], unique: true },
  authorId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: [true, 'Author ID is required'] },
  genre:         { type: String, required: [true, 'Genre is required'] },
  publishedYear: { type: Number, required: [true, 'Published year is required'], min: [1000, 'Year must be 1000 or later'], max: [new Date().getFullYear(), 'Year cannot be in the future'] },
  pageCount:     { type: Number, required: [true, 'Page count is required'], min: [1, 'Page count must be at least 1'] },
  language:      { type: String, required: [true, 'Language is required'] },
  publisher:     { type: String, required: [true, 'Publisher is required'] },
  summary:       { type: String, required: [true, 'Summary is required'] },
  available:     { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);