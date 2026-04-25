const client = require("../index");
const { MessageEmbed, Collection, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")
const moment = require("moment")
const db = require(`quick.db`)
console.log(`[🔑 PRIVATE] Loaded the Private-Event: Role-Picker`.blue.bold)
client.on("interactionCreate", async (interaction) => {
  if(!interaction.isButton() && !interaction.isSelectMenu()) return;
  const redRole = "1091631037504831549";
  const blueRole = "1091631117142081566";
  const greenRole = "1091631167754747904";
  const yellowRole = "1091631212663152720";
  const heRole = "1083054346633232444";
  const sheRole = "1083054347786649641";
  const theyRole = "1091631437570121758";
  const askRole = "939267549479182386";
  const annRole = "1083054314966229042";
  const eventRole = "1083054315868008468";
  const wakeRole = "939267543762362429";
    if(interaction.customId == `azu_rolepicker`) {
      const pickembed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`✌️ Self-Roles | Role-Pick ✌️`)
      .addField(`**__Picked:__**`, "`None`")
      .setFooter(`⚡ Powered by Developer Tech!`)
      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Color Roles`)
        .setCustomId(`color_roles`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Ping Roles`)
        .setCustomId(`ping_roles`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Pronoun Roles`)
        .setCustomId(`pronoun_roles`)
        .setStyle(`SECONDARY`)
      ])
      const row2 = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Information`)
        .setEmoji(`❓`)
        .setCustomId(`roles_info`)
        .setStyle(`PRIMARY`)
      ])
      interaction.reply({ embeds: [pickembed], components: [row, row2], ephemeral: true })
    } else if (interaction.customId == `color_roles`) {
      const pickembed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`✌️ Self-Roles | Role-Pick ✌️`)
      .addField(`**__Picked:__**`, "`Color_Roles`")
      .setFooter(`⚡ Powered by Developer Tech!`)
      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Red`)
        .setEmoji(`🔴`)
        .setCustomId(`red_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Blue`)
        .setEmoji(`🔵`)
        .setCustomId(`blue_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Green`)
        .setEmoji(`🟢`)
        .setCustomId(`green_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Yellow`)
        .setEmoji(`🟡`)
        .setCustomId(`yellow_role`)
        .setStyle(`SECONDARY`)
      ])
      const row2 = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Go Back`)
        .setEmoji(`⏪`)
        .setCustomId(`roles_back`)
        .setStyle(`PRIMARY`)
      ])
      interaction.update({ embeds: [pickembed], components: [row, row2], ephemeral: true })
    } else if (interaction.customId == `pronoun_roles`) {
      const pickembed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`✌️ Self-Roles | Role-Pick ✌️`)
      .addField(`**__Picked:__**`, "`Pronoun_Roles`")
      .setFooter(`⚡ Powered by Developer Tech!`)
      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`He/Him`)
        .setEmoji(`👨`)
        .setCustomId(`he_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`She/Her`)
        .setEmoji(`👩`)
        .setCustomId(`she_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`They/Them`)
        .setEmoji(`🙎`)
        .setCustomId(`they_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Ask/Private`)
        .setEmoji(`🤔`)
        .setCustomId(`ask_role`)
        .setStyle(`SECONDARY`)
      ])
      const row2 = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Go Back`)
        .setEmoji(`⏪`)
        .setCustomId(`roles_back`)
        .setStyle(`PRIMARY`)
      ])
      interaction.update({ embeds: [pickembed], components: [row, row2], ephemeral: true })
    } else if (interaction.customId == `ping_roles`) {
      const pickembed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`✌️ Self-Roles | Role-Pick ✌️`)
      .addField(`**__Picked:__**`, "`Ping_Roles`")
      .setFooter(`⚡ Powered by Developer Tech!`)
      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Announcements`)
        .setEmoji(`📣`)
        .setCustomId(`ann_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Events`)
        .setEmoji(`🌆`)
        .setCustomId(`event_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Wake-Up`)
        .setEmoji(`🙃`)
        .setCustomId(`wake_role`)
        .setStyle(`SECONDARY`)
      ])
      const row2 = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Go Back`)
        .setEmoji(`⏪`)
        .setCustomId(`roles_back`)
        .setStyle(`PRIMARY`)
      ])
      interaction.update({ embeds: [pickembed], components: [row, row2], ephemeral: true })
    } else if (interaction.customId == `roles_back`) {
      const pickembed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`✌️ Self-Roles | Role-Pick ✌️`)
      .addField(`**__Picked:__**`, "`None`")
      .setFooter(`⚡ Powered by Developer Tech!`)
      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Color Roles`)
        .setCustomId(`color_roles`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Ping Roles`)
        .setCustomId(`ping_roles`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Pronoun Roles`)
        .setCustomId(`pronoun_roles`)
        .setStyle(`SECONDARY`)
      ])
      const row2 = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Information`)
        .setEmoji(`❓`)
        .setCustomId(`roles_info`)
        .setStyle(`PRIMARY`)
      ])
      interaction.update({ embeds: [pickembed], components: [row, row2], ephemeral: true })
      } else if (interaction.customId == `roles_info`) {
        const embed = new MessageEmbed()
        .setColor(`BLUE`)
        .setTitle(`✌️ Self-Roles | F-A-Q ✌️`)
        .addField(`**__How to Pick a role__**`, "**You can pick a role by Clicking one of the Role Categorys. Then by pressing on the role provided! You can press it again to remove the role!**")
        .addField(`**__Source Code?__**`, "**NO! This system will NOT be Open sourced! Learn to make it yourself, or order one from us!**")
      interaction.reply({ embeds: [embed], ephemeral: true })
        } else if (interaction.customId == `red_role`) {
      if(interaction.member.roles.cache.has(redRole)) {
        await interaction.member.roles.remove(redRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(redRole)
      interaction.reply({ content: `<:verified:1017432641622003772> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `blue_role`) {
      if(interaction.member.roles.cache.has(blueRole)) {
        await interaction.member.roles.remove(blueRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(blueRole)
      interaction.reply({ content: `<:verified:1017432641622003772> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `green_role`) {
      if(interaction.member.roles.cache.has(greenRole)) {
        await interaction.member.roles.remove(greenRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(greenRole)
      interaction.reply({ content: `<:verified:1017432641622003772> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `yellow_role`) {
      if(interaction.member.roles.cache.has(yellowRole)) {
        await interaction.member.roles.remove(yellowRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(yellowRole)
      interaction.reply({ content: `<:verified:1017432641622003772> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `he_role`) {
      if(interaction.member.roles.cache.has(heRole)) {
        await interaction.member.roles.remove(heRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(heRole)
      interaction.reply({ content: `<:verified:1017432641622003772> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `she_role`) {
      if(interaction.member.roles.cache.has(sheRole)) {
        await interaction.member.roles.remove(sheRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(sheRole)
      interaction.reply({ content: `<:verified:1017432641622003772> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `they_role`) {
      if(interaction.member.roles.cache.has(theyRole)) {
        await interaction.member.roles.remove(theyRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so I removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(theyRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `ask_role`) {
      if(interaction.member.roles.cache.has(askRole)) {
        await interaction.member.roles.remove(askRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so I removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(askRole)
      interaction.reply({ content: `**Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `yellow_role`) {
      if(interaction.member.roles.cache.has(askRole)) {
        await interaction.member.roles.remove(askRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(askRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `ann_role`) {
      if(interaction.member.roles.cache.has(annRole)) {
        await interaction.member.roles.remove(annRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(annRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `event_role`) {
      if(interaction.member.roles.cache.has(eventRole)) {
        await interaction.member.roles.remove(eventRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(eventRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `wake_role`) {
      if(interaction.member.roles.cache.has(wakeRole)) {
        await interaction.member.roles.remove(wakeRole)
        return interaction.reply({ content: `<:no:1084406062486147152> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(wakeRole)
      interaction.reply({ content: `**Successfuly added the role!**`, ephemeral: true })
    } 
})