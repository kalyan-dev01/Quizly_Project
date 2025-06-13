const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: Number,
  question: String,
  options: [String],
  answers: [String]
});

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
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  questions: [questionSchema]
});


const QuizModel = mongoose.model('quizData', quizSchema);

module.exports = QuizModel;
