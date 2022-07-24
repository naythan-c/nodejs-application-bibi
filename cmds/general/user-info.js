const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["general","userInfo"])
  const status = {
    online: lang.online,
    idle: lang.idle,
    dnd: lang.dnd,
    offline: lang.offline
  };

  let user = message.mentions.users.first() || message.author;

  let bot;
  if (user.bot === true) {
    bot = lang.yes;
  } else {
    bot = lang.no;
  }

  const member = message.guild.member(user);
  const embed = new Discord.MessageEmbed()
    .setTitle(`${user.username}'s Info`)
    .addField(
      "Avatar",
      `[Image](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png)`,
      true
    )
    .addField("ID", user.id, true)
    .addField(lang.createdAt, user.createdAt, false)
    .addField(lang.joinedAt, member.joinedAt, false)
    // .addField(lang.status, `${status[user.presence.status]}`, true)
    .addField(lang.bot, `${bot}`, true)
    .setColor(0xd305fa)
    .setThumbnail(
      `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    );
  message.channel.send(embed); // All in one command looks much better
};

exports.help = {
  name: "user-info",
  category: "general"
};
