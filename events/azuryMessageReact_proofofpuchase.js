const client = require("../index");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
client.on("messageCreate", async (message) => {


 if (message.channel.id !== "1083054478355353640"|| message.author.bot) return;
 SendInChannel();

 function SendInChannel() {
  const channel = client.channels.cache.get("1083054478355353640");
  if (!channel) return;
  message.react("⭐")
  message.react("✅")
   }
})
