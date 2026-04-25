const client = require("../index");
const { MessageEmbed, Collection, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")
const cooldowns = new Map();
const discordTranscripts = require('discord-html-transcripts');
const db = require('quick.db')
const moment = require("moment")

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd) return interaction.update({ content: "An error has occured " });

      if(cmd.devOnly == true && !client.config.developers.includes(interaction.user.id)) return interaction.reply({ content: "🚩 Uh oh, this command is locked to our developers only!", ephemeral: true })

      function msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + "h, " + minutes + "m, " + seconds + "s";
      }

       if (cmd.cooldown) {
        if (!cooldowns.has(cmd.name)) {
          cooldowns.set(cmd.name, new Collection());
        }
        let currentDate = Date.now();
        let userCooldowns = cooldowns.get(cmd.name);
        let cooldownAmount = (cmd.cooldown || 3) * 1000;
        if (userCooldowns.has(interaction.user.id)) {
          let expirationDate = userCooldowns.get(interaction.user.id) + cooldownAmount;
          if (currentDate < expirationDate) {
            let timeLeft = Math.round((expirationDate - currentDate) / 1000);
            return interaction.reply({ content: `⌚ Your on a cooldown! Wait **${msToTime(timeLeft.toString())}** before using this command again!` })
          } else {
            userCooldowns.set(interaction.user.id, currentDate);
          }
        } else {
          userCooldowns.set(interaction.user.id, currentDate);
        }
      }

      await interaction.deferReply({ ephemeral: false }).catch(() => {});
      const args = [];

      for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name);
          option.options.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }
      interaction.member = interaction.guild.members.cache.get(interaction.user.id);
      cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    // Select Menu Handling
    let tckCategory = '1083054372528853022'
    let tckStaff    = '1083054237266747592'
    let tckAdmin    = '1083054227145900113'
    let closedcategory = '1083054396851621928'
