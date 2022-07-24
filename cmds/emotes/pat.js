const Discord = require('discord.js');
const fs = require("fs");
const fetch = require('node-fetch');

exports.run = async (client, message, args, func) => {
  //   if(message.author.id == `408057689235783690`){
  //   return message.channel.send(`Hugging eh Rogue?`)
  // }
  var lang = await func.getLangFile(message.guild.id,["emotes","pat"])
    const user = message.mentions.users.first();
  let name;
  if (user === undefined) {
    name = lang.name
  } else {
    name = user.username;
  }

    const {MessageAttachment} = require('discord.js');
    const {body} = fetch('https://nekos.life/api/v2/img/pat').then(res => res.json()).then(result => {
      if (!result.url) return message.channel.send(lang.somethingWentWrong);
      const attachment = new MessageAttachment(result.url);
      const animeGif = attachment.attachment
      var finalMessage=lang.message;
      finalMessage=finalMessage.replace("{{name}}",name)
      finalMessage=finalMessage.replace("{{username}}",message.author.username)
           const embed = new Discord.MessageEmbed()
      .setTitle(finalMessage)
      .setImage(`${animeGif}`)
      .setColor(0xd305fa);
    message.channel.send(embed);
    })

}

exports.help = {
  name: 'pat',
  category: "emotes"
};
