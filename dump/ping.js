const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setTitle(`Pong!`)
      .setDescription(Date.now() - message.createdTimestamp + " ms :ping_pong:")
      .setColor(0xd305fa);
    return message.channel.send(embed); // All in one command looks much better
}

exports.help = {
  name: 'ping',
  category: "general"
};



