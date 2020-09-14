import ArgumentTypes from "../utils/ArgumentTypes"
import File from "../utils/File"
import Message from "../utils/Message"
import Path from "../utils/Path"
import Text from "../utils/Text"
import Time from "../utils/Time"

interface NanoUtils {
  ArgumentTypes: typeof ArgumentTypes
  File: typeof File
  Message: typeof Message
  Path: typeof Path
  Text: typeof Text
  Time: typeof Time
}

const Utils: NanoUtils = {
  ArgumentTypes,
  File,
  Message,
  Path,
  Text,
  Time,
}

export default Utils
