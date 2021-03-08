const moment = require('moment');

exports.run = async (client, message, args, guildConf, userConf) => {

    let panel = guildConf.panelURL;
    let key = guildConf.panelAPIKey;

    if (!panel) return client.sendErrorEmbed(message.channel, "No panel has been setup!");
    if (!key) return client.sendErrorEmbed(message.channel, "No admin api key has been setup!");

    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!target) return client.sendEmbed(message.channel, "")

    let panelData = await client.userDB.get(`${target.id}-${message.guild.id}.panelData`);
    if (panelData && panelData.length === 0) return client.sendErrorEmbed(message.channel, "They do not have an account");

    await client.sendEmbed(message.channel, target.user.username, `
**First Name**: ${panelData.first_name}
**Last Name**: ${panelData.last_name}
**Email:** ${panelData.email}
**Language**: ${panelData.language}
**Admin**: ${panelData.root_admin ? "✅" : "❌"}

**ID**: ${panelData.id}
**ExternalID**: ${panelData.external_id ? user.external_id : "❌"}
**2FA**: ${panelData["2fa"] ? "✅" : "❌"}

**Created**: ${moment(new Date()).diff(panelData.created_at, 'days') + ' days ago'}
**Last Updated**: ${moment(new Date()).diff(panelData.updated_at, 'days') + ' days ago'}`);
    return;

}

module.exports.help = {
    name: "user",
    description: "Fetches a user from the panel",
    dm: false,
    staff: true,
    aliases: []
}
