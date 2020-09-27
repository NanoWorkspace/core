export const wait = (time: number) => new Promise((r) => setTimeout(r, time))

export interface NanoTime {
  wait: typeof wait
}

const Time: NanoTime = {
  wait,
}

export default Time
module.exports = Time
