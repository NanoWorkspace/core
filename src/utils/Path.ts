import path from "path"

export function root(_path?: string): string {
  const rootPath = require.main
    ? path.dirname(require.main.filename)
    : process.cwd()
  return _path ? path.resolve(rootPath, _path) : rootPath
}

const Path = {
  root,
}

export default Path
