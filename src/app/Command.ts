import Discord from "discord.js"

export default interface Command {
  name: string
  alias?: (string | RegExp)[]
  owner?: boolean
  admin?: boolean
  permissions?: Discord.PermissionResolvable[]
  roles?: Discord.RoleResolvable[]
  users?: Discord.UserResolvable[]
  members?: Discord.GuildMemberResolvable[]
  channels?: Discord.ChannelResolvable[]
  channelType?: "dm" | "guild"
  cooldown?: number
  typing?: boolean
  description?: string
  examples?: string[]
  arguments?: { [name: string]: CommandArgument }
  call: (event: CommandEvent) => void
}

export interface CommandEvent {
  message: Discord.Message
  commands: Discord.Collection<string, Command>
  arguments: { [name: string]: any }
}

export type CommandArgument = (
  content: string
) => Promise<any | "none"> | "none" | any
