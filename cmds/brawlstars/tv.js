const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bibi TV:`)
      .setDescription(
        `\`\`\`🔥 Top Brawl Stars Creators:\`\`\`\n<:Kairos:713881056872235118> **[KairosTime Gaming](https://www.youtube.com/channel/UCmG2EhfOwSjpPMX4LjGY__A)**
\n<:Lex:713881320111210534> **[Lex - Brawl Stars](https://www.youtube.com/channel/UC4yh9rj_cPT77it63N14HQg)**
\n<:ChiefPat:713881401124192397> **[Chief Pat](https://www.youtube.com/user/PlayClashOfClans)**
\n<:CoachCory:713881358904197241> **[Coach Cory](https://www.youtube.com/channel/UCr8T8FRUsvJ5MU9idLoYKlA)**
\n<:BenTimm1:714351750043140136> **[BenTimm1](https://www.youtube.com/user/bentimm1)**
\n<:Ash:714660596402094080> **[Ash Brawl Stars](https://www.youtube.com/user/ClashNerd)**
\n<:Rey:713881273713688659> **[Rey - Brawl Stars](https://www.youtube.com/channel/UCUZks0tPvD_ZbNwtBzyR_JQ)**
\n<:Wonderbrad:713883210781818881> **[Wonderbrad](https://www.youtube.com/channel/UCglRTNGJ85wTuRdjdC71htw)**\n\n\`\`\`⬆️ On The Rise:\`\`\`
<:Patrix:713883920915103794> **[Patrix - Brawl Stars](https://www.youtube.com/channel/UClCWo7dspR3phCSUQxKHfPw)**
\n<:CaptainTalib:713884326617546872> **[Captain Talib](https://www.youtube.com/channel/UCm17OL5yc5PQs3hj2diV0xQ)**
\n<:MoneyCapital:714396808775991327> **[Money Capital](https://www.youtube.com/channel/UCzFBvXLdaysLuI5nvomJtUA)**
\n<:Tweenky:713884485716017233> **[Tweenky](https://www.youtube.com/channel/UCjCc6u_-RIEvuNgSp4sW7uA)**`
      )
      .setColor(0xd305fa)
      .setThumbnail(
        `https://cdn.discordapp.com/attachments/712210445301186580/716553724742336522/icon_spectate.png`
      );
    message.channel.send(embed); // All in one command looks much better
}

exports.help = {
  name: 'tv',
  category: "brawlstars"
};


