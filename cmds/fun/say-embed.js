const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["fun"])
  if(!args[1]){ return message.reply(lang.sayEmbed)}
    message.delete();
        const embed = new Discord.MessageEmbed()
      .setDescription(
        `${args.slice(1).join(` `)}`
      )
      .setColor(0xd305fa);
    message.channel.send(embed); // All in one command looks much better
}

exports.help = {
  name: 'say-embed',
  category: "fun"

};
