const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args,func) => {
    var lang = func.getLangFile(message.guild.id,["moderation","kick"])
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(lang.permissionRequired);
    let user = message.mentions.users.first();

    let member = message.guild.member(user);
    let reason = args.slice(2).join(" ");

    if (!user) return message.channel.send(lang.mentionUser);
    if (user.id === message.author.id) return message.channel.send(lang.cantKickYourself);
    if (user.id === client.user.id) return message.channel.send(lang.cantKickMe);

    if (!reason) reason = lang.reason;

    member.kick(reason).then(() => {
        var kickMessage = lang.successfullyKicked
        kickMessage=kickMessage.replace("{{user.tag}}",user.tag).replace("{{reason}}",reason)
      message.channel.send(kickMessage);
    }).catch(err => {
      message.reply(lang.unableToKick);
    })
}
exports.help = {
  name: 'kick',
  category: "moderation"
};
