const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const vowels = ["a", "e", "i", "o", "u", "y"];

exports.run = async (client, message, args) => {
  if (!args[1]) {
    return message.channel.send(
      "U need to specify a user! You can specify a second user as well, if left blank, you will be the second user :)."
    );
  }
  let name1;
  let name2;

  if (args[1].includes("@")) {
    name1 = message.guild.members.cache.get(
      `${args[1].replace(/[\\<>@#&!]/g, "")}`
    ).user.username;
  } else {
    name1 = args[1];
  }

  if (args[2]) {
    if (args[2].includes("@")) {
      name2 = message.guild.members.cache.get(
        `${args[2].replace(/[\\<>@#&!]/g, "")}`
      ).user.username;
    } else {
      name2 = args[2];
    }
  } else {
    name2 = message.author.username;
  }
  const number = Math.ceil(Math.random() * 100);
  let title;

  if (number < 20) {
    title = "Not meant to be";
  } else if (number >= 20 && number < 40) {
    title = "Probably not a good choice";
  } else if (number >= 40 && number < 60) {
    title = "Potential Relationship";
  } else if (number >= 60 && number < 69) {
    title = "Probably together";
  } else if ((number == 69)) {
    title = "Best relationship ever";
  } else if (number > 69 && number < 75) {
    title = "Where da rose at";
  } else if (number >= 75 && number < 90) {
    title = "Ooo la la la";
  } else if (number >= 90 && number <= 100) {
    title = "Probably Married";
  }

  var name = combinename(name1, name2);
  message.channel.send(
    `**${name1} 💞 ${name2} = ${name}**\n\n>>> **${title}**\nMatch Percentage: \`${number}\``
  );
};

exports.help = {
  name: "ship",
  category: "fun"
};

function combinename(name1, name2) {
  var count1 = -1,
    count2 = -1;
  var mid1 = Math.ceil(name1.length / 2) - 1;
  var mid2 = Math.ceil(name2.length / 2) - 1;
  var noVowel1 = false,
    noVowel2 = false;
  let i;
  for (i = mid1; i >= 0; i--) {
    count1++;
    if (vowels.includes(name1.charAt(i).toLowerCase())) {
      i = -1;
    } else if (i == 0) {
      noVowel1 = true;
    }
  }
  for (i = mid2; i < name2.length; i++) {
    count2++;
    if (vowels.includes(name2.charAt(i).toLowerCase())) {
      i = name2.length;
    } else if (i == name2.length - 1) {
      noVowel2 = true;
    }
  }

  var name = "";
  if (noVowel1 && noVowel2) {
    name = name1.substring(0, mid1 + 1);
    name += name2.substring(mid2);
  } else if (count1 <= count2) {
    name = name1.substring(0, mid1 - count1 + 1);
    name += name2.substring(mid2);
  } else {
    name = name1.substring(0, mid1 + 1);
    name += name2.substring(mid2 + count2);
  }
  return name;
}
