const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["emotes","l"])
    const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = lang.name
  } else {
    name = user.username;
  }

      let gif = [
        `https://media.giphy.com/media/piTERt2CEdrLt2WLv0/giphy.gif`,
        `https://media.giphy.com/media/fiqgGuiqVsWqTQdgTz/giphy.gif`,
        `https://media.giphy.com/media/cr9vIO7NsP5cY/giphy.gif`,
        `https://media.giphy.com/media/PmXLc35mKRcxpJuqId/giphy.gif`,
        `https://cdn.discordapp.com/attachments/615616271366619136/705556908312100894/unknown.gif`,
        `https://cdn.discordapp.com/attachments/615616271366619136/705557174658662470/unknown.gif`,
        `https://cdn.discordapp.com/attachments/615616271366619136/705557194820550706/unknown.gif`
                    ]
let random = gif[Math.floor(Math.random() * gif.length)]
var finalMessage=lang.message;
finalMessage=finalMessage.replace("{{name}}",name)
finalMessage=finalMessage.replace("{{username}}",message.author.username)
     const embed = new Discord.MessageEmbed()
      .setTitle(finalMessage)
      .setImage(random)
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'l',
  category: "emotes"
};
