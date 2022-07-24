const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {

  let number = Math.ceil(Math.random() * 100);
  var lang = await func.getLangFile(message.guild.id,["brawlstars"])
  let title;
  if(number < 20){
    title = lang.brawlstars.rateMe.noob;
  } else if (number >= 20 && number < 40) {
    title = lang.brawlstars.rateMe.kindaNubNgl;
  } else if (number >= 40 && number < 60) {
    title = lang.brawlstars.rateMe.amatuer;
  } else if (number >= 60 && number < 75) {
    title = lang.brawlstars.rateMe.prettyGood;
  } else if (number >= 75 && number < 90) {
    title = lang.brawlstars.rateMe.almostPro;
  } else if (number >= 90 && number <= 100) {
    title = lang.brawlstars.rateMe.thisGameIsTooEasy;
  }
        const embed = new Discord.MessageEmbed()
      .setTitle(`${title}`)
      .setDescription(
        `${lang.rateMe.rating} ${number}%`
      )
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'rate-me',
  category: "brawlstars"
};
