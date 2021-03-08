const Discord = require("discord.js");

exports.run = async (client, message, args, guildConf, userConf) => {

    let prefix = args[0];
    if (!prefix) return client.sendErrorEmbed(message.channel, `Please provide a prefix`);

    client.serverDB.set(`${message.guild.id}.prefix`, prefix.toLowerCase());
    client.prefixes.set(message.guild.id, prefix);

    await client.sendEmbed(message.channel, `Success!`, `**Prefix** has been saved in the database.`);
    return;

}

module.exports.help = {
    name: "setprefix",
    description: "Sets the current guilds prefix",
    dm: true,
    staff: true,
    aliases: ["sp"]
}
