const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang= await func.getLangFile(message.guild.id,["fun"])
  if(!args[1]){ return message.reply(lang.reverse)}
    message.channel.send(args.slice(1).join(` `).split('').reverse().join(''), { disableMentions: "all" }); // All in one command looks much better
}

exports.help = {
  name: 'reverse',
  category: "fun"

};
