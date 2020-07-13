const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const mongoose = require('mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport_jwt_strategy');




//Middlewares
app.use(express.json());

//Route middleware
app.use('/api',require('./routes/index'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    
    console.log(`Server is running on port: ${port}`);
});