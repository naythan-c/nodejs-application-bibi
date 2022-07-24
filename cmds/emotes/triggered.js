const Discord = require('discord.js');
const fs = require("fs");

exports.run = async(client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["emotes","triggered"])
    const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = "themself!"
  } else {
    name = user.username;
  }

      let gif = [
        `https://media.giphy.com/media/KymorXwDdmvw4/giphy.gif`,
        `https://media.giphy.com/media/d7wz7XI8RAikOv6iTI/giphy.gif`,
        `https://media.giphy.com/media/dvm4XhrtVdRJNhKWU8/giphy.gif`,
        `https://media.giphy.com/media/AFjfPUJ0mjWJG/giphy.gif`,
        `https://media.giphy.com/media/82DaAxknIvBovGGPj5/giphy.gif`,
        `https://media.giphy.com/media/kRgj0fQLxhVoA/giphy-downsized-large.gif`
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
  name: 'triggered',
  category: "emotes"
};
