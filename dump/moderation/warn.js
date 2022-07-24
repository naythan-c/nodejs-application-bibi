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
  var w=`warn.${member.id}`
  if(dat === null){

    await collection.insertOne({"guildId":message.guild.id,warn:{}})
  }

    await collection.updateOne(
      {"guildId":message.guild.id},
      {$inc:{[w]:1}}
    )


  var reason = args.slice(2).join(' ')
  if(reason.length<=0)
    message.channel.send(`${member} has been warned`)
  else
    message.channel.send(`${member} has been warned\n Reason: \`${reason}\``)


  dat = await collection.findOne({"guildId":message.guild.id})
  // console.log(dat);
  var count = dat.warn[member.id]
  if(count === (dat.maxWarn-1))
    message.channel.send(`${member} this is your last warning. You will be kicked if you are warned again.`)
  else if(count === dat.maxWarn){
    await collection.updateOne(
      {"guildId":message.guild.id},
      {$unset:{[w]:""}}
    )
    message.channel.send(`user will be kicked here`)
  }
}

exports.help = {
  name: 'warn',
  category: "moderation"
};
