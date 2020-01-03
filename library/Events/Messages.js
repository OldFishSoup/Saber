const { RichEmbed } = require("discord.js");

module.exports = (message) => {
	const saber = message.client;
	saber.messages++;
	if(message.author.bot) return;

	saber.dash.ensure(message.guild.id, {
		prefix: config.saber.prefix,
		logChannel: null,
		deleteInvites: true,
		logging: false,
		ignoreChannels: [],
		bannedWords: []
	});
	
	/**
	 *   Filter for banned words.
	 */
	if(!saber.dash.get(message.guild.id).bannedWords.size >= 1 && !message.content.startsWith(`${saber.dash.get(message.guild.id).prefix}conf`)) {
		const words = saber.dash.get(message.guild.id).bannedWords;
		for(let i = 0; i < words.length; i++) {
			if(message.content.includes(words[i].toLowerCase())) {
				message.delete();
				message.channel.send("Please try not to use a word which we banned from our community.");
			}

		}

	}
	saber.partners.ensure(message.author.id, {
		partner: null
	});
	
	
	/**
	 *   Filter for other Discord invite links.
	 */
	const guildDash = saber.dash.get(message.guild.id);
	if(guildDash.deleteInvites === true && !guildDash.ignoreChannels.includes(message.channel.id)) {
		if(message.content.includes("discord.gg/") || message.content.includes("discordapp.com/invite")) {
			message.channel.send("Please do not send invites here!");
			message.delete();

			const logChannel = message.guild.channels.get(guildDash.logChannel);
			if(logChannel) {
				const inviteEmbed = new RichEmbed()
					.setTitle(`Invite deleted! From ${message.author.tag} (${message.author.id})`)
					.setDescription(message.content)
					.addField("Channel", `<#${message.channel.id}>`)
					.setColor("RED")
					.setFooter(`Sent at ${message.createdAt}`);

				logChannel.send(inviteEmbed);
			}
		}
	}


	if(message.channel.type == "dm") return;

	saber.levels.ensure(message.author.id, {
		id: message.author.id,
		level: 0,
		points: 0,
		multi: false
	});

	saber.currency.ensure(message.author.id, {
		id: message.author.id,
		wallet: 100,
		bank: 0,
		lastUsed: null,
		secSys: false
	});

	saber.userStats.ensure(message.author.id, {
		dankRate: Math.floor(Math.random() * 100),
		howGay: Math.floor(Math.random() * 100),
		fastUnscram: null,
		pp: Math.floor(Math.random() * 12)
	});
	
	saber.inventory.ensure(message.author.id, {
		cookies: 0
	});

	if(saber.levels.get(message.author.id).multi) {
		saber.levels.set(message.author.id, {
			id: message.author.id,
			level: Math.floor(saber.levels.get(message.author.id).points / 100),
			points: saber.levels.get(message.author.id).points + Math.floor(Math.random() * 8),
			multi: saber.levels.get(message.author.id).multi
		});
	}
	else {
		saber.levels.set(message.author.id, {
			id: message.author.id,
			level: Math.floor(saber.levels.get(message.author.id).points / 100),
			points: saber.levels.get(message.author.id).points + Math.floor(Math.random() * 4),
			multi: saber.levels.get(message.author.id).multi
		});
	}


	saber.badges.ensure(message.author.id, {
		badges: []
	});

	if(!message.content.toLowerCase().startsWith(guildDash.prefix.toLowerCase())) return;
	const args = message.content.split(" ");
	const command = args[0].slice(guildDash.prefix.length).toLowerCase();
	const parameters = args.slice(1);

	const cmd = saber.commands.get(command) || saber.commands.get(saber.aliases.get(command));
	if(!cmd) {
		return;
	}
	
	if(cmd.developer && !config.saber.owners.includes(message.author.id)) {
		message.channel.send("You do not have access to that command!");
	}
	
	else if(!cmd.permissions.user.every(Permission => message.member.hasPermission(Permission))) {
		message.channel.send("You do not have access to that command!");
	}
	
	else if(!cmd.permissions.bot.every(Permission => message.member.hasPermission(Permission))) {
		message.channel.send("You do not have access to that command!");
	}
	
	else if(cmd.nsfw && !message.channel.nsfw) {
		message.channel.send("You can not use NSFW commands in a non-NSFW channel!");
	}
	
	else {
		saber.commandsUsed++;
		cmd.run(saber, message, parameters);
	}
};
