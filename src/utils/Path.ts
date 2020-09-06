import path from "path"

export function root(_path?: string): string {
  const rootPath = require.main
    ? path.dirname(require.main.filename)
    : process.cwd()
  return _path ? path.resolve(rootPath, _path) : rootPath
}

export interface NanoPath {
  root: (_path?: string) => string
}

const Path: NanoPath = {
  root,
}

export default Path
