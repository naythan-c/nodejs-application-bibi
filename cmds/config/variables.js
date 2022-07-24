const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setTitle(`Config Variables`)
      .addField(
        "Welcome/Leave Message Variables", "`{user}` - User mention\n`{memberCount}` - Total server members"
      )
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'variables',
  category: "config"
};


