import Discord from "discord.js"
import Command from "../app/Command"

export const commands: Discord.Collection<
  string,
  Command
> = new Discord.Collection()
