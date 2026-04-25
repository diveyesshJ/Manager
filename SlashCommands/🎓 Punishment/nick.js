const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'nickname',
    category: "🎓 Punishment",
    description: 'changes the provided user\'s nickname to the one specified',
    options: [{
            name: 'target',
            description: 'target you want to change the nickname',
            type: 'USER',
            required: true
        },
        {
            name: "nick",
            description: "new nickname",
            type: "STRING",
            required: true
        },
        {
            name: 'reason',
            description: 'reason for this action',
            type: 'STRING',
            required: false
        }
    ],

    run: async (client, interaction) => {

        const target = interaction.options.getMember('target');
        const newnick = interaction.options.getString('nick');
        const reason = interaction.options.getString('reason') || "`No Reason`";

        if(!interaction.member.roles.cache.has("1083054227145900113")) return interaction.followUp(` **You can't use this command!**`)

        if (target.id === interaction.guild.me.id) return interaction.followUp({ content: `**You cannot change my Nickname!**` });

        if (target.id === interaction.guild.ownerId) return interaction.followUp({ content: ` **You cannot change the server owner's nickname!**` });

        if (target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({ content: ` **This user is higher or equal to your role!**` });

        if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp({ content: ` **This user is higher or equal to my role!**` });

        if (newnick.length > 32) return interaction.followUp({ content: ` **The nickname cannot be higher than 32!**` });

        const changed = new MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`✅ Changed the nickname of \`${target.user.tag}\` to: **${newnick}**!`)
        .setDescription(`**Reason:** ${reason || `\`No Reason\``}`)
        target.setNickname(newnick)

        interaction.followUp({ embeds: [changed] })

    }
}