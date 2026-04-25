const client = require("../index");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
client.on("messageCreate", async (message) => {
  if (message.channel.id !== "1083304633839145043"|| message.author.bot) return;
  SendInChannel();

  function SendInChannel() {
    const channel = client.channels.cache.get("1083304633839145043");
    if (!channel) return;
    if(!message.member.roles.cache.some(x => x.id == "1083054227145900113")){
      message.delete()
      message.author.send("**You need be an Admin or Higher to type in <#1083304633839145043>!**")
    }
  }
})
