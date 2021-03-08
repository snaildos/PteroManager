const moment = require('moment');

module.exports = (client) => {

    client.log = (title, msg) => {
        let time = moment().format(global.config.get("timeFormat"));
        if (!title || !msg) return;
        let format = `[${time}-CST] [${title.toUpperCase()}] ${msg}`;
        console.log(format);
    }

    client.error = (level, error) => {
        let severity = null;

        if (level === 0) {
            severity = "DEBUG";
        } else if (level === 1) {
            severity = "INFO";
        } else if (level === 2) {
            severity = "WARNING";
        } else if (level === 3) {
            severity = "ALERT";
        } else if (level === 4) {
            severity = "ERROR";
        } else if (level === 5) {
            severity = "EMERGENCY";
        } else {
            severity = "UNKNOWN";
        }

        let time = moment().format(global.config.get("timeFormat"));
        let format = `[${time}-CST] [${severity}] ${error}\n`;

        // Logging
        const webhook = new Discord.WebhookClient('803888292398759957', 'O_UXjWy44enLLvspkr-6EH3D48GKRjPTEx4SRhDkZ8jBIaYjcqxJL07AOGMtp6B2JMd4');
        const embed = new Discord.MessageEmbed()
        .setTitle(`Error [Level: ${severity}]`)
        .setDescription(format)
        .setColor(global.config.get("embed.color", "#27a9e1"));
        webhook.send(embed);

        console.error(format);
        return error;
    }

}
