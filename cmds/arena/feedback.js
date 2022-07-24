const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args, func) => {
  if (!args[1]) {
    return message.channel.send(`Please enter some feedback!`)
  }
  let chn = client.channels.cache.get('813743151218032650')
  let split =chn.name.split('-')
  let feedbackNumber = parseInt(split[3])
  const embed = new Discord.MessageEmbed()
    .setTitle(`Feedback Number : ${feedbackNumber}`)
    .setDescription(
      `${args.slice(1).join(` `)}`
    )
    .setColor(0x0498ED)
    .setFooter(`Feedback by ${message.author.username} | Author ID: ${message.author.id}`);
  let feedbackChannel = client.channels.cache.get(`813649627067842580`)
  feedbackChannel.send(embed);
  message.channel.send(`Feedback sent!`)

  chn.setName(`${split.slice(0,3).join('-')}-${++feedbackNumber}`)
}


exports.help = {
  name: 'feedback',
  category: "arena"
};
