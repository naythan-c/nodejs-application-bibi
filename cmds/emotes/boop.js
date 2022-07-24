const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args,func) => {
    var lang = await func.getLangFile(message.guild.id,["emotes","boop"])
      const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = lang.name
  } else {
    name = user.username;
  }

      let gif = [
        `https://cdn.discordapp.com/attachments/630587127951786014/716987402048241674/image0.gif`,
        `https://media.discordapp.net/attachments/630587127951786014/716987461489917983/image0.gif`,
        `https://media.discordapp.net/attachments/630587127951786014/716987522613379152/image0.gif`,
        `https://media.discordapp.net/attachments/630587127951786014/716987572286390362/image0.gif`,
        `https://media.discordapp.net/attachments/630587127951786014/716987692994396278/image0.gif`,
        `https://media.discordapp.net/attachments/630587127951786014/716987806907498508/image0.gif?width=615&height=461`,
        `https://media.discordapp.net/attachments/630587127951786014/716987976873148416/image0.gif`,
        `https://media.discordapp.net/attachments/630587127951786014/716988258285781069/image0.gif`,
        `https://media.discordapp.net/attachments/630587127951786014/716989213396041728/image0.gif`,
        `https://media.discordapp.net/attachments/715773831322664962/717061475809624094/boop.gif`,
        `https://media.discordapp.net/attachments/715773831322664962/717063932229189682/boop2.gif?width=368&height=460`
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
  name: 'boop',
  category: "emotes"
};
