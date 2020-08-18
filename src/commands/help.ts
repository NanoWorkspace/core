import Command from "../app/Command"
import Discord from "discord.js"
import Globals from "../app/Globals"
import Types from "../app/ArgumentTypes"
import text from "../utils/text"

const help: Command = {
  regex: /h(?:[aeu]?lp)?/i,
  description: "Affiche les commandes existantes",
  channelType: "guild",
  args: { command: Types.command },
  cooldown: 10000,
  call: ({ message, args }) => {
    const command: Command = args.command

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
          .addField("pattern:", text.code(command.regex.toString()), false)
        if (command.args)
          embed.addField(
            "arguments:",
            Object.keys(command.args).join(", "),
            true
          )
        if (command.examples)
          embed.addField("examples:", command.examples.join("\n"), true)
        if (command.owner) embed.addField("owner:", true, true)
        if (command.admin) embed.addField("admin:", true, true)
        if (command.permissions)
          embed.addField(
            "permissions:",
            text.code(command.permissions.join("\n")),
            true
          )
        if (command.users)
          embed.addField(
            "users:",
            command.users
              .map((user) => `<@${(user as Discord.User).id || user}>`)
              .join("\n"),
            true
          )
        if (command.channelType)
          embed.addField("channelType:", command.channelType, true)
        if (command.cooldown)
          embed.addField("cooldown:", `${command.cooldown} ms`, true)
        if (command.typing) embed.addField("typing:", true, true)
        if (command.examples)
          embed.addField(
            "examples:",
            command.examples
              .map((example) => text.code(example, "md"))
              .join(""),
            true
          )
      } else {
        embed.setTitle("Commande inexistante.")
      }
    }

    message.channel.send(embed)
  },
}

module.exports = help
