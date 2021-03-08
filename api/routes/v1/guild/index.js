const router = require('express').Router();

router.get('/:guildID', async function(req, res, next) {

    let ID = req.params.guildID;
    if (!ID) return res.status(404).json({ error: "missing guild id" });

    let client = require('../../../../bot/index');

    let user = client.guilds.cache.get(ID);
    if (!user) return res.status(404).json({ error: "invalid guild id" });

    return res.status(200).json(user);

});

module.exports = router;