const Discord = require("discord.js");
const fs = require("fs");

exports.run = (client, message, args) => {
  if (message.author.id !== `524002223181660167`) {
    return message.channel.send(
      `You need to be the Bubble Development creator to use this command!`
    );
  }
  const header = new Discord.MessageEmbed()
    .setImage(
      `https://cdn.discordapp.com/attachments/713828354549088535/714649418795843664/20200526_040600.jpg`
    )
    .setColor(0xd305fa);
  message.channel.send(header);
const rules = new Discord.MessageEmbed()
.setTitle(`**Bibi Official Rules**`)
.setDescription(
  `• **Channel Purpose**\nChannels are a means of organizing our server and each channel has a particular use. Use each channel according to its title and description.\n
  • **Discriminatory Behavior**\nDiscriminatory behavior towards a particular race, gender, group, or disability is not tolerated. Discriminatory behavior includes inappropriate language, slurs, memes, or jokes.\n
  • **NSFW**\nNSFW stands for Not Safe For Work. Sexually explicit content is strictly prohibited. Bibi Official is home to a wide variety of ages, and we want everybody including our younger audience to feel safe. Sending NSFW messages, memes, images, or jokes will result in a severe punishment.\n
  • **Profanity**\nUsing profanity while chatting or using public voice chats is prohibited. We have bots that protect against profanity, however, bypassing their filters will result in a punishment.\n
  • **Advertising**\nAdvertising of any kind is not allowed. If you would like to share something with the Bibi Official community, DM a staff member for approval.\n
  • **Spam**\nSpamming emojis, messages, images, or mass pinging is strictly prohibited. Spam is useless and clutters chat. If staff members catch spamming, an appropriate punishment will be enforced.\n\n**__TOS__**\nBibi Official abides to **[Discord](https://discordapp.com/terms)**'s Terms of Service.`
)
.setColor(0xd305fa);
message.channel.send(rules);
};

exports.help = {
  name: "rules-embed",
  category:'owner'
};
