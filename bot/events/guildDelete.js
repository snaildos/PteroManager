const Discord = require('discord.js');

module.exports = (client, guild) => {
    client.log("LEAVES", `Guild Name: "${guild.name}" (ID: ${guild.id}). (Members: ${guild.memberCount})`);

    // Logging
    const webhook = new Discord.WebhookClient('803881869623427073', 'oB9GNxFjb9j7Fir8_zA-SxWR90fyO_HGLeB1eOmlQxD8twlm8pjn7a1hSyweX1uCRwVp');
    const embed = new Discord.MessageEmbed()
        .setTitle('Left Guild')
        .setDescription(`Name: ${guild.name}\nID: ${guild.id}\nMembers: ${guild.memberCount}`)
        .setColor(global.config.get("embed.color", "#27a9e1"));

    webhook.send(embed);
};