const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["general","about"])
    const embed = new Discord.MessageEmbed()
      .setTitle(lang.about)
      .setDescription(
        lang.description
      )
      .addField(
        lang.links.link,
        `- [${lang.links.inviteBibi}](https://discord.com/api/oauth2/authorize?client_id=713181335623041076&permissions=388166&scope=bot)\n- [${lang.links.joinOurServer}](https://discord.gg/nCh7AwG)\n- [${lang.links.website}](https://bibibot.wixsite.com/bibi)\n- [${lang.links.voteForBibi}](https://top.gg/bot/713181335623041076/vote)`
      )
      .addField(
        lang.credits,
        "`Saber`, `Parzival`, `Mega Alvin`, `Stormy`, `Rogue`"
      )
      .setColor(0xd305fa)
      .setImage(`https://cdn.discordapp.com/attachments/713829737247670333/714641499282866226/20200526_033843.png`)
    message.channel.send(embed); // All in one command looks much better
}

exports.help = {
  name: 'about',
  category: "general"
};
