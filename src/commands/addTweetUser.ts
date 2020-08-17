import Command from "../app/Command"
import { MessageEmbed } from "discord.js"
import { db } from "../utils/globals"

const addTweetUser: Command = {
  name: "addTweetUser",
  aliases: ["atu"],
  channels: ["717070722945646663"],
  description:
    "Ajoute un utilisateur twitter a la liste d'utilisateurs autorisés.",
  channelType: "guild",
  arguments: {
    user: (content) => {
      const user = content.split(/\s+/)[1]
      return user && user.length > 0 ? user : false
    },
  },
  call: ({ message, arguments: args }) => {
    const { user } = args

    const embed = new MessageEmbed()

    if (!user) {
      embed.setTitle("Commande inexistante.")
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
