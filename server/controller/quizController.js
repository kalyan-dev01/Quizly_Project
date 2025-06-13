const quizModel = require("../model/quizModel")

const findQuiz = async(req,res)=>{
     const {title} = req.body
     const response = await quizModel.findOne({title:title})
     res.json({response:response})
}


const quizItems = async(req,res) => {
     const response = await quizModel.find({});
     res.json({items:response})
}



module.exports = {findQuiz,quizItems};