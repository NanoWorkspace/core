import Discord from "discord.js"
import Command from "../app/Command"
import Types from "../app/ArgumentTypes"
import Globals from "../app/Globals"

const prefix: Command = {
  regex: /pr[eé]fix/i,
  description: "Change le prefix de Nano pour ce serveur",
  channelType: "guild",
  admin: true,
  channels: ["717070722945646663"],
  args: { newPrefix: Types.text },
  call: ({ message, args: { newPrefix } }) => {
    Globals.db.set("prefix", newPrefix, `guilds.${message.guild?.id}`)
    const embed = new Discord.MessageEmbed()
      .setTitle(`Le prefix de Nano sur ce serveur a bien été modifié.`)
      .setDescription(`Nouveau prefix: \`${newPrefix}\``)
    message.channel.send(embed).catch(console.error)
  },
}

module.exports = prefix
