const axios = require('axios');

exports.run = async (client, message, args, guildConf, userConf) => {

    try {
        let res = await axios.get('https://api.pteromanager.com/v1/version');
        let latest = res.data;
        let current = require('../../../package.json')['version'];
        await client.sendEmbed(message.channel, "Version", `Current: v${current}\nLatest: v${latest}\n\n${latest > current ? "This bot is outdated! Update: (Click-Here)[https://github.com/FlaringPhoenix/PteroManager]" : "This bot is up to date!"}`);
    } catch(e) {
        await client.sendErrorEmbed(message.channel, "Could not check version");
        return;
    }

}

module.exports.help = {
    name: "version",
    description: "Check's the version of the bot",
    dm: true,
    cooldown: 15,
    aliases: ["ver"]
}
