const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args,func) => {
    var lang = await func.getLangFile(message.guild.id,["general","invite"])
    const embed = new Discord.MessageEmbed()
      .setTitle(lang.inviteBibi)
      .setDescription(
        lang.description
      )
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'invite',
  category: "general"
};
