const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args,func) => {
  const got = require("got"),
    { MessageEmbed } = require("discord.js");
    var lang= await func.getLangFile(message.guild.id,["brawlstars"]);
  got("https://www.reddit.com/r/Brawlstars/random/.json")
    .then(response => {
      let content = JSON.parse(response.body),
        image = content[0].data.children[0].data.url,
        embed = new MessageEmbed()
          .setTitle(`${content[0].data.children[0].data.title}`)
          .setURL(
            `https://www.reddit.com${content[0].data.children[0].data.permalink}`
          )
          .setTimestamp()
          .setColor(0xd305fa)
          .setFooter(
            "👍 " +
            content[0].data.children[0].data.ups +
            " | 💬 " +
            content[0].data.children[0].data.num_comments +
            " | " +
            content[0].data.children[0].data.author
          )

      if (content[0].data.children[0].data.is_video) {
        embed.setDescription(lang.noteBrawlPost)
      } else {
        embed.setImage(image)
      }
      message.channel.send(embed);
    })
    .catch(console.log);
};

exports.help = {
  name: "brawl-post",
  category: "brawlstars"
};
