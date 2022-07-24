const Discord = require('discord.js');
const fs = require("fs");

var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');


exports.run = async (client, message, args, func) => {
  if (!args[1]) {
    return func.embed(message.channel, 'Please enter something to equip or add `none` instead of the item to unequip!')
  } else if (args.length < 3) {
    return func.embed(message.channel, 'Please enter all fields')
  }
  var db = mongoUtil.getDb();
  const userProfileCollection = db.db(config.database).collection(config.collection.economy);
  const userDat = await userProfileCollection.findOne({ 'userId': message.author.id })
  var category = args[1].toLowerCase().charAt(0).toUpperCase() + args[1].toLowerCase().substring(1)
  var item = args.slice(2)

  for (let i in item) {
    item[i] = item[i].charAt(0).toUpperCase() + item[i].substring(1)
  }
  item = item.join(' ')

  if (userDat.inventory) {
    if (userDat.inventory[category]) {
      const equippedField = `${category}_Equipped`

      if (args.slice(2) == "none") {
        await userProfileCollection.updateOne(
          { "userId": message.author.id },
          { $unset: { [equippedField]: "" } }
        )
        return func.embed(message.channel, `Unequipped your item in ${category}`)
      }
      if (!userDat.inventory[category].some(items => items === item)) {
        func.embed(message.channel, 'You do not own this item!')
      }
      else {
        await userProfileCollection.updateOne(
          { "userId": message.author.id },
          { $set: { [equippedField]: item } }
        )
        func.embed(message.channel, `${item} Equipped`)
      }
    }
    else {
      func.embed(message.channel, `Seems like you haven't bought anything in ${category}`)
    }
  }




}

exports.help = {
  name: 'equip',
  category: "economy"
};
