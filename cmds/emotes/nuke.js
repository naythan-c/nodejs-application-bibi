const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["emotes","nuke"])
    const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = lang.name
  } else {
    name = user.username;
  }

      let yeetGif = [
      `https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif`,
      `https://media.giphy.com/media/OMPqWQVhND9Vm/giphy.gif`,
      `https://media.giphy.com/media/uSHMDTUL7lKso/giphy.gif`,
      `https://media.giphy.com/media/iZuLdzQ5eoD1C/giphy.gif`,
      `https://media.giphy.com/media/uNtESYuFhf7c4/giphy.gif`,
      `https://media.giphy.com/media/ceHKRKMR6Ojao/giphy.gif`,
      `https://media.giphy.com/media/2nwTda1ewYssE/giphy.gif`

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
  name: 'nuke',
  category: "emotes"
};
