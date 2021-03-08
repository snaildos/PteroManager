const Discord = require('discord.js');

module.exports = async (client, guild) => {
    client.log("JOINS", `Guild Name: "${guild.name}" (ID: ${guild.id}). (Members: ${guild.memberCount})`);
    
    // Ensure guild
    let guildConf = await client.serverDB.ensure(guild.id, {
        guildName: guild.name,
        prefix: global.config.get("prefix", "pm!"),
        panelURL: null,
        panelAPIKey: null,
        serversCreated: 0,
        packages: [],
    });

    let blacklisted = guildConf['blacklisted'] || false;
    if (blacklisted) guild.leave().catch();

    const webhook = new Discord.WebhookClient('803881453271908352', '_O9LFYSBJQlnVh7JFMiKUR1SbZsUs5-wpfBKjO1N35G2I160J-_HQzPG607y9cFbJjtE');
    const embed = new Discord.MessageEmbed()
    .setTitle('Joined Guild')
    .setDescription(`Name: ${guild.name}\nID: ${guild.id}\nMembers: ${guild.memberCount}`)
	.setColor(global.config.get("embed.color", "#27a9e1"));

    webhook.send(embed);

};
