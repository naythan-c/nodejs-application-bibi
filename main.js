require('dotenv').config()
const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION','USER'] });
const fetch = require("node-fetch");
const math = require("mathjs");
const func = require("./functions.js");
const config = require("./config.json")

var mongoUtil = require( './mongoUtil.js' );
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.language = new Discord.Collection();
const fs = require("fs");
mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  // start the rest of your app here
} );
fs.readdir("./cmds/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases){
      props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias,props.help.name)

      })
   }
  });
  console.log(`Loaded ${jsFiles.length} commands`);
});

fs.readdir("./cmds/games/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/games/${f}`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases){
      props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias,props.help.name)

      })
   }
  });
  console.log(`Loaded ${jsFiles.length} Games commands`);
})

fs.readdir("./cmds/config/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/config/${f}`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases){
      props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias,props.help.name)

      })
   }
  });
  console.log(`Loaded ${jsFiles.length} Configuration commands`);
})

fs.readdir("./cmds/leveling/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/leveling/${f}`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases){
      props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias,props.help.name)

      })
   }
  });


  console.log(`Loaded ${jsFiles.length} Leveling commands`);
})
fs.readdir("./cmds/brawlstars/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/brawlstars/${f}`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases){
      props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias,props.help.name)

      })
   }
  });
  console.log(`Loaded ${jsFiles.length} Brawl Stars commands`);
});

fs.readdir("./cmds/emotes/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/emotes/${f}`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases){
      props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias,props.help.name)

      })
   }
  });
  console.log(`Loaded ${jsFiles.length} Emote commands`);
});

fs.readdir("./cmds/filters/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/filters/${f}`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases){
      props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias,props.help.name)

      })
   }
  });
  console.log(`Loaded ${jsFiles.length} Filters commands`);
});

fs.readdir("./cmds/fun/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/fun/${f}`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases){
      props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias,props.help.name)

      })
   }
  });
  console.log(`Loaded ${jsFiles.length} Fun commands`);
});

fs.readdir("./cmds/general/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/general/${f}`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases){
      props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias,props.help.name)

      })
   }
  });



  console.log(`Loaded ${jsFiles.length} General commands`);
});

fs.readdir("./cmds/moderation/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/moderation/${f}`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases){
      props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias,props.help.name)

      })
   }
  });
  console.log(`Loaded ${jsFiles.length} Moderation commands`);
});

fs.readdir("./cmds/arena/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/arena/${f}`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases){
      props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias,props.help.name)

      })
   }
  });
  console.log(`Loaded ${jsFiles.length} Arena commands`);
});


fs.readdir('./events/', (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        let eventFunc = require(`./events/${file}`);
        console.log("Successfully loaded " + file)
        let eventName = file.split(".")[0];
        bot.on(eventName, (...args) => eventFunc.run(bot, ...args));
    });
});

// process.on('unhandledRejection', async(error) => {
//   const embed = new Discord.MessageEmbed()
//                 .setColor("RED")
//                 .addField('**Name**',error.name)
//                 .addField('**Message**',error.message)
//                 // .addField('**Method**',error.method||"NA")
//                 // .addField('**Path**',error.path||"NA")
//                 // .addField('**Code**',error.code||"NA")
//                 // .addField('**Http Status**',error.httpStatus||"NA")
//                 .addField('**Stack Trace**',`\`\`\`${error.stack}\`\`\``)
//   bot.guilds.cache.get('764854907952955402').channels.cache.get('715773831322664962').send({embed:embed});
// });

bot.on("ready", () => {
  bot.user.setPresence({
    status: "online",
    activity: {
      name: `bb help`,
      type: "PLAYING"
    }
  });
  console.log("Bot was logged in"); // Output a message to the logs.
});

bot.login(process.env.BOT_TOKEN);

