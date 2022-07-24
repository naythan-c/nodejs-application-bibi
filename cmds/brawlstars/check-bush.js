const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args, func) => {
  let number = Math.ceil(Math.random() * 2000) + 2000;
  var lang = await func.getLangFile(message.guild.id,["brawlstars"])
  const b = `<:Bush:715771845910986752>`;
  const bb = `<:Bibi:713565170244517958>`;
  var bushChance = Math.floor(Math.random() * 10); // Outputs a value that's either 0 or 1.
  let bushOptions = [`${bb}${b}${b}\n${b}${b}${b}\n${b}${b}${b}`,
                     `${b}${bb}${b}\n${b}${b}${b}\n${b}${b}${b}`,
                     `${b}${b}${bb}\n${b}${b}${b}\n${b}${b}${b}`,
                     `${b}${b}${b}\n${bb}${b}${b}\n${b}${b}${b}`,
                     `${b}${b}${b}\n${b}${bb}${b}\n${b}${b}${b}`,
                     `${b}${b}${b}\n${b}${b}${bb}\n${b}${b}${b}`,
                     `${b}${b}${b}\n${b}${b}${b}\n${bb}${b}${b}`,
                     `${b}${b}${b}\n${b}${b}${b}\n${b}${bb}${b}`,
                     `${b}${b}${b}\n${b}${b}${b}\n${b}${b}${bb}`,

                    ];
  let enemy = bushOptions[Math.floor(Math.random() * bushOptions.length)];
  if (bushChance < 3) {
    // Check if the output was 1.
    message.channel.send(`${lang.bibiIsNotInTheBush}!\n<:Bush:715771845910986752><:Bush:715771845910986752><:Bush:715771845910986752>\n<:Bush:715771845910986752><:Bush:715771845910986752><:Bush:715771845910986752>`); // Send the message to the channel the command was posted in
  } else {
    // Otherwise
    message.channel.send(
      `${lang.bibiWasInTheBushAndDealt} **${number.toLocaleString()}** <:Damage:715844051932545094>!\n${enemy}`); // Send this message to the channel the command was posted in
  }
};

exports.help = {
  name: "check-bush",
  category: "brawlstars"
};
