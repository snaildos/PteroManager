exports.run = async (client, message, args, guildConf, userConf) => {

    let premium = guildConf.premium || false;
    await client.sendEmbed(message.channel, "Premium", `${premium ? "✅ This guild has premium!" : "❌ This guild does not have premium"}`);
    return;

}