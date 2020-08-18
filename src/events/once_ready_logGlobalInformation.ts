import Globals from "../app/Globals"

module.exports = () => {
  console.log("EVENTS")
  console.table(Globals.events)
  console.log("COMMANDS")
  console.table(Globals.commands.keyArray())
  console.log("GUILDS")
  console.table(
    Globals.client.guilds.cache.mapValues((guild) => {
      Globals.db.ensure("prefix", "nano ", `guilds.${guild.id}`)
      return guild.name
    })
  )
}
