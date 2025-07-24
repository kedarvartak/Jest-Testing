# Advanced Jest Testing: Timer Mocks

This guide explains how to test time-based logic, like `setTimeout` and `setInterval`, without making your tests slow.

## The Problem with Timers

Imagine you have a function that waits for one second before calling a callback.

`timer-game.js`:
```javascript
function timerGame(callback) {
    console.log('Ready....go!');
    setTimeout(() => {
        console.log("Time's up -- stop!");
        callback && callback();
    }, 1000); // 1 second delay
}
```

How do you test this? You could write a test that waits for over a second, but that would be very slow and could make your test suite fragile. A large test suite with many such tests would take minutes to run.

## The Solution: `jest.useFakeTimers()`

Jest can solve this problem by mocking timers. When you enable fake timers, you take control of `setTimeout`, `setInterval`, `clearTimeout`, and `clearInterval`.

### The Test File with Timer Mocks

By calling `jest.useFakeTimers()`, we can control the passage of time.

`timer-game.test.js`:
```javascript
const { timerGame } = require('./timer-game');

// Tell Jest to use fake timers for all tests in this file
jest.useFakeTimers();

describe('timerGame', () => {
    test('calls the callback after 1 second', () => {
        const callback = jest.fn();

        timerGame(callback);

        // At this point, the callback has not been called
        expect(callback).not.toHaveBeenCalled();

        // "Fast-forward" time by 1000 milliseconds
        jest.advanceTimersByTime(1000);

        // Now the callback should have been called!
        expect(callback).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
```

### Breakdown of the Timer Mocking Process

1.  **`jest.useFakeTimers();`**: This is the crucial line. It should be called at the top level of your test file. It swaps out the real timer functions with mock versions that are controllable by Jest.

2.  **`jest.advanceTimersByTime(1000);`**: This function advances the fake clock by the specified number of milliseconds. All `setTimeout` or `setInterval` calls that are scheduled to run within this timeframe will be executed instantly.

### Running All Timers at Once

If you have multiple timers and you want them all to complete, you can use `jest.runAllTimers()` instead of calculating the time.

```javascript
test('calls the callback with runAllTimers', () => {
    const callback = jest.fn();

    timerGame(callback);

    // It has not been called yet
    expect(callback).not.toHaveBeenCalled();

    // Run all pending timers immediately
    jest.runAllTimers();

    // Now it should have been called
    expect(callback).toHaveBeenCalled();
});
```

`jest.runAllTimers()` is useful when you don't care about the exact timing between multiple timers and just want to ensure all pending async timer operations are complete.

By using timer mocks, you can test complex time-dependent logic in milliseconds, making your tests both fast and reliable. 