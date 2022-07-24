const Discord = require('discord.js');
const fs = require("fs");
var mongoUtil = require('../../mongoUtil');
const config = require('../../config.json');
exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["leveling","leaderboard"])
  var db = mongoUtil.getDb();
  const levelCollection = db.db(config.database).collection(config.collection.levellingSystem)
  //   const tt = await levelCollection.aggregate([
  //     { $match: { 'guildId': message.guild.id } },
  //     { $addFields: { level_stats: { $objectToArray: "$level.stats" } } },
  //     { $unwind: "$level_stats" },
  //     { $sort: { "level_stats.v.totalxp": -1 } },
  //     { $limit: 15 },
  //     { $group: { _id: "$_id", level_stats: { $push: "$level_stats" }, doc: { $first: "$$ROOT" } } },
  //     { $project: { "level.stats": { $arrayToObject: "$level_stats" }, guildId: "$doc.guildId",disabled:"$doc.disabled" } },
  //   ])
    // var dat = await tt.next()
  //   if (dat === null) {
  //     return func.embed(message.channel,lang.doesntExist);
  //   }
  //   else if (dat.disabled) {
  //       return func.embed(message.channel, lang.levelSystemIsDisabledOnThisServer)
  //   }
  //   else {
  //     var msg = ''
  //     var counter = 1;
  //     for (let i in dat.level.stats) {
  //       if(counter == 11){
  //         break;
  //       }
  //       var member = message.guild.members.cache.get(i)
  //       if(member !== undefined){
  //       var name = member.nickname || member.user.username
  //       msg += "`#" + counter + "`" + " | " + " **" + name + "** (" + dat.level.stats[i].totalxp + " XP)\n";
  //       counter++;
  //       }
  //     }

  //     const embed = new Discord.MessageEmbed()
  //       .setAuthor(`${message.guild.name} ${lang.levelLeaderboard}`, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
  //       .setColor("0xd305fa")
  //       .setDescription(msg);

  //     message.channel.send(embed)

  // }

      //   const embed = new Discord.MessageEmbed()
      //   .setTitle("Maintenance")
      //   .setColor("0xCB2603")
      //   .setDescription("This command is disabled temporarily. We are working on it and will add it back shortly.");
      //
      // message.channel.send(embed)

      message.channel.send("Generating...").then(async message=>{
        var dat = await levelCollection.findOne({guildId:message.guild.id})
        var items=[]
        var id=[]
        for(let i in dat.level.stats){
          id.push(i)
          items.push(dat.level.stats[i].totalxp)
        }
        var sortedArray=func.quickSort(items,0,items.length-1,id)

        if(sortedArray.length>10){
          sortedArray.splice(10)
          id.splice(10)
        }

        var msg = ''
           var counter = 1;
           for (let i in sortedArray) {
             if(counter == 11){
               break;
             }
             var member = await message.guild.members.fetch(id[i]).catch(async c=>{
               var del = "level.stats."+id[i]
               await levelCollection.updateOne(
                 {'guildId':member.guild.id},
                 {$unset:{[del]:''}}
               )
             })
             // console.log(member.user.username + " " +id[i])
             if(member !== undefined){
             var name = member.nickname || member.user.username
             msg += "`#" + counter + "`" + " | " + " **" + name + "** (" + sortedArray[i] + " XP)\n";
             counter++;
             }
           }
        const embed = new Discord.MessageEmbed()
             .setAuthor(`${message.guild.name} ${lang.levelLeaderboard}`, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
             .setColor("0xd305fa")
             .setDescription(msg);

           message.edit("",embed)
      })


}


exports.help = {
  name: 'leaderboard',
  category: "leveling",
  aliases: ["lb"]
};
