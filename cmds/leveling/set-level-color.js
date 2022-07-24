const Discord = require('discord.js');
const fs = require("fs");
var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["leveling","setLevelColor"])
  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.levelCard);
  const dat = await collection.findOne({ "userId": message.author.id })

  const type = args[1]
  const color = args[2]

  if (!type) {
    return func.embed(message.channel, lang.errorMessage)
  }
  if (!/^#[0-9A-F]{6}$/i.test(color)) {
    const embed = new Discord.MessageEmbed()
      .setTitle(lang.invalidHex)
      .setDescription(lang.link)
      .setColor(0xd305fa);
    return message.channel.send(embed);
  }

  if (dat === null) {
    switch (type) {
      case 'bar':
        await collection.insertOne({ "userId": message.author.id, "levelBar": color })
        colorType = "bar";
        break;
      case 'background':
        await collection.insertOne({ "userId": message.author.id, "levelBackground": color })
        colorType = "background";
        break;
      case 'text':
        await collection.insertOne({ "userId": message.author.id, "levelText": color })
        colorType = "text";
        break;
      case 'circle':
        await collection.insertOne({ "userId": message.author.id, "levelCircle": color })
        colorType = "circle";
        break;
      default:
        return func.embed(message.channel, lang.errorMessage)
    }
    var finalColor=lang.cardChange
    finalColor=finalColor.replace('{{colorType}}',colorType).replace('{{color}}',color)
    const embed = new Discord.MessageEmbed()
      .setDescription(finalColor)
      .setColor(color);
    return message.channel.send(embed);
  }
  else {
    switch (type) {
      case 'bar':
        await collection.updateOne(
          { "userId": message.author.id },
          { $set: { "levelBar": color } }
        )
        colorType = "bar";
        break;
      case 'background':
        await collection.updateOne(
          { "userId": message.author.id },
          { $set: { "levelBackground": color } }
        )
        colorType = "background";
        break;
      case 'text':
        await collection.updateOne(
          { "userId": message.author.id },
          { $set: { "levelText": color } }
        )
        colorType = "text";
        break;
      case 'circle':
        await collection.updateOne(
          { "userId": message.author.id },
          { $set: { "levelCircle": color } }
        )
        colorType = "circle";
        break;
      default:
        return func.embed(message.channel, lang.errorMessage)
    }
    var finalColor=lang.cardChange
    finalColor=finalColor.replace('{{colorType}}',colorType).replace('{{color}}',color)
    const embed = new Discord.MessageEmbed()
      .setDescription(finalColor)
      .setColor(color);
    return message.channel.send(embed);
  }

}

exports.help = {
  name: 'set-level-color',
  category: 'leveling'
};
