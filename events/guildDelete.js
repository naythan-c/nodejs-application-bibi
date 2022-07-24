const Discord = require('discord.js')
const mongoUtil = require('../mongoUtil');
const config = require('../config.json');
exports.run = async(bot,guild)=>{

  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.modConfig);
  const levelSystem = db.db(config.database).collection(config.collection.levellingSystem);
  await collection.deleteOne({'guildId':guild.id})
  await levelSystem.deleteOne({'guildId':guild.id})


  let thumbnail;
  if (guild.icon !== null) {
    thumbnail = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
  } else if (guild.icon == null) {
    thumbnail = `https://cdn.discordapp.com/attachments/714982315981537422/714989838784528404/d.png`;
  }
  const embed = new Discord.MessageEmbed()
    .setTitle(`Removed from: ${guild.name}`)
    .setThumbnail(thumbnail)
    .addField("Server ID", guild.id, false)
    .setDescription(`**Members:** ${guild.memberCount}`)
    .setColor(0xd40707);
  bot.guilds.cache
    .get("713260797891051540")
    .channels.cache.get("714982315981537422")
    .send(embed);
}
