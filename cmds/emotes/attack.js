const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["emotes","attack"])
  const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name =  lang.name;
  } else {
    name = user.username;
  }

  let yeetGif = [
    `https://media.giphy.com/media/PO9aIzHerOX1S/giphy.gif`,
    `https://media.giphy.com/media/vIka9RbQ5VYbu/giphy.gif`,
    `https://media.giphy.com/media/xUO4t2gkWBxDi/giphy.gif`,
    `https://media.giphy.com/media/a3BSVQ00oj2kU/giphy.gif`,
    `https://media.giphy.com/media/iA6uDPHzvUVNK/giphy.gif`,
    `https://media.giphy.com/media/Eq49yQGJL835K/giphy.gif`,
    `https://media.giphy.com/media/eenzqB2MsGKbK/giphy.gif`,
    `https://media.giphy.com/media/26DNdo8F7Cy2bKiWI/giphy.gif`,
    `https://media.giphy.com/media/l4JzgUo64J3DaxnI4/giphy.gif`,
    `https://media.giphy.com/media/5WIMcQNeu6TWoIrkfB/giphy.gif`,
    `https://media.giphy.com/media/aqDXCH2M1ycEw/giphy.gif`,
    `https://media.giphy.com/media/1dSh339toYJr2/giphy.gif`,
    `https://media.giphy.com/media/a5OCMAro7MGQg/giphy.gif`
  ];
  let random = yeetGif[Math.floor(Math.random() * yeetGif.length)];
  var finalMessage=lang.message;
  finalMessage=finalMessage.replace("{{name}}",name)
  finalMessage=finalMessage.replace("{{username}}",message.author.username)
  const embed = new Discord.MessageEmbed()
    .setTitle(finalMessage)
    .setImage(random)
    .setColor(0xd305fa);
  message.channel.send(embed);
};

exports.help = {
  name: "attack",
  category: "emotes"
};
