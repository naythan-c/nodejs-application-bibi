const Discord = require('discord.js');
const fs = require("fs");
const GetImage = require("canvas")
const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
    const wallpaper = await GetImage.loadImage('./Trash.jpg');
    const avatar = await fetch(message.author.avatarURL({format: 'jpg'}))

    let image;
    if(!message.mentions.users.first()){
      image = new Canvas(500, 500)
      .addImage(wallpaper, 0, 0, 500, 500)
      .addCircularImage(await avatar.buffer(), 380, 363, 80)
      .toBuffer();
    } else if (message.mentions.users.first()){
      const target = message.mentions.users.first()
      const targetAvatar = await fetch(target.avatarURL({format: 'jpg'}))
      image = new Canvas(500, 500)
      .addImage(wallpaper, 0, 0, 500, 500)
      .addCircularImage(await avatar.buffer(), 175, 235, 80)
      .addCircularImage(await targetAvatar.buffer(), 380, 363, 80)
      .toBuffer();
    }
  
          message.channel.send({files: [image]})
}

exports.help = {
  name: 'trash',
  category: "brawlstars"
};