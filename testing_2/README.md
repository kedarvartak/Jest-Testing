# Advanced Jest Testing: Async & Hooks

This guide covers more advanced Jest topics, including testing asynchronous code and using setup/teardown hooks.

## Testing Asynchronous Code

In JavaScript, asynchronous code is common. Jest provides several ways to handle tests for async operations.

### The Code to Test

Here is a function in `fetch-data.js` that returns a promise.

```javascript
// fetch-data.js
function fetchData(shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject('error');
            } else {
                resolve('peanut butter');
            }
        }, 1000);
    });
}

module.exports = fetchData;
```

### 1. Using Promises

If your async function returns a promise, you can return that promise from your test. Jest will wait for the promise to resolve. If it rejects, the test will fail.

```javascript
// fetch-data.test.js
test('the data is peanut butter', () => {
    return fetchData().then(data => {
        expect(data).toBe('peanut butter');
    });
});
```

When testing for promise rejections, make sure to add `expect.assertions(1)`. This verifies that a certain number of assertions are called. It's a safeguard to ensure that your `.catch` block was actually executed.

```javascript
test('the fetch fails with an error', () => {
    expect.assertions(1);
    return fetchData(true).catch(e => expect(e).toMatch('error'));
});
```

### 2. Using `async/await`

Alternatively, you can use `async` and `await` in your tests. This often makes the syntax cleaner.

```javascript
test('the data is peanut butter with async/await', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
});
```

To test for failures, you can use a `try...catch` block with `async/await`. Again, `expect.assertions` is important here.

```javascript
test('the fetch fails with an error with async/await', async () => {
    expect.assertions(1);
    try {
        await fetchData(true);
    } catch (e) {
        expect(e).toMatch('error');
    }
});
```

You can also use the `.resolves` and `.rejects` matchers for a more concise syntax.

```javascript
test('the data is peanut butter with .resolves', () => {
    return expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error with .rejects', () => {
    return expect(fetchData(true)).rejects.toMatch('error');
});
```

## Setup and Teardown

Often, you need to perform some setup before tests run and some cleanup afterward. Jest provides helper functions for this.

- `beforeEach(fn)` / `afterEach(fn)`: Run a function before or after each test in a file.
- `beforeAll(fn)` / `afterAll(fn)`: Run a function once before or after all tests in a file.

### Example Usage

Let's say you need to initialize a database connection before tests and close it after.

```javascript
let db;

beforeAll(() => {
    // Initialize DB connection
    db = new Database();
    db.connect();
});

beforeEach(() => {
    // Clear data before each test
    db.clear();
});

test('user is added to database', () => {
    db.addUser({ name: 'John' });
    expect(db.getUsers()).toContainEqual({ name: 'John' });
});

test('another user is added', () => {
    db.addUser({ name: 'Jane' });
    expect(db.getUsers()).toContainEqual({ name: 'Jane' });
});

afterAll(() => {
    // Close the connection
    db.disconnect();
});
```

### Scoping

You can group tests with `describe` blocks. Setup and teardown functions inside a `describe` block apply only to the tests within that block.

```javascript
describe('when user is logged in', () => {
    beforeEach(() => {
        // Log the user in
    });

    test('they can access their profile', () => {
        // ...
    });
});
``` 