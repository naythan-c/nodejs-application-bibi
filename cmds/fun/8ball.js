const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["fun","8ball"])
      if (!args[1]) return message.channel.send(lang.specifyYesNoQuestion);
  let answers = lang.answers
  let answer = answers[Math.floor(Math.random() * answers.length)];
  let msg = new Discord.MessageEmbed()
  .setColor(0xd305fa)
  .addField(lang.prediction, answer);
  message.channel.send(msg);
}

exports.help = {
  name: '8ball',
  category: "fun"
};
