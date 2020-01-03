const { RichEmbed } = require("discord.js");

module.exports = (message) => {
	const saber = message.client;
	if(message.author.id === saber.user.id) return;

	const guildDash = saber.dash.get(message.guild.id);
	if(message.content.startsWith(guildDash.prefix)) return;

	const logChannel = message.guild.channels.get(guildDash.logChannel);
	if(logChannel && message.content !== "") {
		const embed = new RichEmbed()
			.setTitle(`Message deleted by ${message.author.username} (${message.author.id})`)
			.setDescription(`Content:\n${message.content}`)
			.setColor("RED");

		logChannel.send(embed);
	}
};
