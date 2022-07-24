const Discord = require('discord.js');
const fs = require("fs");

exports.run = async(client, message, args,func) => {
    var lang = await func.getLangFile(message.guild.id,["general","stats"])
    const embed = new Discord.MessageEmbed()
      .setTitle(lang.bibiStats)
      .addFields(
		{ name: lang.ping, value: Date.now() - message.createdTimestamp + " ms", inline: true },
    { name: lang.servers, value: `${client.guilds.cache.size}`, inline: true },
    { name: lang.users, value: `${client.guilds.cache.reduce((x, y) => x + y.memberCount, 0)}`, inline: true }
	)
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'stats',
  category: "general"
};
