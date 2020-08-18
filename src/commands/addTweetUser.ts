import Command from "../app/Command"
import Discord from "discord.js"
import Globals from "../app/Globals"
import Types from "../app/ArgumentTypes"

const addTweetUser: Command = {
  regex: /addtw(?:eet|itter)user|atu/i,
  description:
    "Ajoute un utilisateur twitter a la liste d'utilisateurs autorisés.",
  channelType: "guild",
  owner: true,
  args: { user: Types.text },
  call: ({ message, args: { user } }) => {
    const embed = new Discord.MessageEmbed()

    if (!user) {
      embed.setTitle("Argument manquant.")
    } else {
      Globals.db.push("authorizedTwitterUsers", user)
      embed
        .setTitle("Utilisateur ajouté.")
        .setDescription(`Utilisateur: \`${user}\``)
    }

    message.channel.send(embed)
  },
}

module.exports = addTweetUser
