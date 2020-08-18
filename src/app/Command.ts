import Discord from "discord.js"
import { commands } from "../utils/globals"

export default interface Command {
  name?: string
  regex: RegExp
  owner?: boolean
  admin?: boolean
  permissions?: Discord.PermissionResolvable[]
  roles?: Discord.RoleResolvable[]
  users?: Discord.UserResolvable[]
  members?: Discord.GuildMemberResolvable[]
  channels?: Discord.GuildChannelResolvable[]
  channelType?: "dm" | "guild"
  cooldown?: number
  typing?: boolean
  description?: string
  examples?: string[]
  args?: { [name: string]: CommandArgument }
  call: (event: CommandEvent) => void
}

export interface CommandEvent {
  message: Discord.Message
  args: { [name: string]: any }
}

export type CommandArgument = (
  content: string
) => Promise<{ arg: any; rest: string }> | { arg: any; rest?: string }

export const resolveCommand = (resolvable: string) => {
  let command = commands.find((c) => c.regex.test(resolvable))
  if (command)
    return { command, rest: resolvable.replace(command.regex, "").trim() }
  return { command: null }
}
