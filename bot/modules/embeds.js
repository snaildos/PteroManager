module.exports = (client) => {

    client.sendEmbed = (channel, title, description, fields, footer, color, thumbnail) => {
        return new Promise((resolve, reject) => {
            channel.send({
                embed: {
                    title: title,
                    description: description,
                    fields: fields,
                    thumbnail: { url: thumbnail || "" },
                    color: color || global.config.get("embed.color", "#27a9e1"),
                    footer: { text: footer || global.config.get("embed.footer", "Pteromanager | Made by FlaringPhoenix#0001") }
                }
            }).then(message => {
                resolve(message);
                return message;
            }).catch(err => {
                reject(err);
            });
        });
    }

    client.sendErrorEmbed = (channel, error) => {
        return new Promise((resolve, reject) => {
            channel.send({
                embed: {
                    title: ":x: ERROR",
                    description: `\`\`\`${error}\`\`\``,
                    color: global.config.get("embed.color", "#27a9e1"),
                }
            }).then(message => {
                resolve(message);
            }).catch(err => {
                reject(err);
            });
        });
    }



    client.editEmbed = (channel, message, title, description, fields, footer, color, thumbnail) => {
        return new Promise(async (resolve, reject) => {
            let m = await channel.messages.fetch(message);
            m.edit({
                embed: {
                    title: title,
                    description: description,
                    fields: fields,
                    thumbnail: { url: thumbnail || "" },
                    color: color || global.config.get("embed.color", "#27a9e1"),
                    footer: { text: footer || global.config.get("embed.footer", "Pteromanager | Made by FlaringPhoenix#0001") }
                }
            }).then(message => {
                resolve(message);
            }).catch(err => {
                reject(err);
            });
        });
    }


}
