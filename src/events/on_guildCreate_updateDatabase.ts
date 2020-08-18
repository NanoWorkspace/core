import { Guild } from "discord.js"
import { db } from "../utils/globals"

module.exports = (guild: Guild) => {
  db.ensure("prefix", "nano ", `guilds.${guild.id}`)
}
