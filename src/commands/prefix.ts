import { MessageEmbed } from "discord.js"
import Command from "../app/Command"
import * as ArgTypes from "../utils/argTypes"
import { db } from "../utils/globals"

const prefix: Command = {
  regex: /^pr[eé]fix\s+/i,
  description: "Change le prefix de Nano pour ce serveur",
  channelType: "guild",
  admin: true,
  channels: ["717070722945646663"],
  args: { newPrefix: ArgTypes.Rest },
  call: ({ message, args }) => {
    const { newPrefix } = args
    db.set("prefix", newPrefix, `guilds.${message.guild?.id}`)
    const embed = new MessageEmbed()
      .setTitle(`Le prefix de Nano sur ce serveur a bien été modifié.`)
      .setDescription(`Nouveau prefix: ${newPrefix}`)
    message.channel.send(embed).catch(console.error)
  },
}

module.exports = prefix
