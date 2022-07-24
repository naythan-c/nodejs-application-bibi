const Discord = require('discord.js')
const mongoUtil = require('../mongoUtil');
const config = require('../config.json');
const func = require('../functions.js');
exports.run = async (client,oldmessage,newmessage)=>{
    if(oldmessage.author.bot) return;
    if(oldmessage.content === newmessage.content) return;

    var db = mongoUtil.getDb();
    const collection = db.db(config.database).collection(config.collection.modConfig);
    var dat =await collection.findOne({"guildId":oldmessage.guild.id})
    var lang = await func.getLangFile(oldmessage.guild.id,[])
    if(dat===null)
     return
    if(dat.config.modlogs)
     return
    if(!dat.logChannel)
     return
    if(!oldmessage.guild.channels.cache.get(dat.logChannel))
    return func.embed(oldmessage.channel,lang.noLogChannel)

   let DeleteEmbed = new Discord.MessageEmbed()
  .setTitle(`**${lang.editMessage.toUpperCase()}**`)
  .setColor("0xd305fa")
  .setAuthor(newmessage.author.tag,newmessage.author.displayAvatarURL())
  .addField(lang.channel, oldmessage.channel)
  .addField(lang.before, oldmessage.content)
  .addField(lang.after, newmessage.content)
  .setTimestamp()
  .setFooter(`${lang.authorID}: ${newmessage.author.id}`);
  let message = newmessage.guild.channels.cache.get(dat.logChannel)
  message.send({embed:DeleteEmbed});

}
