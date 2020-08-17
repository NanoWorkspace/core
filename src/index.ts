import Discord from "discord.js"
import { promises as fs } from "fs"
import { join } from "path"
import Command, { CommandEvent } from "./app/Command"
import resolveCommand from "./utils/resolveCommand"
import { commands, db } from "./utils/globals"

const TOKEN: string = require("../TOKEN.json")

const wait = (time: number) => new Promise((r) => setTimeout(r, time))

const client = new Discord.Client({
  disableMentions: "everyone",
})

;(async () => {
  const commandNames = await fs.readdir(join(__dirname, "commands"))

  commandNames.forEach((commandName) =>
    commands.set(
      commandName.slice(0, commandName.lastIndexOf(".")),
      require(join(__dirname, "commands", commandName))
    )
  )

  await client.login(TOKEN)

  client.once("ready", () => {
    console.table(db.get("authorizedTwitterUsers"))
    console.table(commands)
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
      // waiting embed loading
      await wait(5000)

      // twitter
      if (message.content.startsWith("http://twitter.com")) {
        const embed = message.embeds[0]

        if (!embed || /^@\S+/.test(embed.description || "")) {
          await message.delete()
        } else if (embed.author) {
          const tweetUserMatch = /\(@(.+)\)/.exec(String(embed.author.name))
          const tweetUser = tweetUserMatch ? tweetUserMatch[1] : "none"
          if (
            !db
              .get("authorizedTwitterUsers")
              .some((user: string) => user === tweetUser)
          ) {
            await message.delete()
          }
        } else {
          await message.delete()
        }
      }
      return
    }

    // command handler test
    const command = resolveCommand(message.content)
    if (!command) return

    // prepare command event
    const commandEvent: CommandEvent = {
      message,
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
      if (command.channelType === "dm")
        return message.channel.send("❌ Utilisable seulement dans un serveur")
      if (command.owner) {
        if (message.member !== message.guild.owner)
          return message.channel.send("❌ Utilisable seulement par un owner")
      }
      if (command.admin) {
        if (!message.member?.hasPermission("ADMINISTRATOR"))
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
    await command.call(commandEvent)
  })
})().catch((error) => {
  throw error
})
