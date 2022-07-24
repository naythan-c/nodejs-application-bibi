const Discord = require('discord.js');
const fs = require("fs");
const GetImage = require("canvas")
const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
  const Generating = await message.channel.send("<a:Loading:723724057136070686> **__Generating...__**")
  let user;
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else {
    user = message.author;
  }
    const wallpaper = await GetImage.loadImage('./Night-Filter.png');
    const avatar = await fetch(user.avatarURL({format: 'jpg'}))
      const image = new Canvas(500, 500)
      .addImage(await avatar.buffer(), 0, 0, 500, 500)
          .addImage(wallpaper, 0, 0, 500, 500)
          .toBuffer();
  
          message.channel.send({files: [image]})
          await Generating.delete()
}

exports.help = {
  name: 'night-filter',
  category: "filters"
};
