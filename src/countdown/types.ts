export type TFormattedTime = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// This type represents the structured time components for display
// It's used for both timeRemaining and currentTime in the return object.
export type TTimeRemaining = TFormattedTime & {
  totalMilliseconds: number // For timeRemaining, this is the diff. For currentTime, it's 0 or not relevant.
  isFinished: boolean // Only relevant for timeRemaining
}

// New return type for the calculateRemainingTime method
export type TRemainingTimeResult = {
  timeRemaining: TTimeRemaining
  currentTime: TFormattedTime // We don't need totalMilliseconds or isFinished for current time display
}

export type TCountdownCallback = (result: TRemainingTimeResult) => void
