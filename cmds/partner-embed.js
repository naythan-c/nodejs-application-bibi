const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setTitle(`Partner Bibi`)
  .setDescription(
    "```Bibi is a very simple, multi-purpose Brawl Stars bot with many features and commands that are always being improved and updated!```\n\n**[Click here](https://discord.com/api/oauth2/authorize?client_id=713181335623041076&permissions=388166&scope=bot)** to add Bibi to your own server!\n\n**[Click here ](https://discord.gg/nCh7AwG)** to join their support server!"
  )
.setThumbnail(`https://cdn.discordapp.com/avatars/713181335623041076/3f8c5d27d9f8b07fcfa6a2edf7436920.png`)
  .setColor(0xd305fa);
message.channel.send(embed);
}

exports.help = {
  name: 'partner-embed',
  category:'owner'
};
