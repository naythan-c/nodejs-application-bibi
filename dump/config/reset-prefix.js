const Discord = require('discord.js');
const fs = require("fs");
var mongoUtil = require( '../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["config","resetPrefix"])
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(lang.permissionRequired);
      var db = mongoUtil.getDb();
      const collection = db.db(config.database).collection(config.collection.modConfig);
      const dat = await collection.findOne({'guildId':message.guild.id})
      if(dat!==null){
          if(dat.hasOwnProperty('prefix')){
              await collection.updateOne(
                  {'guildId':message.guild.id},
                  {$unset:{'prefix':''}}
              )
              func.embed(message.channel, lang.successMessage)
          }
          else{
              func.embed(message.channel, lang.errorMessage)
          }
      }
      else {
        func.embed(message.channel, lang.errorMessage)
      }
}

exports.help = {
  name: 'reset-prefix',
  category:'config'
};
