// file: src/countdown/formatters.ts
import { TTimeRemaining, TFormattedTime } from './types'

// Helper function to format the TimeRemaining object into a display string
// This now specifically formats the countdown part
export function formatTimeRemaining(time: TTimeRemaining): string {
  // Handle potential carry-over from seconds if it reaches 60 due to Math.ceil
  let displaySeconds = time.seconds
  let displayMinutes = time.minutes
  let displayHours = time.hours
  let displayDays = time.days

  if (displaySeconds === 60) {
    displaySeconds = 0
    displayMinutes++
    if (displayMinutes === 60) {
      displayMinutes = 0
      displayHours++
      if (displayHours === 24) {
        displayHours = 0
        displayDays++
      }
    }
  }

  if (time.isFinished) {
    return '00:00:00:00'
  }

  const formatUnit = (unit: number) => unit.toString().padStart(2, '0')
  return `${formatUnit(displayDays)}:${formatUnit(displayHours)}:${formatUnit(displayMinutes)}:${formatUnit(displaySeconds)}`
}

// New helper function to format the current time part
export function formatCurrentTime(time: TFormattedTime): string {
  const formatUnit = (unit: number) => unit.toString().padStart(2, '0')
  return `${formatUnit(time.hours)}:${formatUnit(time.minutes)}:${formatUnit(time.seconds)}`
}
