import { db, commands, client } from "../utils/globals"

module.exports = () => {
  console.table(db.get("authorizedTwitterUsers"))
  console.table(commands)
  console.table(
    client.guilds.cache.mapValues((guild) => {
      db.ensure("prefix", "nano ", `guilds.${guild.id}`)
      return guild.name
    })
  )
}
