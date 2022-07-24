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
      `https://cdn.discordapp.com/attachments/713261670088310874/715634111028527194/20200526_040905.jpg`
    )
    .setColor(0xd305fa);
  message.channel.send(header);
  const faq1 = new Discord.MessageEmbed()
    .setTitle(
      `<:Bubbles:713261857955119104> Frequently Asked Questions <:Bubbles:713261857955119104>`
    )
    .setDescription("```Server Related F.A.Qs```")
    .addField(
      "<:Bubbles:713261857955119104> **Q1: What are the requirements for partnering with this bot?**",
      "**A1:** The server-partnerships requires a  member count of at least 100 or higher as well as a partners channel. Bot-partnerships requires the bot to be in a minimum of 30 servers or higher. If you think you fulfill these requirements and would like to partner, kindly open a ticket to contact the staff. Kindly note that even if you fulfill these requirements, we still have the right to deny the partnership if we don't like it."
    )
    .addField(
      "<:Bubbles:713261857955119104> **Q2: How do I get the VIP role?**",
      "**A2:** Well you have to earn this role by proving to be highly helpful in chat and by being active. Partners instantly unlock the VIP role."
    )
    .addField(
      "<:Bubbles:713261857955119104> **Q3: How do I apply for server staff?**",
      "**A3:** Server staff will be mostly picked by the existing staff. But we will also host staff applications for the role. We'll inform you about any upcoming staff application in <#713828190270783578>."
    )
    .addField(
      "<:Bubbles:713261857955119104> **Q4: A person is breaking the rules/bypassing the auto-mod. How do I warn him?**",
      "**A4:** If you notice this happening, we'll appreciate it if you would ping any online mod to control the user's behavior. If no mod is online at that time, kindly send us a screenshot proof of him breaking the rules via a ticket. Keep in mind that if you're found supporting such rule breakers, you'll also have to suffer a similar punishment as of the rule breaker."
    )
    .addField(
      "<:Bubbles:713261857955119104> **Q5: How do I open a ticket?**",
      "**A5:** You can easily open a ticket, all you have to do is head over to <#714643309900857364>, and click on the reaction to the last message (:Bibi:), and voilà, you'll have access to a ticket channel where you can contact the staff."
    )
    .addField(
      "<:Bubbles:713261857955119104> **Q5: How do I get the testers role?**",
      "**A5:** To get <@&713261387534565396>, you need to use the bot a lot and be active in this server!"
    )
    .setColor(0xd305fa);
  message.channel.send(faq1); // All in one command looks much better
  const faq2 = new Discord.MessageEmbed()
    .setTitle(
      `<:Bubbles:713261857955119104> Frequently Asked Questions <:Bubbles:713261857955119104>`
    )
    .setDescription("```Bot Related F.A.Qs```")
    .addField(
      "<:Bubbles:713261857955119104> **Q1: The bot is not responding to any command, Why is this happening?**",
      "**A1:** If this happens, we suggest you to just wait for a while as it most probably means the bot is updating. But if this issue persists, we suggest you tell us about it in bug reports."
    )
    .addField(
      "<:Bubbles:713261857955119104> **Q2: How do I report a bug/problem with the bot?**",
      "**A2:**  If you have noticed a bug in this bot, we would greatly appreciate it if you would report this to us by sending a message in <#715258514024562778>. Having screenshot proofs of this bug would be appreciated. Kindly note that any troll/fake tickets will result in a punishment."
    )
    .addField(
      "<:Bubbles:713261857955119104> **Q3: What features does this bot have?**",
      "**A3:** This bot has numerous different functions ranging from the moderation commands, to brawl stars related commands and various other fun commands like memes. To view all of them, kindly use the command `bb help` in a bot channel."
    )
    .addField(
      "<:Bubbles:713261857955119104> **Q4: Who made this bot?**",
      "**A4:** This bot (<@713181335623041076>) is created by Saber#1875. For more info on contributors and staffs, use bb info in any bot channel."
    )
    .addField(
      "<:Bubbles:713261857955119104> **Q5: How often does this bot get updated?**",
      "**A5:** No precise answer can be given to this question as it depends on how many ideas we have and how much time is available to apply them. But whenever a new update pops up, you'll be notified about it in <#713828190270783578>. You can also use the help command (`bb help`) to view the latest big update on the bot."
    )
    .addField(
      "<:Bubbles:713261857955119104> **Q6: How do I add the bot to another server?**",
      "**A5:** You can invite the bot to your server using the invite link in <#714643309900857364> or by typing `bb invite`"
    )
    .setColor(0xd305fa);
  message.channel.send(faq2);
};

exports.help = {
  name: "faq-embed",
  category:'owner'
};
