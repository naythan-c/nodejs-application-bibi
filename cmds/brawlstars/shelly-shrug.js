const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args ,func) => {
    var lang = await func.getLangFile(message.guild.id,["brawlstars"])
     const embed = new Discord.MessageEmbed()
      .setTitle(lang.shellyShrug)
      .setImage(`https://media.giphy.com/media/XeAGshHZtgf6Z952ET/giphy.gif`)
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'shelly-shrug',
  category: "brawlstars"
};
