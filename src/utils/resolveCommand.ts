import { Collection } from "discord.js"
import Command from "../app/Command"
import { commands } from "./globals"

export default (resolvable: string) =>
  commands.find(
    (c) =>
      !!(
        resolvable.startsWith(c.name) ||
        c.aliases?.some((alias) => {
          if (typeof alias === "string") return resolvable.startsWith(alias)
          return alias.test(resolvable)
        })
      )
  )
