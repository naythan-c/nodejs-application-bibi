const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
      let topics = [
      `Who's your favorite brawler and why?`,
        `Who's more boomer material, dynamike or gale?`,
        `What's your favorite gadget?`,
        `Which brawler do you suck at the most?`,
        `Are you OP at Brawl Stars?`,
        `How many trophies do you have?`,
        `Do you like throwers? (explain why or why not)`,
        `Which brawler needs a buff?`,
        `Which brawler needs a nerf?`,
        `Who's more annoying tick or crow?`,
        `Do you team?`,
        `Do you team and backstab?`,
        `Do you have a mini account?`,
        `What's your favorite Brawl Stars YouTuber?`,
        `Have you drawn a Brawl Stars character before?`,
        `If you could create a new brawler, what would it be?`,
        `If you could remove one brawler from the game what would it be?`,
        `Do you have a legendary brawler?`,
        `How many skins do you have?`,
        `Are you PTW or FTP?`,
        `What's your favorite skin that you own?`,
        `What's a skin that you want to buy?`,
        `Do you have all your brawlers above rank 20?`,
        `Does mortis suck in Brawl Ball (yes or no)?`,
        `Do you like yeeting the ball?`,
        `What's your favorite game mode?`,
        `Do you like Siege?`,
        `To bushcamp or to actually play? This is thy question`,
        `Are you a passive player or agro player?`,
        `What's your brawler with the highest amount of trophies?`,
        `What's the easiest brawler to push?`,
        `What's the hardest brawler to push?`,
        `Did you buy Brawl Pass this seaon?`,
        `Do you have any pins?`,
        `What's your favorite pin?`,
        `No hat or hat mortis?`,
        `Rico or Thico?`,
        `Do you have any star powers?`,
        `What's your favorite brawler voice?`,
        `Bull or Shelly?`,
        `Would you rather lose by a teamate doing an own goal or a teamate missing an open goal?`,
        `What's the first word that comes to your mind when you think of Brawl Stars?`,
        `Do you like hat mortis cause u like to jump on the bandwagon?`,
        `What Tier are you on?`,
        `Write a sentence describing randoms.`,
        `What's more OP, rosa with super before nerf or leon before nerf?`,
        `Do you have star shelly?`,
        `Did you play Brawl Stars before global launch?`,
        `How long have you been playing Brawl Stars?`,
        `Describe your Brawl Stars experience in one word.`,
        `If you could unlock any brawler what would it be?`,
        `Is Brawl Stars rigged?`,
        `Do you actually play Gem Grab?`,
        `Do you like quests?`,
        `Do you rage quit often?`,
        `What's the coolest brawler in game? I'm talking brawler model and style etc...`,
        `What's the worst brawler in gem grab?`,
        `What's the worst brawler in brawl ball`,
        `What's the worst brawler showdown`,
        `What's the worst brawler in duo showdown`,
        `What's the worst skin in game?`,
        `What's the best skin in game?`,
        `What's the worst brawler in heist?`,
        `What's the worst brawler in bounty?`,
        `If you had 300 gems which skin do you wanna buy?`,
        `If you see a bull go into a bush, what would you do?`
        
                    ]
let random = topics[Math.floor(Math.random() * topics.length)]
     const embed = new Discord.MessageEmbed()
.setDescription(random)
      .setColor(0xd305fa);
    message.channel.send(embed);
}

exports.help = {
  name: 'brawl-topic',
  category: "brawlstars"
};



