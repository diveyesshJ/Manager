const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const db = require(`quick.db`);

module.exports = {
    name: "ticket-setowner",
    description: "🎟️ Set the Ticket to the Owner Category",
    type: 'CHAT_INPUT',
    options: [], 
    run: async (client, interaction, args) => {
      
      let ch = interaction.channel;
      let msg = await interaction.followUp(`<a:hydroxI_loading:899414982079430706> Loading..`);
      if(!interaction.member.roles.cache.has("931653129550823514")) return msg.edit(`❌ **You can't use this!**`)
      const checkchannel = db.get(`tc_channel_${ch.id}`);
      // Makes it check if Channel is Ticket or not
      if(!checkchannel) return msg.edit(`❌ **This isn't a Ticket Channel!**`)
      const opener = db.get(`user${ch.id}`);
      const user = interaction.guild.members.cache.get(opener.id);
      

      
      

      // Set the Channel Name
      ch.setName(`⍿👑・ow・${user.user.username}`);

      
      // Notify/Ping the Owners
       msg.edit({ content: `👍 **The Owners were informed!**` })
      interaction.channel.send(`<@&939267529665294366>`).then((m) => { 
        m.delete()
      })
    },
};
