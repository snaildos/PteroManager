exports.run = async (client, message, args, guildConf, userConf) => {

    let panel = guildConf.panelURL;
    if (!panel) await client.sendErrorEmbed(message.channel, "No panel has been setup!");

    const subCommands = require('./account/index.js');

    let command = subCommands[args[0]];
    if (!command) {
        await client.sendEmbed(message.channel, "Invalid sub command!", "Value: \`[signup, api, info, link, reset, unlink]\`");
        return;
    }

    try {
        command.run(client, message, args.shift(), guildConf, userConf);
    } catch(e) {
        console.error(e);
        client.sendErrorEmbed(message.channel, "An unexpected error has occured");
        return;
    }
    
}

module.exports.help = {
    name: "account",
    description: "Manage your account on the panel",
    dm: false,
    aliases: ["acc"]
}
