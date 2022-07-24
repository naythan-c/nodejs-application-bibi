const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["emotes","fistbump"])
      const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = lang.name
  } else {
    name = user.username;
  }

      let gif = [
        `https://media1.giphy.com/media/9G52mAJTInGVy/giphy.gif`,
        `https://media3.giphy.com/media/11zN7c38FIKa4M/200.gif`,
        `https://media1.tenor.com/images/dee6b8825edd4326a814c2ebad290ce8/tenor.gif`,
        `https://media1.giphy.com/media/l0HUj1qGV0yWs8eoU/source.gif`,
        `https://i.pinimg.com/originals/7b/6b/c2/7b6bc2109dc0bd88dd44ce324ff0ab4a.gif`,
        `https://i2.wp.com/media2.giphy.com/media/l41lSEUdWz4X8JCKc/giphy.gif`
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
  name: 'fistbump',
  category: "emotes"
};
