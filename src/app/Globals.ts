import Discord from "discord.js"
import Enmap from "enmap"
import Command from "./Command"
import fs from "fs"
import { join } from "path"

export const db = new Enmap({ name: "db" })

db.ensure("authorizedTwitterUsers", [])

export const commands: Discord.Collection<
  string,
  Command
> = new Discord.Collection()

fs.readdirSync(join(__dirname, "..", "commands")).forEach((fileName) => {
  const commandName = fileName.slice(0, fileName.lastIndexOf("."))
  const command: Command = require(join(__dirname, "..", "commands", fileName))
  commands.set(commandName, command)
  command.name = commandName
  command.regex = new RegExp(
    `^(?:${command.regex.source})(?:\\s+|$)`,
    command.regex.flags
  )
})

export const client = new Discord.Client({
  disableMentions: "everyone",
})

export const events: string[][] = []

fs.readdirSync(join(__dirname, "..", "events")).forEach((fileName) => {
  const eventInfo = fileName.slice(0, fileName.lastIndexOf(".")).split("_")
  const [fn, eventName] = eventInfo
  client[fn as "on" | "once"](
    eventName,
    require(join(__dirname, "..", "events", fileName))
  )
  events.push(eventInfo)
})

/** Contains timestamps of last commands usage for each user */
export const cooldown: {
  [user: string]: { [commandName: string]: number }
} = {}

export default {
  db,
  commands,
  client,
  events,
  cooldown,
}
