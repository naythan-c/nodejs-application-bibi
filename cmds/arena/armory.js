const Discord = require('discord.js');
const fs = require("fs");
const fetch = require('node-fetch');
var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');
const arena = require('./arena.json')

exports.run = async (client, message, args, func) => {
    var db = mongoUtil.getDb();
    const collection = db.db(config.database).collection(config.collection.arena);
    var dat = collection.findOne({"userId":message.author.id})
    if(dat === null){
        return func.tutorial(message)
    }
    const embed = new Discord.MessageEmbed()
        .setTitle(`Armory`)
        .setDescription(`1.\`equip\`\n2.\`list\``)
        .setColor(0xd305fa);
    await message.channel.send(embed);
    try {
        let msgs = await message.channel.awaitMessages(
            (u2) => u2.author.id === message.author.id,
            { time: 20000, max: 1, errors: ["time"] }
        );
        const answer = msgs.first().content.toLowerCase();
        switch (answer) {
            case 'equip':{
                var userDat = await collection.findOne({'userId':message.author.id})
                let page=0;
                let max;
                let min=0;
                let pages;
                const emojis = ["◀️", "▶️", "✅"];

                var pageMax=Object.keys(userDat.classes).length;
                pages = [];
                var k=1;
                for(var i in userDat.classes){
                    var setDat={
                        title:'Class',
                        color:'0xd305fa',
                        footer:{
                            text:`NA`
                        },
                        thumbnail:{
                            url:""
                        }
                    }
                    setDat.title=`${i.charAt(0).toUpperCase()+i.substring(1,i.length)}`;
                    setDat.thumbnail.url=arena[i].url;
                    setDat.description=`\nHealth: ${arena[i].health}\nMovement: ${arena[i].movement}\nRegeneration: ${arena[i].regenerate}%`;
                    setDat.footer.text=`Page: ${k}/${pageMax}`;
                    k++
                    pages.push(setDat);

                }
                max = pages.length;
                message.channel.send({embed:pages[page]}).then(async(msg)=>{
                    for(var reactn in emojis)
                        await msg.react(emojis[reactn]);

                        const filter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;
                        const collector = msg.createReactionCollector(filter, { time: 60 * 1000 })

                        collector.on('collect',async(r)=>{
                            if (r.emoji.name === '◀️') {

                              r.users.remove(message.author.id)
                              if (page != min) {
                                page = page - 1;
                                await msg.edit({ embed: pages[page] });
                              }

                            } else if (r.emoji.name === '▶️') {

                              r.users.remove(message.author.id)
                              if (page != max) {
                                page = page + 1;
                                await msg.edit({ embed: pages[page] });
                              }

                            } else if (r.emoji.name === '✅') {
                                msg.reactions.removeAll();
                                var class_equipped=pages[page].title
                                await collection.updateOne(
                                    {"userId":message.author.id},
                                    {$set:{"class_equipped":class_equipped.toLowerCase()}}
                                )
                                await msg.edit({embed:{
                                    title:`Class ${class_equipped} equipped`,
                                    color:`0xd305fa`
                                    }
                                });
                                    page=0
                                    min=0;
                                    pageMax=Object.keys(userDat.classes[class_equipped.toLowerCase()]).length;
                                    pages = [];
                                    k=1;
                                    getWeaponDat(userDat,class_equipped,pages,pageMax);
                                    max = pages.length;
                                    await message.channel.send({embed:pages[page]}).then(async(msg)=>{
                                        for(var reactn in emojis)
                                            await msg.react(emojis[reactn]);
                                            const filter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;
                                            const collector = msg.createReactionCollector(filter, { time: 60 * 1000 })

                                            collector.on('collect',async(r)=>{
                                                if (r.emoji.name === '◀️') {

                                                  r.users.remove(message.author.id)
                                                  if (page != min) {
                                                    page = page - 1;
                                                    await msg.edit({ embed: pages[page] });
                                                  }

                                                } else if (r.emoji.name === '▶️') {

                                                  r.users.remove(message.author.id)
                                                  if (page != max) {
                                                    page = page + 1;
                                                    await msg.edit({ embed: pages[page] });
                                                  }

                                              } else if (r.emoji.name === '✅') {
                                                  msg.reactions.removeAll();
                                                  await collection.updateOne(
                                                      {"userId":message.author.id},
                                                      {$set:{"weapon_equipped":pages[page].title.toLowerCase()}}
                                                  )
                                                  await msg.edit({embed:{
                                                      title:`Weapon ${pages[page].title} equipped`,
                                                      color:`0xd305fa`
                                                  }})
                                              }
                                            })
                            })
                        }
                    })
                })
                break;
            }
            case 'list':{
                var userDat = await collection.findOne({'userId':message.author.id})
                let page=0;
                let max;
                let min=0;
                let pages;
                const emojis = ["◀️", "▶️","📃"];
                const emojis2=["⬅️", "➡️","↩️"]

                var pageMax=Object.keys(userDat.classes).length;
                pages = [];
                var k=1;
                for(var i in userDat.classes){
                    var setDat={
                        title:'Class',
                        color:'0xd305fa',
                        footer:{
                            text:`NA`
                        },
                        thumbnail:{
                            url:""
                        }
                    }
                    setDat.title=`${i.charAt(0).toUpperCase()+i.substring(1,i.length)}`;
                    setDat.thumbnail.url=arena[i].url;
                    setDat.description=`Weapons:`
                    for(var j in userDat.classes[i]){
                        setDat.description+=`\n${j.charAt(0).toUpperCase()+j.substring(1,j.length)}`;
                    }

                    setDat.footer.text=`Page: ${k}/${pageMax}`;
                    k++
                    pages.push(setDat);

                }
                max = pages.length;
                message.channel.send({embed:pages[page]}).then(async(msg)=>{
                    for(var reactn in emojis)
                        await msg.react(emojis[reactn]);

                        const filter = (reaction, user) => (emojis.some(emoji => emoji == reaction.emoji.name) || emojis2.some(emoji => emoji == reaction.emoji.name)) && user.id == message.author.id;
                        const collector = msg.createReactionCollector(filter, { time: 60 * 1000 })

                        collector.on('collect',async(r)=>{
                             r.users.remove(message.author.id)
                            if (r.emoji.name === '◀️') {
                              if (page != min) {
                                page = page - 1;
                                await msg.edit({ embed: pages[page] });
                              }

                            } else if (r.emoji.name === '▶️') {
                              if (page != max) {
                                page = page + 1;
                                await msg.edit({ embed: pages[page] });
                              }

                          }
                          else if(r.emoji.name === '📃'){

                                let promise = new Promise(async function(resolve,reject){
                                  let page1=0;
                                  let max1;
                                  let min1=0;
                                  let pages1;
                                  const emojis1 = ["⬅️", "➡️","↩️"];

                                  var pageMax1=Object.keys(userDat.classes[pages[page].title.toLowerCase()]).length;
                                  pages1 = [];
                                  var k=1;
                                  getWeaponDat(userDat,pages[page].title.toLowerCase(),pages1,pageMax1);
                                  max1 = pages.length;
                                  await msg.reactions.removeAll();
                                  await msg.edit({embed:pages1[page1]}).then(async(r)=>{
                                      for(var reactn in emojis1)
                                          await msg.react(emojis1[reactn]);
                                          const collector1 = msg.createReactionCollector(filter, { time: 60 * 1000 })

                                          collector1.on('collect',async(r)=>{
                                             r.users.remove(message.author.id)
                                             if (r.emoji.name === '⬅️') {
                                               if (page1 != min1) {
                                                 page1 = page1 - 1;
                                                 await msg.edit({ embed: pages1[page1] });
                                               }

                                             } else if (r.emoji.name === '➡️') {
                                               if (page1 != max1) {
                                                 page1 = page1 + 1;
                                                 await msg.edit({ embed: pages1[page1] });
                                               }
                                           }
                                           else if(r.emoji.name === '↩️')
                                           resolve("done");
                                          })


                                  })
                              })
                              await promise.then(async m=>{
                                  await msg.reactions.removeAll()
                                  await msg.edit({embed:pages[page]});
                                  for(var reactn in emojis)
                                      await msg.react(emojis[reactn]);
                              })
                          }
                        })

                    })
                break;
            }
            default:
                func.embed(message.channel, "Please re-run the command and enter one of the following : `equip`")
        }
    } catch (e) {
        console.log(e);
        return message.channel.send(`You were too late, please re-run the command`);
    }

}
function getWeaponDat(userDat,class_equipped,pages,pageMax){
    var k=1;
    for(var i in userDat.classes[class_equipped.toLowerCase()]){
        var setDat={
            title:'Weapon',
            color:'0xd305fa',
            footer:{
                text:`NA`
            }
        }
        setDat.title=`${i.charAt(0).toUpperCase()+i.substring(1,i.length)}`;
        setDat.description=`\nDamage: ${arena[class_equipped.toLowerCase()].weapons[i][1].damage}
                              Range: ${arena[class_equipped.toLowerCase()].weapons[i][1].range}
                              Damp Stat: ${Math.abs(arena[class_equipped.toLowerCase()].weapons[i][1].dampStat)}%
                              Accuracy: ${arena[class_equipped.toLowerCase()].weapons[i][1].accuracy}%`;
        setDat.footer.text=`Page: ${k}/${pageMax}`;
        k++
        pages.push(setDat);

    }
}
exports.help = {
    name: 'armory',
    category: "arena"

};
