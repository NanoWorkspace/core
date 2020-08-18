import Command from "../app/Command"
import Discord from "discord.js"
import Globals from "../app/Globals"
import Types from "../app/ArgumentTypes"

const addTweetUser: Command = {
  regex: /removetw(?:eet|itter)user|rtu/i,
  owner: true,
  description:
    "Retire un utilisateur twitter de la liste d'utilisateurs autorisés.",
  channelType: "guild",
  args: { user: Types.text },
  call: ({ message, args: { user } }) => {
    const embed = new Discord.MessageEmbed()

    if (!user) {
      embed.setTitle("Argument manquant.")
    } else {
      Globals.db.remove("authorizedTwitterUsers", user)
      embed
        .setTitle("Utilisateur retiré.")
        .setDescription(`Utilisateur: \`${user}\``)
    }

    message.channel.send(embed)
  },
}

module.exports = addTweetUser
