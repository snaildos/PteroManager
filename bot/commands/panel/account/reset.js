const request = require('request');

exports.run = async (client, message, args, guildConf, userConf) => {

    let panel = guildConf.panelURL;

            let key = guildConf.panelAPIKey;
            if (!key) return client.sendErrorEmbed(message.channel, "The panel's application api key has not been set!");

            if (userConf.panelData.length === 0) return client.sendErrorEmbed(message.channel, `You must signup\n${guildConf.prefix}account signup`);

            if (userConf.panelData && userConf.panelData.length === 0) return client.sendErrorEmbed(message.channel, `You must signup\n${guildConf.prefix}account signup`);
            let panelData = userConf.panelData;

            let password = client.generatePassword(10);

            let data = {
                username: panelData.username,
                email: panelData.email,
                first_name: panelData.first_name,
                last_name: panelData.last_name,
                password: password
            }

            request.patch(`${panel}/api/application/users/${panelData.id}`, {
                auth: {
                    bearer: key
                },
                json: data
            }, async function(err, response, body) {

                let errors = response.body.errors;
                if (errors && errors.length > 0) return client.sendErrorEmbed(message.channel, errors[0].detail);

                if (err) return client.sendErrorEmbed(message.channel, "An error has occured");
                if (response.statusCode === 403) return client.sendErrorEmbed(message.channel, "Invalid api key!");

                client.userDB.set(`${message.author.id}-${message.guild.id}.panelData`, response.body.attributes);

                await client.sendEmbed(message.channel, `Your password has been reset!`);

                try {
                    await client.sendEmbed(message.author, `Account New Password`, password);
                } catch(e) {
                    return client.sendErrorEmbed(message.channel, "Turn on your dms! Also, reset your password again!");
                }

            });
    
}