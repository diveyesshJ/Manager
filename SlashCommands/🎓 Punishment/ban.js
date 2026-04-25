const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
  name: 'ban',
    category: "🎓 Punishment",
  description: "Ban a user",
  type: 'CHAT_INPUT',
  options: [
    {
      name: `member`,
      description: `Pick a user to ban`,
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
  /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
    const user = interaction.options.getMember('member');
    const reason = interaction.options.getString('reason');

    if(!interaction.member.roles.cache.has("1083054227145900113")) return interaction.followUp(`**You can't use this command!**`)

    const memberPosition = user.roles.highest.rawPosition;
      const moderationPosition = interaction.member.roles.highest.rawPosition;

      if (user.id === interaction.member.id) return interaction.followUp({
            content: `**You can't ban yourself!**`
        });

      if (moderationPosition <= memberPosition) return interaction.followUp(`❌ **You can't ban someone who is higher or equal to your role!**`)

      if (user.id === interaction.guild.ownerId) return interaction.followUp({
            content: `**You cannot ban the Server Owner!**`
        });

      if (!user.bannable) return interaction.followUp(`❌ **I cannot ban this user! Please check my permissions!**`)
      

    const banned = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`✅ Banned \`${user.user.tag}\`!`)
    .setDescription(`**Reason:** ${reason || `\`No Reason\``}`)
const banned_emb = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`✅ You have been banned by \`${interaction.user.tag}\`!`)
    .setDescription(`**Reason:** ${reason || `\`No Reason\``}`)
    .setFooter(interaction.guild.name, interaction.guild.iconURL())
    user.send({ embeds: [banned_emb]})
    user.ban({ reason: reason })
    
      
      return interaction.followUp({ embeds: [banned] })

  }
}