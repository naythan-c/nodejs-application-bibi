const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["emotes","thonk"])
      const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = lang.name
  } else {
    name = user.username;
  }
      let yeetGif = [
      `https://media.giphy.com/media/LMi8YcDWuOqvawZZAw/giphy.gif`,
      `https://media.giphy.com/media/w78Swf2N8pkFkbM7b4/giphy.gif`,
      `https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif`,
      `https://media.giphy.com/media/1fgI4bZpCo9S57r4Vd/giphy.gif`,
      `https://media.giphy.com/media/ZuhmYnikJOPPq/giphy.gif`,
      `https://media.giphy.com/media/xT0xem7ZlZ2DOYqpG0/giphy.gif`
                    ]
let random = yeetGif[Math.floor(Math.random() * yeetGif.length)]
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
  name: 'thonk',
  category: "emotes"
};
