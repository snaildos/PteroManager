module.exports = (client) => {

    client.getServerCount = async() => {
        let guilds = (await client.shard.fetchClientValues('guilds.cache.size')).reduce((a, b) => a + b);
        return guilds;
    }

    client.getChannelCount = async() => {
        let channels = (await client.shard.fetchClientValues('guilds.cache.size')).reduce((a, b) => a + b);
        return channels;
    }

    client.getEmojiCount = async() => {
        let emojis = (await client.shard.fetchClientValues('guilds.cache.size')).reduce((a, b) => a + b);
        return emojis;
    }

    client.getUserCount = async() => {
        let emojis = (await client.shard.fetchClientValues('guilds.cache.size')).reduce((a, b) => a + b);
        return emojis;
    }

}
