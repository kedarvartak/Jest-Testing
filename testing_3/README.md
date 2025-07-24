# Advanced Jest Testing: Mocking

This guide explains how to use mocking in Jest to test parts of your application in isolation.

## What is Mocking?

Mocking is the practice of replacing a function, module, or object with a "mock" or "spy" during a test. This allows you to:
- **Isolate your code**: Test a piece of code without worrying about its dependencies (e.g., APIs, databases, other modules).
- **Control behavior**: Force a function to return a specific value, throw an error, or resolve a promise on demand.
- **Spy on calls**: Check if a function was called, how many times it was called, and what arguments were used.

This makes tests faster, more reliable, and more focused.

## Mocking a Module

Let's say we have a `user-service` that fetches a user and transforms their name to uppercase. It depends on a `user-api` module to get the data.

### The Code to Test

`user-service.js`:
```javascript
const userApi = require('./user-api');

function fetchUser(userID) {
    return userApi.fetch(userID).then(user => {
        user.name = user.name.toUpperCase();
        return user;
    });
}

module.exports = { fetchUser };
```

`user-api.js`:
```javascript
// In a real app, this would make a network request.
function fetch(userID) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userID, name: 'John Doe' });
        }, 500);
    });
}

module.exports = { fetch };
```

Our goal is to test `fetchUser` **without** making a real call to `user-api.fetch`.

### The Test File with Mocks

We can use `jest.mock()` to automatically replace the `user-api` module with a mock version.

`user-service.test.js`:
```javascript
const { fetchUser } = require('./user-service');
const userApi = require('./user-api');

// Tell Jest to mock the entire user-api module
// This line must be at the top level, before any imports/requires are used in tests.
jest.mock('./user-api');

test('fetchUser transforms the user name to uppercase', async () => {
    // 1. Define the mock implementation for userApi.fetch
    const mockUser = { id: 1, name: 'jane doe' };
    userApi.fetch.mockResolvedValue(mockUser); // Tell the mock to return a resolved promise

    // 2. Call the function we're testing
    const user = await fetchUser(1);

    // 3. Assert that our function behaved correctly
    expect(user.name).toBe('JANE DOE');

    // 4. We can also assert that the mock was called correctly
    expect(userApi.fetch).toHaveBeenCalledWith(1);
    expect(userApi.fetch).toHaveBeenCalledTimes(1);
});

test('fetchUser handles errors', async () => {
    // Mock a failure case
    const errorMessage = 'Network error';
    userApi.fetch.mockRejectedValue(errorMessage); // Tell the mock to return a rejected promise

    // Assert that our function correctly propagates the error
    await expect(fetchUser(1)).rejects.toBe(errorMessage);
});
```

### Breakdown of the Mocking Process

1.  **`jest.mock('./user-api');`**: This is the key. Jest replaces every function in the `user-api` module with a special "mock function". These mock functions don't do anything by default, but we can control their behavior in our tests.

2.  **`userApi.fetch.mockResolvedValue(mockUser);`**: Here, we are telling the mocked `userApi.fetch` function what to do when it's called. `mockResolvedValue` is a helper that makes the mock function return a promise that resolves with the `mockUser` object. Other useful helpers include:
    - `mockReturnValue(value)`: Make the mock function return a simple value.
    - `mockRejectedValue(error)`: Make it return a rejected promise.
    - `mockImplementation(() => { ... })`: Provide a custom implementation for the mock function.

3.  **`expect(userApi.fetch).toHaveBeenCalledWith(1);`**: Mock functions record how they are called. We can use special matchers like `toHaveBeenCalledWith` and `toHaveBeenCalledTimes` to assert that our code is interacting with its dependencies correctly.

By mocking `user-api`, we can test `user-service` in complete isolation, making our tests robust and easy to write. 