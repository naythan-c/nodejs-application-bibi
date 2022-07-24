const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args,func) => {

     var lang = await func.getLangFile(message.guild.id,["brawlstars"])
     const embed = new Discord.MessageEmbed()
      .setTitle(lang.bullMad)
      .setImage(`https://media.giphy.com/media/dxyjjXYFNTWSYlQ4TZ/giphy.gif`)
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'bull-mad',
  category: "brawlstars"
};
