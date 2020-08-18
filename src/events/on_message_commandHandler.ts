import Discord from "discord.js"
import Globals from "../app/Globals"
import { resolveCommand } from "../app/Command"

module.exports = async (message: Discord.Message) => {
  if (
    message.system ||
    !message.author ||
    message.author.bot ||
    message.webhookID
  )
    return

  // check prefix
  let prefix = "nano ",
    content
  if (message.guild) {
    prefix = Globals.db.get("prefix", `guilds.${message.guild.id}`)
  }
  if (message.content.startsWith(prefix)) {
    content = message.content.replace(prefix, "").trim()
  } else return

  // command handler test
  const { command, rest } = resolveCommand(content)
  if (!command) return

  content = rest as string

  // command arguments parsing
  const args: { [name: string]: any } = {}
  if (command.args) {
    let tempContent = content
    for (const name in command.args) {
      const { arg, rest } = await command.args[name](tempContent)
      args[name] = arg
      tempContent = rest || ""
    }
  }

  // check filters
  if (message.guild) {
    if (command.channelType === "dm")
      return message.channel.send("❌ Utilisable seulement en DM.")
    if (command.owner) {
      if (message.member !== message.guild.owner)
        return message.channel.send("❌ Utilisable seulement par un owner.")
    }
    if (command.admin) {
      if (!message.member?.hasPermission("ADMINISTRATOR", { checkOwner: true }))
        return message.channel.send("❌ Utilisable seulement par un admin.")
    }
    if (command.permissions) {
      if (
        command.permissions.some((permission) => {
          return message.member?.permissions.missing(permission)
        })
      )
        return message.channel.send(
          "❌ Utilisable seulement avec les permissions suivantes:\n" +
            command.permissions.join("\n")
        )
    }
  } else {
    if (
      command.channelType === "guild" ||
      command.permissions ||
      command.owner ||
      command.admin
    )
      return message.channel.send("❌ Utilisable seulement dans un serveur.")
  }
  if (command.users) {
    if (
      command.users.every((user) => {
        return Globals.client.users.resolve(user) !== message.author
      })
    )
      return message.channel.send(
        "❌ Utilisable seulement par les utilisateurs suivants:\n" +
          command.users
            .map((user) => {
              return Globals.client.users.resolve(user)?.username
            })
            .join("\n")
      )
  }

  // todo: manage command.cooldown and command.typing
  if (command.cooldown) {
    // just narrowing test for TypeScript
    if (!command.name) return

    const { cooldown } = Globals
    const now = Date.now()

    if (!cooldown.hasOwnProperty(message.author.id)) {
      cooldown[message.author.id] = {
        [command.name]: Date.now(),
      }
    } else {
      if (cooldown[message.author.id].hasOwnProperty(command.name)) {
        const lastUsage = cooldown[message.author.id][command.name]
        if (command.cooldown > now - lastUsage) {
          return message.channel.send(
            `❌ Utilisable dans seulement \`${
              command.cooldown - (now - lastUsage)
            }\` ms`
          )
        }
      } else {
        cooldown[message.author.id][command.name] = now
      }
    }
  }

  // launch command
  await command.call({
    message,
    args,
  })
}
