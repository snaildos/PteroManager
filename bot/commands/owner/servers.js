exports.run = async (client, message, args) => {
    let arrayOfServers = [];

    const servers = client.guilds.cache;
    servers.map(g => arrayOfServers.push({ name: g.name, id: g.id, members: g.memberCount }));
    
    let members = args[1];

	switch (args[0]) {
        case 'lessthan':
        case 'less':
        case '<':
            if (!members) return client.sendErrorEmbed(message.channel, "Missing amount of members");
            if (isNaN(members)) return client.sendErrorEmbed(message.channel, "Amount of members is not a number");
            arrayOfServers = arrayOfServers.filter(x => x.members < members);

			if (arrayOfServers.length === 0) {
				await client.sendErrorEmbed(message.channel, "Found 0 guilds with the amount of members you specified.");
        		return;
            };

            break;
        case '<=':
            if (!members) return client.sendErrorEmbed(message.channel, "Missing amount of members");
            if (isNaN(members)) return client.sendErrorEmbed(message.channel, "Amount of members is not a number");
            arrayOfServers = arrayOfServers.filter(x => x.members <= members);

			if (arrayOfServers.length === 0) {
				await client.sendErrorEmbed(message.channel, "Found 0 guilds with the amount of members you specified.");
        		return;
            };

            break;
        case 'morethan':
        case 'more':
        case '>':
            if (!members) return client.sendErrorEmbed(message.channel, "Missing amount of members");
            if (isNaN(members)) return client.sendErrorEmbed(message.channel, "Amount of members is not a number");
            arrayOfServers = arrayOfServers.filter(x => x.members > members);

			if (arrayOfServers.length === 0) {
				await client.sendErrorEmbed(message.channel, "Found 0 guilds with the amount of members you specified.");
        		return;
            };

            break;
        case '>=':
            if (!members) return client.sendErrorEmbed(message.channel, "Missing amount of members");
            if (isNaN(members)) return client.sendErrorEmbed(message.channel, "Amount of members is not a number");
            arrayOfServers = arrayOfServers.filter(x => x.members >= members);

			if (arrayOfServers.length === 0) {
				await client.sendErrorEmbed(message.channel, "Found 0 guilds with the amount of members you specified.");
        		return;
            };

            break;
        case 'equal':
        case '=':
            if (!members) return client.sendErrorEmbed(message.channel, "Missing amount of members");
            if (isNaN(members)) return client.sendErrorEmbed(message.channel, "Amount of members is not a number");
            arrayOfServers = arrayOfServers.filter(x => x.members === members);

			if (arrayOfServers.length === 0) {
				await client.sendErrorEmbed(message.channel, "Found 0 guilds with the amount of members you specified.");
        		return;
            };

            break;
    }

    let sortedServers = arrayOfServers.sort(function (a, b) { return b.members - a.members })
    let currentPage = 1;
    
    let serverPages = client.paginator(sortedServers, currentPage, 15);
    
    const sentEmbed = await client.sendEmbed(message.channel, `Servers [${client.guilds.cache.size}]`, serverPages.data.map(g => `**${g.name}** - Members: ${g.members}`).join("\n"));
    
    if (arrayOfServers.length > 15) {
    await sentEmbed.react("⏪");
    await sentEmbed.react("◀️");
    await sentEmbed.react("▶️");
    await sentEmbed.react("⏩");
    await sentEmbed.react("❎");

    const filter = (reaction, user) => {
        return ['⏪', '◀️', '▶️', '⏩', '❎'].includes(reaction.emoji.name) && user.id == message.author.id;
    }

    const reactionCollector = sentEmbed.createReactionCollector(filter, { time: 60000 });

    reactionCollector.on('collect', collected => {
        const reaction = collected;
        reaction.users.remove(message.author.id);
        switch (reaction.emoji.name) {
            case "⏪": {
                currentPage = 1;
                serverPages = client.paginator(sortedServers, currentPage, 10);
                client.editEmbed(message.channel, sentEmbed.id, `Servers`, serverPages.data.map(g => `**${g.name}** - Members: ${g.members}`).join("\n"));
                break;
            }
            case "◀️": {
                serverPages.prePage === null ? currentPage = serverPages.currentPage : currentPage = serverPages.prePage;
                serverPages = client.paginator(sortedServers, currentPage, 10);
                client.editEmbed(message.channel, sentEmbed.id, `Servers`, serverPages.data.map(g => `**${g.name}** - Members: ${g.members}`).join("\n"));
                break;
            }
            case "▶️": {
                serverPages.nextPage === null ? currentPage = serverPages.currentPage : currentPage = serverPages.nextPage;
                serverPages = client.paginator(sortedServers, currentPage, 10);
                client.editEmbed(message.channel, sentEmbed.id, `Servers`, serverPages.data.map(g => `**${g.name}** - Members: ${g.members}`).join("\n"));
                break;
            }
            case "⏩": {
                currentPage = serverPages.totalPages;
                serverPages = client.paginator(sortedServers, currentPage, 10);
                client.editEmbed(message.channel, sentEmbed.id, `Servers`, serverPages.data.map(g => `**${g.name}** - Members: ${g.members}`).join("\n"));
                break;
            }
            case "❎": {
                sentEmbed.reactions.removeAll()
                break;
            }
        }
    });

    reactionCollector.on('end', () => {
        sentEmbed.reactions.removeAll()
    });
        
    }

    return;

}

module.exports.help = {
    name: "servers",
    description: "Generates a pastebin link with all the current guilds",
    dm: true,
    owner: true,
    aliases: []
}
