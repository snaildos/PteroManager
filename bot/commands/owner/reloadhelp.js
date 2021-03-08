exports.run = async (client, message, args, guildConf, userConf) => {

    client.generateHelp();
    await client.sendEmbed(message.channel, "Success!");
    return;
}

module.exports.help = {
    name: "reloadhelp",
    description: "Reloads help menu",
    dm: false,
    aliases: []
}