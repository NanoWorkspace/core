import { CommandArgument, resolveCommand } from "../app/Command"

export const Command: CommandArgument = (content) => {
  const { command, rest } = resolveCommand(content)
  return { arg: command, rest }
}

export const Text: CommandArgument = (content) => {
  return { arg: content.trim(), rest: "" }
}

export const Word: CommandArgument = (content) => {
  const regex = /^\w+/
  const match = regex.exec(content)
  if (match) {
    const [, word] = match
    return { arg: word, rest: content.replace(regex, "").trim() }
  }
  return { arg: "" }
}
