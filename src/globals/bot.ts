import Discord from "discord.js"
import Logger from "../app/Logger"
import { EmbedTemplates } from "../app/Embed"
import Path from "../utils/Path"
import Lang from "../utils/Lang"

Logger.load("file", __filename)

export interface NanoConfig {
  prefix: string
  token?: string
  debug?: boolean
  locale?: keyof typeof Lang.localeNames
  clientOptions?: Discord.ClientOptions
  embedTemplates?: EmbedTemplates
}

export interface Bot extends Partial<Discord.ClientApplication>, NanoConfig {
  team?: Discord.Team
  owners: Discord.Collection<Discord.Snowflake, Discord.User>
}

const bot: Bot = require(Path.root("..", "nano.config.json"))

bot.owners = new Discord.Collection()
bot.locale = bot.locale ?? "en"

if (!Lang.localeNames.hasOwnProperty(bot.locale)) {
  throw new Error(`The specified locale "${bot.locale}" is incorrect`)
}

export default bot
module.exports = bot
