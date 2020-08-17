import Discord from "discord.js"
import { promises as fs } from "fs"
import { join } from "path"
import Command, { CommandEvent } from "./app/Command"

const TOKEN: string = require("../TOKEN.json")

const client = new Discord.Client({
  disableMentions: "everyone",
})

;(async () => {
  const commandNames = await fs.readdir(join(__dirname, "commands"))

  const commands = new Discord.Collection<string, Command>(
    commandNames.map((commandName) => [
      commandName.slice(commandName.lastIndexOf(".")),
      require(join(__dirname, "commands", commandName)),
    ])
  )

  await client.login(TOKEN)

  client.once("ready", () => {
    console.table(
      client.guilds.cache.mapValues((guild) => {
        return guild.name
      })
    )
  })

  client.on("message", async (message) => {
    if (message.author === client.user) return

    // webhook filter
    if (message.webhookID) {
      // twitter
      if (message.content.startsWith("http://twitter.com")) {
        const embed = message.embeds[0]
        if (/^@\S+/.test(embed.description || "")) {
          message
            .delete()
            .catch(console.error)
            .then(() => {
              message.channel.send(
                "Actualité indésirable effacée. ```json\n" +
                  message.toJSON() +
                  "\n```"
              )
            })
        }
      }
      return
    }

    // command handler test
    const command = commands.find(
      (c) =>
        !!(
          message.content.startsWith(c.name) ||
          c.alias?.some((alias) => {
            if (typeof alias === "string") message.content.startsWith(alias)
            else alias.test(message.content)
          })
        )
    )
    if (!command) return

    // prepare command event
    const commandEvent: CommandEvent = {
      message,
      commands,
      arguments: {},
    }

    // command arguments parsing
    const args: { [name: string]: any } = {}
    if (command.arguments) {
      for (const name in command.arguments) {
        args[name] = await command.arguments[name](message.content)
      }
    }

    // check filters
    if (message.guild) {
      if (command.channelType === "dm") return
      if (command.owner) {
        if (message.member !== message.guild.owner) return
      }
      if (command.admin) {
        if (!message.member?.hasPermission("ADMINISTRATOR")) return
      }
      if (command.channels) {
        if (
          command.channels.every((channel) => {
            return client.channels.resolve(channel) !== message.channel
          })
        )
          return
      }
      if (command.members) {
        if (
          command.members.every((member) => {
            return message.guild?.members.resolve(member) !== message.member
          })
        )
          return
      }
      if (command.permissions) {
        if (
          command.permissions.some((permission) => {
            return message.member?.permissions.missing(permission)
          })
        )
          return
      }
      if (command.roles) {
        if (
          !command.roles.every((role) => {
            return message.member?.roles.resolve(role)
          })
        )
          return
      }
    } else {
      if (command.channelType === "guild") return
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
    command.call(commandEvent)
  })
})().catch((error) => {
  throw error
})
