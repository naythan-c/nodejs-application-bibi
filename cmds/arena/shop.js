const Discord = require('discord.js');
var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');
const arena = require('./arena.json');
const { e } = require('mathjs');

exports.run = async (client, message, args) => {
  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.arena);
  var dat = await collection.findOne({ "userId": message.author.id })
  if (dat === null) {
    return func.tutorial(message)
  }
  await message.delete()
  const emojis = ["◀️", "▶️", "🛒"];

  let page;
  let max;
  let min;
  let pages;
  let purchase;
  var weaponMenu = false;
  const pageMax = 6;
  pages = [
    {
      title: 'Shop',
      description: `Enjoy browsing around! You can buy items using Bibi Tokens! Explore the shop by reacting below!`,
      color: config.embedColor,
      image: {
        url: 'https://cdn.discordapp.com/attachments/713829737247670333/742468803924983898/20200810_224507.png',
      },
      footer: {
        text: `NA`,
      },
    },
  ];

  purchase = [
    {
      title: '',
      description: ``,
      color: config.embedColor,
    },
  ];

  var k = 1
  for (let i in arena) {
    var setDat = {
      title: 'NA',
      color: config.embedColor,
      footer: {
        text: `NA`
      }
    }
    var dataFill = '';
    dataFill += `Health: ${arena[i].health}\nMovement: ${arena[i].movement}\n\nWeapons\n`;
    for (var j in arena[i].weapons) {
      dataFill += `${j.charAt(0).toUpperCase() + j.substring(1, j.length)}\n`
    }
    setDat.title = i.charAt(0).toUpperCase() + i.substring(1, i.length);
    setDat.description = dataFill;
    setDat.footer.text = `Page ${k + 1}/${pageMax}`
    pages.push(setDat);

    var setDat2 = {
      title: '',
      description: ``,
      color: config.embedColor,
    }
    var dataFill2 = '';
    dataFill2 += `You have purchased **${i.charAt(0).toUpperCase() + i.substring(1, i.length)}** for ${arena[i].price} <:BibiToken:737226663523385356>`;
    setDat2.description = dataFill2;
    purchase.push(setDat2);

    k++;

  }
  pages[0].footer.text = `Page 1/${pageMax}`


  page = 0;
  max = pages.length - 1;
  min = 0;

  message.channel.send({ embed: pages[0] }).then(async msg => {
    for (var reactn in emojis)
      await msg.react(emojis[reactn]);
    const filter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;

    const collector = msg.createReactionCollector(filter, { time: 60 * 1000 })
    collector.on('collect', async (r) => {
      if (weaponMenu)
        return;
      if (r.emoji.name === '◀️') {

        r.users.remove(message.author.id)
        if (page != min) {
          page = page - 1;
          await msg.edit({ embed: pages[page] });
        }

        collector.resetTimer();
      } else if (r.emoji.name === '▶️') {

        r.users.remove(message.author.id)
        if (page != max) {
          page = page + 1;
          await msg.edit({ embed: pages[page] });
        }

        collector.resetTimer();
      } else if (r.emoji.name === '🛒') {
        if (page != 0) {

          let promise = new Promise(async function (resolve) {

            const emojis1 = ["1️⃣", "2️⃣", "↩️"];

            const className = `${pages[page].title.charAt(0).toLowerCase() + pages[page].title.substring(1, pages[page].title.length)}`;

            const chooseEmbed = createEmbed(`Choose the item:`, `Are you looking to buy\n1️⃣ - Class\n2️⃣ - Weapon`);


            await msg.reactions.removeAll();
            await msg.edit({ embed: chooseEmbed }).then(async (r) => {
              for (var reactn in emojis1)
                await msg.react(emojis1[reactn]);

              const filter1 = (reaction, user) => emojis1.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;
              const collector1 = msg.createReactionCollector(filter1, { time: 60 * 1000 })

              collector1.on('collect', async (r) => {
                if (r.emoji.name === '1️⃣') {
                  //#region Check class
                  const boughtEmbed = createEmbed(`Oops`, `Looks like you already own the ${pages[page].title} class!`);
                  const brokeEmbed = createEmbed(`Not Enough Credits`, `${pages[page].title} costs ${arena[className].price}. You only have ${dat.bibi_credits} <:BibiToken:737226663523385356>`)
                  const chooseEmbed1 = createEmbed(`Confirm`, `Are you sure you would like to buy ${pages[page].title} for ${arena[className].price} <:BibiToken:737226663523385356> by reacting below`);
                  if (dat.classes.hasOwnProperty(className)) {
                    await msg.edit({ embed: boughtEmbed });
                    await msg.reactions.removeAll();
                    await msg.react('↩️');
                  } else if (!dat.bibi_credits || dat.bibi_credits < arena[className].price) {
                    await msg.edit({ embed: brokeEmbed });
                    await msg.reactions.removeAll();
                    await msg.react('↩️');
                  } else {
                    await msg.edit({ embed: chooseEmbed1 });
                  }
                  //#endregion
                } else if (r.emoji.name === '2️⃣') {
                  await msg.reactions.removeAll()
                  // r.users.remove(message.author.id)
                  let weaponPromise = new Promise(async function (resolve) {
                    //#region Weapon Flip
                    weaponMenu = true
                    let weaponPages = []
                    let weaponPage = 0, weaponPageMin = 0, weaponPageMax = Object.keys(arena[className].weapons).length
                    for (let i in arena[className].weapons) {
                      let setDat = {
                        title: 'NA',
                        color: config.embedColor,
                        footer: {
                          text: `NA`
                        }
                      }
                      setDat.title = `${i.charAt(0).toUpperCase()}${i.substring(1, i.length)}`
                      setDat.footer = `Page: 1/${weaponPageMax}`
                      setDat.description = `Damage: ${arena[className].weapons[i]['1'].damage}\nAccuracy: ${arena[className].weapons[i]['1'].accuracy}\nRange: ${arena[className].weapons[i]['1'].range}\n`
                      weaponPages.push(setDat)
                    }
                    let weaponEmbed = weaponPages[weaponPage]
                    await msg.edit({ embed: weaponEmbed })
                    for (let reactn in emojis)
                      await msg.react(emojis[reactn])
                    await msg.react('↩️')
                    // console.log(weaponPages);
                    const weaponFilter = (reaction, user) => (emojis.some(emoji => emoji == reaction.emoji.name) || reaction.emoji.name === '↩️') && user.id == message.author.id;
                    const weaponCollector = msg.createReactionCollector(weaponFilter, { time: 60 * 1000 })
                    weaponCollector.on('collect', async (r) => {
                      r.users.remove(message.author.id)
                      if (r.emoji.name === emojis[0]) {
                        if (weaponPage !== weaponPageMin) {
                          weaponPage -= 1
                          await msg.edit({ embed: weaponPages[weaponPage] })
                        }
                      }
                      else if (r.emoji.name === emojis[1]) {
                        if (weaponPage !== weaponPageMax) {
                          weaponPage += 1
                          await msg.edit({ embed: weaponPages[weaponPage] })
                        }
                      }
                      else if (r.emoji.name === emojis[2]) {
                        if (weaponPage !== 0) {
                          const weaponPricesDoNotExistEmbed = createEmbed('Price', 'Non existent')
                          await msg.edit({ embed: weaponPricesDoNotExistEmbed })
                        }
                      }
                      else if (r.emoji.name === '↩️') {
                        resolve("done")
                      }
                    })
  
                    weaponCollector.on('end', async (r) => {
                      weaponMenu = false;
                    })

                    //#endregion
                  })
                  await weaponPromise.then(async m=>{
                    weaponMenu=false
                    await msg.reactions.removeAll()
                    await msg.edit({ embed: pages[page] });
                    for (var reactn in emojis)
                      await msg.react(emojis[reactn]);
                  })
                }

                else if (r.emoji.name === '↩️') {
                  if (weaponMenu)
                    return;
                  resolve("done");
                }
              })

              collector1.on('end', async (r) => {
                collector.stop()
              })

            })
          })
          await promise.then(async m => {
            await msg.reactions.removeAll()
            await msg.edit({ embed: pages[page] });
            for (var reactn in emojis)
              await msg.react(emojis[reactn]);
          })

          //#region Commented code
          //   let weaponData = '';
          //   for (var j in arena[className].weapons) {
          //     weaponData += `${j.charAt(0).toUpperCase() + j.substring(1, j.length)}\n`
          //   }
          //   const chooseEmbed2 = createEmbed(`Which weapon would you like to purchase?`, `${weaponData}`);
          //#endregion

        }

        collector.resetTimer();
      }
      //  else if (r.emoji.name === '📃') {
      //   r.users.remove(message.author.id)
      //   if (page !== 0) {
      //     const className = `${pages[page].title.charAt(0).toLowerCase() + pages[page].title.substring(1, pages[page].title.length)}`;
      //     dat = await collection.findOne({ "userId": message.author.id })
      //     if (!dat.classes.hasOwnProperty(className)) {
      //       const buyFirstEmbed = createEmbed(`Class not Bought`, `You need to buy the class ${pages[page].title} first to buy its weapons.`)
      //       setTimeout(async () => {
      //         await msg.edit({ embed: pages[page] })
      //         collector.resetTimer();
      //       }, 3500)
      //       return await msg.edit({ embed: buyFirstEmbed })
      //     }


      //   }
      // }
    })

    collector.on('end', async (r) => {
      const timedOutEmbed = createEmbed('', 'Shop timed out')
      await message.channel.send(timedOutEmbed).then(msg => {
        setTimeout(() => {
          msg.delete()
        }, 3000)
      })
      await msg.delete();
    })

  });
}

function createEmbed(title, description) {              // Pass empty string if you dont wish to have title or description
  return (
    new Discord.MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor(config.embedColor)
  )
}

exports.help = {
  name: 'shop',
  category: "arena"
};
