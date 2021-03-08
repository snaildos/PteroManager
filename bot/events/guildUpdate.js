module.exports = async (client, oldGuild, newGuild) => {

    // Ensure guild
    let guildConf = await client.serverDB.ensure(newGuild.id, {
        guildName: newGuild.name,
        prefix: global.config.get("prefix", "pm!"),
        panelURL: null,
        panelAPIKey: null,
        serversCreated: 0,
        packages: [],
    });
    if (!guildConf) return;

    let oldName = oldGuild.name;
    let newName = newGuild.name;

    if (oldName != newName) client.serverDB.set(`${oldGuild.id}.guildName`, newName);

};
