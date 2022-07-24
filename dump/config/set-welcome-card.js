const Discord = require('discord.js');
const fs = require("fs");
var mongoUtil = require( '../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["config","welcomeCard"])
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(lang.permissionRequired);
      var db = mongoUtil.getDb();
      const collection = db.db(config.database).collection(config.collection.modConfig);

      if(args[1] == "purple" || args[1] == "red" || args[1] == "black" || args[1] == "white"){
      const welcomeCard = args[1];
      const dat =await collection.findOne({"guildId":message.guild.id})
      if(dat===null){
        await collection.insertOne({"guildId":message.guild.id,"welcomeCard":welcomeCard})
      }
      else{
      await collection.updateOne(
        {"guildId":message.guild.id},
        {$set:{"welcomeCard":welcomeCard}}
      )
     }
     var cname = lang.welcomeCardSet
     cname=cname.replace('{{cardName}}',args[1])
     func.embed(message.channel,cname)
    } else {
        const embed = new Discord.MessageEmbed()
        .setTitle(lang.wrongInput)
        .setDescription(lang.errorMessage)
        .setImage("https://cdn.discordapp.com/attachments/713829737247670333/726248461229359134/Welcome-Card-Preview.png")
        .setColor(0xd305fa);
      return message.channel.send(embed);
    }

}

exports.help = {
  name: 'set-welcome-card',
  category:'config'
};
