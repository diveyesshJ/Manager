const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const client = require("../index");
const Discord = require(`discord.js`)
console.log(`[🔑 PRIVATE] Loaded the Private-Event: Member-Count`.blue.bold)
client.on('guildMemberAdd', member => {
  let myGuild = client.guilds.cache.get('941362510194417704'); 
  let UsermemberCount = myGuild.members.cache.filter(member => !member.user.bot).size;
  let TotalmemberCount = myGuild.memberCount;
let TotalmemberCountChannel = myGuild.channels.cache.get('1090668582570033182'); 
   TotalmemberCountChannel.setName('👤 All Members: ' + TotalmemberCount)
     let UsermemberCountChannel = myGuild.channels.cache.get('1091410908384854048'); 
   UsermemberCountChannel.setName('⍿🧑・Users: ' + UsermemberCount)
  if(member.user.bot) return;
  const join_emb = new Discord.MessageEmbed()
  .setColor(`PURPLE`)
  .setTitle(`✌️ Welcome to Developer Tech ✌️`)
  .setDescription(`**Developer Tech is a place to have fun, talk to the community and even to Order a Sick bot made by us!**`)
  .addField(`**__View Our Rules__**`, "<#1083054457744531556>")
  .addField(`**__View Our Bots & Prices__**`, "<#1083054468205121697>")
  .addField(`**__Order Bot/ Get Support:__**`, "<#1083054468205121697>")
  .addField(`**__Chat with the Community:__**`, "<#1083054486798487562>")
  .addField(`**__Use Bot Commands:__**`, "<#1083054489851940954>")
  .addField(`**__Suggest Ideas:__**`, "<#1083054476937670777>")
  .setFooter(`Enjoy your stay at Developer Tech`)
  member.send({ embeds: [join_emb] })
  myGuild.channels.cache.get("1091634508647907400").send({ content: `**${member.user} Welcome to Developer Tech! We now have \`${TotalmemberCount}\` members!** ✌️` })
});

client.on('guildMemberRemove', member => {
  let myGuild = client.guilds.cache.get('941362510194417704'); 
  let UsermemberCount = myGuild.members.cache.filter(member => !member.user.bot).size;
  let TotalmemberCount = myGuild.memberCount;
let TotalmemberCountChannel = myGuild.channels.cache.get('1090668582570033182'); 
   TotalmemberCountChannel.setName('👤 All Members: ' + TotalmemberCount)
     let UsermemberCountChannel = myGuild.channels.cache.get('1091410908384854048'); 
   UsermemberCountChannel.setName('⍿🧑・Users: ' + UsermemberCount)
  if(member.user.bot) return;
  myGuild.channels.cache.get("1091634508647907400").send({ content: `**${member.user.username} left our server! We now have ${TotalmemberCount} members...** ✌️` })
});