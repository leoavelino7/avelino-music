enum TIMES {
  ONE_SECOND_IN_MILLISECOND = 1000
}

export const convertSecondsToMilliseconds = (time: number): number => time * TIMES.ONE_SECOND_IN_MILLISECOND
