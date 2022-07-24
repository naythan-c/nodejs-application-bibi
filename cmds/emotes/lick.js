const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
  var lang = await func.getLangFile(message.guild.id, ["emotes", "lick"])
  const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = lang.name
  } else {
    name = user.username;
  }

  let gif = [
    `https://media1.tenor.com/images/c4f68fbbec3c96193386e5fcc5429b89/tenor.gif?itemid=13451325`,
    `https://media3.giphy.com/media/JUrjTvzTbTUME/giphy.gif`,
    `https://imgur.com/YG4i71E`,
    `https://media2.giphy.com/media/YqQt3rkzFXbREtTURJ/giphy.gif`,
    `https://media1.tenor.com/images/a3d2e38bed3d3ee648328b37409c4d87/tenor.gif?itemid=13886203`,
    `https://gifimage.net/wp-content/uploads/2018/11/licking-lips-anime-gif-1.gif`,
    `https://i.pinimg.com/originals/df/32/a1/df32a1c9fd9d1c46c3c11b022b1932fe.gif`,
    `https://cdn.discordapp.com/attachments/778476535451615252/778476823829938226/image0.gif`,
    `https://tenor.com/view/monkey-licking-tongue-french-gif-9316431`,
    `https://tenor.com/view/fakeout-kiss-silly-girl-romantic-gif-14784308`,
    `https://tenor.com/view/lick-licking-cat-cute-adorable-gif-3485743`,
    `https://cdn.discordapp.com/attachments/778476535451615252/778477577027059732/image0.gif`,
    `https://tenor.com/view/cats-lick-gif-4770559`,
    `https://cdn.discordapp.com/attachments/778476535451615252/778478158516060221/image0.gif`,
    `https://tenor.com/view/stitch-kiss-love-lick-awkward-gif-5600127`,
    `https://tenor.com/view/liza-koshy-hot-sexy-tongue-flirt-gif-10471089`,
    `https://tenor.com/view/licks-lips-hailey-laine-the-laine-family-tongue-out-licking-gif-17967246`,
    `https://tenor.com/view/sex-excited-licked-gif-17476338`,
    `https://cdn.discordapp.com/attachments/740244989774266420/778606967311958036/image1.gif`,
    `https://cdn.discordapp.com/attachments/740244989774266420/778606966893314058/image0.gif`,
    `https://cdn.discordapp.com/attachments/761275626564616202/778635740086009876/giphy_4.gif`,
    `https://cdn.discordapp.com/attachments/761275626564616202/778635740384985088/giphy_3.gif`

  ]
  let random = gif[Math.floor(Math.random() * gif.length)]
  var finalMessage = lang.message;
  finalMessage = finalMessage.replace("{{name}}", name)
  finalMessage = finalMessage.replace("{{username}}", message.author.username)
  const embed = new Discord.MessageEmbed()
    .setTitle(finalMessage)
    .setImage(random)
    .setColor(0xd305fa);
  message.channel.send(embed);
}

exports.help = {
  name: 'lick',
  category: "emotes"
};
