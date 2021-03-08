const router = require('express').Router();

router.use('/version', require('./version'));
router.use('/user', require('./user'));
router.use('/guild', require('./guild'));

module.exports = router;
