const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["general","vote"])
    const embed = new Discord.MessageEmbed()
      .setTitle(lang.voteForBibi)
      .setDescription(
        lang.description
      )
      .setFooter(
        lang.footer,
        "https://cdn.discordapp.com/attachments/641691117141753916/722599889720180806/Untitled_design-4.png"
      )
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'vote',
  category: "general"
};
