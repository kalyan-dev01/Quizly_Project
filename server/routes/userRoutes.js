const {SignUp,login,userProfile,TestAPI} = require('../controller/userController')
const express = require('express');
const Route = express.Router()
const {tokenValidation} = require('../tokenValidation/tokenValidation')
const {auth} = require('../middleware/auth')

Route.post('/signup',SignUp)
Route.post('/login',login)
Route.get('/profile',auth,userProfile)
Route.get('/test',TestAPI)
Route.get('/verifyToken',tokenValidation)



module.exports = Route