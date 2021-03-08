exports.run = async (client, message, args, guildConf, userConf) => {

    const subCommands = require('./premium/index.js');

    let command = subCommands[args[0]];
    if (!command) {
        await client.sendEmbed(message.channel, "Invalid sub command!", "Value: \`[status, perks, api]\`");
        return;
    }

    try {
        command.run(client, message, args.shift(), guildConf, userConf);
    } catch(e) {
        console.error(e);
        client.sendErrorEmbed(message.channel, "An unexpected error has occured");
        return;
    }
    
}

module.exports.help = {
    name: "premium",
    description: "Manage current guild premium",
    aliases: []
}
