const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["fun"])
      let number = Math.ceil(Math.random() * 6);
      var r=lang.roll
      r=r.replace("{{number}}",number)
    message.channel.send(r);
}

exports.help = {
  name: 'roll',
  category: "fun"

};
