const mongoose = require('mongoose');

const ConnectMongoDB = async(url) =>{

    try{
        await mongoose.connect(url);
        console.log('database is connected');
    }

    catch(err){
        console.log(err.message);
    }
}


module.exports = {ConnectMongoDB}