if(interaction.customId == "del_tick") {
  interaction.reply({ content: `✅ **Deleting ticket!**`, ephemeral: true })
   interaction.channel.delete();
} if (interaction.customId == "delete_ticket") {
        const opener = db.get(`user${interaction.channel.id}`);
          const user = interaction.guild.members.cache.get(opener.id);
           if(interaction.user.id !== opener.id) return interaction.reply({ content: `❌ **Only ${user} can close this ticket!**`, ephemeral: true });
          interaction.reply({ content: `✅ **Closing your ticket now!**\n> *Please give us a review in <#1083054478355353640>!*`, ephemeral: true })
  const closedd = new MessageEmbed()
              .setColor(`PURPLE`)
              .setTitle(`🔒 Ticket Has been Closed`)
              .setDescription(`Channel: \`${interaction.channel.name}\`\n\n🔒 Closed by: \`${interaction.user.tag}\``)
  const del_row = new MessageActionRow()
            .addComponents([
              new MessageButton()
              .setLabel(`Delete Ticket`)
              .setEmoji(`🗑️`)
              .setStyle(`DANGER`)
              .setCustomId(`del_tick`)
            ])
          setTimeout(function(){
            interaction.channel.setParent("1083054396851621928");
              interaction.channel.setName(`⍿🔒・cl・${user.user.username}`);
              interaction.channel.send({ embeds: [closedd], components: [del_row] })
            db.set(`closed_${interaction.channel.id}`, "closed");
          }, 3000)
          const log = new MessageEmbed()
                 .setColor('#f65bad')
                .setAuthor(`Ticket-Log for: ${interaction.channel.name}`, `https://cdn.discordapp.com/emojis/853259977031417906.png?size=512`, `developertech.co.za`)
                .setDescription(`Closed by: **\`${interaction.user.tag}\`**`)
                .setFooter(`The Transcript is attacthed to this message above!`, client.user.displayAvatarURL())
                const attachment = await discordTranscripts.createTranscript(interaction.channel);

                

                client.channels.cache.get("1083054430703849522").send({ content: `<@`+interaction.user.id+`> **You Closed a ticket!**`, embeds: [log], files: [attachment]})

          
        } if (interaction.customId == "azu_reload_codes") {
  if(!client.config.developers.includes(interaction.user.id)) return interaction.reply({ content: `❌ **Your ID isn't found in the CLIENT_OWNERS config!**`, ephemeral: true })
  interaction.message.edit({ embeds: [client.codesEmbed]})
  interaction.reply({ content: `✅ **Reloaded the Codes-Embed!**`, ephemeral: true })
        }
    if (interaction.isSelectMenu()) {
      if(interaction.customId == 'select_ord'){
        if(interaction.values == 'ord_support'){
          // ❓・name
          const tckEmb = new MessageEmbed()
          .setColor('#4E3DFB')
          .setFooter(`Made with 💖 by discord.developertech.co.za/*`) 
          .setDescription(`Thanks for opening a support ticket **${interaction.user.username}**! While you wait for our staff team, why not state your problem, so when our staff get back to this ticket they can instantly respond! Waiting **over 30m?** Feel free to ping an online staff member. \n\n **_"Amazing support since 2021!" ~Developer Tech**`)
          const embed2 = new MessageEmbed()
          .setColor('#f65bad')
        .setDescription(`> *Please wait for one of the users with <@&${tckStaff}> to claim!*`)
          const tckRow = new MessageActionRow()
			    .addComponents(
			      new MessageSelectMenu()
			      .setCustomId('tck_options')
			      .setPlaceholder('Click one of the options to manage this ticket!')
			      .addOptions([
              { label: `Claim Ticket`, description: `Claim this ticket if you are a staff member!`, value: `tck_claim`, emoji: `✅` },
              { label: `Close Ticket`, description: `Finished with support? You can now close the ticket!`, value: `tck_close`, emoji: `🔒` },
            ]),
			    );

          let x = moment(new Date()).format('MMMM Do YYYY')
          interaction.guild.channels.create(`⍿❓・sp・${interaction.user.username}`, {
            type: 'text',
            topic: `❓ ${interaction.user.tag}'s support ticket   **||**   💤: ${x}`,
            parent: tckCategory,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: ['VIEW_CHANNEL']
              },
              {
                id: tckStaff,
                allow: ['VIEW_CHANNEL', 'ATTACH_FILES', 'MANAGE_MESSAGES']
              },
              {
                id: interaction.user.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
              }
            ]
          }).then(async(ch) => {
            db.set(`tc_channel_${ch.id}`, ch.id)
      db.set(`user${ch.id}`, interaction.user)
            ch.send({ 
              content: `👋 ${interaction.user}, welcome to your support ticket!  ¦  <@&${tckStaff}>`,
              embeds: [tckEmb, embed2], 
              components: [tckRow],
            })
            interaction.reply({ content: `❓・Opened your ticket, view it here: ${ch}`, ephemeral: true })
          })
        } else if(interaction.values == 'ord_giveaway'){
          // 🎉・name
          const tckEmb = new MessageEmbed()
          .setAuthor({ name: `GIVEAWAY CLAIM`, iconURL: `${client.user.displayAvatarURL()}` })
          .setColor('#f65bad')
          .setFooter(`Made with 💖 by discord.developertech.co.za/*`) 
          .setDescription(`Thanks for opening a giveaway claim ticket **${interaction.user.username}**! Make sure to tag the giveaway you won , provide proof & state what you win, so we can instantly get your prize to you! Waiting **over 1h?** Feel free to ping an online staff member. \n\n **_"Amazing support since 2021!" ~Developer Tech**`)
          const embed2 = new MessageEmbed()
          .setColor('#f65bad')
        .setDescription(`> *Please wait for one of the users with <@&${tckStaff}> to claim!*`)
          const tckRow = new MessageActionRow()
			    .addComponents(
			      new MessageSelectMenu()
			      .setCustomId('tck_options')
			      .setPlaceholder('Click one of the options to manage this ticket!')
			      .addOptions([
              { label: `Claim Ticket`, description: `Claim this ticket if you are a staff member!`, value: `tck_claim`, emoji: `✅` },
              { label: `Close Ticket`, description: `Finished with support? You can now close the ticket!`, value: `tck_close`, emoji: `🔒` },
            ]),
			    );

          let x = moment(new Date()).format('MMMM Do YYYY')
          interaction.guild.channels.create(`⍿🎉・gw・${interaction.user.username}`, {
            type: 'text',
            topic: `🎉 ${interaction.user.tag}'s giveaway claim ticket   **||**   💤: ${x}`,
            parent: tckCategory,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: ['VIEW_CHANNEL']
              },
              {
                id: tckStaff,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'MANAGE_MESSAGES']
              },
              {
                id: interaction.user.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
              }
            ]
          }).then(async(ch) => {
            db.set(`tc_channel_${ch.id}`, ch.id)
      db.set(`user${ch.id}`, interaction.user)
            ch.send({ 
              content: `👋 ${interaction.user}, welcome to your giveaway claim ticket!  ¦  <@&${tckStaff}>`,
              embeds: [tckEmb, embed2], 
              components: [tckRow],
            })
            interaction.reply({ content: `🎉・Opened your ticket, view it here: ${ch}`, ephemeral: true })
          })
        } else if(interaction.values == 'ord_order'){
          // 🛒・name
          const tckEmb = new MessageEmbed()
          .setAuthor({ name: `ORDER TICKET`, iconURL: `${client.user.displayAvatarURL()}` })
          .setColor('#f65bad')
          .setFooter(`Made with 💖 by 
discord.developertech.co.za/*`) 
          .setDescription(`Thanks for opening a bot order **${interaction.user.username}**! To get started make sure to mention what type of bot you want to ordr, your payment method & any extra information! (such as discounts etc) Waiting **over 1h?** Feel free to ping an online staff member. \n\n **_"Amazing support since 2021!" ~Developer Tech**`)
          const embed2 = new MessageEmbed()
          .setColor('#f65bad')
        .setDescription(`> *Please wait for one of the users with <@&${tckStaff}> to claim!*`)
          const tckRow = new MessageActionRow()
			    .addComponents(
			      new MessageSelectMenu()
			      .setCustomId('tck_options')
			      .setPlaceholder('Click one of the options to manage this ticket!')
			      .addOptions([
              { label: `Claim Ticket`, description: `Claim this ticket if you are a staff member!`, value: `tck_claim`, emoji: `✅` },
              { label: `Close Ticket`, description: `Finished with support? You can now close the ticket!`, value: `tck_close`, emoji: `🔒` },
            ]),
			    );

          let x = moment(new Date()).format('MMMM Do YYYY')
          interaction.guild.channels.create(`⍿🛒・od・${interaction.user.username}`, {
            type: 'text',
            topic: `🛒 ${interaction.user.tag}'s bot order ticket   **||**   💤: ${x}`,
            parent: tckCategory,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: ['VIEW_CHANNEL']
              },
              {
                id: tckStaff,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'MANAGE_MESSAGES']
              },
              {
                id: interaction.user.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
              }
            ]
          }).then(async(ch) => {
            db.set(`tc_channel_${ch.id}`, ch.id)
      db.set(`user${ch.id}`, interaction.user)
            ch.send({ 
              content: `👋 ${interaction.user}, welcome to your bot order ticket!  ¦  <@&${tckStaff}>`,
              embeds: [tckEmb, embed2], 
              components: [tckRow],
            })
            interaction.reply({ content: `🛒・Opened your bot order, view it here: ${ch}`, ephemeral: true })
          })
        }
      }

       if(interaction.customId == 'tck_options'){
        if(interaction.values == 'tck_close'){
          
          const opener = db.get(`user${interaction.channel.id}`);
      const user = interaction.guild.members.cache.get(opener.id);
          if(!interaction.member.roles.cache.some(x => x.id == tckStaff)) return interaction.reply({ content: `🔐・You must have the **<@&${tckStaff}>** role to be able to use this option!`, ephemeral: true })

          const row = new MessageActionRow()
          .addComponents([
            new MessageButton()
            .setLabel(`Yes, Proceed to close`)
            .setEmoji(`🔒`)
            .setCustomId(`delete_ticket`)
            .setStyle(`SUCCESS`)
          ])
          if(user){
            interaction.reply({ content: `**Hello, ${user}**\n\n> *Our Task is done! Do you want to close your ticket? Otherwise it will be closed in \`30 Minutes\`*\n\n**With Kind Regards,**\n> *Developer Tech*`, components: [row] })
            const attt = await discordTranscripts.createTranscript(interaction.channel);
            const closed = new MessageEmbed()
              .setColor(`PURPLE`)
              .setTitle(`🔒 Ticket Has been Closed`)
              .setDescription(` Channel: \`${interaction.channel.name}\`\n\n🔒 Closed by: \`${interaction.user.tag}\``)
            user.send({ embeds: [closed], files: [attt] }).catch(()=>{})
              interaction.channel.setName(`⍿✅・dn・${user.user.username}`);
             
            
            const closedd = new MessageEmbed()
              .setColor(`PURPLE`)
              .setTitle(`🔒 Ticket Has been Closed`)
              .setDescription(` Channel: \`${interaction.channel.name}\`\n\n🔒 Closed by: \`Auto-Delete\``)
            const del_row = new MessageActionRow()
            .addComponents([
              new MessageButton()
              .setLabel(`Delete Ticket`)
              .setEmoji(`🗑️`)
              .setStyle(`DANGER`)
              .setCustomId(`del_tick`)
            ])
            setTimeout(function(){
              interaction.channel.setParent(closedcategory);
              interaction.channel.setName(`⍿🔒・cl・${user.user.username}`);
              const closd = db.get(`closed_${interaction.channel.id}`);
              
              if(!closd) return interaction.channel.send({ embeds: [closedd], components: [del_row] })
              
            }, 1800000)
          } else {
            interaction.channel.send(`🔒 Closing within the next 5s..`)
            setTimeout(function(){
              interaction.channel.setParent(closedcategory);
              const closd = db.get(`closed_${interaction.channel.id}`);
              const closedd = new MessageEmbed()
              .setColor(`PURPLE`)
              .setTitle(`🔒 Ticket Has been Closed`)
              .setDescription(` Channel: \`${interaction.channel.name}\`\n\n🔒 Closed by: \`(User-Not-Found)\``)
              if(!closd) return interaction.channel.send({ embeds: [closedd] })
            }, 5000)
            const log = new MessageEmbed()
            .setColor('#f65bad')
            .setAuthor(`Ticket-Log for: ${interaction.channel.name}`, `https://cdn.discordapp.com/emojis/853259977031417906.png?size=512`, `
discord.developertech.co.za/*`)
            .setDescription(` Closed by: **\`${interaction.user.tag}\`**`)
            .setFooter(`The Transcript is attacthed to this message above!`, client.user.displayAvatarURL())
            const attachment = await discordTranscripts.createTranscript(interaction.channel);

            client.channels.cache.get("1083054430703849522").send({ content: `<@`+interaction.user.id+`> **You Closed a ticket!**`, embeds: [log], files: [attachment]})
          }
        } if(interaction.values == 'tck_claim'){
      const claimed = db.get(`claimed_${interaction.channel.id}`);
      //if(claimed) return interaction.reply({ content: `🔒 **This ticket has already been claimed!**`, ephemeral: true})
      if(!interaction.member.roles.cache.some(x => x.id == tckStaff)) return interaction.reply({ content: `🔐・You must have the **<@&${tckStaff}>** role to be able to use this option!`, ephemeral: true })
          interaction.channel.permissionOverwrites.edit(interaction.user.id, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        })
          interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        })
      const embed = new MessageEmbed()
        .setTitle("Your ticket has been claimed!")
        .setDescription(`${interaction.user.username} Claimed this ticket!`)
        .setColor('#f65bad')
        .setFooter(`Ticketing by developertech.co.za`, interaction.guild.iconURL())

        const embed2 = new MessageEmbed()
          .setColor('#f65bad')
        .setAuthor(`${interaction.user.tag} ⚡ Team Member / Supporter`, interaction.user.displayAvatarURL(), `discord.developertech.co.za`)
        .setDescription(`> _**${interaction.user.username}** has claimed this ticket! They will help you today..._`)

        //db.set(`claimed_${interaction.channel.id}`, "claimed")
        interaction.message.edit({ embeds: [interaction.message.embeds[0], embed2]})
        interaction.reply({ embeds: [embed] })

    } 
      }
    }
})
