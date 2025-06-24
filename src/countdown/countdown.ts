import { TTimeRemaining, TRemainingTimeResult, TFormattedTime, TCountdownCallback } from './types'

export class Countdown {
  private intervalId: number | undefined
  private callback: TCountdownCallback
  private isRunning: boolean = false

  constructor(callback: TCountdownCallback) {
    this.callback = callback
  }

  // Modified to return the new object structure
  private calculateRemainingTime(futureDate: Date, now: Date): TRemainingTimeResult {
    const diff = futureDate.getTime() - now.getTime()

    let remaining: TTimeRemaining
    if (diff <= 0) {
      remaining = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 0,
        isFinished: true
      }
    } else {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.ceil((diff % (1000 * 60)) / 1000) // Use Math.ceil for seconds

      remaining = {
        days,
        hours,
        minutes,
        seconds,
        totalMilliseconds: diff,
        isFinished: false
      }
    }

    // Prepare the current time object
    const current: TFormattedTime = {
      days: 0, // Days are not typically relevant for current time display in HH:MM:SS
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    }

    return {
      timeRemaining: remaining,
      currentTime: current
    }
  }

  public start(futureDate: Date): void {
    if (this.isRunning) {
      return
    }

    this.isRunning = true

    const tick = () => {
      // Capture 'now' once at the very beginning of the tick
      const now = new Date()
      const result = this.calculateRemainingTime(futureDate, now) // Get the full result object
      this.callback(result) // Pass the full result object to the callback

      if (result.timeRemaining.isFinished) {
        // Check finished status from the returned object
        this.stop()
      }
      //else {
      const millisecondsIntoCurrentSecond = now.getMilliseconds()
      let nextDelay = 1000 - millisecondsIntoCurrentSecond

      if (nextDelay < 10) {
        nextDelay += 1000
      }

      this.intervalId = window.setTimeout(tick, Math.max(1, nextDelay))
      //}
    }

    tick() // Initial call
  }

  public stop(): void {
    if (this.intervalId) {
      clearTimeout(this.intervalId)
      this.intervalId = undefined
    }
    this.isRunning = false
  }
}
