const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
  var lang = await func.getLangFile(message.guild.id, ["emotes", "yeet"])
  const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = lang.name
  } else {
    name = user.username;
  }

  let yeetGif = [`https://media.tenor.com/images/3ffa6f0b9913b157f644a7f77f0d1604/tenor.gif`,
    `https://media.tenor.com/images/95265f8046439e1d206ea1647967a658/tenor.gif`,
    `https://media.giphy.com/media/J1ABRhlfvQNwIOiAas/giphy.gif`,
    `https://cdn.discordapp.com/attachments/630587127951786014/710321582412660776/image0.gif`,
    `https://cdn.discordapp.com/attachments/630587127951786014/710321627421999204/image0.gif`,
    `https://cdn.discordapp.com/attachments/630587127951786014/710321673861201960/image0.gif`,
    `https://cdn.discordapp.com/attachments/630587127951786014/710321764382801920/image0.gif`,
    `https://cdn.discordapp.com/attachments/630587127951786014/710321883270217788/image0.gif`,
    `https://cdn.discordapp.com/attachments/761275626564616202/778635832604491776/giphy_1.gif`,
    `https://cdn.discordapp.com/attachments/761275626564616202/778635832915394560/giphy.gif`
  ]
  let random = yeetGif[Math.floor(Math.random() * yeetGif.length)]
  var finalMessage = lang.message;
  finalMessage = finalMessage.replace("{{name}}", name)
  finalMessage = finalMessage.replace("{{username}}", message.author.username)
  const embed = new Discord.MessageEmbed()
    .setTitle(finalMessage)
    .setImage(random)
    .setColor(0xd305fa);
  message.channel.send(embed);
}

exports.help = {
  name: 'yeet',
  category: "emotes"
};
