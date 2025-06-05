const mongoose = require('mongoose');

// Question Schema
const questionSchema = new mongoose.Schema({
  id: Number,
  question: String,
  options: [String],
  answers: [String]
});

// Quiz Schema
const quizSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String // optional field
  },
  imageUrl: {
    type: String,
    required: true
  },
  questions: [questionSchema]
});

// Model
const QuizModel = mongoose.model('quizData', quizSchema);

module.exports = QuizModel;
