const router = require('express').Router();

// router.get('/register',function(req,res){
//     console.log("register");
//     res.send('register');
// });

router.use('/doctor',require('./doctors'));
router.use('/patient',require('./patients'));
router.use('/reports',require('./reports'));

module.exports = router;