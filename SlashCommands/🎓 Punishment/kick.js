const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'kick',
  category: "🎓 Punishment",
  description: "Kick a user",
  type: 'CHAT_INPUT',
  options: [
    {
      name: `member`,
      description: `Pick a user to kick`,
      type: "USER",
      required: true,
    },
    {
      name: `reason`,
      description: `Give a reason`,
      type: "STRING",
      required: false,
    }
  ],
  run: async (client, interaction, args) => {
    const user = interaction.options.getMember('member');
    const reason = interaction.options.getString('reason');
    
    if(!interaction.member.roles.cache.has("1083054227145900113")) return interaction.followUp(`**You can't use this command!**`)

    const memberPosition = user.roles.highest.rawPosition;
    const moderationPosition = interaction.member.roles.highest.rawPosition;
    if (user.id === interaction.member.id) return interaction.followUp({content: `**You can't kick yourself!**`});

    if (moderationPosition <= memberPosition) return interaction.followUp(`**You can't kick someone who is higher or equal to your role!**`)
    if (user.id === interaction.guild.ownerId) return interaction.followUp({content: `**You cannot kick the Server Owner!**`
    });
    if (!user.kickable) return interaction.followUp(`**I cannot kick this user! Please check my permissions!**`)
      
    const kicked = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`✅ Kicked \`${user.user.tag}\`!`)
    .setDescription(`**Reason:** ${reason || `\`No Reason\``}`)

    const kicked_emb = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`✅ You have been kicked by \`${interaction.user.tag}\`!`)
    .setDescription(`**Reason:** ${reason || `\`No Reason\``}`)
    .setFooter(interaction.guild.name, interaction.guild.iconURL())
    user.send({ embeds: [kicked_emb]})
    user.kick({ reason: reason })
    
    return interaction.followUp({ embeds: [kicked] })
  }
}