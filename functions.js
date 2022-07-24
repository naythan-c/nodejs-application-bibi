const mongoUtil = require('./mongoUtil');
const config = require('./config');
module.exports = { // This basically works like every normal package you use.

  ping: function (channel) { // `ping` is the name of the function, then function() is where you can pass arguments.
    channel.send('Pong!');
  },

  embed: function (channel, message, deleteTimer) { // `ping` is the name of the function, then function() is where you can pass arguments.
    channel.send({
      embed: {
        description: message,
        color: 0xd305fa
      }
    }).then(msg => {
      if (!isNaN(deleteTimer)) {
        msg.delete({ timeout: deleteTimer })
      }
    }
    )
  },
  getLangFile: async function(guild,fields){
      var db = mongoUtil.getDb();
      const collection = db.db(config.database).collection(config.collection.modConfig);
      var dat =await collection.findOne({"guildId":guild})
      if(dat!==null){
          if(dat.hasOwnProperty("language"))
            var lang = require('./languages/'+dat.language+'.json')
          else{
            await collection.updateOne(
                {"guildId":guild},
                {$set:{"language":"en"}}
            )
            lang=require('./languages/en.json')
            }
    }
    else{
        lang=require('./languages/en.json')
    }
    switch(fields.length){
      case 0:{
        return lang
        break;
      }
      case 1:{
        return lang[fields[0]]
        break;
      }
      case 2:{
        return lang[fields[0]][fields[1]]
      }
    }
  },
  tutorial: async function (message) {
    const emojis = ["◀️", "▶️", "🛑"];
    let page;
    let max;
    let min;
    let pages;
    const pageMax = 2;
    pages = [
      {
        title: 'Tutorial',
        description: `Welcome to the Bibi Arena! This tutorial will guide you through the main commands and features.`,
        color: '0xd305fa',
        footer: {
          text: `Page 1/${pageMax}`,
        },
      },
      {
        title: 'Classes',
        description: `There are 5 classes each with their own unique ability:`,
        fields: [
          {
            name: 'Warrior',
            value: '```The warrior is a force to be reckoned with. It has medium health and medium range, which makes it versatile in almost any situation.```',
          },
          {
            name: 'Tank',
            value: '```The tank, powerful by nature, soaks up a lot of damage and deals a lot of damage close.```',
          },
          {
            name: 'Assassin',
            value: '```The assassin is a cunning one, can escape with ease, but also has a versatile kit.```',
          },
          {
            name: 'Marksman',
            value: '```The marksman is a deadly one, accurate with every shot and devastating at long range.```',
          },
          {
            name: 'Healer',
            value: '```The healer is a passive brawler, hits are deadly but has great healing potential.```',
          }
        ],
        color: '0xd305fa',
        footer: {
          text: `Page 2/${pageMax}`,
        },
      },
      {
        title: 'Duels',
        description: `Earn credits by battling other players!`,
        fields: [
          {
            name: 'Arena',
            value: `\`\`\`The arena is a series of tiles that allow you to move across using the joystick.\`\`\`\n${"<:JungleTile:743647744509607997>".repeat(15)}`,
          },
          {
            name: 'Joystick',
            value: "◀️ - Allows you to move left\n▶️ - Allows you to move right\n🗡 - Allows you to attack\n💚 - Allows you to heal",
          }
        ],
        color: '0xd305fa',
        footer: {
          text: `Page 1/${pageMax}`,
        },
      }
    ];


    page = 0;
    max = pages.length - 1;
    min = 0;

    message.channel.send({ embed: pages[0] }).then(async msg => {

      await msg.react(emojis[0]);
      await msg.react(emojis[1]);
      await msg.react(emojis[2]);

      const filter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;

      const collector = msg.createReactionCollector(filter, { time: 60 * 1000 })
      collector.on('collect', async (r) => {
        r.users.remove(message.author.id)
        if (r.emoji.name === '◀️') {
          if (page != min) {
            page = page - 1;
            await msg.edit({ embed: pages[page] });
          }

        } else if (r.emoji.name === '▶️') {
          if (page != max) {
            page = page + 1;
            await msg.edit({ embed: pages[page] });
          }

        } else if (r.emoji.name === '🛑') {

          await msg.delete();


        }
      })
    });
  },
  updateDb: async function (collection, player, money, bibi_tokens, won) {
    const dat = await collection.findOne({ "userId": player })
    if (dat === null) {
      if (won)
        collection.insertOne({ "userId": player, "gamesWon": 1, "gamesLost": 0, [money]: bibi_tokens })
      else
        collection.insertOne({ "userId": player, "gamesWon": 0, "gamesLost": 1, [money]: 0 })
    }
    else {
      if (won) {
        collection.updateOne(
          { 'userId': player },
          { $inc: { "gamesWon": 1, [money]: bibi_tokens } }
        )
      }
      else {
        collection.updateOne(
          { 'userId': player },
          { $inc: { "gamesLost": 1 } }
        )
      }

    }

  },
  levelSystem: async function (dat, config, levelCollection, message) {
    // console.log(Date.now())
    const cooldown = 50000
    if (dat === null) {

      const levelData = {
        "stats": {
          [message.author.id]: {
            xp: 0,
            totalxp: 0,
            level: 1,
            reqxp: 5,
            cooldown: Date.now()
          }
        }
      }
      await levelCollection.insertOne({ 'guildId': message.guild.id, 'level': levelData })
      console.log('added')
    }
    if (dat === null) {
      dat = await levelCollection.findOne({ 'guildId': message.guild.id })
    }
    if (dat.level.stats[message.author.id]) {
      var diff = Date.now() - dat.level.stats[message.author.id].cooldown
      if (diff > cooldown) {
        var setxp = "level.stats." + message.author.id + ".xp"
        var settotalxp = "level.stats." + message.author.id + ".totalxp"
        var setcooldown = "level.stats." + message.author.id + ".cooldown"
        var setreqxp = "level.stats." + message.author.id + ".reqxp"
        var setlevel = "level.stats." + message.author.id + ".level"

        var getxp = dat.level.stats[message.author.id].xp
        var getreqxp = dat.level.stats[message.author.id].reqxp

        getxp++;
        if (getxp == getreqxp) {
          getreqxp = dat.level.stats[message.author.id].level * 10
          //+dat.level.stats[message.author.id].level*10
          var getlevel = dat.level.stats[message.author.id].level
          getlevel++;
          await levelCollection.updateOne(
            { 'guildId': message.guild.id },
            { $inc: { [setlevel]: 1 } }
          )
          await levelCollection.updateOne(
            { 'guildId': message.guild.id },
            { $set: { [setreqxp]: getreqxp } }
          )
          getxp = 0;
          var db = mongoUtil.getDb();
          const collection = db.db(config.database).collection(config.collection.modConfig);
          var dat =await collection.findOne({"guildId":message.guild.id})
          if(dat === null  || (!dat.hasOwnProperty("levelNotificationChannel")) )
          message.channel.send(`Congrats, <@${message.author.id}> you reached level ${getlevel}`)
          else {
            message.guild.channels.cache.get(dat.levelNotificationChannel).send(`Congrats, <@${message.author.id}> you reached level ${getlevel}`)
          }
        }

        await levelCollection.updateOne(
          { 'guildId': message.guild.id },
          { $inc: { [settotalxp]: 1 } }
        )
        await levelCollection.updateOne(
          { 'guildId': message.guild.id },
          { $set: { [setxp]: getxp } }
        )

        await levelCollection.updateOne(
          { 'guildId': message.guild.id },
          { $set: { [setcooldown]: Date.now() } }
        )

        // setTimeout(async ()=>{
        //   await levelCollection.updateOne(
        //     {'guildId':message.guild.id},
        //     {$set:{[setcooldown]:false}}
        //   )
        //   console.log('cooldown over')
        // },1000)
      }

    }
    else {
      const lvlData = {


        xp: 1,
        totalxp: 1,
        level: 1,
        reqxp: 5,
        cooldown: Date.now()


      }
      var ss = "level.stats." + message.author.id
      await levelCollection.updateOne(
        { 'guildId': message.guild.id },
        { $set: { [ss]: lvlData } }
      )
      console.log('done')
    }




  },
  partition:function(items, left, right,id){
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] > pivot) {
            i++;
        }
        while (items[j] < pivot) {
            j--;
        }
        if (i <= j) {
            module.exports.swap(items, i, j,id); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
  },
  quickSort:function(items, left, right,id){
    var index;
    if (items.length > 1) {
        index = module.exports.partition(items, left, right,id); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            module.exports.quickSort(items, left, index - 1,id);
        }
        if (index < right) { //more elements on the right side of the pivot
            module.exports.quickSort(items, index, right,id);
        }
    }
    return items;
  },
  swap:function(items, leftIndex, rightIndex,id){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;

    temp=id[leftIndex];
    id[leftIndex] = id[rightIndex];
    id[rightIndex] = temp;
  }


}
