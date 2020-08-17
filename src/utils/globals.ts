import Discord from "discord.js"
import Enmap from "enmap"
import Command from "../app/Command"

export const db = new Enmap({ name: "db" })

db.ensure("authorizedTwitterUsers", ["Wakanim", "ADNanime", "Crunchyroll_fr"])

export const commands: Discord.Collection<
  string,
  Command
> = new Discord.Collection()
