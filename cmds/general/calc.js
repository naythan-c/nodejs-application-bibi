const Discord = require('discord.js');
const math = require('mathjs')
const fs = require("fs");

exports.run = async (client, message, args,func) => {
    var lang = await func.getLangFile(message.guild.id,["general","calc"])
   if (!args[1]) return message.channel.send(lang.pleaseInputAValidCalcualtion);
  let resp;
  try {
    resp = math.evaluate(args.slice(1).join(" "))
  } catch (e){
    return message.channel.send(lang.pleaseInputAValidCalcualtion)
  }
    const embed = new Discord.MessageEmbed()
      .setTitle(lang.bigBrainBibiTime)
      .addField(lang.input, `\`\`\`js\n${args.slice(1).join('')}\`\`\``)
    .addField(lang.output, `\`\`\`js\n${resp}\`\`\``)
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'calc',
  category: "general"
};
