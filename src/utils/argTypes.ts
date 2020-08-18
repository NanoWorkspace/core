import { CommandArgument, resolveCommand } from "../app/Command"

export const Command: CommandArgument = (content) => {
  const { command, rest } = resolveCommand(content)
  return { arg: command, rest }
}

export const Rest: CommandArgument = (content) => {
  return { arg: content.trim(), rest: "" }
}
