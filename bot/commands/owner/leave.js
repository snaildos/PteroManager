const Discord = require("discord.js");

exports.run = async (client, message, args, guildConf, userConf) => {

    let guildID = args[0];
    if (!guildID) return client.sendErrorEmbed(message.channel, "Missing guild id");
    
    if (guildID === 'members') {
        	let members = args[1];

			if (!members) return client.sendErrorEmbed(message.channel, "Missing amount of members");

			const server = client.guilds.cache.map(server => { return { name: server.name, id: server.id, members: server.memberCount } });        
			const filtered = server.filter(x => x.members <= members);

			if (filtered.length === 0) {
				await client.sendErrorEmbed(message.channel, "Found 0 guilds with the amount of members you specified.");
        		return;
            };

			/*
			try {
            	await filtered.forEach(guild => { guild.leave() })
            } catch(e) {
        		console.error(e);
        		await client.sendErrorEmbed(message.channel, "Could not leave those guilds");
        		return;
    		}
			*/
        	
        	await client.sendEmbed(message.channel, "Success!", `I have left ${filtered.length} ${filtered.length === 1 ? 'server' : 'servers'}.`);
    		return;
    }
    
    if (isNaN(guildID)) return client.sendErrorEmbed(message.channel, "Invalid guild id");

    let guild = client.guilds.cache.get(guildID);
    if (!guild) return client.sendErrorEmbed(guildID);

    try {
        await guild.leave();
    } catch(e) {
        console.error(e);
        await client.sendErrorEmbed(message.channel, "Could not leave that guild");
        return;
    }

    await client.sendEmbed(message.channel, "Success!", `I have left **${guild.name}** (${guild.id})\nThey had **${guild.memberCount}** members...`);
    return;

}

module.exports.help = {
    name: "leave",
    description: "Leaves a guild",
    dm: true,
	owner: true,
    aliases: []
}