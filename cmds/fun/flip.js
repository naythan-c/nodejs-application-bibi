const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["fun","flip"])
      var coinflip = Math.floor(Math.random() * 2); // Outputs a value that's either 0 or 1.
    if (coinflip === 1) {
      // Check if the output was 1.
      message.channel.send(lang.coinLandedOn+lang.tails); // Send the message to the channel the command was posted in
    } else {
      // Otherwise
      message.channel.send(lang.coinLandedOn+lang.heads); // Send this message to the channel the command was posted in
    }
}

exports.help = {
  name: 'flip',
  category: "fun"

};
