export const code = (text: string, lang: string = "js") => {
  return "```" + lang + "\n" + text + "\n```"
}

export function improvePattern(pattern: RegExp): RegExp {
  return new RegExp(`^(?:${pattern.source})(?:\\s|$)`, pattern.flags)
}

export interface NanoText {
  improvePattern: (pattern: RegExp) => RegExp
  code: (text: string, lang?: string) => string
}

const Text: NanoText = {
  improvePattern,
  code,
}

export default Text
module.exports = Text
