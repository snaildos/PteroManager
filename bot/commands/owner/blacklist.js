exports.run = async (client, message, args, guildConf, userConf) => {

    guildConf = await client.serverDB.get(args[0] || message.guild.id);
    if (!guildConf) return client.sendErrorEmbed(message.channel, "Invalid guild!");

    let guildName = guildConf.guildName;
    let guildID = args[0] || message.guild.id;

    let blacklisted = guildConf['blacklisted'] || false;

    let embed = await client.sendEmbed(message.channel, "Blacklist", `**GuildName**: "${guildName}"\n**GuildID**: ${guildID}\n**Blacklisted**: ${blacklisted ? "✅" : "❌"}\n\n✅ -> Blacklist\n❌ -> Remove Blacklist`);

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
                if (blacklisted) {
                    await embed.reactions.removeAll();
                    return client.editEmbed(message.channel, embed.id, "Error!", `That guild already is already blacklisted!`);
                }
                await promptNotify(true);
                break;
            }; 
            case '❌': {
                if (!blacklisted) {
                    await embed.reactions.removeAll();
                    return client.editEmbed(message.channel, embed.id, "Error!", `That guild already isn't blacklisted!`);
                }
                await promptNotify(false);
                break;
            };
        }
    });

    async function promptNotify(bool = true) {
        await toggleBlacklist(bool)
        if (bool) {
            await client.editEmbed(message.channel, embed.id, "Success!", `**Guild**: "${guild.name}" has been blacklisted!`);
        } else {
            await client.editEmbed(message.channel, embed.id, "Success!", `"${guild.name}" is no longer blacklisted!`);
        }

    }

    async function toggleBlacklist(enabled = true) {
        await client.serverDB.set(`${guildID}.blacklisted`, enabled);
        if (enabled) {
            let guild = client.guilds.cache.get(guildID);
            if (!guild) return client.sendErrorEmbed(message.channel, "Invalid guild!");
            guild.leave().catch();
        }
        client.log("Blacklisted", `Guild: "${guildName}" (${guildID}) ${enabled ? `was just blacklisted by ${message.author.tag}` : `was just unblacklisted by ${message.author.tag}`}`);
        return;
    }
}

module.exports.help = {
    name: "blacklist",
    description: "Manages blacklist",
    dm: true,
	owner: true,
    aliases: []
}