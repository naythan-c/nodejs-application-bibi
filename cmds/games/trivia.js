const Discord = require('discord.js');
const fs = require("fs");
const fetch = require('node-fetch');
var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');

exports.run = async (client, message, args,func) => {
var db = mongoUtil.getDb();
const collection = db.db(config.database).collection(config.collection.economy);

const response = await fetch("https://opentdb.com/api.php?amount=1&type=boolean");
const data = await response.json();
const question = data.results[0].question;
const newQuestion1 = question.replace(/&quot;/g, `"`)
const newQuestion2 = newQuestion1.replace(/&#039;/g, `'`)
const correct = data.results[0].correct_answer
const embed = new Discord.MessageEmbed()
.setTitle(`Bibi Trivia`)
.setDescription(`True or False?\n\n\`\`\`${newQuestion2}\`\`\``)
.setFooter(`You have 15 seconds to answer | Type "give up" to get the correct answer`)
.setThumbnail(`https://cdn.discordapp.com/attachments/715773831322664962/728787378105483294/21610-200.png`)
.setColor(0xd305fa);
message.channel.send(embed);
try {
    let msgs = await message.channel.awaitMessages(
      (u2) => u2.author.id === message.author.id,
      { time: 15000, max: 1, errors: ["time"] }
    );
    const answer = msgs.first();
    if (answer.content.toLowerCase() === correct.toLowerCase()) {
      func.updateDb(collection,message.author.id,5,true)
      return message.channel.send(`You got it correct!`);
    } else if(answer.content.toLowerCase().includes("give up")){
      return message.channel.send(`The correct answer was: \`${correct}\``);
    } else {
      func.updateDb(collection,message.author.id,0,false)
      return message.channel.send(`You got it wrong.`);
    }
  } catch (e) {
    return message.channel.send(`Ran out of time...`);
  }

}

exports.help = {
  name: 'trivia',
  category: "games"

};
