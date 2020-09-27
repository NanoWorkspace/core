import Discord from "discord.js"

export type ArgumentTypeResolvable<Params> =
  | ArgumentTypeOptions<Params>
  | ArgumentType<Params>

export interface ArgumentEvent {
  message: Discord.Message
  args: { [name: string]: any }
  errors: { [name: string]: Error }
  rest: string
}

export interface ArgumentEventInput extends ArgumentEvent {
  match: string
}

export type ArgumentTypeOptions<Params> =
  | {
      id: string
      name: string | ((argType: ArgumentType<Params>) => string)
      hasParams: false
      prepends?: ArgumentType<any>[]
      resolver: (event: ArgumentEventInput) => ArgumentEvent
    }
  | {
      id: string
      name: string | ((argType: ArgumentType<Params>) => string)
      hasParams: true
      prepends?: ArgumentType<any>[]
      resolver: (event: ArgumentEventInput, params: Params) => ArgumentEvent
    }

export default class ArgumentType<Params = null> {
  static argumentTypes: Discord.Collection<
    string,
    ArgumentType<any>
  > = new Discord.Collection()

  public params?: Params

  constructor(public options: ArgumentTypeOptions<Params>) {
    ArgumentType.argumentTypes.set(options.id, this)
  }

  get id() {
    return this.options.id
  }

  get name(): string {
    return typeof this.options.name === "string"
      ? this.options.name
      : this.options.name(this)
  }

  get resolver() {
    return this.options.resolver
  }

  bind(params: Params): this {
    this.params = params

    return this
  }

  resolve(event: ArgumentEventInput): ArgumentEvent {
    if (this.options.hasParams) {
      if (this.params === undefined) {
        throw new Error(
          `you must bind parameters when you use this ArgumentType resolver.`
        )
      }
      return this.resolver(event, this.params)
    }
    // @ts-ignore
    return this.resolver(event)
  }
}
