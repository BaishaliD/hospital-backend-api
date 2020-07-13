const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctor_model');
// const Patient = require('../models/patient');


console.log("cofig", process.env.TOKEN_SECRET);
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET
    //secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayload,done){

    Doctor.findById(jwtPayload._id, function(err, user){

        if(err){
            console.log('Error in finding doctor from JWT ',err);
            return;
        }

        if(user){
            //console.log("userrrr ",user);
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
    
}));

module.exports = passport;