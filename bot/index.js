// .env variables
require('dotenv').config();

const Discord = require("discord.js");
const Josh = require("josh");
const fs = require('fs');
const mongoProvider = require('@joshdb/mongo');
const sqliteProvider = require('@joshdb/sqlite');
const nodemailer = require('nodemailer');
require('moment-duration-format');

global.config = require('../config/index');

// Create discord client
const client = new Discord.Client({
    ws: {
        intents: [
            'GUILD_MESSAGES',
            'GUILDS',
            'DIRECT_MESSAGES',
            'GUILD_MESSAGE_REACTIONS'
        ]
    },
    disableEveryone: true
});

// Global variables
client.version = require('../package.json')['version'];
client.modules = [ "general", "panel", "billing", "staff", "owner" ];
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.prefixes = new Discord.Collection();

// Setup database
switch (global.config.get("database", "sqlite")) {
    case "mongo": {
        client.serverDB = new Josh({
            name: 'servers',
            provider: mongoProvider,
            providerOptions: {
                collection: 'servers',
                dbName: "PteroManager",
                url: process.env.MONGO
            }
        });
        client.userDB = new Josh({
            name: 'users',
            provider: mongoProvider,
            providerOptions: {
                collection: 'users',
                dbName: "PteroManager",
                url: process.env.MONGO
            }
        });
        break;
    };
    case "sqlite": {
        client.serverDB = new Josh({
            name: 'servers',
            provider: sqliteProvider,
        });
        client.userDB = new Josh({
            name: 'users',
            provider: sqliteProvider,
        });
        break;
    }
}

// Mail transport
if (global.config.get("mail.enabled")) {
    client.transporter = nodemailer.createTransport({
        host: global.config.get("mail.host"),
        port: global.config.get("mail.port"),
        // true for 465, false for other ports
        secure: global.config.get("mail.secure", false),
        auth: global.config.get("mail.auth")
    });
}

// Load modules
fs.readdir(`${process.cwd()}/bot/modules/`, (err, files) => {
    if (err) { throw err }
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        require(`${process.cwd()}/bot/modules/${file}`)(client);
    }
    client.loadEvents();
    client.loadCommands();
});

// Log into client
try {
    client.login(process.env.TOKEN);
} catch(e) {
    console.error(`Invalid token: ${e}`);
    process.exit(2);
}

module.exports = client;