import Discord from "discord.js"
import Enmap from "enmap"
import Command from "../app/Command"
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
  commands.set(
    commandName,
    require(join(__dirname, "..", "commands", fileName))
  )
  ;(commands.get(commandName) as Command).name = commandName
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
