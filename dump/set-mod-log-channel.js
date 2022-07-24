const Discord = require('discord.js');
var mongoUtil = require( '../../mongoUtil' );
const config = require('../../config.json');
exports.run = async(client,message,args,func)=>{
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You can't use this! Permission required: `Manage Guild`");
  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.modConfig);
var channel = message.mentions.channels.first() || null
if(channel == null)
return message.channel.send('Mention the log channel!')

var dat =await collection.findOne({"guildId":message.guild.id})
if(dat===null){
  await collection.insertOne({"guildId":message.guild.id,"logChannel":channel.id})
}
else{
  await collection.updateOne(
    {"guildId":message.guild.id},
    {$set:{"logChannel":channel.id}}
  )
}


  console.log(channel.name+" "+channel.id)
  // console.log('done');
  func.embed(message.channel,"Log channel set to <#"+channel.id+">")
}


exports.help = {
  name : "set-mod-log-channel",
  category:'config'

};
