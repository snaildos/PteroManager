exports.run = async (client, message, args, guildConf, userConf) => {
    
    let panel = guildConf.panelURL;

    let key = guildConf.panelAPIKey;
    if (!key) return client.sendErrorEmbed(message.channel, "The panel's application api key has not been set!");

    if (userConf.panelData && userConf.panelData.length === 0) return client.sendErrorEmbed(message.channel, `You must signup\n${guildConf.prefix}account signup`);

    client.userDB.set(`${message.author.id}-${message.guild.id}`, {
        panelAPIKey: null,
        focused: null,
        coins: 0,
        servers: [],
        products: [],
        panelData: []
    });

    await client.sendEmbed(message.channel, "Success");
    return;

}