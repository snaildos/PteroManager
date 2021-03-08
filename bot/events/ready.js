module.exports = async (client) => {

    // Log stats
    client.log("STATS", `Servers: ${client.guilds.cache.size} - Channels: ${client.guilds.cache.map(s => s.channels.cache.size).reduce((a, b) => a + b)} - Users: ${client.guilds.cache.map(s => s.memberCount).reduce((a, b) => a + b)} - Emojis: ${client.guilds.cache.map(s => s.emojis.cache.size).reduce((a, b) => a + b)}`)

    // Bot invite
    client.invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${global.config.get("permissions", "0")}&scope=bot`;

    // Create help menu
    client.generateHelp();

    // Ensure all guilds are in the db
    client.guilds.cache.map(async (g) => {
        let guildConf = await client.serverDB.ensure(g.id, {
            guildName: g.name,
            prefix: global.config.get("prefix", "pm!"),
            panelURL: null,
            panelAPIKey: null,
            serversCreated: 0,
            packages: [],
        });
    });

    // Set Status
    setTimeout(async () => {
        await client.user.setActivity(`${client.guilds.cache.size} guilds [${global.config.get('prefix')}]`, { type: "WATCHING" });
        setInterval(async () => {
            await client.user.setActivity(`${client.guilds.cache.size} guilds [${global.config.get('prefix')}]`, { type: "WATCHING" });
        }, 15000);
    }, 5000)
    await client.user.setActivity(`just started!`, { type: "PLAYING" });

    client.log("BOT", `Bot is online (${client.user.tag})`)

};
