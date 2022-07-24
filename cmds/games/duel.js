const Discord = require('discord.js');
var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async (client, message, args,func) => {
  var member = message.mentions.members.first() || client.user
  // if(member === null){
  //   return message.channel.send('Mention a user to fight!')
  // }

  if (member.id == message.author.id) {
    return message.channel.send("You can't play against yourself! You can play against me or someone else.")
  }


  if(member !== client.user && message.mentions.members.first().user.id !== client.user.id){
      if(member.user.bot){
        return message.channel.send('Bots wont reply. You can\'t play against them')
    }
  }

  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.economy);

  var h1 = 100, h2 = 100;
  var d1 = 0, d2 = 0;
  var timeup = false;
  var toggle = Math.random() >= 0.5
  var stuff = ['attack', 'heal', 'defend']
  var AuthorId = message.author.id
  var memberId = member.id
  let healthHitterEmote;
  let healthDefenderEmote;
  let defenseHitterEmote;
  let defenseDefenderEmote;
  var hitter, filter, defender
  const filter1 = m => m.author.id === AuthorId && (m.content.toLowerCase() === 'attack' || m.content.toLowerCase() === 'heal' || m.content.toLowerCase() === 'defend');
  const filter2 = m => m.author.id === memberId && (m.content.toLowerCase() === 'attack' || m.content.toLowerCase() === 'heal' || m.content.toLowerCase() === 'defend');
  await message.channel.send(`<@${AuthorId}> has challenged <@${memberId}> for a duel!`)
  while (true) {
    if (toggle) {
      defender = AuthorId
      hitter = memberId
      defenderName = message.author.username
      if (message.mentions.members.first()) {
        hitterName = member.user.username
      } else {
        hitterName = member.username
      }

      filter = filter2
      toggle = false
    }
    else {
      defender = memberId
      hitter = AuthorId
      if (message.mentions.members.first()) {
        defenderName = member.user.username
      } else {
        defenderName = member.username
      }
      hitterName = message.author.username
      filter = filter1
      toggle = true
    }
    await message.channel.send(`<@${hitter}>, choose between \`attack\`, \`heal\`, or \`defend\` (You have 15 seconds).`).then(async () => {
      if (memberId === client.user.id && hitter === memberId) {
        setTimeout(async () => { await message.channel.send(stuff[Math.floor(Math.random() * stuff.length)]) }, 2000)
      }
      await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
        .then(async (collected) => {
          switch (collected.first().content.toLowerCase()) {
            case 'attack':
              if (defender === memberId) {
                var hit = Math.floor(Math.random() * 50)
                h2 -= Math.floor((hit * ((100 - d2) / 100)))

                if (h1 > 0) {
                  healthHitterEmote = "<:Health:734872010697736252>".repeat(Math.ceil((h1 / 100) * 5))
                } else {
                  healthHitterEmote = ":dizzy_face:"
                }
                if (h2 > 0) {
                  healthDefenderEmote = "<:Health:734872010697736252>".repeat(Math.ceil((h2 / 100) * 5))
                } else {
                  healthDefenderEmote = ":dizzy_face:"
                }

                defenseHitterEmote = "🛡".repeat(Math.ceil((d1 / 50) * 5))

                defenseDefenderEmote = "🛡".repeat(Math.ceil((d2 / 50) * 5))


                const embed = new Discord.MessageEmbed()
                  .setColor(0xbd0303)
                  .setTitle("Attack")
                  .setDescription(`\`${hitterName}\` deals **${hit}** damage to \`${defenderName}\`. They blocked **${hit - Math.floor((hit * ((100 - d2) / 100)))}** damage leaving them with **${h2}** health.`)
                  .addField(
                    `${hitterName}'s Stats`,
                    `| ${healthHitterEmote} |\n| ${defenseHitterEmote} |`,
                    true
                  )
                  .addField(
                    `${defenderName}'s Stats`,
                    `| ${healthDefenderEmote} |\n| ${defenseDefenderEmote} |`,
                    true
                  );
                await message.channel.send(embed)
              }
              else {
                var hit = Math.floor(Math.random() * 50)
                h1 -= Math.floor((hit * ((100 - d1) / 100)))

                if (h2 > 0) {
                  healthHitterEmote = "<:Health:734872010697736252>".repeat(Math.ceil((h2 / 100) * 5))
                } else {
                  healthHitterEmote = ":dizzy_face:"
                }
                if (h1 > 0) {
                  healthDefenderEmote = "<:Health:734872010697736252>".repeat(Math.ceil((h1 / 100) * 5))
                } else {
                  healthDefenderEmote = ":dizzy_face:"
                }

                defenseHitterEmote = "🛡".repeat(Math.ceil((d2 / 50) * 5))

                defenseDefenderEmote = "🛡".repeat(Math.ceil((d1 / 50) * 5))

                const embed = new Discord.MessageEmbed()
                  .setColor(0xbd0303)
                  .setTitle("Attack")
                  .setDescription(`\`${hitterName}\` deals **${hit}** damage to \`${defenderName}\`. They blocked **${hit - Math.floor((hit * ((100 - d1) / 100)))}** damage leaving them with **${h1}** health.`)
                  .addField(
                    `${defenderName}'s Stats`,
                    `| ${healthDefenderEmote} |\n| ${defenseDefenderEmote} |`,
                    true
                  )
                  .addField(
                    `${hitterName}'s Stats`,
                    `| ${healthHitterEmote} |\n| ${defenseHitterEmote} |`,
                    true
                  );
                await message.channel.send(embed)
              }
              break;
            case 'heal':
              if (hitter === memberId) {
                var save = (Math.floor(Math.random() * 20)) + 5
                h2 += save
                if (h2 > 100) {
                  h2 = 100
                }

                if (h2 > 0) {
                  healthHitterEmote = "<:Health:734872010697736252>".repeat(Math.ceil((h2 / 100) * 5))
                } else {
                  healthHitterEmote = ":dizzy_face:"
                }
                if (h1 > 0) {
                  healthDefenderEmote = "<:Health:734872010697736252>".repeat(Math.ceil((h1 / 100) * 5))
                } else {
                  healthDefenderEmote = ":dizzy_face:"
                }

                const embed = new Discord.MessageEmbed()
                  .setColor(0x0fbd03)
                  .setTitle("Heal")
                  .setDescription(`\`${hitterName}\` heals themself with **${save}** health. They now have **${h2}** health`)
                  .addField(
                    `${defenderName}'s Health`,
                    `| ${healthDefenderEmote} |`,
                    true
                  )
                  .addField(
                    `${hitterName}'s Health`,
                    `| ${healthHitterEmote} |`,
                    true
                  );
                await message.channel.send(embed)
              }
              else {
                var save = (Math.floor(Math.random() * 20)) + 5
                h1 += save
                if (h1 > 100) {
                  h1 = 100
                }

                if (h1 > 0) {
                  healthHitterEmote = "<:Health:734872010697736252>".repeat(Math.ceil((h1 / 100) * 5))
                } else {
                  healthHitterEmote = ":dizzy_face:"
                }
                if (h2 > 0) {
                  healthDefenderEmote = "<:Health:734872010697736252>".repeat(Math.ceil((h2 / 100) * 5))
                } else {
                  healthDefenderEmote = ":dizzy_face:"
                }

                const embed = new Discord.MessageEmbed()
                  .setColor(0x0fbd03)
                  .setTitle("Heal")
                  .setDescription(`\`${hitterName}\` heals themself with **${save}** health. They now have **${h1}** health`)
                  .addField(
                    `${hitterName}'s Health`,
                    `| ${healthHitterEmote} |`,
                    true
                  )
                  .addField(
                    `${defenderName}'s Health`,
                    `| ${healthDefenderEmote} |`,
                    true
                  );
                await message.channel.send(embed)
              }
              break;
            case 'defend':
              if (hitter === memberId) {
                var defense = (Math.floor(Math.random() * 8)) + 5
                d2 += defense
                if (d2 > 40) {
                  d2 = 40
                }

                defenseHitterEmote = "🛡".repeat(Math.ceil((d2 / 50) * 5))

                defenseDefenderEmote = "🛡".repeat(Math.ceil((d1 / 50) * 5))
                const embed = new Discord.MessageEmbed()
                  .setColor(0xf3c311)
                  .setTitle("Defend")
                  .setDescription(`\`${hitterName}\` upgrades their defense by **${defense}**. They now have **${d2}** defense.`)
                  .addField(
                    `${defenderName}'s Defense`,
                    `| ${defenseDefenderEmote} |`,
                    true
                  )
                  .addField(
                    `${hitterName}'s Defense`,
                    `| ${defenseHitterEmote} |`,
                    true
                  );
                await message.channel.send(embed)
              }
              else {
                var defense = (Math.floor(Math.random() * 8)) + 5
                d1 += defense
                if (d1 > 40) {
                  d1 = 40
                }

                defenseHitterEmote = "🛡".repeat(Math.ceil((d1 / 50) * 5))

                defenseDefenderEmote = "🛡".repeat(Math.ceil((d2 / 50) * 5))

                const embed = new Discord.MessageEmbed()
                  .setColor(0xf3c311)
                  .setTitle("Defend")
                  .setDescription(`\`${hitterName}\` upgrades their defense by **${defense}**. They now have **${d1}** defense.`)
                  .addField(
                    `${hitterName}'s Defense`,
                    `| ${defenseHitterEmote} |`,
                    true
                  )
                  .addField(
                    `${defenderName}'s Defense`,
                    `| ${defenseDefenderEmote} |`,
                    true
                  );
                await message.channel.send(embed)
              }
              break;
          }
        })
        .catch(collected => {
          message.channel.send('Times up')
          timeup = true
        })
    })
    if (h1 <= 0 || h2 <= 0 || timeup)
      break;
  }
  if (timeup) {
    message.channel.send(`<@${hitter}> forfeited. Hence <@${defender}> won!!`)
    func.updateDb(collection,hitter,"bibi_tokens",20,true)
    func.updateDb(collection,defender,"bibi_tokens",0,false)
  }
  else {
    if (h1 <= 0) {
      message.channel.send(`<@${memberId}> defeated <@${AuthorId}>. Congratulations!`)
      func.updateDb(collection,memberId,"bibi_tokens",20,true)
      func.updateDb(collection,AuthorId,"bibi_tokens",0,false)
    }
    else {
      message.channel.send(`<@${AuthorId}> defeated <@${memberId}>. Congratulations!`)
      func.updateDb(collection,AuthorId,"bibi_tokens",10,true)
      func.updateDb(collection,memberId,"bibi_tokens",0,false)
    }
  }

}


exports.help = {
  name: "duel",
  category: 'games'
};
