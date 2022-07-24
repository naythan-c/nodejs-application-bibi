const Discord = require('discord.js');
const fs = require("fs");
var mongoUtil = require( '../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async (client, message, args, func) => {
  var lang = await func.getLangFile(message.guild.id,["config","menu"])
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(lang.permissionRequired);
  var emojis=['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣']
  // var aa=['9️⃣','🔟']
  let page;
  let max;
  let min;
  let pages;
  const pageMax = 2;
  pages = [
    {
      title: lang.configuration,
      description:lang.mainMenu,
      color: '0xd305fa',
      // footer: {
      //   text: `Page 1/${pageMax}`,
      // },
    },
    {
      title:lang.disableConfigTitle,
      description:lang.disableConfigPage,
      color: '0xd305fa',
    },
    {
      title:lang.enableConfigTitle,
      description:lang.enableConfigPage,
      color: '0xd305fa',
    },
    {
      title:lang.setChannelTitle,
      description:lang.setChannelPage,
      color: '0xd305fa',
    },
    {
      title:lang.setLanguageTitle,
      description:lang.setLanguagePage,
      color: '0xd305fa',
    },
    {
      title:lang.setMessageTitle,
      description:lang.setMessagePage,
      color: '0xd305fa',
    },
    {
      title:lang.setPrefixTitle,
      description:lang.setPrefixPage,
      color: '0xd305fa',
    },
    {
      title:lang.setWelcomeCardTitle,
      description:lang.setWelcomeCardPage,
      color: '0xd305fa',
    }
  ];


  page = 0;
  max = pages.length - 1;
  min = 0;

  message.channel.send({ embed: pages[0] }).then(async msg => {
    for(var i in emojis)
        await msg.react(emojis[i]);
    const filter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;

    const collector = msg.createReactionCollector(filter, {max:1,time: 60 * 1000 })
    collector.on('collect', async (r) => {
      msg.reactions.removeAll()
      var db = mongoUtil.getDb();
      const collection = db.db(config.database).collection(config.collection.modConfig);
      const dat = await collection.findOne({'guildId':message.guild.id})
      switch(r.emoji.name){
        case '1️⃣':{
          var lang = await func.getLangFile(message.guild.id,["config","disableConfig"])

          if(dat===null){

            return func.embed(message.channel, `The bot doesn\'t seem to be configured for this server `)
          }
          // collector.stop()
          await msg.edit({embed:pages[1]}).then(async mg=>{
            for(var i in emojis){
              if(i>4)
              break;
              await mg.react(emojis[i])
            }
            const disableFilter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;
            const disableCollector = mg.createReactionCollector(disableFilter,{max:1,time:60*1000})
            disableCollector.on('collect',async (r)=>{
              mg.reactions.removeAll()
              switch(r.emoji.name){
                case  '1️⃣':{
                  await collection.updateOne(
                    {'guildId':message.guild.id},
                    {$set:{'config.leavemessage':true,'config.welcomecard':true,'config.welcomemessage':true,'config.modlogs':true}}
                  )
                  await mg.edit({embed:{
                    title: `${lang.all} ${lang.disabled}`,
                    color: '0xd305fa'
                    }
                  })
                  break;
                }
                case  '2️⃣':{
                  await collection.updateOne(
                    {'guildId':message.guild.id},
                    {$set:{'config.welcomecard':true}}
                  )
                  await mg.edit({embed:{
                    title: `${lang.welcomeCard} ${lang.disabled}`,
                    color: '0xd305fa'
                    }
                  })
                  break;
                }
                case  '3️⃣':{
                  await collection.updateOne(
                    {'guildId':message.guild.id},
                    {$set:{'config.welcomemessage':true}}
                  )
                  await mg.edit({embed:{
                    title: `${lang.welcomeMessage} ${lang.disabled}`,
                    color: '0xd305fa'
                    }
                  })
                  break;
                }
                case  '4️⃣':{
                  await collection.updateOne(
                    {'guildId':message.guild.id},
                    {$set:{'config.leavemessage':true}}
                  )
                  await mg.edit({embed:{
                    title: `${lang.leaveMessage} ${lang.disabled}`,
                    color: '0xd305fa'
                    }
                  })
                  break;
                }
                case  '5️⃣':{
                  await collection.updateOne(
                    {'guildId':message.guild.id},
                    {$set:{'config.modlogs':true}}
                  )
                  await mg.edit({embed:{
                    title: `${lang.modLogs} ${lang.disabled}`,
                    color: '0xd305fa'
                    }
                  })
                  break;
                }
              }
            })
          })
          break;
        }
        case '2️⃣':{
          var lang = await func.getLangFile(message.guild.id,["config","disableConfig"])

          if(dat===null){

            return func.embed(message.channel, `The bot doesn\'t seem to be configured for this server `)
          }
          // collector.stop()
          await msg.edit({embed:pages[2]}).then(async mg=>{
            for(var i in emojis){
              if(i>4)
              break;
              await mg.react(emojis[i])
            }
            const disableFilter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;
            const disableCollector = mg.createReactionCollector(disableFilter,{max:1,time:60*1000})
            disableCollector.on('collect',async (r)=>{
              mg.reactions.removeAll()
              switch(r.emoji.name){
                case  '1️⃣':{
                  await collection.updateOne(
                    {'guildId':message.guild.id},
                    {$set:{'config.leavemessage':false,'config.welcomecard':false,'config.welcomemessage':false,'config.modlogs':false}}
                  )
                  await mg.edit({embed:{
                    title: `${lang.all} ${lang.enabled}`,
                    color: '0xd305fa'
                    }
                  })
                  break;
                }
                case  '2️⃣':{
                  await collection.updateOne(
                    {'guildId':message.guild.id},
                    {$set:{'config.welcomecard':false}}
                  )
                  await mg.edit({embed:{
                    title: `${lang.welcomeCard} ${lang.enabled}`,
                    color: '0xd305fa'
                    }
                  })
                  break;
                }
                case  '3️⃣':{
                  await collection.updateOne(
                    {'guildId':message.guild.id},
                    {$set:{'config.welcomemessage':false}}
                  )
                  await mg.edit({embed:{
                    title: `${lang.welcomeMessage} ${lang.enabled}`,
                    color: '0xd305fa'
                    }
                  })
                  break;
                }
                case  '4️⃣':{
                  await collection.updateOne(
                    {'guildId':message.guild.id},
                    {$set:{'config.leavemessage':false}}
                  )
                  await mg.edit({embed:{
                    title: `${lang.leaveMessage} ${lang.enabled}`,
                    color: '0xd305fa'
                    }
                  })
                  break;
                }
                case  '5️⃣':{
                  await collection.updateOne(
                    {'guildId':message.guild.id},
                    {$set:{'config.modlogs':false}}
                  )
                  await mg.edit({embed:{
                    title: `${lang.modLogs} ${lang.enabled}`,
                    color: '0xd305fa'
                    }
                  })
                  break;
                }
              }
            })
          })
          break;
        }
        case '3️⃣':{
          var lang = await func.getLangFile(message.guild.id,["config","resetPrefix"])
          if(dat!==null){
              if(dat.hasOwnProperty('prefix')){
                  await collection.updateOne(
                      {'guildId':message.guild.id},
                      {$unset:{'prefix':''}}
                  )
                  await msg.edit({embed:{
                    title:lang.successMessage,
                    color: '0xd305fa'
                  }
                })
              }
              else{
                await msg.edit({embed:{
                  title:lang.errorMessage,
                  color: '0xd305fa'
                }
              })
              }
          }
          else {
            await msg.edit({embed:{
              title:lang.errorMessage,
              color: '0xd305fa'
            }
          })
          }
          break;
        }
        case '4️⃣':{
          var lang = await func.getLangFile(message.guild.id,["config","setChannel"])
          await msg.edit({embed:pages[3]}).then(async mg=>{
            for(var i in emojis){
              if(i>3)
              break;
              await mg.react(emojis[i])
            }
            const channelReactionFilter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;
            const channelReactionCollector = mg.createReactionCollector(channelReactionFilter,{max:1,time:60*1000})

            channelReactionCollector.on('collect',async r=>{
              mg.reactions.removeAll()
              const channelFilter = m=>m.author.id===message.author.id

              switch(r.emoji.name){
                  case '1️⃣':{
                    await mg.edit({embed:{
                      title:lang.modlogsChannel,
                      description:lang.enterChannelName,
                      color: '0xd305fa',
                    }})
                    var channelCollector = message.channel.createMessageCollector(channelFilter,{time:60*1000})
                    channelCollector.on('collect',async(collected)=>{
                      var channel = collected.mentions.channels.first() || null
                      if(channel == null){
                        collected.delete()
                        return await msg.edit({embed:{
                          title:`${lang.mentionValidChannel}`,
                          color: '0xd305fa',
                        }})
                      }
                      channelCollector.stop()
                      await collected.delete()
                      if(dat===null)
                        await collection.insertOne({"guildId":message.guild.id,"logChannel":channel.id})
                      else {
                        await collection.updateOne(
                          {"guildId":message.guild.id},
                          {$set:{"logChannel":channel.id}}
                        )
                      }
                      await msg.edit({embed:{
                        title:`${lang.logChannelSet} \`${channel.name}\``,
                        color: '0xd305fa',
                      }})
                    })
                    break;
                  }
                  case '2️⃣':{
                    await mg.edit({embed:{
                      title:lang.welcomeChannel,
                      description:lang.enterChannelName,
                      color: '0xd305fa',
                    }})
                    var channelCollector = message.channel.createMessageCollector(channelFilter,{time:60*1000})
                    channelCollector.on('collect',async(collected)=>{
                      var channel = collected.mentions.channels.first() || null
                      if(channel == null){
                        collected.delete()
                        return await msg.edit({embed:{
                          title:`${lang.mentionValidChannel}`,
                          color: '0xd305fa',
                        }})
                      }
                      channelCollector.stop()
                      await collected.delete()
                      if(dat===null)
                        await collection.insertOne({"guildId":message.guild.id,"welcomeChannel":channel.id})
                      else {
                        await collection.updateOne(
                          {"guildId":message.guild.id},
                          {$set:{"welcomeChannel":channel.id}}
                        )
                      }
                      await msg.edit({embed:{
                        title:`${lang.welcomeChannelSet} \`${channel.name}\``,
                        color: '0xd305fa',
                      }})
                    })
                    break;
                  }
                  case '3️⃣':{
                    await mg.edit({embed:{
                      title:lang.leaveChannel,
                      description:lang.enterChannelName,
                      color: '0xd305fa',
                    }})
                    var channelCollector = message.channel.createMessageCollector(channelFilter,{time:60*1000})
                    channelCollector.on('collect',async(collected)=>{
                      var channel = collected.mentions.channels.first() || null
                      if(channel == null){
                        collected.delete()
                        return await msg.edit({embed:{
                          title:`${lang.mentionValidChannel}`,
                          color: '0xd305fa',
                        }})
                      }
                      channelCollector.stop()
                      await collected.delete()
                      if(dat===null)
                        await collection.insertOne({"guildId":message.guild.id,"leaveChannel":channel.id})
                      else {
                        await collection.updateOne(
                          {"guildId":message.guild.id},
                          {$set:{"leaveChannel":channel.id}}
                        )
                      }
                      await msg.edit({embed:{
                        title:`${lang.leaveChannelSet} \`${channel.name}\``,
                        color: '0xd305fa',
                      }})
                    })
                    break;
                  }
                  case '4️⃣':{
                    await mg.edit({embed:{
                      title:lang.levelNotificationChannel,
                      description:lang.enterChannelName,
                      color: '0xd305fa',
                    }})
                    var channelCollector = message.channel.createMessageCollector(channelFilter,{time:60*1000})
                    channelCollector.on('collect',async(collected)=>{
                      var channel = collected.mentions.channels.first() || null
                      if(channel == null){
                        collected.delete()
                        return await msg.edit({embed:{
                          title:`${lang.mentionValidChannel}`,
                          color: '0xd305fa',
                        }})
                      }
                      channelCollector.stop()
                      await collected.delete()
                      if(dat===null)
                        await collection.insertOne({"guildId":message.guild.id,"levelNotificationChannel":channel.id})
                      else {
                        await collection.updateOne(
                          {"guildId":message.guild.id},
                          {$set:{"levelNotificationChannel":channel.id}}
                        )
                      }
                      await msg.edit({embed:{
                        title:`${lang.levelNotificationChannelSet} \`${channel.name}\``,
                        color: '0xd305fa',
                      }})
                    })
                    break;
                  }
              }
            })

          })

          break;
        }
        case '5️⃣':{
          var lang = await func.getLangFile(message.guild.id,["config"])
          await msg.edit({embed:pages[4]}).then(async mg=>{
            for(var i in emojis){
              if(i>2)
              break;
              await mg.react(emojis[i])
            }
            const languageFilter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;
            const languageCollector = mg.createReactionCollector(languageFilter,{max:1,time:60*1000})
            languageCollector.on('collect',async r=>{
              var langSet=''
              mg.reactions.removeAll()
              switch(r.emoji.name){
                case '1️⃣':{
                  langSet="en"
                  if(dat===null){
                    await collection.insertOne({"guildId":message.guild.id,"language":langSet})
                  }
                  else{
                  await collection.updateOne(
                    {"guildId":message.guild.id},
                    {$set:{"language":langSet}}
                  )
                 }
                  break;
                }
                case '2️⃣':{
                  langSet="es"
                  if(dat===null){
                    await collection.insertOne({"guildId":message.guild.id,"language":langSet})
                  }
                  else{
                  await collection.updateOne(
                    {"guildId":message.guild.id},
                    {$set:{"language":langSet}}
                  )
                 }
                  break;
                }
                case '3️⃣':{
                  langSet="pt"
                  if(dat===null){
                    await collection.insertOne({"guildId":message.guild.id,"language":langSet})
                  }
                  else{
                  await collection.updateOne(
                    {"guildId":message.guild.id},
                    {$set:{"language":langSet}}
                  )
                 }
                  break;
                }
              }
              var languages={"en":"English","es":"Spanish","pt":"Portuguese"}
              var getLang=require('../../languages/'+langSet+".json")
              var finalMessage=getLang.languageSet
              finalMessage=finalMessage.replace('{{lang}}',languages[langSet])
              await mg.edit({embed:{
                title:`${finalMessage}`,
                color: '0xd305fa',
              }})

            })
          })
          break;
        }
        case '6️⃣':{
          var lang = await func.getLangFile(message.guild.id,["config","setMessage"])
          await msg.edit({embed:pages[5]}).then(async mg=>{
            for(var i in emojis){
              if(i>1)
              break;
              await msg.react(emojis[i])
            }
            const messageFilter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;
            const messageCollector = mg.createReactionCollector(messageFilter,{max:1,time:60*1000})
            messageCollector.on('collect',async r=>{
              mg.reactions.removeAll();
              const messageSetFilter = m=>m.author.id===message.author.id
              let welcomeLeave,configMessage=null;
              switch(r.emoji.name){
                case '1️⃣':{
                  await mg.edit({embed:{
                    title:lang.setWelcomeMessage,
                    description:lang.enterWelcomeMessage,
                    color: '0xd305fa',
                  }})
                  var messageSetCollector = message.channel.createMessageCollector(messageSetFilter,{max:1,time:3*60*1000})
                  messageSetCollector.on('collect',async collected=>{
                    configMessage=collected.content
                    collected.delete()
                    if(dat === null){
                      await collection.insertOne({ "guildId": message.guild.id, "welcomeMessage": configMessage })
                      welcomeLeave = lang.welcome;
                    }
                    else{
                      await collection.updateOne(
                          { "guildId": message.guild.id },
                          { $set: { "welcomeMessage": configMessage } }
                      )
                      welcomeLeave = lang.welcome;
                    }
                    var finalMessage=lang.successMessage
                    finalMessage = finalMessage.replace('{{welcomeLeave}}',welcomeLeave)
                    await mg.edit({embed:{
                        title:finalMessage,
                        description:`\`\`\`${configMessage}\`\`\``,
                        color: '0xd305fa',
                    }})
                  })
                  break;
                }
                case '2️⃣':{
                  await mg.edit({embed:{
                    title:lang.setLeaveMessage,
                    description:lang.enterLeaveMessage,
                    color: '0xd305fa',
                  }})
                  var messageSetCollector = message.channel.createMessageCollector(messageSetFilter,{max:1,time:3*60*1000})
                  messageSetCollector.on('collect',async collected=>{
                    configMessage=collected.content
                    collected.delete()
                    if(dat === null){
                      await collection.insertOne({ "guildId": message.guild.id, "leaveMessage": configMessage })
                      welcomeLeave = lang.leave;
                    }
                    else{
                      await collection.updateOne(
                          { "guildId": message.guild.id },
                          { $set: { "leaveMessage": configMessage } }
                      )
                      welcomeLeave = lang.leave;
                    }
                    var finalMessage=lang.successMessage
                    finalMessage = finalMessage.replace('{{welcomeLeave}}',welcomeLeave)
                    await mg.edit({embed:{
                        title:finalMessage,
                        description:`\`\`\`${configMessage}\`\`\``,
                        color: '0xd305fa',
                    }})
                  })
                  break;
                }
              }


            })
          })
          break;
        }
        case '7️⃣':{
          var lang = await func.getLangFile(message.guild.id,["config","prefix"])
          await msg.edit({embed:pages[6]}).then(async mg=>{
            for(var i in emojis){
              if(i>1)
              break;
              await msg.react(emojis[i])
            }
            const prefixTypeFilter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;
            const prefixTypeCollector = mg.createReactionCollector(prefixTypeFilter,{max:1,time:60*1000})

            prefixTypeCollector.on('collect',async r=>{
              mg.reactions.removeAll()
              const prefixSetFilter = m=>m.author.id===message.author.id
              switch(r.emoji.name){
                case '1️⃣':{
                await mg.edit({embed:{
                  title:lang.setPrefixTitle,
                  description:lang.enterPrefix,
                  color: '0xd305fa',
                }})
                var prefixSetCollector = message.channel.createMessageCollector(prefixSetFilter,{max:1,time:60*1000})
                prefixSetCollector.on('collect',async collected=>{
                  var prefix=collected.content.trim()
                  await collected.delete()
                  if(dat===null){
                    await collection.insertOne({"guildId":message.guild.id,"prefix":prefix})
                  }
                  else{
                  await collection.updateOne(
                    {"guildId":message.guild.id},
                    {$set:{"prefix":prefix}}
                  )
                 }
                 var finalMessage=lang.setPrefix;
                 finalMessage=finalMessage.replace("{{prefix}}",prefix)
                 await mg.edit({embed:{
                   title:finalMessage,
                   color: '0xd305fa',
                 }})
                })
                break;
              }
                case '2️⃣':{
                await mg.edit({embed:{
                  title:lang.setPrefixTitle,
                  description:lang.enterPrefix,
                  color: '0xd305fa',
                }})
                var prefixSetCollector = message.channel.createMessageCollector(prefixSetFilter,{max:1,time:60*1000})
                prefixSetCollector.on('collect',async collected=>{
                  var prefix=collected.content
                  await collected.delete()
                  prefix+=" "
                  if(dat===null){
                    await collection.insertOne({"guildId":message.guild.id,"prefix":prefix})
                  }
                  else{
                  await collection.updateOne(
                    {"guildId":message.guild.id},
                    {$set:{"prefix":prefix}}
                  )
                 }
                 var finalMessage=lang.setPrefix;
                 finalMessage=finalMessage.replace("{{prefix}}",prefix)
                 await mg.edit({embed:{
                   title:finalMessage,
                   color: '0xd305fa',
                 }})
                })
                break;
              }
              }
            })
          })
          break;
        }
        case '8️⃣':{
          var lang = await func.getLangFile(message.guild.id,["config","setWelcomeCard"])
          await msg.edit({embed:pages[7]}).then(async mg=>{
            for(var i in emojis){
              if(i>3)
                break;
              await mg.react(emojis[i])
            }

            const welcomeCardFilter = (reaction, user) => emojis.some(emoji => emoji == reaction.emoji.name) && user.id == message.author.id;
            const welcomeCardCollector = mg.createReactionCollector(welcomeCardFilter,{max:1,time:60*1000})

            welcomeCardCollector.on('collect',async r=>{
              mg.reactions.removeAll()
              var welcomeCard='';
              switch(r.emoji.name){
                  case '1️⃣':{
                    welcomeCard='purple';
                    if(dat===null){
                      await collection.insertOne({"guildId":message.guild.id,"welcomeCard":welcomeCard})
                    }
                    else{
                    await collection.updateOne(
                      {"guildId":message.guild.id},
                      {$set:{"welcomeCard":welcomeCard}}
                    )
                   }
                   var cname = lang.welcomeCardSet
                   cname=cname.replace('{{cardName}}',"Purple")
                   await mg.edit({embed:{
                     title:cname,
                     color: '0xd305fa'
                   }})
                    break;
                  }
                  case '2️⃣':{
                    welcomeCard='red';
                    if(dat===null){
                      await collection.insertOne({"guildId":message.guild.id,"welcomeCard":welcomeCard})
                    }
                    else{
                    await collection.updateOne(
                      {"guildId":message.guild.id},
                      {$set:{"welcomeCard":welcomeCard}}
                    )
                   }
                   var cname = lang.welcomeCardSet
                   cname=cname.replace('{{cardName}}',"Red")
                   await mg.edit({embed:{
                     title:cname,
                     color: '0xd305fa'
                   }})
                    break;
                  }
                  case '3️⃣':{
                    welcomeCard='black';
                    if(dat===null){
                      await collection.insertOne({"guildId":message.guild.id,"welcomeCard":welcomeCard})
                    }
                    else{
                    await collection.updateOne(
                      {"guildId":message.guild.id},
                      {$set:{"welcomeCard":welcomeCard}}
                    )
                   }
                   var cname = lang.welcomeCardSet
                   cname=cname.replace('{{cardName}}',"Black")
                   await mg.edit({embed:{
                     title:cname,
                     color: '0xd305fa'
                   }})
                    break;
                  }
                  case '4️⃣':{
                    welcomeCard='white';
                    if(dat===null){
                      await collection.insertOne({"guildId":message.guild.id,"welcomeCard":welcomeCard})
                    }
                    else{
                    await collection.updateOne(
                      {"guildId":message.guild.id},
                      {$set:{"welcomeCard":welcomeCard}}
                    )
                   }
                   var cname = lang.welcomeCardSet
                   cname=cname.replace('{{cardName}}',"White")
                   await mg.edit({embed:{
                     title:cname,
                     color: '0xd305fa'
                   }})
                    break;
                  }
              }
            })


          })
          break;
        }
      }
    })
  });
}

exports.help = {
  name: 'config',
  category:'config'
};
