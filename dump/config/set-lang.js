const Discord = require('discord.js');
const fs = require("fs");
var mongoUtil = require( '../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["config"])
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(lang.permissionRequired);
        var db = mongoUtil.getDb();
        const collection = db.db(config.database).collection(config.collection.modConfig);
        var langSet=''
        var languages={"spanish":"es","english":"en","portuguese":"pt"}
        langSet = languages[args[1]]
        if(langSet===undefined)
        return message.channel.send(`${lang.invalidLanguage} \`english\`,\`spanish\`,\`portuguese\``)
        var dat =await collection.findOne({"guildId":message.guild.id})
        if(dat===null){
          await collection.insertOne({"guildId":message.guild.id,"language":langSet})
        }
        else{
        await collection.updateOne(
          {"guildId":message.guild.id},
          {$set:{"language":langSet}}
        )
       }
       var getLang=require('../../languages/'+langSet+".json")
       var msg=getLang.languageSet
       msg=msg.replace('{{lang}}',args[1])
       func.embed(message.channel, msg)
}

exports.help = {
  name: 'set-lang',
  category:'config'
};
