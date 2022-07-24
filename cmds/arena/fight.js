const Discord = require('discord.js');
var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');
const arena = require('./arena.json');
const GetImage = require("canvas");
const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

exports.run = async (client, message, args, func) => {
  const emojis = ["◀️", "▶️", "🗡", "💚"];
  var member = message.mentions.members.first() || null
  if (member === null) {
    return message.channel.send('Mention a user to duel!')
  }
  // if (member.id == message.author.id) {
  //   return message.channel.send("You can't play against yourself! You can play against me or someone else.")
  // }


  if (member !== client.user && message.mentions.members.first().user.id !== client.user.id) {
    if (member.user.bot) {
      return message.channel.send('Bots wont reply. You can\'t play against them')
    }
  }

  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.arena);
  var dat = await collection.findOne({"userId":message.author.id});
  if(dat === null)
    return func.tutorial(message);

  const arenas = [
    {
      name: "Jagged Stone",
      emote: "<:StoneTile:743267601358127107>",
      color: "#8b8b8b"
    },
    {
      name: "Twilight Jungle",
      emote: "<:JungleTile:743647744509607997>",
      color: "#1c8b01"
    },
    {
      name: "Space Arctic",
      emote: "<:IceTile:743646010147995660>",
      color: "#e3ffff"
    },
    {
      name: "Pharaoh's Tomb",
      emote: "<:PharaohTile:743654245726945350>",
      color: "#b68d1a"
    }
  ];
  await message.channel.send(`<@${member}> are you ready to fight? Type \`yes\` if ready.`)
  const filter2 = m => m.author.id === member.id && (m.content.toLowerCase() === 'yes');
  let msg=await message.channel.awaitMessages(
       filter2,
      { time: 8000, max: 1, errors: ["time"] }
  ).catch(collected=>{
      return "No Reply"
  });

  if(msg==="No Reply")
    return message.channel.send(`${member} isnt online or got scared to death`);

  const randomArena = arenas[Math.floor(Math.random() * arenas.length)]

  const filter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id || user.id == member.id;
  var toggle = Math.random() >= 0.5;
  var pos = [Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)]
  var turn;
  var userClass, weapon, h1, h2, weaponLevel;
  var classAuthor;
  var classMember;
  await collection.findOne({ 'userId': message.author.id }).then((dat) => {
    classAuthor = dat.class_equipped
  })
  await collection.findOne({ 'userId': member.id }).then((dat) => {
    classMember = dat.class_equipped
  })
  h1 = arena[classAuthor].health
  h2 = arena[classMember].health
  while (pos[0] == pos[1]) {
    pos[1] = Math.floor(Math.random() * 15)
  }
  var tiles = randomArena.emote

  let personTurn;
  let personNotTurn;

  if (toggle) {
    personTurn = message.author.username;
    personNotTurn = member.user.username;
  }
  else {
    personTurn = member.user.username;
    personNotTurn = message.author.username;
  }

  const avatarAuthor = await fetch(message.author.avatarURL({ format: 'jpg' }));
  const avatarMember = await fetch(message.mentions.users.first().avatarURL({format: 'jpg'}));
  Canvas.registerFont("./montserrat-bold.ttf", { family: 'montserrat-bold' });
  const fontname = "Montserrat-Bold";

  const image = new Canvas(800, 200)
    .setColor('#000000')
    .addRect(0, 0, 800, 200)
    .setColor(randomArena.color)
    .setShadowColor(randomArena.color)
    .setShadowBlur(10)
    .addCircle(200, 100, 80)
    .addCircle(600, 100, 80)
    .resetShadows()
    .addCircularImage(await avatarAuthor.buffer(), 200, 100, 62)
    .addCircularImage(await avatarMember.buffer(), 600, 100, 62)
    .setTextFont(`50px ${fontname}`)
    .addText(`VS`, 360, 120)
    .setTextAlign('center')
  const attachment = new Discord.MessageAttachment(image.toBuffer(), "duel.png");

  var embed = new Discord.MessageEmbed()
    .setColor(randomArena.color)
    .setTitle(`${randomArena.name} Arena`)
    .addField(
      `${message.author.username} `,
      `Class: ${classAuthor.toLowerCase().charAt(0).toUpperCase() + classAuthor.toLowerCase().substring(1)} ${arena[classAuthor].emoji}\nHealth: ${h1}`,
      true
    )
    .addField(
      `${member.user.username} `,
      `Class: ${classMember.toLowerCase().charAt(0).toUpperCase() + classMember.toLowerCase().substring(1)} ${arena[classMember].emoji}\nHealth: ${h2}`,
      true
    )
    .setDescription(`It's ${personTurn}'s turn...\n\n` + drawTiles(pos, tiles).join(''))
    .attachFiles(attachment)
    .setImage(`attachment://${attachment.name}`);

  message.channel.send(embed).then(async msg => {

    for (let i in emojis) {
      await msg.react(emojis[i]);
    }
    const collector1 = msg.createReactionCollector(filter, { time: 10000 })

    collector1.on('collect', async (r, u) => {
      if (toggle) {
        turn = 0;
        personTurn = member.user.username;
        personNotTurn = message.author.username;
        userClass = classAuthor
        await collection.findOne({ 'userId': member.id }).then((dat) => {
          weapon = dat.weapon_equipped
          weaponLevel = dat.classes[userClass][weapon].toString()
        })
      }
      else {
        turn = 1;
        personTurn = message.author.username;
        personNotTurn = member.user.username;
        userClass = classMember; await collection.findOne({ 'userId': message.author.id }).then((dat) => {
          weapon = dat.weapon_equipped
          weaponLevel = dat.classes[userClass][weapon].toString()
        })
      }
      if ((turn == 0 && u.id !== message.author.id) || (turn == 1 && u.id !== member.id)) {
        r.users.remove(u.id)
        return
      }
      r.users.remove(u.id)

      switch (r.emoji.name) {
        case '◀️':
          pos[turn] -= arena[userClass].movement;
          if (pos[turn] < 0) {
            pos[turn] = 0;
          }
          if (pos[turn] == pos[(turn + 1) % 2]) {
            if (pos[(turn + 1) % 2] >= 1)
              pos[turn]--;
            else
              pos[turn]++;
          }
          editMessage(msg, embed, `It's ${personTurn}'s turn...\n\n${personNotTurn} chose to move.\n\n`, pos, tiles)
          break;
        case '▶️':
          pos[turn] += arena[userClass].movement
          if (pos[turn] > 14) {
            pos[turn] = 14;
          }
          if (pos[turn] == pos[(turn + 1) % 2]) {
            if (pos[(turn + 1) % 2] <= 13)
              pos[turn]++;
            else
              pos[turn]--;
          }
          editMessage(msg, embed, `It's ${personTurn}'s turn...\n\n${personNotTurn} chose to move.\n\n`, pos, tiles)
          break;
        case '🗡':
          if (Math.abs(pos[turn] - pos[(turn + 1) % 2]) <= arena[userClass].weapons[weapon][weaponLevel].range) {
            switch (turn) {
              case 0:
                var dmg = damageDealt(arena[userClass].weapons[weapon][weaponLevel].range, arena[userClass].weapons[weapon][weaponLevel].dampStat, Math.abs(pos[turn] - pos[(turn + 1) % 2]))
                h2 -= dmg
                break;
              case 1:
                var dmg = damageDealt(arena[userClass].weapons[weapon][weaponLevel].range, arena[userClass].weapons[weapon][weaponLevel].dampStat, Math.abs(pos[turn] - pos[(turn + 1) % 2]))
                h1 -= dmg
                break;
            }
            editMessage(msg, embed, `It's ${personTurn}'s turn...\n\n${personTurn} takes ${dmg} damage.\n\n`, pos, tiles)
          }
          else
            editMessage(msg, embed, `It's ${personTurn}'s turn...\n\n${personNotTurn} misses the shot as they are out of range.\n\n`, pos, tiles)
          break;
        case '💚':
          if (turn == 0) {
            h1 += Math.floor((arena[userClass].regenerate / 100) * arena[userClass].health)
            if (h1 > arena[userClass].health) {
              h1 = arena[userClass].health
            }
          }
          else {
            h2 += Math.floor((arena[userClass].regenerate / 100) * arena[userClass].health)
            if (h2 > arena[userClass].health) {
              h2 = arena[userClass].health
            }
          }
          editMessage(msg, embed, `It's ${personTurn}'s turn...\n\n${personNotTurn} heals up.\n\n`, pos, tiles)
          break;
      }
      if (h1 <= 0) {
        collector1.stop('Game Over')
        func.updateDb(collection,member.user.id,"bibi_credits",10,true);
        func.updateDb(collection,message.author.id,"bibi_credits",0,false);
        return message.channel.send(`Congratulations, ${member.user.username} Won`)
      }
      else if (h2 <= 0) {
        collector1.stop('Game Over')
        func.updateDb(collection,member.user.id,"bibi_credits",10,false);
        func.updateDb(collection,message.author.id,"bibi_credits",0,true);
        return message.channel.send(`Congratulations, ${message.author.username} Won`)
      }
      collector1.resetTimer({ time: 20000 })
      toggle = !toggle
    })

    collector1.on('end', async (collected, reason) => {
      if (reason !== 'Game Over'){
          // func.updateDb(collection,personNotTurn,"bibi_credits",10,true);
          // func.updateDb(collection,personTurn,"bibi_credits",0,false);
          return message.channel.send(`${personTurn} got scared like a little cat. ${personNotTurn} wins!!`)
        }
    })

  });

  function damageDealt(range, damp, tileDiff) {
    if (damp >= 0) {
      if (tileDiff == 1)
        tileDiff = 0
      return Math.floor((arena[userClass].weapons[weapon][weaponLevel].damage - (Math.random()
        * ((100 - arena[userClass].weapons[weapon][weaponLevel].accuracy) / 100) * arena[userClass].weapons[weapon][weaponLevel].damage))
        * Math.pow((1 - damp / 100), tileDiff))
    } else if (damp < 0) {
      return Math.floor((arena[userClass].weapons[weapon][weaponLevel].damage - (Math.random()
        * ((100 - arena[userClass].weapons[weapon][weaponLevel].accuracy) / 100) * arena[userClass].weapons[weapon][weaponLevel].damage))
        * Math.pow((1 + damp / 100), (range - tileDiff)))
    }
  }
  function editMessage(msg, embed, desc, pos, tiles) {
    embed = new Discord.MessageEmbed()
      .setColor(randomArena.color)
      .setTitle(`${randomArena.name} Arena`)
      .addField(
        `${message.author.username} `,
        `Class: ${classAuthor.toLowerCase().charAt(0).toUpperCase() + classAuthor.toLowerCase().substring(1)} ${arena[classAuthor].emoji}\nHealth: ${h1}`,
        true
      )
      .addField(
        `${member.user.username} `,
        `Class: ${classMember.toLowerCase().charAt(0).toUpperCase() + classMember.toLowerCase().substring(1)} ${arena[classMember].emoji}\nHealth: ${h2}`,
        true
      )
      .setDescription(`${desc}` + drawTiles(pos, tiles).join(''));

    msg.edit(embed)
  }

  function drawTiles(pos, tiles) {
    var msg = [];
    for (let i = 0; i < 15; i++) {
      msg[i] = tiles
    }
    msg[pos[0]] = arena[classAuthor].emoji;
    msg[pos[1]] = arena[classMember].emoji;
    return msg
  }

}


exports.help = {
  name: "fight",
  category: 'arena'
};
