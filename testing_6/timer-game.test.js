const { timerGame } = require('./timer-game');

// Tell Jest to use fake timers
jest.useFakeTimers();

describe('timerGame', () => {
    test('calls the callback after 1 second', () => {
        const callback = jest.fn();

        timerGame(callback);

        // At this point, the callback should not have been called yet
        expect(callback).not.toHaveBeenCalled();

        // Fast-forward time by 1000 ms (1 second)
        jest.advanceTimersByTime(1000);

        // Now, the callback should have been called
        expect(callback).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('calls the callback with runAllTimers', () => {
        const callback = jest.fn();

        timerGame(callback);

        // At this point, the callback should not have been called yet
        expect(callback).not.toHaveBeenCalled();

        // Run all pending timers
        jest.runAllTimers();

        // Now, the callback should have been called
        expect(callback).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledTimes(1);
    });
}); 