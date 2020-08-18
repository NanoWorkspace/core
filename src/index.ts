import { promises as fs } from "fs"
import { join } from "path"
import Command, { resolveCommand } from "./app/Command"
import { client } from "./utils/globals"

const TOKEN: string = require("../TOKEN.json")

fs.readdir(join(__dirname, "events")).then((fileNames) => {
  fileNames.forEach((fileName) => {
    const [fn, eventName] = fileName
      .slice(0, fileName.lastIndexOf("."))
      .split("_")
    client[fn as "on" | "once"](
      eventName,
      require(join(__dirname, "events", fileName))
    )
  })
})

client.login(TOKEN)
