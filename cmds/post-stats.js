const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
  if (message.author.id == `524002223181660167` || message.author.id == `428622163931824129`) {

    message.channel.send("Running...")
    const DBL = require("dblapi.js");
    const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxMzE4MTMzNTYyMzA0MTA3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkyMjQyNDU2fQ.VWYkGj6emuV_wnidvkA12pdQWdkKXfyhGHwimJqD2MI', client);
    dbl.postStats(client.guilds.cache.size);
    message.channel.send("Done!")

  }
}

exports.help = {
  name: 'post-stats',
  category: 'owner'
};
