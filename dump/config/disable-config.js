const Discord = require('discord.js');
const fs = require("fs");
var mongoUtil = require( '../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["config","disableConfig"])
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(lang.permissionRequired);
      var db = mongoUtil.getDb();
      const collection = db.db(config.database).collection(config.collection.modConfig);
      const dat = await collection.findOne({'guildId':message.guild.id})
      if(dat===null){

        return func.embed(message.channel, `The bot doesn\'t seem to be configured for this server `)
      }
      switch(args[1]){
        case 'modlogs':
              await collection.updateOne(
                {'guildId':message.guild.id},
                {$set:{'config.modlogs':true}}
              )
              func.embed(message.channel,`${lang.modLogs} ${lang.disabled}`)
              break;
        case 'welcomecard':
              await collection.updateOne(
                {'guildId':message.guild.id},
                {$set:{'config.welcomecard':true}}
              )
              func.embed(message.channel,`${lang.welcomeCard} ${lang.disabled}`)
              break;
        case 'welcomemessage':
              await collection.updateOne(
                {'guildId':message.guild.id},
                {$set:{'config.welcomemessage':true}}
              )
              func.embed(message.channel,`${lang.welcomeMessage} ${lang.disabled}`)
              break;
        case 'leavemessage':
              await collection.updateOne(
                {'guildId':message.guild.id},
                {$set:{'config.leavemessage':true}}
              )
              func.embed(message.channel,`${lang.leaveMessage} ${lang.disabled}`)
              break;
        case 'all':
              await collection.updateOne(
                {'guildId':message.guild.id},
                {$set:{'config.leavemessage':true,'config.welcomecard':true,'config.welcomemessage':true,'config.modlogs':true}}
              )
              func.embed(message.channel,`${lang.all} ${lang.disabled}`)
              break;
       default:
            func.embed(message.channel,`${lang.errorMessage} \`all\`, \`modlogs\`, \`welcomecard\`, \`welcomemessage\`, \`leavemessage\``)
      }


}

exports.help = {
  name: 'disable-config',
  category:'config'
};
