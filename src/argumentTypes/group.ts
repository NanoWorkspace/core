import ArgumentType, { ArgumentTypeResolvable } from "../app/ArgumentType"

const oneFrom = new ArgumentType<ArgumentTypeResolvable<any>[]>({
  id: "oneFrom",
  hasParams: true,
  name: (argType) => {
    return `One type from: ${argType.params
      ?.map((param) => param.name)
      .join(", ")}`
  },
  resolver: (event, types) => {
    return event
  },
})

export default { oneFrom }
