const client = require("../index");
const {
  MessageEmbed,
  Collection,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} = require("discord.js");
const model = require("../models/apply");
const discordTranscripts = require("discord-html-transcripts");
const moment = require("moment");
const db = require(`quick.db`);
console.log(`[🔑 PRIVATE] Loaded the Private-Event: Apply-System`.blue.bold);
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton() && !interaction.isSelectMenu()) return;
  let tckCategory = "1083054373766185060";
  let tckStaff = "1083054226143445094";
  let tckAdmin = "1083054223081619577";
  if (interaction.customId == `azu_apply`) {
    model.findOne({ Guild: interaction.guild.id }, async (err, data) => {
      if (data)
        return interaction.reply({
          content: `❌ **The Application System has been Disabled!**\n> **We aren't currently looking for new Users in our Team!**`,
          ephemeral: true,
        });

      if (
        interaction.member.roles.cache.some(
          (x) => x.id == "1083054227145900113"
        )
      )
        return interaction.reply({
          content: `❌ **You already are a staff member!**`,
          ephemeral: true,
        });
      const tckEmb = new MessageEmbed()
        .setAuthor({
          name: `APPLICATION TICKET`,
          iconURL: `${client.user.displayAvatarURL()}`,
        })
        .setColor("#f65bad")
        .setFooter(`Made with 💖 by discord.developertech.co.za`)
        .setDescription(
          `Thanks for opening a apply ticket **${interaction.user.username}**! Please Answer the questions below:\n*Take note that it might take a while for our Staff team to decide if you will be accepted or not! Be patient.*\n\n\`\`\`\n1️⃣ Why do you wish to apply as a staff member?\n2️⃣ Have you ever moderated big servers before? If so, which ones?\n3️⃣ What is Your Age / Name? (OPTIONAL)\n4️⃣ What do you know about Moderating?\n5️⃣ Tell us more about yourself!\n\`\`\`\n***Don't just Answer the questions, make it Creative, and in a Pharagraph!***`
        );
      const tckRow = new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .setCustomId("apply_options")
          .setPlaceholder("Click an Option to Manage The Application")
          .addOptions([
            {
              label: `REVIEWING`,
              description: `Let user know Application is under review.`,
              value: `await_applytick`,
              emoji: `920516789883002880`,
            },
            {
              label: `APPROVE`,
              description: `Approve the Application user.`,
              value: `approve_applytick`,
              emoji: `✅`,
            },
            {
              label: `DECLINE`,
              description: `Decline the Application user.`,
              value: `decline_applytick`,
              emoji: `❌`,
            },
          ]),
      ]);

      let x = moment(new Date()).format("MMMM Do YYYY");
      interaction.guild.channels
        .create(`⍿📄・ap・${interaction.user.username}`, {
          type: "text",
          topic: `📄 ${interaction.user.tag}'s application ticket   **||**   💤: ${x}`,
          parent: tckCategory,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ["VIEW_CHANNEL"],
            },
            {
              id: tckStaff,
              allow: [
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "ATTACH_FILES",
                "MANAGE_MESSAGES",
              ],
            },
            {
              id: interaction.user.id,
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES"],
            },
          ],
        })
        .then(async (ch) => {
          db.set(`user${ch.id}`, interaction.user);
          ch.send({
            content: `👋 ${interaction.user}, welcome to your application ticket!  ¦  <@&${tckStaff}>`,
            embeds: [tckEmb],
            components: [tckRow],
          });
          interaction.reply({
            content: `**📄 Started your Application Ticket at: ${ch}**`,
            ephemeral: true,
          });
        });
    });
  }
  if (interaction.values == "approve_applytick") {
    const opener = db.get(`user${interaction.channel.id}`);
    if (!interaction.member.roles.cache.some((x) => x.id == tckStaff))
      return interaction.reply({
        content: `🔐・You must have the **<@&${tckStaff}>** role to be able to use this option!`,
        ephemeral: true,
      });

    const tckRow = new MessageActionRow().addComponents([
      new MessageSelectMenu()
        .setCustomId("apply_options")
        .setDisabled(true)
        .setPlaceholder("Click an Option to Manage The Application")
        .addOptions([
          {
            label: `WAITING`,
            description: `Let user know Application is under review.`,
            value: `await_applytick`,
            emoji: `920516789883002880`,
          },
          {
            label: `APPROVE`,
            description: `Approve the Application user.`,
            value: `approve_applytick`,
            emoji: `✅`,
          },
          {
            label: `DECLINE`,
            description: `Decline the Application user.`,
            value: `decline_applytick`,
            emoji: `❌`,
          },
        ]),
    ]);

    interaction.message.edit({ components: [tckRow] });

    const user = interaction.guild.members.cache.get(opener.id);
    user.roles.add("1083054227145900113");
    const row = new MessageActionRow().addComponents([
      new MessageButton()
        .setLabel(`Yes, Proceed to close`)
        .setEmoji(`🔒`)
        .setCustomId(`close_ticket`)
        .setStyle(`SUCCESS`),
    ]);
    const ad_btn = new MessageActionRow().addComponents([
      new MessageButton()
        .setLabel(`Action by ${interaction.user.username}`)
        .setDisabled(true)
        .setCustomId(`disabled_btn_apply_approved_unused`)
        .setStyle(`SECONDARY`)
        .setEmoji(`950128890897113098`),
    ]);
    user.send({
      content: `✅ **${interaction.user.tag} has approved your staff application!**\n> ***Go back to your Application channel to close it!***`,
    });
    interaction.reply({
      content: `**Hello, ${user}**\n\n> *Our Task is done! Do you want to close your ticket? Otherwise it will be closed in \`30 Minutes\`*\n\n> **Application Status: \` ✅ APPROVED \` by \`${interaction.user.username}\`**\n\n**With Kind Regards,**\n> *Developer Tech*`,
      components: [row],
    });
    setTimeout(function () {
      interaction.channel.delete();
    }, 1800000);
    client.channels.cache
      .get(`1083304633839145043`)
      .send({
        content: `**New Staff Member: ${user}** \n> **A new member of the server has now become a staff member! Congrat them in chat and show them around!**\n~ @everyone`,
        components: [ad_btn],
      });
    client.channels.cache
      .get(`1083054441059586198`)
      .send(`${user}`)
      .then((m) => {
        m.delete();
      });
  }
  if (interaction.values == "decline_applytick") {
    const opener = db.get(`user${interaction.channel.id}`);
    if (!interaction.member.roles.cache.some((x) => x.id == tckStaff))
      return interaction.reply({
        content: `🔐・You must have the **<@&${tckStaff}>** role to be able to use this option!`,
        ephemeral: true,
      });

    const tckRow = new MessageActionRow().addComponents([
      new MessageSelectMenu()
        .setCustomId("apply_options")
        .setDisabled(true)
        .setPlaceholder("Click an Option to Manage The Application")
        .addOptions([
          {
            label: `WAITING`,
            description: `Let user know Application is under review.`,
            value: `await_applytick`,
            emoji: `920516789883002880`,
          },
          {
            label: `APPROVE`,
            description: `Approve the Application user.`,
            value: `approve_applytick`,
            emoji: `✅`,
          },
          {
            label: `DECLINE`,
            description: `Decline the Application user.`,
            value: `decline_applytick`,
            emoji: `❌`,
          },
        ]),
    ]);

    interaction.message.edit({ components: [tckRow] });

    const user = interaction.guild.members.cache.get(opener.id);

    const row = new MessageActionRow().addComponents([
      new MessageButton()
        .setLabel(`Yes, Proceed to close`)
        .setEmoji(`🔒`)
        .setCustomId(`close_ticket`)
        .setStyle(`SUCCESS`),
    ]);
    user.send({
      content: `❎ **${interaction.user.tag} has declined your staff application! You can re-apply in 2 weeks!**\n> ***Go back to your Application channel to close it!***`,
    });
    interaction.reply({
      content: `**Hello, ${user}**\n\n> *Our Task is done! Do you want to close your ticket? Otherwise it will be closed in \`30 Minutes\`*\n\n> **Application Status: \` ❌ DECLINED \` by \`${interaction.user.username}\`**\n\n**With Kind Regards,**\n> *Developer Tech*`,
      components: [row],
    });
    setTimeout(function () {
      interaction.channel.delete();
    }, 1800000);
  }
  if (interaction.customId == `close_ticket`) {
    const opener = db.get(`user${interaction.channel.id}`);
    const user = interaction.guild.members.cache.get(opener.id);
    if (interaction.user.id !== opener.id)
      return interaction.reply({
        content: `❌ **Only ${user} can close this ticket!**`,
        ephemeral: true,
      });

    interaction.reply({
      content: `🔒 Closing within the next few seconds..`,
      ephemeral: true,
    });
    setTimeout(function () {
      interaction.channel.delete();
    }, 3000);
    const log = new MessageEmbed()
      .setColor("#f65bad")
      .setDescription(`Closed by: **\`${interaction.user.tag}\`**`)
      .setFooter(
        `The Transcript is attacthed to this message above!`,
        client.user.displayAvatarURL()
      );
    const attachment = await discordTranscripts.createTranscript(
      interaction.channel
    );

    client.channels.cache
      .get("1083054423435137024")
      .send({
        content: `<@` + interaction.user.id + `> **You Closed a ticket!**`,
        embeds: [log],
        files: [attachment],
      });
  }
  if (interaction.values == `await_applytick`) {
    const opener = db.get(`user${interaction.channel.id}`);
    const user = interaction.guild.members.cache.get(opener.id);
    if (!interaction.member.roles.cache.some((x) => x.id == tckStaff))
      return interaction.reply({
        content: `🔐・You must have the **<@&${tckStaff}>** role to be able to use this option!`,
        ephemeral: true,
      });
    const waiting = new MessageEmbed()
      .setColor(`PURPLE`)
      .setTitle(` ***YOUR APPLICATION IS UNDER-REVIEW***`)
      .setDescription(
        `${interaction.user} **Is reviewing your application...**`
      );
    interaction.reply({ content: `${user}`, embeds: [waiting] });
  }
});
