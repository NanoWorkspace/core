import Command from "../app/Command"
import { MessageEmbed } from "discord.js"
import { db } from "../utils/globals"
import * as ArgTypes from "../utils/argTypes"

const addTweetUser: Command = {
  regex: /^(?:removetw(?:eet|itter)user|rtu)(?:\s+|$)/i,
  channels: ["717070722945646663"],
  owner: true,
  description:
    "Retire un utilisateur twitter de la liste d'utilisateurs autorisés.",
  channelType: "guild",
  args: { user: ArgTypes.Rest },
  call: ({ message, args }) => {
    const { user } = args

    const embed = new MessageEmbed()

    if (!user) {
      embed.setTitle("Argument manquant.")
    } else {
      db.remove("authorizedTwitterUsers", user)
      embed
        .setTitle("Utilisateur retiré.")
        .setDescription(`Utilisateur: \`${user}\``)
    }

    message.channel.send(embed)
  },
}

module.exports = addTweetUser
