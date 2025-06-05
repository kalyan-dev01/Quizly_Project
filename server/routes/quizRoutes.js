const express = require('express');
const {findQuiz} = require('../controller/quizController')

const Router = express.Router();

Router.post('/findQuiz',findQuiz);

module.exports = Router
