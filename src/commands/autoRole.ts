import Discord from "discord.js"
import Command from "../app/Command"
import Types from "../app/ArgumentTypes"
import Globals from "../app/Globals"

const autoRole: Command = {
  regex: /ar|autorole/i,
  description:
    "Gère l'ajout de rôles automatiques pour les bots et les utilisateurs.",
  channelType: "guild",
  admin: true,
  args: {
    isBot: Types.boolean,
    action: Types.action,
    role: Types.role,
  },
  call: async ({ message, args: { isBot, action, role } }) => {
    if (!message.guild) return

    if (!role && action !== "list")
      return message.channel.send("Vous devez cibler un rôle.")

    const type = isBot ? "bot" : "user"

    switch (action) {
      case "add":
        Globals.db.push(message.guild.id, role.id, "autoRoles." + type)
        message.channel.send(
          `Le rôle **${role.name}** a bien été ajouté à la liste des rôles automatiques pour les **${type}s**.`
        )
        break

      case "remove":
        Globals.db.remove(message.guild.id, role.id, "autoRoles." + type)
        message.channel.send(
          `Le rôle **${role.name}** a bien été retiré de la liste des rôles automatiques pour les **${type}s**.`
        )
        break

      case "list":
        const embed = new Discord.MessageEmbed()
          .setTitle(`Liste des rôles automatiques pour les ${type}s`)
          .setDescription(
            Globals.db
              .get(message.guild.id, "autoRoles." + type)
              .map((r: string) => {
                return message.guild?.roles.resolve(r)?.toString()
              })
              .join(" ")
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

module.exports = autoRole
