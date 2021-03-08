exports.run = async (client, message, args, guildConf, userConf) => {

    let panel = guildConf.panelURL;

    return client.sendErrorEmbed(message.channel, "This sub command is almost done!");

    if (!client.transporter) return client.sendErrorEmbed(message.channel, "Mail is disabled");

    let option = args[1];
    if (!option) return client.sendErrorEmbed(message.channel, "Missing email or link code");

    let EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (EMAIL_REGEX.test(option)) {
    let code = Math.floor(Math.random()*90000000) + 10000000;
        try {
            await client.transporter.sendMail({
                from: '"PteroManager" <pteromanager@bluefoxhost.com>',
                to: option,
                subject: "Your Link Code",
                text: `Your link code is: ${code}`
            });
        } catch(e) {
            return client.sendErrorEmbed(message.channel, "There was an error sending the link email");
        }
        client.log("mail", `Sent link code (${code}) to: ${option}`);
        await client.userDB.set(`${message.author.id}-${message.guild.id}.linkCode`, code);
        await client.sendEmbed(message.channel, "Success!", `Check your email for your code.\nTip: *check your spam*\n\nTo finish verifying:\n\`${guildConf.prefix}account link <CODE>\``);
            return;
    } else {
        client.sendErrorEmbed(message.channel, "Invalid email!");
    }
    return;
    
}
