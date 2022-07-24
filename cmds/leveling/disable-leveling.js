const Discord = require('discord.js');
const fs = require("fs");
var mongoUtil = require( '../../mongoUtil');
const config = require('../../config.json');
exports.run = async (client, message, args,func) => {
    var lang = await func.getLangFile(message.guild.id,["leveling","disabelLeveling"])
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(lang.permissionRequired);
   var db = mongoUtil.getDb();
   const levelCollection = db.db(config.database).collection(config.collection.levellingSystem)
   const dat = await levelCollection.findOne({'guildId':message.guild.id})
   if(dat===null){
     return;
   }
   else if(!dat.disabled){
     await levelCollection.updateOne(
       {'guildId':message.guild.id},
       {$set:{'disabled':true}}
     )
     func.embed(message.channel,lang.levelSystemDisabled)
   }
   else{
     func.embed(message.channel,lang.levelSystemAlreadyDisabled)
   }

}
exports.help = {
  name: 'disable-leveling',
  category:'leveling'
};
