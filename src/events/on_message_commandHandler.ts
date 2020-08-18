import { Message } from "discord.js"
import { client, db } from "../utils/globals"
import { resolveCommand } from "../app/Command"

module.exports = async (message: Message) => {
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
    prefix = db.get("prefix", `guilds.${message.guild.id}`)
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
      return message.channel.send("❌ Utilisable seulement dans un serveur")
    if (command.owner) {
      if (message.member !== message.guild.owner)
        return message.channel.send("❌ Utilisable seulement par un owner")
    }
    if (command.admin) {
      if (!message.member?.hasPermission("ADMINISTRATOR", { checkOwner: true }))
        return message.channel.send("❌ Utilisable seulement par un admin")
    }
    if (command.channels) {
      if (
        command.channels.every((channel) => {
          return client.channels.resolve(channel) !== message.channel
        })
      )
        return message.channel.send(
          "❌ Utilisable seulement dans les salons suivants:\n" +
            command.channels
              .map((channel) => {
                return `<#${message.guild?.channels.resolveID(channel)}>`
              })
              .join("\n")
        )
    }
    if (command.members) {
      if (
        command.members.every((member) => {
          return message.guild?.members.resolve(member) !== message.member
        })
      )
        return message.channel.send(
          "❌ Utilisable seulement par les membres suivants:\n" +
            command.members
              .map((member) => {
                return message.guild?.members.resolve(member)?.displayName
              })
              .join("\n")
        )
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
    if (command.roles) {
      if (
        !command.roles.every((role) => {
          return message.member?.roles.resolve(role)
        })
      )
        return message.channel.send(
          "❌ Utilisable seulement avec les rôles suivants:\n" +
            command.roles
              .map((role) => {
                return message.guild?.roles.resolve(role)?.name
              })
              .join("\n")
        )
    }
  } else {
    if (command.channelType === "guild")
      return message.channel.send("❌ Utilisable seulement en DM")
  }
  if (command.users) {
    if (
      command.users.every((user) => {
        return client.users.resolve(user) !== message.author
      })
    )
      return
  }

  // todo: manage command.cooldown and command.typing

  // launch command
  await command.call({
    message,
    args,
  })
}
