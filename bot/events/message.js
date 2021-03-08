module.exports = async (client, message) => {

    if (message.author.bot) return;
    if (!message.guild) return;

    // Prefix caching
    let prefix = client.prefixes.get(message.guild.id);
    if (prefix === undefined) prefix = await client.serverDB.get(`${message.guild.id}.prefix`);
    client.prefixes.set(message.guild.id, prefix);
    //if (message.mentions.has(client.user.id), { ignoreRoles: true, ignoreEveryone: true }) return client.sendEmbed(message.channel, "Current Guild Settings", `Prefix: \`${prefix}\`\nGuildID: ${message.guild.id}`);
	if (!message.content.startsWith(prefix)) return;

    // Ensure guild
    let guildConf = await client.serverDB.ensure(message.guild.id, {
        guildName: message.guild.name,
        prefix: global.config.get("prefix", "pm!"),
        panelURL: null,
        panelAPIKey: null,
        serversCreated: 0,
        packages: [],
    });

    // Ensure per guild member
    let userConf = await client.userDB.ensure(`${message.author.id}-${message.guild.id}`, {
        panelAPIKey: null,
        focused: null,
        coins: 0,
        servers: [],
        products: [],
        panelData: []
    });
    
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
    let args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    if (global.config.get("deleteMessage", false)) await message.delete();
    if (global.config.get("maintenance") && !client.isOwner(message)) return client.sendEmbed(message.channel, global.config.get("botName", "Pteromanager") + " is currently in maintenance! Check back soon!");

    if (!message.guild && !cmd.help.dm) return client.sendEmbed(message.channel, "You may only use that command in servers!");

    if (cmd.help.staff != null) {
        if (!message.member.hasPermission("ADMINISTRATOR") && !client.isOwner(message)) {
            return client.sendErrorEmbed(message.channel, `Missing: ADMINISTRATOR`);
        }
    }

    if (cmd.help.owner != null) {
        if (!client.isOwner(message)) {
            return client.sendErrorEmbed(message.channel, `Missing: OWNER`);
        }
    }

    try {
        cmd.run(client, message, args, guildConf, userConf);
        client.log("command", `[Guild: ${message.guild.name}] [Channel: "${message.channel.name}"] [User: "${message.author.username}#${message.author.discriminator}"]: "${message.content || JSON.stringify(message.embeds)}"`);
    } catch (e) {
        client.error(4, `Could not run command "${cmd}"\n${e}`);
        await client.sendErrorEmbed(message.channel, "An unknown error has occurred.\nReport this to: FlaringPhoenix#0001");
        return;
    }

    return;

};