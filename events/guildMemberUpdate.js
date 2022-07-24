const Discord = require('discord.js')
const config = require('../config.json');
const mongoUtil = require('../mongoUtil');
const func = require('../functions.js');
exports.run = async ( client,oldMember, newMember)=> {
  // declare changes
  var db = mongoUtil.getDb();
  const collection = db.db(config.database).collection(config.collection.modConfig);
  var dat =await collection.findOne({"guildId":newMember.guild.id})
  var lang = await func.getLangFile(newMember.guild.id,[])
  if(dat===null)
   return
   if(dat.config.modlogs)
   return
  if(!dat.logChannel)
   return

   const guild = newMember.guild;
  var Changes = {
    unknown: 0,
    addedRole: 1,
    removedRole: 2,
    username: 3,
    nickname: 4,
    avatar: 5
  }
  var change = Changes.unknown

  // check if roles were removed
  var removedRole = ''
  oldMember.roles.cache.forEach(function (value) {
    if (newMember.roles.cache.get(value.id) == null) {
      change = Changes.removedRole
      removedRole = value.name
    }
  })

  // check if roles were added
  var addedRole = ''
  newMember.roles.cache.forEach(function (value) {
    if (oldMember.roles.cache.get(value.id) == null) {
      change = Changes.addedRole
      addedRole = value.name
    }
  })

  // check if username changed
  if (newMember.user.username != oldMember.user.username) {
    change = Changes.username
  }
  // check if nickname changed
  if (newMember.nickname != oldMember.nickname) {
    change = Changes.nickname
  }
  // check if avatar changed
  if (newMember.user.avatarURL != oldMember.user.avatarURL) {
    change = Changes.avatar
  }
  // post in the guild's log channel
   let ChangeEmbed = new Discord.MessageEmbed()

  .setColor("0xd305fa")
  .setAuthor(newMember.user.tag,newMember.user.displayAvatarURL())
  .setTimestamp()
  .setFooter(`${lang.authorID}: ${newMember.user.id}`);


  var log = guild.channels.cache.get(dat.logChannel)
  if (log != null) {
    switch (change) {
      case Changes.unknown:
        return;
        break
      case Changes.addedRole:
      var rolemessage=lang.roleGiven
      rolemessage = rolemessage.replace('{{role}}',addedRole)
        ChangeEmbed.setTitle(`**${lang.roleAdded}**`)
          .setDescription(newMember.displayName + `** ${rolemessage} **`)
          break
      case Changes.removedRole:
      var rolemessage=lang.roleTakenBack
      rolemessage = rolemessage.replace('{{role}}',removedRole)
        ChangeEmbed.setTitle(`**${lang.roleRemoved}**`)
          .setDescription(newMember.displayName + `** ${rolemessage} **`)
        break
      case Changes.username:
        ChangeEmbed.addField(lang.before, oldMember.user.discriminator)
        .addField(lang.after, newMember.user.discriminator)
        .setTitle(`**${lang.usernameChange}**`)
        break
      case Changes.nickname:
        ChangeEmbed.addField(lang.before, oldMember.displayName)
        .addField(lang.after, newMember.displayName)
        .setTitle(`**${lang.nicknameChange}**`)
        break
      case Changes.avatar:
        log.send(`**[${lang.userAvatarChanged}]**` + newMember)
        break
    }
    log.send({embed:ChangeEmbed});
  }
}
