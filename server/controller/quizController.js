const quizModel = require("../model/quizModel")

const findQuiz = async(req,res)=>{
     const {title} = req.body
     const response = await quizModel.findOne({title:title})
     res.json({response:response})

}


module.exports = {findQuiz};