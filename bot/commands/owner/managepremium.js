exports.run = async (client, message, args, guildConf, userConf) => {

    let guild = client.guilds.cache.get(args[0]) || message.guild;
    if (!guild) return client.sendErrorEmbed(message.channel, "Invalid guild!");

    let premium = await client.serverDB.get(`${guild.id}.premium`) || false;
    let owner = await client.users.fetch(guild.ownerID);

    let embed = await client.sendEmbed(message.channel, "Manage Premium", `**GuildName**: "${guild.name}"\n**GuildID**: ${guild.id}\n**Owner**: ${owner.username}#${owner.discriminator}\n**Premium**: ${premium ? "✅" : "❌"}\n\n✅ -> Give Premium\n❌ -> Remove Premium`);

    await embed.react('✅');
    await embed.react('❌');

    const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    
    let collector = embed.createReactionCollector(filter, { max: 1, time: 60000 });
    
    collector.on('collect', async (reaction, user) => {
        reaction.users.remove(message.author.id);
        switch (reaction.emoji.name) {
            case '✅': {
                if (await client.serverDB.get(`${guild.id}.premium`)) {
                    await embed.reactions.removeAll();
                    return client.editEmbed(message.channel, embed.id, "Error!", `That guild already has premium!`);
                }
                await promptNotify(true);
                break;
            }; 
            case '❌': {
                if (!await client.serverDB.get(`${guild.id}.premium`)) {
                    await embed.reactions.removeAll();
                    return client.editEmbed(message.channel, embed.id, "Error!", `That guild already doesn't have premium!`);
                }
                await promptNotify(false);
                break;
            };
        }
    });

    async function promptNotify(bool = true) {
        await client.editEmbed(message.channel, embed.id, "Notify", "Would you like to notify the guild owner? (Via dms)");

        collector = embed.createReactionCollector(filter, { max: 1, time: 60000 });

        collector.on('collect', async (reaction, user) => {
            embed.reactions.removeAll();
            await togglePremium(bool)
            switch (reaction.emoji.name) {
                case '✅': {
                    try {
                        await client.sendEmbed(owner, "Premium Change", `**Your Guild**: "${guild.name}" was just granted premium!`);
                    } catch(e) {
                        client.log("Premium", `Could premium notification dm to ${owner.username}#${owner.discriminator}`);
                    } finally {
                        client.log("Premium", `Send premium notification dm to ${owner.username}#${owner.discriminator}`);
                    }
                    await client.editEmbed(message.channel, embed.id, "Success!", `**Guild**: "${guild.name}" now has premium!`);
                    break;
                }; 
                case '❌': {
                    try {
                        await client.sendEmbed(owner, "Premium Change", `**Your Guild**: "${guild.name}" no longer has premium...`);
                    } catch(e) {
                        client.log("Premium", `Could premium notification dm to ${owner.username}#${owner.discriminator}`);
                    } finally {
                        client.log("Premium", `Send premium notification dm to ${owner.username}#${owner.discriminator}`);
                    }
                    await client.editEmbed(message.channel, embed.id, "Success!", `"${guild.name}" no longer has premium...`);
                    break;
                };
            }
        });

        collector.on('end', collected => {
            embed.reactions.removeAll();
        });

    }

    async function togglePremium(enabled = true) {
        await client.serverDB.set(`${guild.id}.premium`, enabled);
        client.log("Premium", `Guild: "${guild.name}" (${guild.id}) ${enabled ? `was just given premium by ${message.author.tag}` : `just had it's premium taken by ${message.author.tag}`}`);
        return;
    }
}

module.exports.help = {
    name: "managepremium",
    description: "Manage premium for a guild",
    dm: true,
	owner: true,
    aliases: []
}