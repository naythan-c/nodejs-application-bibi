const Discord = require('discord.js');
const fs = require("fs");

var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');


exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id)
  if (!args[1]) {
    return func.embed(message.channel, lang.economy.buy.pleaseEnterSomethingToBuy)
  } else if (args.length < 3) {
    return func.embed(message.channel,  lang.economy.buy.pleaseEnterAllFields)
  }
  var db = mongoUtil.getDb();
  const shopCollection = db.db(config.database).collection(config.collection.shop);
  const userProfileCollection = db.db(config.database).collection(config.collection.economy);
  const shopDat = await shopCollection.findOne({ 'name': 'shop' })
  const userDat = await userProfileCollection.findOne({ 'userId': message.author.id })
  var category = args[1].toLowerCase().charAt(0).toUpperCase() + args[1].toLowerCase().substring(1)
  var item = args.slice(2)

  for (let i in item) {
    item[i] = item[i].charAt(0).toUpperCase() + item[i].substring(1)
  }
  item = item.join(' ')
  if (shopDat.items[category]) {
    if (shopDat.items[category][item]) {
      if (userDat.bibi_tokens >= shopDat.items[category][item].cost) {
        var ss = 'inventory.' + category
        if (userDat.inventory) {
          if(userDat.inventory[category]){
          if (!userDat.inventory[category].some(items => items === item)) {
            userProfileCollection.updateOne(
              { 'userId': message.author.id },
              {
                $inc: { 'bibi_tokens': -shopDat.items[category][item].cost },
                $push: { [ss]: item }
              }
            ).then(() => {
                var mssg=lang.economy.buy.itemBought
                mssg=mssg.replace('{{item}}',item)
                mssg=mssg.replace('{{shopDat}}',shopDat.items[category][item].cost)
                func.embed(message.channel, mssg) })
              .catch((err) => { message.channel.send(err) })
          }
          else {
            func.embed(message.channel, lang.economy.buy.alreadyBought)
          }
        } else {
          userProfileCollection.updateOne(
            { 'userId': message.author.id },
            {
              $inc: { 'bibi_tokens': -shopDat.items[category][item].cost },
              $push: { [ss]: item }
            }
          ).then(() => {
              var mssg=lang.economy.buy.itemBought
              mssg=mssg.replace('{{item}}',item)
              mssg=mssg.replace('{{shopDat}}',shopDat.items[category][item].cost)
              func.embed(message.channel, mssg) })
            .catch((err) => { message.channel.send(err) })
        }
        }
        else {
          userProfileCollection.updateOne(
            { 'userId': message.author.id },
            {
              $inc: { 'bibi_tokens': -shopDat.items[category][item].cost },
              $push: { [ss]: item }
            }
          ).then(() => {
              var mssg=lang.economy.buy.itemBought
              mssg=mssg.replace('{{item}}',item)
              mssg=mssg.replace('{{shopDat}}',shopDat.items[category][item].cost)
              func.embed(message.channel, mssg) })
            .catch((err) => { message.channel.send(err) })
        }
      }
      else {
        func.embed(message.channel, lang.economy.buy.notEnoughBibiTokens)
      }
    } else {
      func.embed(message.channel, lang.economy.buy.itemDoesNotExist)
    }
  } else {
    func.embed(message.channel, lang.economy.buy.invalidCategory)
  }

}

exports.help = {
  name: 'buy',
  category: "economy"
};
