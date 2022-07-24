const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }

    let avatar = user.displayAvatarURL({size: 4096, dynamic: true});
    // 4096 is the new biggest size of the avatar.
    // Enabling the dynamic, when the user avatar was animated/GIF, it will result as a GIF format.
    // If it's not animated, it will result as a normal image format.

    const embed = new Discord.MessageEmbed()
    .setTitle(`${user.tag} avatar`)
    .setDescription(`[Avatar URL of **${user.tag}**](${avatar})`)
    .setColor(0xd305fa)
    .setImage(avatar)

    return message.channel.send(embed);
}

exports.help = {
  name: 'avatar',
  category: "general"

};
