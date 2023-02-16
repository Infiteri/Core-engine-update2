export class Debug {
  static CLog(message) {
    console.log(message)
  }

  static CFatal(message) {
    throw new Error(message)
  }

  static CError(message) {
    console.error(message)
  }

  static CWarn(message) {
    console.warn(message)
  }
}
