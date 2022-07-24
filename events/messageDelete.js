const Discord = require('discord.js')
const mongoUtil = require('../mongoUtil');
const config = require('../config.json');
const func = require('../functions.js');
exports.run = async(client,messageDeleted)=>{
   if(messageDeleted.author.bot) return;

   var db = mongoUtil.getDb();
   const collection = db.db(config.database).collection(config.collection.modConfig);
   var dat =await collection.findOne({"guildId":messageDeleted.guild.id})
   var lang = await func.getLangFile(messageDeleted.guild.id,[])
   if(dat===null)
    return
   if(dat.config.modlogs)
   return
   if(!dat.logChannel)
    return
   if(!messageDeleted.guild.channels.cache.get(dat.logChannel))
   return func.embed(messageDeleted.channel,lang.noLogChannel)


    let DeleteEmbed = new Discord.MessageEmbed()
  .setTitle(`**${lang.messageDeleted.toUpperCase()}**`)
  .setColor("0xd305fa")
  .setAuthor(messageDeleted.author.tag,messageDeleted.author.displayAvatarURL())
  .addField(lang.channel, messageDeleted.channel)
  .addField(lang.message, messageDeleted.content)
  .setTimestamp()
  .setFooter(`${lang.authorID}: ${messageDeleted.author.id}`);
  let message = messageDeleted.guild.channels.cache.get(dat.logChannel)
  message.send({embed:DeleteEmbed});
}
