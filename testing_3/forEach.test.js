const forEach = require('./forEach');

const mockCallback = jest.fn(x => 42 + x);

test('forEach mock function', () => {
    forEach([0, 1], mockCallback);

    // The mock function is called twice
    expect(mockCallback.mock.calls).toHaveLength(2);

    // The first argument of the first call is 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // The first argument of the second call is 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    // The return value of the first call is 42
    expect(mockCallback.mock.results[0].value).toBe(42);
});