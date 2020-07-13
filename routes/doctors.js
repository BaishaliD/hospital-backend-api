const router = require('express').Router();
const doctorsController = require('../controllers/doctors_controller');

router.post('/register', doctorsController.register);

router.post('/login', doctorsController.login);





// //sign out user
// router.get('/sign-out', userController.signOut);



module.exports = router;
