const Discord = require('discord.js')
const config = require('../config.json');
const mongoUtil = require('../mongoUtil');
const func = require('../functions.js');
exports.run = async(client,reaction,user) => {
  if (reaction.partial) {
  		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
  		try {
  			await reaction.fetch();
  		} catch (error) {
  			console.error('Something went wrong when fetching the message: ', error);
  			// Return as `reaction.message.author` may be undefined/null
  			return;
  		}
  	}
    var db = mongoUtil.getDb();
    const collection = db.db(config.database).collection(config.collection.reactionRoles);
    var dat =await collection.findOne({"guildId":reaction.message.guild.id})
    if(dat===null)
    console.log('hehe');
  // console.log(reaction.message.id)
}
