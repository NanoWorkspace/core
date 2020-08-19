import Discord from "discord.js"
import Command from "../app/Command"
import Types from "../app/ArgumentTypes"
import Globals from "../app/Globals"

const tweetUsers: Command = {
  regex: /tu|tw(?:eet|itter)users/i,
  description:
    "Gère l'ajout d'utilisateurs dont les tweet webhooks sont autorisés.",
  channelType: "guild",
  admin: true,
  args: {
    action: Types.action,
    user: Types.text,
  },
  call: async ({ message, args: { action, user } }) => {
    if (!message.guild) return

    if (!user && action !== "list")
      return message.channel.send(
        "Vous devez entrer un num d'utilisateur Twitter."
      )

    switch (action) {
      case "add":
        Globals.db.push(message.guild.id, user, "authorizedTwitterUsers")
        message.channel.send(
          `**${user}** a bien été ajouté à la liste d'utilisateurs dont les tweet sont autorisés.`
        )
        break

      case "remove":
        Globals.db.remove(message.guild.id, user, "authorizedTwitterUsers")
        message.channel.send(
          `**${user}** a bien été retiré de la liste d'utilisateurs dont les tweet sont autorisés.`
        )
        break

      case "list":
        const embed = new Discord.MessageEmbed()
          .setTitle("Liste des utilisateurs dont les tweet sont autorisés.")
          .setDescription(
            Globals.db
              .get(message.guild.id, "authorizedTwitterUsers")
              .join(", ")
              .trim() || "Aucun."
          )
        message.channel.send(embed)
        break

      default:
        message.channel.send(
          "Vous devez préciser une action entre add, remove et list."
        )
    }
  },
}

module.exports = tweetUsers
