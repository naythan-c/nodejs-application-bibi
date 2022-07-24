const Discord = require('discord.js');
const fs = require("fs");

var mongoUtil = require('../mongoUtil.js');
const config = require('../config.json');


exports.run = async (client, message, args, func) => {
  if (!args[1]) {
    return func.embed(message.channel, 'Please enter something to equip or add `none` instead of the item to unequip!')
  } else if (args.length < 3) {
    return func.embed(message.channel, 'Please enter all fields')
  }
  var db = mongoUtil.getDb();
  const userProfileCollection = db.db(config.database).collection(config.collection.arena);
  const userDat = await userProfileCollection.findOne({ 'userId': message.author.id })
  var category = args[1].toLowerCase()
  var item = args[args.length-1]

  if(userDat.hasOwnProperty(category)){
        if(userDat.classes.hasOwnProperty(item)){

                switch(category){
                    case "classes":{
                        await userProfileCollection.updateOne(
                            {"userId":message.author.id},
                            {$set:{"class_equipped":item}}
                        )
                    }
                }
                func.embed(message.channel,`${item} equipped`)

        }
        else{
            func.embed(message.channel,`Seems like you do not have ${item}`)
        }
  }



}

exports.help = {
  name: 'equip',
  category: "arena"
};
