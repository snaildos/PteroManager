const request = require('request');

exports.run = async (client, message, args, guildConf, userConf) => {

    let panel = guildConf.panelURL;

    await client.sendEmbed(message.channel, "Check your dms");

    let msg;
    try {
        msg = await client.sendEmbed(message.author, "Account API", `Please send your api key from the panel below\n\nv0.7 Pterodactyl -> [Click-Here](${guildConf.panelURL}/account/security) to manage your keys.\nv1.0+ Pterodactyl -> [Click-Here](${guildConf.panelURL}/account/api) to manage your keys.`);
    } catch(e) {
        return client.sendErrorEmbed(message.channel, "Please turn your dms on and try again.");
    }

    const filter = m => m.author.id === message.author.id;
    msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            let msg = collected.first();
            let content = msg.content;

            request.get(`${panel}/api/client`, {
                auth: {
                    bearer: content
                }
            }, async function(err, response, body) {

                if (err) return client.sendErrorEmbed(message.author, "An error has occured!");
                if (response.statusCode === 403) return client.sendErrorEmbed(message.author, "Invalid api key!");

                client.userDB.set(`${message.author.id}-${message.guild.id}.panelAPIKey`, content);
                client.log("PTERODACTYL", `${guildConf.panelURL} -> checked user's api key`);
                await client.sendEmbed(message.author, "Your api key has been saved!");
                return;

            });

        }).catch(() => client.sendErrorEmbed(message.author, "You have not responded in time. Please start over."));

}