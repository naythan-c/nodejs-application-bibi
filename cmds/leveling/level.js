const Discord = require('discord.js');
const fs = require("fs");
const GetImage = require("canvas")
const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');
var mongoUtil = require('../../mongoUtil');
const config = require('../../config.json');

exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id, ["leveling", "level"])
    Canvas.registerFont("./Azonix.otf", { family: 'Azonix' });

    let member;
    if (message.mentions.users.first()) {
        member = message.mentions.users.first();
    } else {
        member = message.author;
    }

    var db = mongoUtil.getDb();
    const levelCollection = db.db(config.database).collection(config.collection.levellingSystem)
    const levelCardCollection = db.db(config.database).collection(config.collection.levelCard);
    const levelColorDat = await levelCardCollection.findOne({ "userId": member.id })

    let bar;
    let background;
    let text;
    let circle;
    if (levelColorDat) {
        bar = levelColorDat.levelBar || "#E063FC"
        background = levelColorDat.levelBackground || "#04000D"
        text = levelColorDat.levelText || "#FFFFFF"
        circle = levelColorDat.levelCircle || "#FFFFFF"
    } else {
        bar = "#E063FC"
        background = "#04000D"
        text = "#FFFFFF"
        circle = "#FFFFFF"
    }


    var dat = await levelCollection.findOne({guildId:message.guild.id})
    if (dat === null) {
        return message.channel.reply(lang.noLevelData)
    }

    if (dat.disabled) {
        return func.embed(message.channel, lang.levelSystemIsDisabledOnThisServer)
    }


    if (dat.level.stats[member.id]) {
      var counter = Object.entries(dat.level.stats).filter(u=>u[1].totalxp>=dat.level.stats[`${member.id}`].totalxp).length
      // console.log("RANK: "+counter)
        // var counter = Object.keys(dat.level.stats).indexOf(member.id) + 1
        const avatar = await fetch(member.displayAvatarURL({ format: 'jpg' }))
        // const avatar = await fetch(member.avatarURL({ format: 'jpg' }))
        const fontname = "Azonix"
        const image = new Canvas(1000, 333)
            .setColor(background)
            .addRect(0, 0, 1000, 333)
            .setColor('#535054')
            .addRect(155, 252, 790, 55)
            .setColor(bar)
            .setShadowColor(bar)
            .setShadowBlur(30)
            .addRect(155, 252, 790 * (dat.level.stats[member.id].xp / dat.level.stats[member.id].reqxp), 55)
            .setColor(bar)
            .addCircle(150, 200, 107)
            .setColor(circle)
            .addCircle(150, 200, 86)
            .resetShadows()
            .addCircularImage(await avatar.buffer(), 150, 200, 80)
            .setColor(text)
            .setTextFont(`34px ${fontname}`)
            .setTextAlign('center')
            .addText(`${dat.level.stats[member.id].xp}/${dat.level.stats[member.id].reqxp} XP`, 550, 290)
            .setTextFont(`40px ${fontname}`)
            .setTextAlign('left')
            .setColor(text)
            .addText(`${lang.rank}:`, 50, 60)
            .setTextFont(`40px ${fontname}`)
            .setTextAlign('left')
            .setColor(bar)
            .addText(`#${counter}`, 190, 60)
            .setTextFont(`40px ${fontname}`)
            .setTextAlign('right')
            .setColor(text)
            .addText(`${lang.level}: ${dat.level.stats[member.id].level}`, 950, 60)
            .setTextFont(`50px ${fontname}`)
            .setTextAlign('left')
            .addText(`${member.username.slice(0, 20)}`, 280, 200)
            .toBuffer();

        message.channel.send({ files: [image] })
            .catch(() => {
                const levelSystem = new Discord.MessageEmbed()
                    .setColor('0xd305fa')
                    .setTitle(`${member.username}'s ${lang.level}`)
                    .setThumbnail(member.displayAvatarURL())
                    .setDescription(`${lang.rank}: \`${counter}\`\n${lang.level}: \`${dat.level.stats[member.id].level}\`\n${lang.currentXP}: \`${dat.level.stats[member.id].xp}/${dat.level.stats[member.id].reqxp}\``);

                message.channel.send(levelSystem)
            })

    } else {
        func.embed(message.channel, `${member.username} ${lang.noXPEarned}`)
    }
}

exports.help = {
    name: 'level',
    category: "leveling",
    aliases: ["lvl"]
};
