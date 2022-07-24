const Discord = require('discord.js');
var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');
const GetImage = require("canvas")
const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

exports.run = async (client, message, args,func) => {
    var member = message.mentions.users.first() || message.author
    var db = mongoUtil.getDb();
    const userProfileCollection = db.db(config.database).collection(config.collection.arena);
    const userDat = await userProfileCollection.findOne({ 'userId': member.id })
    if(userDat === null){
        return func.tutorial(message);
    }
    let bibiCredits;
    let userClass;
    let userWeapon;
    if (userDat === null) {
        bibiCredits = "0";
        userClass = "Warrior"
        userWeapon = "Wrecker";
    } else {

        if (!userDat.bibi_credits) {
            bibiCredits = "0";
        } else {
            bibiCredits = userDat.bibi_credits;
        }

        if (!userDat.class_equipped) {
            userClass = "Warrior";
        } else {
            userClass = userDat.class_equipped;
        }

        if (!userDat.weapon_equipped) {
            userWeapon = "Wrecker";
        } else {
            userWeapon = userDat.weapon_equipped;
        }
    }

    const avatar = await fetch(member.avatarURL({ format: 'jpg' }))
    const background = await GetImage.loadImage(`./images/arena-profile.png`);
    const bibiCreditIcon = await GetImage.loadImage('./images/assets/bibi_token.png');
    Canvas.registerFont("./Azonix.otf", { family: 'Azonix' });
    const fontname = "Azonix";
    const image = new Canvas(985, 1280)
        .addImage(background, 0, 0, 985, 1280)
        .addCircularImage(await avatar.buffer(), 494, 1092, 163)
        .setTextFont(`60px ${fontname}`)
        .measureText(`${member.username}`, function (size) {
            const newSize = size.width < 985 ? 60 : (985 / size.width) * 54;
            this.setTextFont(`${newSize}px ${fontname}`);
        })
        .setColor('#FFFFFF')
        .setTextAlign('center')
        .addText(`${member.username}`, 492.5, 147)

        .setTextFont(`46px ${fontname}`)
        .measureText(`${Number(bibiCredits).toLocaleString()}`, function (size) {
            const newSize2 = size.width < 300 ? 46 : (300 / size.width) * 42;
            this.setTextFont(`${newSize2}px ${fontname}`);
            this.addImage(bibiCreditIcon, size.width + 83, 223, 45, 45);
        })
        .setTextAlign('left')
        .addText(`${Number(bibiCredits).toLocaleString()}`, 70, 260)

        .setTextFont(`45px ${fontname}`)
        .addText(`Class`, 70, 390)
        .addText(`Weapon`, 70, 495)
        .addText(`Wins`, 70, 600)
        .addText(`W/L Ratio`, 70, 707)
        .addText(`${userClass}`, 420, 390)
        .addText(`${userWeapon}`, 420, 495)
        .addText(`2004`, 420, 600)
        .addText(`3.2`, 420, 707)
        .toBuffer();

    message.channel.send({ files: [image] })
        .catch(() => {
            var msg = `**Bibi Tokens:** ${bibiCredits.toLocaleString()} <:BibiToken:737226663523385356>`
            var profileEmbed = new Discord.MessageEmbed()
                .setTitle(`${member.username}\'s Profile`)
                .setColor(0xd305fa)
                .setDescription(msg)
            message.channel.send(profileEmbed)
        })
}


exports.help = {
    name: "profile",
    category: 'arena'
};
