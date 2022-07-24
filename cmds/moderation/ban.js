const Discord = require('discord.js');

exports.run = async (client, message, args,func) => {
    var lang = func.getLangFile(message.guild.id,["moderation","ban"])
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(lang.permissionRequired);
    let user = message.mentions.users.first();

    let member = message.guild.member(user);
    let reason = args.slice(2).join(" ");

    if (!user) return message.channel.send(lang.mentionUser);
    if (user.id === message.author.id) return message.channel.send(lang.cantBanYourself);
    if (user.id === client.user.id) return message.channel.send(lang.cantBanMe);

    if (!reason) reason = lang.reason;

    member.ban(reason).then(() => {
        var banMessage = lang.successfullyBanned
        banMessage=banMessage.replace("{{user.tag}}",user.tag).replace("{{reason}}",reason)
      message.channel.send(banMessage);
    }).catch(err => {
      message.reply(lang.unableToBan);
    })
  }

exports.help = {
  name: 'ban',
  category: "moderation"
};
