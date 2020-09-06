export const wait = (time: number) => new Promise((r) => setTimeout(r, time))

export interface NanoTime {
  wait: (time: number) => Promise<unknown>
}

const Time: NanoTime = {
  wait,
}

export default Time
module.exports = Time
