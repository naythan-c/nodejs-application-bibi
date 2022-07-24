const Discord = require('discord.js');
const fs = require("fs");

var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');


exports.run = async (client, message, args, func) => {

  var db = mongoUtil.getDb();
  const userProfileCollection = db.db(config.database).collection(config.collection.economy);

  if (!message.mentions.users.first()) {
    return func.embed(message.channel, "Please mention a user to rob")
  } else if (message.mentions.users.first().id == message.author.id) {
    return func.embed(message.channel, "You cannot rob yourself!")
  } else if (message.mentions.users.first().bot == true) {
    return func.embed(message.channel, "You cannot rob a bot!")
  }

  const userDat = await userProfileCollection.findOne({ 'userId': message.author.id })
  const memberDat = await userProfileCollection.findOne({ 'userId': message.mentions.users.first().id })

  if(!memberDat || !memberDat.bibi_tokens || memberDat.bibi_tokens == 0){
    return func.embed(message.channel, "This user does not have any tokens for you to rob!")
  }

  if(!userDat || !userDat.bibi_tokens || userDat.bibi_tokens < 100){
    return func.embed(message.channel, "You need at least 100 <:BibiToken:737226663523385356> to pay the cops if you get caught!")
  }
  const number = (Math.floor(Math.random() * 99)) + 1;
  const fine = (Math.floor(Math.random() * 30)) + 70;
  const chance = 10;
  const amount = Math.floor(((Math.random() * 30 + 5) / 100) * memberDat.bibi_tokens)

  if (number < chance) {
    userProfileCollection.updateOne(
      { 'userId': message.mentions.users.first().id },
      {
        $inc: { 'bibi_tokens': -amount }
      }
    ).then(() => {})
      .catch((err) => { message.channel.send(err) })

    userProfileCollection.updateOne(
      { 'userId': message.author.id },
      {
        $inc: { 'bibi_tokens': amount }
      }
    ).then(() => {})
      .catch((err) => { message.channel.send(err) })

      return func.embed(message.channel, `Robbed ${amount} <:BibiToken:737226663523385356> from ${message.mentions.users.first().username}`)
  } else {
    userProfileCollection.updateOne(
      { 'userId': message.author.id },
      {
        $inc: { 'bibi_tokens': -fine }
      }
    ).then(() => {})
      .catch((err) => { message.channel.send(err) })

    return func.embed(message.channel, `The cops caught you, and as a result you paid a ${fine} <:BibiToken:737226663523385356> fine.`)
  }

}

exports.help = {
  name: 'rob',
  category: "economy"
};
