import fs from "fs"
import path from "path"

export interface ForEachFileOptions {
  ignore?: RegExp
  include?: RegExp
  recursive?: boolean
}

export async function forEachFile(
  dirPaths: string[],
  fn: (path: string) => any,
  options?: ForEachFileOptions
) {
  for (const dirPath of dirPaths) {
    if (!fs.existsSync(dirPath)) continue
    const dir = await fs.promises.readdir(dirPath)
    for (const filename of dir) {
      if (options?.ignore && options?.ignore.test(filename)) {
        continue
      }
      const filePath = path.join(dirPath, filename)
      const stat = await fs.promises.stat(filePath)
      if (stat.isDirectory()) {
        if (options?.recursive) {
          await forEachFile([filePath], fn)
        }
      } else {
        await fn(filePath)
      }
    }
  }
}

export interface NanoFile {
  forEachFile: typeof forEachFile
}

const File: NanoFile = {
  forEachFile,
}

export default File
