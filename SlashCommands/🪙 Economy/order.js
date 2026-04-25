const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const { Pagination } = require("discordjs-button-embed-pagination");
const model = require("../../models/prd");
const model2 = require("../../models/inv");

module.exports = {
  name: "order",
  description: "Order an item from our store  | /store",
  type: "CHAT_INPUT",
  devOnly: true,
  run: async (client, interaction, args) => {
    let msg = await interaction.followUp(`Fetching..`);

    let array = [];
    model.find({}, async (err, data) => {
      let data2 = data;
      if (data.length === 0)
        return msg.edit(
          `🚩 The store is currently empty, therefore you cannot order anything!`
        );

      let array = [];
      data.map((v, i) => {
        x = { label: v.Name, description: v.Description, value: v.Name };
        array.push(x);
      });

      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("azu_order")
          .setPlaceholder("Select an Item to order from our Shop!")
          .addOptions([array])
      );

      const emb = new MessageEmbed()
        .setAuthor({
          name: `🛒 Developer Tech Basket 🛒`,
          iconURL: `${client.user.displayAvatarURL()}`,
        })
        .setDescription(
          `Welcome to your personal shopping cart/basket! To order an item pick something from the menu below, thanks for choosing 🪐 Developer Tech <3** \n\n • _Make sure to check your balance first, to make sure you have enough DevCoins/Tokens!_`
        )
        .setColor("#2f3136")
        .setFooter(`Made with 💖 by discord.developertech.co.za`);

      msg.edit({ content: ` `, embeds: [emb], components: [row] });
      const filter = (i) => i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 15000,
      });

      collector.on("collect", async (i) => {
        model.findOne({ Name: i.values }, async (err, data) => {
          if (!data)
            return msg.edit({
              content: `🚩 Uh oh, we cant seem to find that item at this moment! We recommend you try again, if this error continues contact a developer!`,
              embeds: [],
              components: [],
            });
        });

        let coin_amount = await client.bank(interaction.user.id);
        let token_amount = await client.tokens(interaction.user.id);

        if (data.Type == "coin_product") {
          if (coin_amount < data.Price)
            return msg.edit({
              content: `💳 Hmm, you seem to not have enough DevCoins to purchase this item! \n _• To check your balance go here <#1093088957706797096>_`,
              embeds: [],
              components: [],
            });

          model2.findOne({ id: interaction.user.id }, async (err, data) => {
            if (!data) {
              new model2({
                id: interaction.user.id,
                inventory: {
                  [i.values]: 1,
                },
              }).save();
            } else {
              const ch = Object.keys(data.inventory).includes(i.values);
              if (!ch) {
                data.inventory[i.values] = 1;
              } else {
                data.inventory[i.values]++;
              }
              await model2.findOneAndUpdate({ id: interaction.user.id }, data);
            }

            client.rmvCoins(interaction.user.id, data2.Price);
            return msg.edit({
              content: `🎁 Thank you for your purchase at **Developer Tech**, for the item **[${i.values}]**. Looking to redeem your product? /use`,
              embeds: [],
              components: [],
            });
          });
        } else {
          if (token_amount < data.Price)
            return msg.edit({
              content: `💳 Hmm, you seem to not have enough Tokens to purchase this item! \n _• To check your balance go here <#1093088957706797096>_`,
              embeds: [],
              components: [],
            });

          model2.findOne({ id: interaction.user.id }, async (err, data) => {
            if (!data) {
              new model2({
                id: interaction.user.id,
                inventory: {
                  [i.values]: 1,
                },
              }).save();
            } else {
              const ch = Object.keys(data.inventory).includes(i.values);
              if (!ch) {
                data.inventory[i.values] = 1;
              } else {
                data.inventory[i.values]++;
              }
              await model2.findOneAndUpdate({ id: interaction.user.id }, data);
            }

            client.rmvTokens(interaction.user.id, data2.Price);
            return msg.edit({
              content: `🎁 Thank you for your purchase at **Developer Tech**, for the item **[${i.values}]**. Looking to redeem your product? /use`,
              embeds: [],
              components: [],
            });
          });
        }
      });
    });
  },
};
