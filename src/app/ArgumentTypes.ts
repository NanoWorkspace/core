import { CommandArgument, resolveCommand } from "./Command"

export const command: CommandArgument = (content) => {
  const { command, rest } = resolveCommand(content)
  return { arg: command, rest }
}

export const text: CommandArgument = (content) => {
  return { arg: content.trim(), rest: "" }
}

export const word: CommandArgument = (content) => {
  const regex = /^\w+/
  const match = regex.exec(content)
  if (match) {
    const [, word] = match
    return { arg: word, rest: content.replace(regex, "").trim() }
  }
  return { arg: "" }
}

export default {
  command,
  text,
  word,
}
