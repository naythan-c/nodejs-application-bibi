const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
      let number = Math.ceil(Math.random() * 30000);
      var lang = await func.getLangFile(message.guild.id,["brawlstars"])
  let title;
  if(number < 1000){
    title = lang.brawlstars.rateMe.noob;
  } else if (number >= 1000 && number < 5000) {
    title = lang.brawlstars.rateMe.kindaNubNgl;
  } else if (number >= 5000 && number < 10000) {
    title = lang.brawlstars.rateMe.amatuer;
  } else if (number >= 10000 && number < 16000) {
    title = lang.brawlstars.rateMe.prettyGood;
  } else if (number >= 16000 && number < 20000) {
    title = lang.brawlstars.rateMe.almostPro;
  } else if (number >= 20000 && number <= 30000) {
    title = lang.brawlstars.rateMe.thisGameIsTooEasy;
  }
        const embed = new Discord.MessageEmbed()
      .setTitle(`${title}`)
      .setDescription(
        `${lang.rateMe.trophies} ${number.toLocaleString()} <:Trophy:715843972844617788>`
      )
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'trophy-count',
  category: "brawlstars"
};
