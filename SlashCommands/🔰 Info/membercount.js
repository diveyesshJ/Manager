const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment")

module.exports = {
    name: "membercount",
    description: "Gets the server's membercount",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);
      const ar = `<:arrow:1084432472311337022>`
let myGuild = interaction.guild; 
      
      const members = interaction.guild.members.cache;
  let memberCount = myGuild.memberCount;
      
      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`<:arrow:1084432472311337022> MemberCount of ${interaction.guild.name}`)
        .addField(`${ar} Total Members:`, `\`${memberCount}\`/\`${interaction.guild.maximumMembers}\``)
        .addField(`${ar} Total Bots:`, `\`${interaction.guild.members.cache.filter(member => member.user.bot).size}\``,)
        .addField(`${ar} Total Users:`, `\`${interaction.guild.members.cache.filter(member => !member.user.bot).size}\``,)
      .setThumbnail(client.user.displayAvatarURL({ dynamic : true }))
        .setFooter(client.botFooter, client.botFooterIcon) 

      
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb] });
      }, 500);
    },
};
