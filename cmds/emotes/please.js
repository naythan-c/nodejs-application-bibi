const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["emotes","please"])
    const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = lang.emotes.name
  } else {
    name = user.username;
  }

      let gif = [
        `https://media.giphy.com/media/cmrWcwC3A4ryH437Ru/giphy.gif`,
        `https://media1.tenor.com/images/8acc3eaf2435f375e177f4431ff06e1a/tenor.gif`,
        `https://media.giphy.com/media/SsHjbKXhUoIMx6oymc/giphy.gif`,
        `https://media.giphy.com/media/uetToBcxTS9bi/giphy.gif`,
        `https://media.giphy.com/media/l4FGpdrSHIcgR7Mli/giphy.gif`,
        `https://media.giphy.com/media/eYHh1OuDsxvpu/giphy.gif`
                    ]
let random = gif[Math.floor(Math.random() * gif.length)]
var finalMessage=lang.emotes.please.message;
finalMessage=finalMessage.replace("{{name}}",name)
finalMessage=finalMessage.replace("{{username}}",message.author.username)
     const embed = new Discord.MessageEmbed()
      .setTitle(finalMessage)
      .setImage(random)
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'please',
  category: "emotes"
};
