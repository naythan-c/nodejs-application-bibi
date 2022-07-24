const Discord = require('discord.js');
const fs = require("fs");

var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');


exports.run = async (client, message, args) => {
  var db = mongoUtil.getDb();
  const userProfileCollection = db.db(config.database).collection(config.collection.economy);
  const dat = await userProfileCollection.findOne({ 'userId': message.author.id })
  const prefixCollection = db.db(config.database).collection(config.collection.modConfig);
  var datPrefix = await prefixCollection.findOne({ "guildId": message.guild.id })

  let prefix;
  if (datPrefix === null) {
    prefix = "bb "
  } else if (datPrefix.prefix) {
    prefix = datPrefix.prefix
  } else {
    prefix = "bb "
  }

  const emojis = ["◀️", "▶️", "🛑"];
  const items=['Headers','Themes','Charms']
  let page;
  let max;
  let min;
  let pages;
  const pageMax = 4;
  pages = [
    {
      title: `${message.author.username}'s Inventory`,
      description: `All the items you own are shown here! Use the reactions to flip through your inventory!\n\nTo equip an item type:\n\`\`\`${prefix} equip <category> <item>\`\`\``,
      color: '0xd305fa',
      footer: {
        text: `Page 1/${pageMax}`,
      },
    },
    {
      title: 'Headers',
      color: '0xd305fa',
      footer: {
        text: `Page 2/${pageMax}`,
      },
    },
    {
      title: 'Themes',
      color: '0xd305fa',
      footer: {
        text: `Page 3/${pageMax}`,
      },
    },
    {
      title: 'Charms',
      color: '0xd305fa',
      footer: {
        text: `Page 4/${pageMax}`,
      },
    },
  ];
  var k=1
  for(let i in items){
   var dataFill='';
    for (let j in dat.inventory[items[i]]) {
        dataFill += `\`${j}\` - ${dat.inventory[items[i]][j]}\n`
    }
    if(dataFill.length<=0)
        pages[k].description=`You haven\'t bought anything in this category`
    else
        pages[k].description=dataFill
    k++
  }


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
      if (r.emoji.name === '◀️') {

        r.users.remove(message.author.id)
        if (page != min) {
          page = page - 1;
          await msg.edit({ embed: pages[page] });
        }

      } else if (r.emoji.name === '▶️') {

        r.users.remove(message.author.id)
        if (page != max) {
          page = page + 1;
          await msg.edit({ embed: pages[page] });
        }

      } else if (r.emoji.name === '🛑') {

          await msg.delete();


      }
    })
  });
}

exports.help = {
  name: 'inventory',
  category: "economy",
  aliases: ["inv"]
};
