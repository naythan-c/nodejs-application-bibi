const Discord = require("discord.js");
const fs = require("fs");
const config1 = require('../config.json');
var mongoUtil = require('../mongoUtil.js');

exports.run = async (client, message, args, func) => {

  var db = mongoUtil.getDb();
  const collection = db.db(config1.database).collection(config1.collection.modConfig);
  var dat = await collection.findOne({ "guildId": message.guild.id })
  var lang = await func.getLangFile(message.guild.id,["helpCommand"])
  let prefix;
  if (dat === null) {
    prefix = "bb "
  } else if (dat.prefix) {
    prefix = dat.prefix
  } else {
    prefix = "bb "
  }

  var brawlstars = '', emotes = '', filters = '', fun = '', general = '', moderation = '', config = '', leveling = '', games = ''
  client.commands.forEach((cmd) => {
    if (!(cmd.help.name === 'help' || cmd.help.category === 'owner')) {
      switch (cmd.help.category) {
        case 'brawlstars':
          brawlstars += "`" + cmd.help.name + "`, "
          break;
        case 'emotes':
          emotes += "`" + cmd.help.name + "`, "
          break;
        case 'filters':
          filters += "`" + cmd.help.name + "`, "
          break;
        case 'fun':
          fun += "`" + cmd.help.name + "`, "
          break;
        case 'general':
          general += "`" + cmd.help.name + "`, "
          break;
        case 'moderation':
          moderation += "`" + cmd.help.name + "`, "
          break;
        case 'config':
          config += "`" + cmd.help.name + "`, "
          break;
        case 'leveling':
          leveling += "`" + cmd.help.name + "`, "
          break;
        case 'games':
          games += "`" + cmd.help.name + "`, "
          break;

      }
    }
  });

  var emojis=['1️⃣','2️⃣'];
  let page;
  let max;
  let min;
  let pages;
  const pageMax = 2;
  pages = [
    {
      title: '',
      description: ``,
      color: '0xd305fa',
      footer: {
        text: `Page 1/${pageMax}`,
      },
    },
    {
        title: '',
        description: ``,
        color: '0xd305fa',
        footer: {
          text: `Page 1/${pageMax}`,
        },
      },
    ];

    page = 0;
    max = pages.length - 1;
    min = 0;

  const embed = new Discord.MessageEmbed()
    .setAuthor(lang.helpMenu, "https://cdn.discordapp.com/attachments/598959145705668608/732016854201270282/Bibi.png")
    .setDescription(
      `**${lang.prefix}** - \`${prefix}\``
    )
    .addField(
      `<:Bibi:713565170244517958> | **${lang.category.general}**`,
      general.substring(0, general.length - 2)
    )
    .addField(
      `<:BrawlStars:723731242398253127> | **${lang.category.brawlstars}**`,
      brawlstars.substring(0, brawlstars.length - 2)
    )
    .addField(
      `😜 | **${lang.category.fun}**`,
      fun.substring(0, fun.length - 2)
    )
    .addField(
      `🎮 | **${lang.category.games}**`,
      games.substring(0, games.length - 2)
    )
    .addField(
      `🎭 | **${lang.category.emotes}**`,
      emotes.substring(0, emotes.length - 2)
    )
    .addField(
      `<:Image:723723096686723102> | **${lang.category.filters}**`,
      filters.substring(0, filters.length - 2)
    )
    .addField(
      `🛠 | **${lang.category.moderation}**`,
      moderation.substring(0, moderation.length - 2)
    )
    .addField(
      `⬆️ | **${lang.category.leveling}**`,
      leveling.substring(0, leveling.length - 2)
    )
    .addField(
      `<:Gear:723724013041352816> | **${lang.category.configuration}**`,
      config.substring(0, config.length - 2)
    )
    .addField(
      `${lang.category.links.link}`,
      `<:PurpleArrow:723714702521401357> **[${lang.category.links.inviteBibi}](https://discord.com/api/oauth2/authorize?client_id=713181335623041076&permissions=388166&scope=bot) | [${lang.category.links.joinOurServer}](https://discord.gg/nCh7AwG) | [${lang.category.links.website}](https://bibi-webhook.herokuapp.com/) | [${lang.category.links.voteForBibi}](https://top.gg/bot/713181335623041076/vote)**`
    )
    .setColor(0xd305fa)
    .setImage(
      `https://cdn.discordapp.com/attachments/713829737247670333/714641499282866226/20200526_033843.png`
    );
  return message.channel.send(embed);

};

exports.help = {
  name: "help"
};
