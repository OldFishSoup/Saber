const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const saber = new Client({ fetchAllMembers: true });
const enmap = require("enmap");
saber.commands = new Collection();
saber.aliases = new Collection();
saber.commandsUsed = 1;
saber.messages = 1;

/**
 *   Event Handler
 */
const eventLoader = require("./library/EventsHandler.js");
eventLoader(saber);


/**
 *   Database stuff
 */
const enmap = require("enmap");

saber.levels = new enmap({ name: "levels" });
saber.currency = new enmap({ name: "currency" });
saber.userStats = new enmap({ name: "userstats" });
saber.badges = new enmap({ name: "badges" });
saber.inventory = new enmap({ name: "inventory" });
saber.partners = new enmap({ name: "partners" });


saber.login(config.saber.token);
