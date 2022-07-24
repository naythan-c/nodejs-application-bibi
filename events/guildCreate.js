const Discord = require('discord.js')
const mongoUtil = require('../mongoUtil');
const config = require('../config.json');
exports.run = async(bot,guild)=>{

  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.modConfig);
  const levelSystem = db.db(config.database).collection(config.collection.levellingSystem);
  await collection.insertOne({'guildId':guild.id,"config":{}})
  await levelSystem.insertOne({'guildId':guild.id,"level":{"stats":{}}})
  let thumbnail;
  if (guild.icon !== null) {
    thumbnail = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
  } else if (guild.icon == null) {
    thumbnail = `https://cdn.discordapp.com/attachments/714982315981537422/714989838784528404/d.png`;
  }
  const embed = new Discord.MessageEmbed()
    .setTitle(`New guild joined: ${guild.name}`)
    .setThumbnail(thumbnail)
    .setDescription(`**Members:** ${guild.memberCount}`)
    .addField("Server ID", guild.id, false)
    .setColor(0xd305fa);
  bot.guilds.cache
    .get("713260797891051540")
    .channels.cache.get("714982315981537422")
    .send(embed);
}
