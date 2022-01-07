const { getPrivateData } = require('../controllers/privateController');
const { protect } = require('../middleware/auth');

const router = require('express').Router();

router.get('/', protect, getPrivateData);

module.exports = router;
