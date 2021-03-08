const router = require('express').Router();

router.get('/', async function(req, res, next) {

    let ID = req.params.userID;
    if (!ID) return res.status(404).json({ error: "missing user id" });

    let client = require('../../../index');

    let user = client.users.cache.get(ID) || await client.users.fetch(ID);
    if (!user) return res.status(404).json({ error: "invalid user id" });

    return res.status(200).json(user);

});

module.exports = router;