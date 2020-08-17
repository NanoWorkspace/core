import Command from "../app/Command"
import { MessageEmbed } from "discord.js"
import resolveCommand from "../utils/resolveCommand"
import { commands } from "../utils/globals"

const help: Command = {
  name: "help",
  aliases: ["h"],
  channels: ["717070722945646663"],
  description: "Affiche les commandes existantes",
  channelType: "guild",
  arguments: {
    command: (content) => {
      const commandName = content.split(/\s+/)[1]
      if (commandName?.length > 0) {
        return resolveCommand(commandName)
      } else return false
    },
  },
  call: ({ message, arguments: args }) => {
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
        if (command.aliases)
          embed.addField("aliases:", command.aliases.join(", "))
        if (command.arguments)
          embed.addField(
            "arguments:",
            Object.keys(command.arguments).join(", ")
          )
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
