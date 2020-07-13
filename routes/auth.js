const jwt = require('jsonwebtoken');

module.exports = async function auth(req, res, next){

    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({
            'status': 'Failure',
            'message': 'Access denied'
        })
    }

    try{
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("Token verification in middleware: ",verified);
        req.user = verified;

    }catch(err){
        return res.status(401).send({
            'status': 'Failure',
            'message': 'Invalid token'
        })
    }
};