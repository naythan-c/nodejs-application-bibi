const Discord = require('discord.js');
const fs = require("fs");
var mongoUtil = require( '../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async (client, message, args, func) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You can't use this! Permission required: `Manage Guild`");
      var db = mongoUtil.getDb();
      const collection = db.db(config.database).collection(config.collection.modConfig);
      let leaveMessage;
      if(!args[1]){
          return message.channel.send("Please input a leave message!")
      } else {
        leaveMessage = args.slice(1).join(` `)
      }

      var dat =await collection.findOne({"guildId":message.guild.id})
      if(dat===null){
        await collection.insertOne({"guildId":message.guild.id,"leaveMessage":leaveMessage})
      }
      else{
      await collection.updateOne(
        {"guildId":message.guild.id},
        {$set:{"leaveMessage":leaveMessage}}
      )
     }
     const embed = new Discord.MessageEmbed()
     .setTitle("Successfully set the leave message to:")
     .setDescription(`\`\`\`${leaveMessage}\`\`\``)
     .setColor(0xd305fa);

     message.channel.send(embed)
}

exports.help = {
  name: 'set-leave-message',
  category:'config'
};
