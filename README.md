# `@builtwithjavascript/countdown`

An accurate and easy-to-use TypeScript package for managing countdown timers and displaying current time. This package provides a flexible `Countdown` class and utility functions to format the remaining time until a future date, as well as the current time.

[![npm version](https://badge.fury.io/js/@builtwithjavascript%2Fcountdown.svg)](https://badge.fury.io/js/@builtwithjavascript%2Fcountdown)

## Install
`npm i @builtwithjavascript/countdown`

## How to use
```typescript
import { 
  Countdown, 
  formatTimeRemaining, 
  formatCurrentTime,
  type TCountdownCallback,
} from '@builtwithjavascript/countdown'

// 1. Define your callback function that will receive the updated time
const countdownCallback: TCountdownCallback = (results) => {
  // In a real web browser environment, you would update a DOM element here.
  // For this example, we'll just log to the console.
  // We use the provided formatTimeRemaining, formatCurrentTime helper function to
  // format the results in a friendly format:
  const fornattedRemainingTime = formatTimeRemaining(results.timeRemaining)
  const furmattedCurrentTime = formatCurrentTime(results.currentTime)
  console.log(`   ${furmattedCurrentTime} (Current)`)
  console.log(`${fornattedRemainingTime} (Remaining)`)

  if (results.timeRemaining.isFinished) {
    console.log(`Countdown finished!`)
  }
}

// 2. Create an instance of the Countdown
const countdown = new Countdown(countdownCallback)

// 3. Define your future date
let targetDate = new Date('2025-11-25T19:45:00') // Example: Nov 25, 2025, 07:45 PM

// 4. Start the countdown
countdown.start(targetDate)

// 5. optional: if needed, later can be stopped:
// countdown.stop()

// 6. optional: if needed, stop and restart with a new targetDate
// countdown.stop()
// targetDate = new Date('2026-07-23T08:15:00')
// countdown.start(targetDate)
```

## Project Structure and Code Description

The package is structured to provide clear separation of concerns, making it easy to understand, use, and extend.

```
├── src/
│  ├── countdown/
│  │  ├── types.ts
│  │  ├── countdown.ts
│  │  ├── formatters.ts
│  │  └── index.ts
│  └── index.ts
└── README.md
```


* **`src/countdown/types.ts`**: This file defines all the TypeScript types used throughout the package.
    * `TCurrentTime`: Represents a standard time structure with `year`, `month`, `day`, `hours`, `minutes`, and `seconds`.
    * `TTimeRemaining`: Represent the reamining time structure with `day`, `hours`, `minutes`, `seconds`, `totalMilliseconds` and `isFinished`, specifically for the countdown's remaining time.
    * `TRemainingTimeResult`: The primary return type for the countdown callback, containing both `timeRemaining` and `currentTime` objects.
    * `TCountdownCallback`: Defines the signature for the callback function that consumers will provide to receive countdown updates.

* **`src/countdown/countdown.ts`**: This is the core logic file containing the `Countdown` class.
    * **`Countdown` class**:
        * `constructor(callback: TCountdownCallback)`: Initializes the countdown with a user-defined callback function.
        * `private calculateRemainingTime(futureDate: Date, now: Date): TRemainingTimeResult`: A private helper method that calculates the difference between `futureDate` and `now`, returning a structured `TRemainingTimeResult` object. It uses `Math.ceil` for seconds to ensure the countdown hits zero precisely.
        * `public start(futureDate: Date): void`: Initiates the countdown. It uses `window.setTimeout` for precise, second-aligned updates, calculating the delay until the start of the next second to avoid drift. The provided callback is invoked repeatedly with the latest time data.
        * `public stop(): void`: Stops the currently running countdown by clearing the `setTimeout` interval.

* **`src/countdown/formatters.ts`**: This file contains utility functions for formatting the time objects into human-readable strings.
    * `formatTimeRemaining(time: TTimeRemaining): string`: Takes a `TTimeRemaining` object and formats it into a `DD:HH:MM:SS` string. It handles carry-overs for seconds, minutes, and hours to ensure correct display.
    * `formatCurrentTime(time: TCurrentTime): string`: Takes a `TCurrentTime` object and formats it into an `yyyy-mm-dd hh:mm:ss` string, suitable for displaying the current time.

* **`src/countdown/index.ts`**: This file serves as the main entry point for the `countdown` module, re-exporting all necessary types, classes, and functions from `types.ts`, `countdown.ts`, and `formatters.ts`.

* **`src/index.ts`**: The top-level entry point for the entire `@builtwithjavascript/countdown` package, simply re-exporting everything from `src/countdown/index.ts`.
