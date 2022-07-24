const Discord = require('discord.js')
const mongoUtil = require('../mongoUtil');
const config = require('../config.json');
const func = require('../functions.js');
exports.run = async(client, member)=>{
    console.log(member.guild.id)
    var db = mongoUtil.getDb();
    const collection = db.db(config.database).collection(config.collection.modConfig);
    var dat = await collection.findOne({"guildId":member.guild.id})
    const levelSystem = db.db(config.database).collection(config.collection.levellingSystem);
    var leveldat = await levelSystem.findOne({"guildId":member.guild.id})
    var lang = await func.getLangFile(member.guild.id,[])
    if(dat===null)
        return
    if(!dat.leaveChannel || !dat.leaveMessage){
        return console.log(lang.noLeaveChannel)
    }
    if(dat.config.leavemessage)
    return
    if(leveldat === null)
    return
    if(leveldat.level.stats[member.id]){
      var del = "level.stats."+member.id
      await levelSystem.updateOne(
        {'guildId':member.guild.id},
        {$unset:{[del]:''}}
      )
    }

    const guild = member.guild;
    const leaveChannel = guild.channels.cache.get(dat.leaveChannel)
    const leaveMessage = dat.leaveMessage
    const newLeaveMessage = leaveMessage.replace('{user}', member.displayName).replace('{memberCount}', member.guild.memberCount)

    leaveChannel.send(`${newLeaveMessage}`);
}
