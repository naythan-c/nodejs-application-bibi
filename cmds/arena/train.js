const Discord = require('discord.js');
var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async(client, message, args, func) => {
  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.arena);
  let cred=Math.floor(Math.random()*300);
  collection.updateOne(
    {"userId":message.author.id},
    {$inc:{"bibi_xp":cred}}
  ).then(message.channel.send('Done'))

}
exports.help = {
  name: "train",
  category: 'games'
};
