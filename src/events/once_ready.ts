import { db, commands, client, events } from "../utils/globals"

module.exports = () => {
  console.table(db.get("authorizedTwitterUsers"))
  console.table(events)
  console.table(commands)
  console.table(
    client.guilds.cache.mapValues((guild) => {
      db.ensure("prefix", "nano ", `guilds.${guild.id}`)
      return guild.name
    })
  )
}
