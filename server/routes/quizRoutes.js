const express = require('express');
const {findQuiz,quizItems} = require('../controller/quizController')

const Router = express.Router();

Router.post('/findQuiz',findQuiz);
Router.get('/featured',quizItems);

module.exports = Router
