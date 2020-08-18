import Command from "../app/Command"
import { MessageEmbed } from "discord.js"
import { commands } from "../utils/globals"
import * as ArgTypes from "../utils/argTypes"

const help: Command = {
  regex: /^h(?:[aeu]?lp)?(?:\s+|$)/i,
  channels: ["717070722945646663"],
  description: "Affiche les commandes existantes",
  channelType: "guild",
  args: { command: ArgTypes.Command },
  call: ({ message, args }) => {
    const { command } = args

    const embed = new MessageEmbed()

    if (!command) {
      embed.setTitle("Commandes").addFields(
        commands.map((c) => ({
          name: c.name,
          value: c.description || "Pas de description",
        }))
      )
    } else {
      if (command) {
        embed
          .setTitle(command.name)
          .setDescription(command.description || "Pas de description")
        if (command.args)
          embed.addField("arguments:", Object.keys(command.args).join(", "))
        if (command.examples)
          embed.addField("examples:", command.examples.join("\n"))
      } else {
        embed.setTitle("Commande inexistante.")
      }
    }

    message.channel.send(embed)
  },
}

module.exports = help
