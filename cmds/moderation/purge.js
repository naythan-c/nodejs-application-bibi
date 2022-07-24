const Discord = require('discord.js');
const fs = require("fs");

exports.run = async(client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["moderation","purge"])
    if (
      !message.member.hasPermission("MANAGE_ROLES") ||
      !message.member.hasPermission("MANAGE_MESSAGES")
    ){
      return message.channel.send(lang.permissionRequired);
    }
    if (!args[1])
      return message.channel.send(lang.specifyNumberOfMessagesToDelete)
    message.delete();
    message.channel.bulkDelete(args[1]).catch(e => {
      message.channel.send(lang.canDeleteOnly100Messages);
    });
    var delmsg=lang.deleteSuccessfull
    delmsg=delmsg.replace("{{args[1]}}",args[1])
    message.channel
      .send(delmsg)
      .then(m => m.delete({ timeout: 5000 }));
}

exports.help = {
  name: 'purge',
  category: "moderation",
  aliases: ["clear", "delete"]
};
