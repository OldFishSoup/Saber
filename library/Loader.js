const { readdir } = require("fs");

module.exports = (saber) => {
	readdir("./src/Commands", (err, folders) => {
		folders.forEach(folder => {
			readdir(`./src/Commands/${folder}`, (err, commands) => {
				commands.forEach(command => {
					const cmd = require(`../../Commands/${folder}/${command}`);
					saber.commands.set(cmd.name, cmd);
					console.log(`Command laoded: ${cmd.name} (${cmd.aliases.join(", ")})`);
					cmd.aliases.forEach(alias => {
						saber.aliases.set(alias, cmd.name);
					});
				});
			});
		});
	});
};
