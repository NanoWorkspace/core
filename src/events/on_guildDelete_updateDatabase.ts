import { Guild } from "discord.js"
import { db } from "../utils/globals"

module.exports = (guild: Guild) => {
  db.delete("prefix", `guilds.${guild.id}`)
}
