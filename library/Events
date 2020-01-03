const load = (event) => require(`./${event}`);

module.exports = (saber) => {
	saber.on("ready", () => load("ready.js")(boat));
	saber.on("message", load("message.js"));
	saber.on("guildCreate", load("guildJoin.js"));
	saber.on("messageDelete", load("messageDelete.js"));
	saber.on("messageUpdate", load("messageEdit.js"));
};
