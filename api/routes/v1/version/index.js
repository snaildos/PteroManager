const router = require('express').Router();

router.get('/', async function(req, res, next) {
    return res.status(200).json(require('../../../../package.json')['version']);
});

module.exports = router;