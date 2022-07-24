const Discord = require('discord.js');
const fs = require("fs");
var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async (client, message, args, func) => {
    var lang = await func.getLangFile(message.guild.id,["config","setMessage"])
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(lang.permissionRequired);
    var db = mongoUtil.getDb();
    const collection = db.db(config.database).collection(config.collection.modConfig);
    let configMessage;
    if (!args[1]) {
        return func.embed(message.channel, `${lang.errorMessage} \`welcome\`, \`leave\``)
    } else if (!args[2]) {
        return message.channel.send(lang.pleaseEnterAMessage)
    } else {
        configMessage = args.slice(2).join(` `)
    }

    var dat = await collection.findOne({ "guildId": message.guild.id })
    let welcomeLeave;
    if (dat === null) {
        switch (args[1]) {
            case 'welcome':
                await collection.insertOne({ "guildId": message.guild.id, "welcomeMessage": configMessage })
                welcomeLeave = lang.welcome;
                break;
            case 'leave':
                await collection.insertOne({ "guildId": message.guild.id, "leaveMessage": configMessage })
                welcomeLeave = lang.leave;
                break;
            default:
                return func.embed(message.channel, `${lang.errorMessage} \`welcome\`, \`leave\``)
        }
    }
    else {

        switch (args[1]) {
            case 'welcome':
                await collection.updateOne(
                    { "guildId": message.guild.id },
                    { $set: { "welcomeMessage": configMessage } }
                )
                welcomeLeave = lang.welcome;
                break;
            case 'leave':
                await collection.updateOne(
                    { "guildId": message.guild.id },
                    { $set: { "leaveMessage": configMessage } }
                )
                welcomeLeave = lang.leave;
                break;
            default:
                return func.embed(message.channel, `${lang.errorMessage} \`welcome\`, \`leave\``)
        }
    }
    var finalMessage=lang.successMessage
    finalMessage = finalMessage.replace('{{welcomeLeave}}',welcomeLeave)
    const embed = new Discord.MessageEmbed()
        .setTitle(finalMessage)
        .setDescription(`\`\`\`${configMessage}\`\`\``)
        .setColor(0xd305fa);

    message.channel.send(embed)
}
exports.help = {
    name: 'set-message',
    category: 'config'
};
