exports.run = async (client, message, args, guildConf, userConf) => {

    let apiPing = Math.round(client.ws.ping)
    const msg = await client.sendEmbed(message.channel, `Ping?`);

    let ping = msg.createdTimestamp - message.createdTimestamp;

    await client.editEmbed(message.channel, msg.id, 'Pong!', "", [
        {
            name: "Bot Latency",
            value: `${ping}ms`
        },
        {
            name: "API Latency",
            value: `${apiPing}ms`
        }
    ])
    return;

}

module.exports.help = {
    name: "ping",
    description: "Pings the Bot",
    dm: true,
    cooldown: 5,
    aliases: ["p"]
}
