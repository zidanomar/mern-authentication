const router = require('express').Router();

const {
  login,
  register,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.post('/forgotpassword', forgotPassword);
router.put('/passwordreset/:resetToken', resetPassword);

module.exports = router;
