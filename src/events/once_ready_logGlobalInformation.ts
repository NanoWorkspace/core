import { db, commands, client, events } from "../utils/globals"

module.exports = () => {
  console.log("EVENTS")
  console.table(events)
  console.log("COMMANDS")
  console.table(commands.keyArray())
  console.log("GUILDS")
  console.table(
    client.guilds.cache.mapValues((guild) => {
      db.ensure("prefix", "nano ", `guilds.${guild.id}`)
      return guild.name
    })
  )
}
