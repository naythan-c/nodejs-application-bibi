const Discord = require('discord.js');
const fs = require("fs");

var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');


exports.run = async (client, message, args) => {
  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.shop);
  const dat = await collection.findOne({ 'name': 'shop' })
  const emojis = ["◀️", "▶️", "🛑"];
  const items=['Headers','Themes','Charms']
  let page;
  let max;
  let min;
  let pages;
  const pageMax = 4;
  pages = [
    {
      title: 'Shop',
      description: `Enjoy browsing around! You can buy items using Bibi Tokens! Explore the shop by reacting below!`,
      color: '0xd305fa',
      image: {
        url: 'https://cdn.discordapp.com/attachments/713829737247670333/742468803924983898/20200810_224507.png',
      },
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
    for (let j in dat.items[items[i]]) {
      dataFill += `[${j}](${dat.items[items[i]][j].link}) - ${dat.items[items[i]][j].cost} <:BibiToken:737226663523385356>\n`
    }
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
  name: 'shop',
  category: "economy"
};
