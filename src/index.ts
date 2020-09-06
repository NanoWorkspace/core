import dotenv from "dotenv"
import Globals from "./app/Globals"
import Utils from "./app/Utils"
import Command from "./app/Command"
import Event from "./app/Event"
import Embed from "./app/Embed"
import Paginator from "./app/Paginator"
import Logger from "./app/Logger"

dotenv.config({ path: Utils.Path.root(".env") })

Globals.client
  .login(process.env.TOKEN || Globals.bot.token)
  .then((token: string) => {
    Globals.bot.token = token
  })
  .catch(console.error)

export interface NanoExports {
  Globals: typeof Globals
  Utils: typeof Utils
  Command: typeof Command
  Event: typeof Event
  Embed: typeof Embed
  Paginator: typeof Paginator
  Logger: typeof Logger
}

const Nano: NanoExports = {
  Globals,
  Utils,
  Command,
  Event,
  Embed,
  Paginator,
  Logger,
}

export default Nano
module.exports = Nano
