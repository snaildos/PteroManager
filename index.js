// .env variables
require('dotenv').config();

// global config
global.config = require('./config/index');

// Init REST api
require('./api');

// Init discord shards
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot/index.js', {
    totalShards: 'auto',
    token: process.env.TOKEN
});

// Shard events
manager.on('shardCreate', (shard) => {
    console.log(`Launched shard ${shard.id}`);
});

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});

manager.spawn();