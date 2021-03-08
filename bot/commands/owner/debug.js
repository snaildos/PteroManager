exports.run = async (client, message, args, guildConf, userConf) => {

    if (args[0] && ["guildConf", "userConf", "me"].includes(args[0])) {
        await client.sendEmbed(message.channel, "Check your dms!");
        switch(args[0]) {
            case "guildConf": {
                let g = args[1] ? await client.serverDB.get(args[1]) : guildConf;
                await client.sendEmbed(message.author, "Debug", `guildconf:\n\`\`\`json\n${JSON.stringify(g, null, 3)}\`\`\``);
                return;
            }
            case "userConf": {
                let u = args[1] ? await client.userDB.get(`${args[1]}-${message.guild.id}`) : userConf;
                await client.sendEmbed(message.author, "Debug", `userConf:\n\`\`\`json\n${JSON.stringify(u, null, 3)}\`\`\``);
                return;
            }
            case "me": {
                let me = message.guild.me;
                await client.sendEmbed(message.author, "Debug", `me:\n\`\`\`json\n${JSON.stringify({permissions: me.permissions.toArray()}, null, 3)}\`\`\``);
                return;
            }
        }
    } else {
        return client.sendErrorEmbed(message.channel, "Invalid option\n- guildConf\n- userConf");
    }

}

module.exports.help = {
    name: "debug",
    description: "Debug's current guild",
    dm: false,
	owner: true,
    aliases: []
}