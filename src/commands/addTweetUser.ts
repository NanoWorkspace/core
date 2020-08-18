import Command from "../app/Command"
import { MessageEmbed } from "discord.js"
import { db } from "../utils/globals"
import * as ArgTypes from "../utils/argTypes"

const addTweetUser: Command = {
  regex: /^(?:addtw(?:eet|itter)user|atu)(?:\s+|$)/i,
  channels: ["717070722945646663"],
  description:
    "Ajoute un utilisateur twitter a la liste d'utilisateurs autorisés.",
  channelType: "guild",
  owner: true,
  args: { user: ArgTypes.Rest },
  call: ({ message, args }) => {
    const { user } = args

    const embed = new MessageEmbed()

    if (!user) {
      embed.setTitle("Argument manquant.")
    } else {
      db.push("authorizedTwitterUsers", user)
      embed
        .setTitle("Utilisateur ajouté.")
        .setDescription(`Utilisateur: \`${user}\``)
    }

    message.channel.send(embed)
  },
}

module.exports = addTweetUser
