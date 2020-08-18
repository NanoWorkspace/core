import Command from "../app/Command"
import Discord from "discord.js"
import Globals from "../app/Globals"
import Types from "../app/ArgumentTypes"

const help: Command = {
  regex: /h(?:[aeu]?lp)?/i,
  channels: ["717070722945646663"],
  description: "Affiche les commandes existantes",
  channelType: "guild",
  args: { command: Types.command },
  call: ({ message, args: { command } }) => {
    const embed = new Discord.MessageEmbed()

    if (!command) {
      embed.setTitle("Commandes").addFields(
        Globals.commands.map((c) => ({
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
