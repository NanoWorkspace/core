import Command from "../app/Command"
import { Text } from "../utils/argTypes"
import * as text from "../utils/text"

const evalCommand: Command = {
  regex: /eval|js/i,
  description: "Exécute un bout de code en back-end.",
  users: ["352176756922253321"],
  args: { code: Text },
  call: async ({ message, args: { code } }) => {
    const { guild, channel, client } = message

    try {
      let result = await eval(`async () => {${code}}`)()

      if (result !== undefined) {
        await channel.send(text.code(String(result)))
      } else {
        await channel.send("Le code a bien été exécuté.")
      }
    } catch (error) {
      await channel.send(text.code(error.message))
    }
  },
}

module.exports = evalCommand
