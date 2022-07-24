const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args,func) => {
    var lang = await func.getLangFile(message.guild.id,["general","serverInfo"])
      let inline = true
  let region = message.guild.region;
  const embed = new Discord.MessageEmbed()
    .setColor("0xd305fa")
    .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
  .setTitle(`${message.guild.name}`)
    .addField(lang.name, message.guild.name, inline)
    .addField(lang.serverId, message.guild.id, inline)
    .addField(lang.owner, message.guild.owner, inline)
    .addField(lang.region, region.toUpperCase().split('-').join(" "), inline)
    .addField(lang.verificationLevel, message.guild.verificationLevel, inline)
    .addField(lang.members, `<:user:714605265214767266> ${message.guild.memberCount}`, inline)
    .addField(lang.created, message.guild.createdAt);
    message.channel.send(embed); // All in one command looks much better
};
https://cdn.discordapp.com/icons/593570237249617920/f206477f51fd97343b613797880d0ed7.png?size=128
exports.help = {
  name: "server-info",
  category: "general"
};
