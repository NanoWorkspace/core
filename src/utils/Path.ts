import path from "path"

export function root(...pathSegments: string[]): string {
  const rootPath = require.main
    ? path.dirname(require.main.filename)
    : process.cwd()
  return pathSegments.length > 0
    ? path.resolve(rootPath, ...pathSegments)
    : rootPath
}

export interface NanoPath {
  root: typeof root
}

const Path: NanoPath = {
  root,
}

export default Path
