const mongoose = require('mongoose');
const User = require('../models/user')

const connection = async (req, res) =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/team-app');
        console.log('successfully connected to mongodb');
    }
    catch(e){
        console.log(`unable to connect to mongodb : ${e.message}`);
    }
}

module.exports = connection;
// connection()