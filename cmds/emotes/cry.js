const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args,func) => {
    var lang = await func.getLangFile(message.guild.id,["emotes","cry"])
    const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = ""
  } else {
      var nn=lang.name;
      nn=nn.replace("{{username}}",user.username)
    name = nn;
  }

      let gif = [
`https://media3.giphy.com/media/L95W4wv8nnb9K/giphy.gif`,
`https://i.pinimg.com/originals/c7/eb/5b/c7eb5bbae52025b4d2ad9b8224022bd4.gif`,
`https://media0.giphy.com/media/mvRwcoCJ9kGTS/giphy.gif`,
`https://data.whicdn.com/images/320214384/original.gif`,
`https://cdn.weeb.sh/images/B1N87IQDZ.gif`,
`https://cdn.weeb.sh/images/r1UGQLXvb.gif`,
`https://cdn.weeb.sh/images/H1nGQ8Qw-.gif`


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
  name: 'cry',
  category: "emotes"
};
