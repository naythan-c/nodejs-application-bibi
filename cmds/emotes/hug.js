const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["emotes","hug"])
    const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = lang.name
  } else {
    name = user.username;
  }

      let gif = [
      `https://media3.giphy.com/media/cNwi7weKS4Hg3Y9Wgu/200.gif`,
        `https://media.giphy.com/media/l4FGpP4lxGGgK5CBW/giphy.gif`,
        `https://25.media.tumblr.com/tumblr_m0sudr4KLk1rrdywqo1_500.gif`,
        `https://media.giphy.com/media/llmZp6fCVb4ju/200.gif`,
        `https://45.media.tumblr.com/1a7773ae588d7beefe1451d57aed294b/tumblr_o10ljcUEPP1rwfctbo1_1280.gif`,
        `https://thumbs.gfycat.com/ViciousDesertedGraysquirrel-max-1mb.gif`,
        `https://media.tumblr.com/tumblr_m864fzDpcv1qgic1u.gif`,
        `https://media1.tenor.com/images/c78b3989921b02085a543c94fb829de9/tenor.gif`,
        `https://media1.tenor.com/images/306a242212d6a1bfff9de6427dc7ebdb/tenor.gif`,
        `https://thumbs.gfycat.com/PhonyDistortedIrishredandwhitesetter-size_restricted.gif`

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
  name: 'hug',
  category: "emotes"
};
