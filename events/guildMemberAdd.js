const Discord = require('discord.js')
const mongoUtil = require('../mongoUtil');
const config = require('../config.json');
const GetImage = require("canvas")
const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

exports.run = async (client, member)=>{
    console.log(member.guild.id)
    var db = mongoUtil.getDb();
    const collection = db.db(config.database).collection(config.collection.modConfig);
    var dat = await collection.findOne({"guildId":member.guild.id})
    if(dat===null)
        return
    if(!dat.welcomeChannel){
        return
    }

    const guild = member.guild;
    const welcomeChannel = guild.channels.cache.get(dat.welcomeChannel)

    if(dat.welcomeMessage){
        if(dat.config.welcomemessage){
            return
        }
        const welcomeMessage = dat.welcomeMessage

        const newWelcomeMessage = welcomeMessage.replace('{user}', member).replace('{memberCount}', member.guild.memberCount)
        await welcomeChannel.send(`${newWelcomeMessage}`);
    }

    if(dat.welcomeCard){
        if(dat.config.welcomecard){
            return
        }

        const welcomeCard = dat.welcomeCard
        const wallpaper = await GetImage.loadImage(`./images/welcome_cards/${welcomeCard}-welcome-card.png`);
        const avatar = await fetch(member.user.avatarURL({format: 'jpg'}))
    
          const image = new Canvas(1280, 576)
          .addImage(wallpaper, 0, 0, 1280, 576)
          .addCircularImage(await avatar.buffer(), 640, 182, 136)
          .toBuffer();

        await welcomeChannel.send({files: [image]});
    }
}
