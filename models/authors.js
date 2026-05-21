const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  firstName:   { type: String, required: [true, 'First name is required'] },
  lastName:    { type: String, required: [true, 'Last name is required'] },
  email:       { type: String, required: [true, 'Email is required'], unique: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] },
  nationality: { type: String, required: [true, 'Nationality is required'] },
  birthDate:   { type: String, required: [true, 'Birth date is required'] },
  biography:   { type: String, required: [true, 'Biography is required'] },
  website:     { type: String, default: '' },
  genres:      { type: [String], required: [true, 'At least one genre is required'] },
  active:      { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Author', AuthorSchema);