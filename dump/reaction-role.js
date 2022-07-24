const Discord = require('discord.js');

exports.run = async (client, message, args,func) => {
   var reactionMessage='testing'
   message.channel.send({embed:{
     title:"Reaction Roles",
     description:"Enter the entire message you want for reaction roles.",
     color: '0xd305fa',
   }}).then(async msg=>{
     const channelFilter = m=>m.author.id===message.author.id
     var channelCollector = message.channel.createMessageCollector(channelFilter,{max:1,time:60*3000})
     channelCollector.on('collect',async(collected)=>{
       reactionMessage=collected.content;
       console.log(reactionMessage)
        msg.edit({embed:{
          title:"Reaction Roles",
          description:"React with",
          color: '0xd305fa',
        }})
     })

   })
}

exports.help = {
  name: 'reaction-role',
  category: "moderation",
  aliases:["rr"]
};
