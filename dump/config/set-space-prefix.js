const Discord = require('discord.js');
const fs = require("fs");
var mongoUtil = require( '../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["config"])
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(lang.permissionRequired);
      var db = mongoUtil.getDb();
      const collection = db.db(config.database).collection(config.collection.modConfig);
      var prefix = args[1]
      prefix+=" "
      var dat =await collection.findOne({"guildId":message.guild.id})
      if(dat===null){
        await collection.insertOne({"guildId":message.guild.id,"prefix":prefix})
      }
      else{
      await collection.updateOne(
        {"guildId":message.guild.id},
        {$set:{"prefix":prefix}}
      )
     }
     var finalMessage=lang.setPrefix;
     finalMessage=finalMessage.replace("{{prefix}}",prefix)
     func.embed(message.channel, finalMessage)
}

exports.help = {
  name: 'set-space-prefix',
  category:'config'
};
