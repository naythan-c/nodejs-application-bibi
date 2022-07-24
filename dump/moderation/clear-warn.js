const Discord = require('discord.js');
var mongoUtil = require( '../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async (client, message, args,func) => {
  // if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(lang.permissionRequired);
  //idk what permission should be kept for this thing
  let user = message.mentions.users.first();
  let member = message.guild.member(user);
  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.warn);
  var dat = await collection.findOne({"guildId":message.guild.id})
  if(dat === null){
    return func.embed(message.channel,`No user was warned in this server!`)
  }
  else{
    if(dat.warn.hasOwnProperty(member.id)){
      var w=`warn.${member.id}`
      await collection.updateOne(
        {"guildId":message.guild.id},
        {$unset:{[w]:""}}
      )
      return func.embed(message.channel,`\`${member.displayName}\`'s warnings have been cleared`)
    }      
    else
      return func.embed(message.channel,`\`${member.displayName}\` has no warnings to clear`)
  }


}

exports.help = {
  name: 'clear-warn',
  category: "moderation"
};
