import ArgumentType from "../app/ArgumentType"
import texts from "./texts"

const regex = new ArgumentType({
  id: "regex",
  name: "RegExp pattern",
  prepends: [texts.isolated.bind(['"', "'", "/"])],
  hasParams: false,
  resolver(event) {
    try {
      event.args[this.id] = new RegExp(event.match)
      return event
    } catch (error) {
      event.errors[this.id] = error
      return event
    }
  },
})

export default { regex }
