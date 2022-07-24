const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args,func) => {
    var lang = await func.getLangFile(message.guild.id,["general","poll"])
  if (!args[1]) return message.channel.send(lang.specifyAQuestionForThePoll);
  const embed = new Discord.MessageEmbed()
    .setTitle(`${lang.pollCreatedBy} ${message.author.username}`)
    .setDescription(`${args.slice(1).join(" ")}`)
    .setColor(0xd305fa)
    .setFooter(lang.reactToVote);
  message.delete();
  let sent = await message.channel.send(embed);
  await sent.react("✅");
  await sent.react("❌");
};

exports.help = {
  name: "poll",
  category: "general"
};
