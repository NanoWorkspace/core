import { Message } from "discord.js"
import { db } from "../utils/globals"
import { wait } from "../utils/time"

module.exports = async (message: Message) => {
  // webhook filter
  if (message.webhookID) {
    // waiting embed loading
    await wait(5000)

    // twitter
    if (message.content.startsWith("http://twitter.com")) {
      const embed = message.embeds[0]

      if (!embed || /^@\S+/.test(embed.description || "")) {
        await message.delete()
      } else if (embed.author) {
        const tweetUserMatch = /\(@(.+)\)/.exec(String(embed.author.name))
        const tweetUser = tweetUserMatch ? tweetUserMatch[1] : null
        if (
          !tweetUser ||
          db
            .get("authorizedTwitterUsers")
            .every((user: string) => user !== tweetUser)
        ) {
          await message.delete()
        }
      } else {
        await message.delete()
      }
    }
  }
}
