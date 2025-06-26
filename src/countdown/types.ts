// file: src/countdown/types.ts
export type TCurrentTime = {
  year: number
  month: number
  day: number
  hours: number
  minutes: number
  seconds: number
  weekDay: number
}

// This type represents the structured time components for display
// It's used for timeRemaining property in the return object.
export type TTimeRemaining = {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMilliseconds: number // this is the diff.
  isFinished: boolean
}

// New return type for the calculateRemainingTime method
export type TRemainingTimeResult = {
  timeRemaining: TTimeRemaining
  currentTime: TCurrentTime
}

export type TCountdownCallback = (result: TRemainingTimeResult) => void
