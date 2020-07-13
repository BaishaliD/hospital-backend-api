const router = require('express').Router();
const doctorsController = require('../controllers/doctors_controller');

router.post('/register', doctorsController.register);
router.post('/login', doctorsController.login);

module.exports = router;
