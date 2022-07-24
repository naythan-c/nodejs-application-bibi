const func = require('../functions.js');
var mongoUtil = require('../mongoUtil');
const config = require('../config.json');
exports.run = async (bot, message) => {

  if (message.author.bot) return;
  // if (message.channel.type === "dm") {
  //   bot.guilds.cache
  //     .get("713260797891051540")
  //     .channels.cache.get("714982315981537422")
  //     .send(`${message.author.id}`);
  //   bot.guilds.cache
  //     .get("713260797891051540")
  //     .channels.cache.get("714982315981537422")
  //     .send(`${message.author.username} says\n>>> ${message}`);
  // }

  var db = mongoUtil.getDb();
  // console.log(db)
  let prefix;
  const collection = db.db(config.database).collection(config.collection.modConfig);
  const analytics = db.db(config.database).collection(config.collection.analytics);
  const voting = db.db(config.database).collection(config.collection.levelCard);
  var dat = await collection.findOne({ "guildId": message.guild.id })
  // console.log(dat)
  if (dat === null){
    prefix = "bb "
  } else if (dat.prefix){
    prefix = dat.prefix
  } else {
    prefix = "bb "
  }


  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd;

  // if (msg.startsWith(prefix + "send")) {
  //   if (
  //     message.author.id == "524002223181660167" ||
  //     message.author.id == "408057689235783690" ||
  //     message.author.id == "578487956512309248" ||
  //     message.author.id == "574661537243987978"
  //   ) {
  //     if (!args[1]) {
  //       return message.channel.send("Specify a user to DM!");
  //     }

  //     try {
  //       bot.users.cache.get(args[1]).send(args.slice(2).join(" "));
  //       message.react("✅");
  //     } catch (error) {
  //       return message.reply("Message Failed To Send");
  //     }
  //   } else {
  //     return message.channel.send("Sorry you can't use this!");
  //   }
  // }
  if (message.channel.type === "dm") {
    return;
  }

  if (message.content.startsWith(prefix)) {
    args = message.content.slice(prefix.length).split(/ +/g);

    // Check if the command exists in Commands
    if (bot.commands.has(args[0].toLowerCase())){

      cmd = bot.commands.get(args[0].toLowerCase())
    // Check if the command exists in Aliases
  } else if (bot.aliases.has(args[0].toLowerCase())) {
      // Assign the command, if it exists in Aliases
      cmd = bot.commands.get(bot.aliases.get(args[0].toLowerCase()));
    }
    // cmd = bot.commands.get(args[0].toLowerCase(.toLowerCase());
    if (cmd) {
      updateAnalytics(analytics,cmd,message.guild.id)
      checkVotes(voting,analytics,message)
      cmd.run(bot, message, args, func);
    }
  }

  const botID = bot.user.id
  if (message.content.startsWith(`<@${botID}> `) || message.content.startsWith(`<@!${botID}> `)) {
    if (message.content.startsWith(`<@!${botID}> `)) {
      let mention = `<@!${botID}> `
      args = message.content.slice(mention.length).split(/ +/g);
      if (bot.commands.has(args[0].toLowerCase())) {
        // Assign the command, if it exists in Commands
        cmd = bot.commands.get(args[0].toLowerCase())
      // Check if the command exists in Aliases
    } else if (bot.aliases.has(args[0].toLowerCase())) {
        // Assign the commlevelCollectionand, if it exists in Aliases
        cmd = bot.commands.get(bot.aliases.get(args[0].toLowerCase()));
      }

      if (cmd) {
        updateAnalytics(analytics,cmd,message.guild.id)
        checkVotes(voting,analytics,message)
        cmd.run(bot, message, args, func);
      }
    } else {
      let mention = `<@${botID}> `
      args = message.content.slice(mention.length).split(/ +/g);
      if (bot.commands.has(args[0].toLowerCase())) {
        // Assign the command, if it exists in Commands
        cmd = bot.commands.get(args[0].toLowerCase())
      // Check if the command exists in Aliases
    } else if (bot.aliases.has(args[0].toLowerCase())) {
        // Assign the command, if it exists in Aliases
        cmd = bot.commands.get(bot.aliases.get(args[0].toLowerCase()));
      }

      if (cmd) {
        updateAnalytics(analytics,cmd,message.guild.id)
        checkVotes(voting,analytics,message)
        cmd.run(bot, message, args, func);
      }
    }
  }


    if(!message.content.startsWith(prefix)){
      const levelCollection = db.db(config.database).collection(config.collection.levellingSystem);
      var dat = await levelCollection.findOne({'guildId':message.guild.id})
      if(dat === null){
        await levelCollection.insertOne({'guildId':message.guild.id,"level":{"stats":{}}})
        dat = await levelCollection.findOne({'guildId':message.guild.id})
      }
      if(!dat.disabled)
        func.levelSystem(dat,config,levelCollection,message)
      return;
    }
}

async function checkVotes(voting,analytics,message){
  var dat = await voting.findOne({"userId":message.author.id})
  if(dat === null){
    await voting.insertOne({"userId":message.author.id})
  }

  if(!dat.hasOwnProperty("voted")){
    return
    var dat = await analytics.findOne({"type":"voting"})
    var voteMessage = dat.onGoingVoting[0].voteMessage
    setTimeout(async()=>{
      message.author.send(voteMessage).then(async(msg)=>{
        const emojis=["✅","❌"]
        for(var reactn in emojis)
          await msg.react(emojis[reactn]);
          const filter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id
          const collector = msg.createReactionCollector(filter, { max:1,time: 60 * 1000 })
          collector.on('collect',async(r)=>{
            if(r.emoji.name === "✅"){
              await analytics.updateOne(
                {"type":"voting"},
                {$inc:{"onGoingVoting.0.votes.yes":1}}
              )
              console.log('yes done')
            }
            else if(r.emoji.name === "❌"){
              await analytics.updateOne(
                {"type":"voting"},
                {$inc:{"onGoingVoting.0.votes.no":1}}
              )
              console.log('no done')
            }
          })
      })
    },Math.floor(Math.random()*5000))

  }
}
async function updateAnalytics(analytics,cmd,guildId){
  return
  // console.log(cmd)
  var com = `command.${cmd.help.name}`
  analytics.updateOne(
    {"type":"complete"},
    {$inc:{[com]:1}}
  )
  var dat = await analytics.findOne({"guildId":guildId})
  if(dat===null){
    await analytics.insertOne({"guildId":guildId,"command":{}})
  }
  await analytics.updateOne(
    {"guildId":guildId},
    {$inc:{[com]:1}}
  )
  // console.log('done')
}
