import ArgumentType from "../app/ArgumentType"

const isolated = new ArgumentType<string[]>({
  name: (argType) => {
    return "Isolated text by: " + argType.params?.join(",")
  },
  hasParams: true,
  id: "isolated",
  resolver(event, params) {
    if (params.length === 0) throw new Error()
    return event
  },
})

export default { isolated }
