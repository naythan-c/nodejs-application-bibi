const Discord = require('discord.js');
var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');
const GetImage = require("canvas")
const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
    var member = message.mentions.users.first() || message.author
    var db = mongoUtil.getDb();
    const collection = db.db(config.database).collection(config.collection.economy);
    const shopCollection = db.db(config.database).collection(config.collection.shop);
    const shopDat = await shopCollection.findOne({ 'name': 'shop' })
    const dat = await collection.findOne({ 'userId': member.id })

    let gamesWonStat;
    let gamesLostStat;
    let winLossRatioStat;
    let bibiTokens;
    let equippedHeader;
    let equippedTheme;
    let equippedCharm;
    if (dat === null) {
        gamesWonStat = 0;
        gamesLostStat = 0;
        winLossRatioStat = "NA";
        bibiTokens = "0";
        equippedHeader = "bibi-waves";
        equippedTheme = "#D640FA";
        equippedCharm = "transparent-charm";
    } else {
        gamesWonStat = dat.gamesWon;
        gamesLostStat = dat.gamesLost;
        winLossRatioStat = Math.floor((dat.gamesWon / dat.gamesLost) * 1000) / 1000;
        bibiTokens = dat.bibi_tokens;
        if (!dat.Headers_Equipped) {
            equippedHeader = "bibi-waves";
        } else {
            equippedHeader = (dat.Headers_Equipped).toLowerCase().replace(/\s/g, "-");
        }

        if (!dat.Themes_Equipped) {
            equippedTheme = "#D640FA";
        } else {
            const shopTheme = dat.Themes_Equipped
            equippedTheme = shopDat.items["Themes"][dat.Themes_Equipped].hex;
        }


        if (!dat.Charms_Equipped) {
            equippedCharm = "transparent-charm";
        } else {
            equippedCharm = (dat.Charms_Equipped).toLowerCase().replace(/\s/g, "-");
        }
    }

    const avatar = await fetch(member.avatarURL({ format: 'jpg' }))
    const header = await GetImage.loadImage(`./images/profile_headers/${equippedHeader}.png`);
    const charm = await GetImage.loadImage(`./images/charms/${equippedCharm}.png`);
    const bibiToken = await GetImage.loadImage('./images/assets/bibi_token.png');
    Canvas.registerFont("./montserrat-bold.ttf", { family: 'montserrat-bold' });
    const fontname1 = "Montserrat-Bold";
    Canvas.registerFont("./montserrat-regular.ttf", { family: 'montserrat-regular' });
    const fontname2 = "Montserrat-Regular";
    const image = new Canvas(900, 1030)
        .setColor('#191A1E')
        .addRect(0, 0, 900, 1030)
        .setShadowColor("#131215")
        .setShadowBlur(10)
        .setShadowOffsetY(5)
        .addImage(header, 0, 0, 900, 320)
        .resetShadows()
        .setColor(equippedTheme)
        .setShadowColor(equippedTheme)
        .setShadowBlur(30)
        .addCircle(450, 320, 120)
        .resetShadows()
        .addCircularImage(await avatar.buffer(), 450, 320, 100)
        .setColor('#191A1E')
        .setShadowColor("#0C0C0E")
        .setShadowBlur(10)
        .setShadowOffsetY(5)
        .setTextFont(`50px ${fontname1}`)
        .measureText(`${member.username + '#' + member.discriminator}`, function (size) {
            const newSize = size.width < 900 ? 50 : (900 / size.width) * 47;
            this.setTextFont(`${newSize}px ${fontname1}`);
            this.addRect(0, 30, 40 + size.width, 80)
        })
        .resetShadows()
        .setColor(equippedTheme)
        .addText(`${member.username + '#' + member.discriminator}`, 20, 90)
        .setTextAlign('left')
        .setColor(equippedTheme)
        .setTextFont(`60px ${fontname1}`)
        .addText(`Tokens:`, 60, 520)
        .setTextAlign('left')
        .setColor('#FFFFFF')
        .setTextFont(`43px ${fontname2}`)
        .addText(`${bibiTokens.toLocaleString()}`, 130, 595)
        .setTextAlign('left')
        .addImage(bibiToken, 60, 555, 50, 50)
        .setColor(equippedTheme)
        .setTextFont(`60px ${fontname1}`)
        .addText(`Stats:`, 60, 760)
        .setColor('#FFFFFF')
        .setTextFont(`37px ${fontname2}`)
        .addText(`Games Won: ${gamesWonStat.toLocaleString()}`, 60, 850)
        .addText(`W/L Ratio: ${winLossRatioStat}`, 60, 930)
        .setTextAlign('left')
        .addImage(charm, 570, 420, 250, 250)
        .toBuffer();

    message.channel.send({ files: [image] })
        .catch(() => {
            var msg = `**Bibi Tokens:** ${bibiTokens.toLocaleString()} <:BibiToken:737226663523385356>\n\n**Stats**\nGames Won: ${gamesWonStat.toLocaleString()}\nGames Lost: ${gamesLostStat.toLocaleString()}\nW/L Ratio: ${winLossRatioStat}`
            var profileEmbed = new Discord.MessageEmbed()
                .setTitle(`${member.username}\'s Profile`)
                .setColor(0xd305fa)
                .setDescription(msg)
            message.channel.send(profileEmbed)
        })
}


exports.help = {
    name: "old-profile",
    category: 'economy'
};
