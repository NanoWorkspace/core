import dotenv from "dotenv"
import Globals from "./app/Globals"
import Command from "./app/Command"
import Event from "./app/Event"
import Embed from "./app/Embed"
import Paginator from "./app/Paginator"
import Logger from "./app/Logger"
import Utils from "./app/Utils"

dotenv.config({ path: Utils.Path.root(".env") })

Globals.client
  .login(process.env.TOKEN || Globals.bot.token)
  .then((token: string) => {
    Globals.bot.token = token
  })
  .catch(console.error)

module.exports = {
  Globals,
  Command,
  Event,
  Embed,
  Paginator,
  Logger,
}
