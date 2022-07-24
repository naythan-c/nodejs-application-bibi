const Discord = require('discord.js');
var mongoUtil = require( '../../mongoUtil' );
const config = require('../../config.json');
exports.run = async(client,message,args,func)=>{
    var lang = await func.getLangFile(message.guild.id,["config","setChannel"])
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(lang.permissionRequired);
  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.modConfig);
var channel = message.mentions.channels.first() || null
if(!args[1]){
  return func.embed(message.channel,`${lang.errorMessage} \`modlogs\`, \`welcomechannel\`, \`leavechannel\``)
}
if(channel == null)
return message.channel.send(lang.mentionValidChannel)

var dat =await collection.findOne({"guildId":message.guild.id})
if(dat===null){
  switch(args[1]){
    case 'modlogs':
      await collection.insertOne({"guildId":message.guild.id,"logChannel":channel.id})
      func.embed(message.channel,`${lang.logChannelSet} <#${channel.id}>`)
      break;
    case 'welcomechannel':
      await collection.insertOne({"guildId":message.guild.id,"welcomeChannel":channel.id})
      func.embed(message.channel,`${lang.welcomeChannelSet} <#${channel.id}>`)
      break;
    case 'leavechannel':
      await collection.insertOne({"guildId":message.guild.id,"leaveChannel":channel.id})
      func.embed(message.channel,`${lang.leaveChannelSet} <#${channel.id}>`)
      break;
    default:
     func.embed(message.channel,`${lang.errorMessage} \`modlogs\`, \`welcomechannel\`, \`leavechannel\``)
  }

}
else{
  switch(args[1]){
    case 'modlogs':
      await collection.updateOne(
        {"guildId":message.guild.id},
        {$set:{"logChannel":channel.id}}
      )
      func.embed(message.channel,`${lang.logChannelSet} <#${channel.id}>`)
      break;
    case 'welcomechannel':
      await collection.updateOne(
        {"guildId":message.guild.id},
        {$set:{"welcomeChannel":channel.id}}
      )
      func.embed(message.channel,`${lang.welcomeChannelSet} <#${channel.id}>`)
      break;
    case 'leavechannel':
      await collection.updateOne(
        {"guildId":message.guild.id},
        {$set:{"leaveChannel":channel.id}}
      )
      func.embed(message.channel,`${lang.leaveChannelSet} <#${channel.id}>`)
      break;
    default:
     func.embed(message.channel,`${lang.errorMessage} \`modlogs\`, \`welcomechannel\`, \`leavechannel\``)
  }

}

}


exports.help = {
  name : "set-channel",
  category:'config'

};
