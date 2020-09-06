import Discord from "discord.js"
import bot, { Bot } from "../globals/bot"
import client from "../globals/client"
import db, { Database } from "../globals/db"
import Logger from "./Logger"

Logger.load("file", __filename)

/** Your own global object (you can put your own database inside!) */
export const custom: any = {}

export interface NanoGlobals {
  custom: any
  bot: Bot
  db: Database
  client: Discord.Client
}

const Globals: NanoGlobals = {
  custom,
  bot,
  db,
  client,
}

export default Globals
module.exports = Globals
