const moment = require('moment');

exports.run = async (client, message, args, guildConf, userConf) => {

    let panel = guildConf.panelURL;

    let key = guildConf.panelAPIKey;
    if (!key) return client.sendErrorEmbed(message.channel, "The panel's application api key has not been set!");

    if (userConf.panelData && userConf.panelData.length === 0) return client.sendErrorEmbed(message.channel, `You must signup\n${guildConf.prefix}account signup`);
    let panelData = userConf.panelData;

    try {
        await client.sendEmbed(message.author, "Panel User", `
**First Name**: ${panelData.first_name}
**Last Name**: ${panelData.last_name}
**Language**: ${panelData.language}
**Admin**: ${panelData.root_admin ? "✅" : "❌"}

**ID**: ${panelData.id}
**ExternalID**: ${panelData.external_id ? user.external_id : "❌"}
**2FA**: ${panelData["2fa"] ? "✅" : "❌"}

**Created**: ${moment(new Date()).diff(panelData.created_at, 'days') + ' days ago'}
**Last Updated**: ${moment(new Date()).diff(panelData.updated_at, 'days') + ' days ago'}`);
    } catch(e) {
        return client.sendErrorEmbed(message.channel, "Please turn your dms on!")
    }

    await client.sendEmbed(message.channel, "Check your dms!");
    return;
    
}
