const Discord = require("discord.js");
const moment = require("moment");
const request = require("request");

exports.run = async (client, message, args, guildConf, userConf) => {
    let panel = guildConf.panelURL;
    let key = guildConf.panelAPIKey;

    if (!panel) return client.sendErrorEmbed(message.channel, "No panel has been setup!");
    if (!key) return client.sendErrorEmbed(message.channel, "No admin api key has been setup!");

    request.get(`${panel}/api/application/nests`, {
        'auth': {
            'bearer': key
        }
    }, async function(err, response, body) {

        if (err) return client.sendErrorEmbed(message.channel, "Could not connect to panel");
        if (response.statusCode === 403) return await client.sendErrorEmbed(message.channel, "Invalid admin api key!");

        body = JSON.parse(body);
        body = body.data;

        const embed = new Discord.MessageEmbed()
            .setTitle("Nests")
            .setColor(global.config.get("embed.color"))
            .setFooter(global.config.get("embed.footer"))

            for (let i = 0; i < body.length && i < 15; i++) {
                let nest = body[i].attributes;
                embed.addField(`${nest.id}. ${nest.name}`, `
                **Description**: ${nest.description}
                **Author**: ${nest.author}
                **Created**: ${moment(new Date()).diff(nest.created_at, 'days') + ' days ago'}
                **Last Updated**: ${moment(new Date()).diff(nest.updated_at, 'days') + ' days ago'}`, true)
            }

        await message.channel.send(embed);
        client.log("PTERODACTYL", `${guildConf.panelURL} -> fetched ${body.length} nests`);

    });


}

module.exports.help = {
    name: "nests",
    description: "Shows all of the panel nests",
    staff: true,
    aliases: ["n"]
}
