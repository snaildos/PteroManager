exports.run = async (client, message, args, guildConf, userConf) => {

    let premium = guildConf.premium || false;
    if (!premium) return client.sendErrorEmbed(message.channel, "This guild does not have premium!");

    await client.sendEmbed(message.channel, "Premium API", "API Base Url: https://api.pteromanager.com/v1\n\n**Authenication**:\nBearer Token: ||SOON!||");
    return;

}