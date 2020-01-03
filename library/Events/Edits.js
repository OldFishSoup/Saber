const { RichEmbed } = require("discord.js");

module.exports = (oldMessage, newMessage) => {
	const saber = oldMessage.client;
	if(newMessage.content === "") return;
	if(newMessage.editedAt === null) return;
	if(newMessage.author.id === saber.user.id) return;
	if(oldMessage.guild.channels.has(saber.dash.get(oldMessage.guild.id).logChannel)) {
		const embed = new RichEmbed()
			.setTitle(`Message edited by ${oldMessage.author.username} (${oldMessage.author.id})`)
			.addField("Old content", oldMessage.content)
			.addField("New Content", newMessage.content)
			.setFooter(`Edited at ${newMessage.editedAt}`)
			.setColor("RED");
		oldMessage.guild.channels.get(saber.dash.get(oldMessage.guild.id).logChannel).send(embed);
	}
};
