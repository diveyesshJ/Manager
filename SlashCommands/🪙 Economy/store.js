const { Client, CommandInteraction, MessageEmbed, MessageButton } = require("discord.js");
const {Pagination} = require("discordjs-button-embed-pagination");
const model = require("../../models/prd")

module.exports = {
    name: "store",
    description: "View the store & its items",
    type: 'CHAT_INPUT',
    devOnly: true,
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`)
      
      let array = []
      model.find({}, async(err, data) => {
        if(data.length === 0) return msg.edit(`🚩 The store is currently empty, perhaps try again later?`)
        
        // data.forEach((x) => {
        //   if(x.Type == 'coin_product') v = `🪙${x.Amount} Coins`
        //   else if(x.Type == 'token_product') v = `🪙${x.Amount} Tokens`

        //   array.push(`**• Item Name: ${x.Name}** \n _Description: ${x.Description}_ \n Price: ${v}`)
        //   emb.setDescription(`${array.join('\n\n')}`)
        // })

        const emb = new MessageEmbed()
        .setAuthor({ name: `🌍 Developer Tech Shop 🌍`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor('#2f3136')
        .setFooter(`Made with 💖 by discord.developertech.co.za`) 
        .addFields(
          data.map((v, i) => {
            if(v.Type == 'coin_product') x = `🪙${v.Amount} Coins`
            else if(v.Type == 'token_product') x = `🪙${v.Amount} Tokens`

            return { name: `• Item Name: ${v.Name}`, value: `_Description: ${v.Description}_ \n _Price: ${x}_ \n\n`}
          })
        )

        return msg.edit({ content: ` `, embeds: [emb] });
      })
    }
};
