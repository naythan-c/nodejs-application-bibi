const Discord = require('discord.js')
const config = require('../config.json');
const mongoUtil = require('../mongoUtil');
const func = require('../functions.js');
exports.run = async(client,channel) => {

  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.modConfig);
  var dat =await collection.findOne({"guildId":channel.guild.id})
  var lang = await func.getLangFile(channel.guild.id,[])
  if(dat===null)
   return
  if(!dat.logChannel)
   return
   if(dat.config.modlogs)
   return
   if(!channel.guild.channels.cache.get(dat.logChannel))
   return func.embed(channel,lang.noLogChannel)



    if(channel.name){
    let ChannelEmbed = new Discord.MessageEmbed()
  .setTitle(`**${lang.channelCreated.toUpperCase()}**`)
  .setDescription(`**${lang.channelCreated}: #${channel.name}**`)
  .setColor("0xd305fa")
  .setAuthor(channel.guild.name,channel.guild.iconURL())
  .setTimestamp()

    channel.guild.channels.cache.get(dat.logChannel).send({embed:ChannelEmbed});

    }
}
