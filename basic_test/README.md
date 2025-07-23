# Introduction to Jest Testing

## Index
- [What is Jest?](#what-is-jest)
- [Writing a Basic Test](#writing-a-basic-test)
  - [The Code to Test](#the-code-to-test)
  - [The Test File](#the-test-file)
  - [Running Tests](#running-tests)
- [Common Matchers](#common-matchers)
  - [Exact Equality](#exact-equality)
  - [Object Equality](#object-equality)
  - [Truthiness](#truthiness)
  - [Numbers](#numbers)
  - [Strings](#strings)
  - [Arrays](#arrays)
  - [Exceptions](#exceptions)

## What is Jest?

Jest is a popular JavaScript testing framework developed by Facebook. It is known for its simplicity and works out of the box for most JavaScript projects. Jest is often used with React, but it can be used to test any JavaScript application (Node.js, Angular, Vue.js, etc.).

## Writing a Basic Test

Let's look at a simple example of testing a `sum` function.

### The Code to Test

Here is a simple function in `sum.js` that we want to test. It adds two numbers.

```javascript
// sum.js
function sum(a, b) {
    return a + b;
}

module.exports = sum;
```

### The Test File

Jest tests are typically placed in files with a `.test.js` or `.spec.js` suffix. To test our `sum.js` file, we create `sum.test.js`.

```javascript
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
```

Let's break down the test file:
1.  `require('./sum')`: We import the function we want to test from `sum.js` using `require`.
2.  `test()`: This is a Jest function that runs a test. It takes two arguments:
    - A string that describes what the test is checking. Here it's `'adds 1 + 2 to equal 3'`.
    - A function that contains the actual test logic.
3.  `expect()`: This function is used to create an "assertion". You wrap the code you want to test in `expect()`.
4.  `.toBe(3)`: This is the "matcher". Matchers are used to check if a value meets certain conditions. `toBe` checks for exact equality. So, `expect(sum(1, 2)).toBe(3)` asserts that the result of `sum(1, 2)` is exactly `3`.

### Running Tests

To run the tests, you would typically use a command like `npm test` or `jest` in your terminal, provided you have Jest set up in your `package.json`.

## Common Matchers

Jest has a rich set of "matchers" to help you test different things. Here are some of the most common ones.

### Exact Equality

`toBe`: Use this to compare primitive values (like numbers, strings, booleans) or to check that two objects are the same instance.
```javascript
expect(sum(1, 2)).toBe(3);
```

### Object Equality

`toEqual`: Use this to recursively check every field of an object or array.
```javascript
const data = {one: 1};
data['two'] = 2;
expect(data).toEqual({one: 1, two: 2});
```

### Truthiness

- `toBeNull`: checks if a value is `null`.
- `toBeUndefined`: checks if a value is `undefined`.
- `toBeDefined`: opposite of `toBeUndefined`.
- `toBeTruthy`: checks if a value is what JavaScript considers "truthy" (e.g., not `false`, `0`, `''`, `null`, `undefined`, `NaN`).
- `toBeFalsy`: checks if a value is what JavaScript considers "falsy".

### Numbers

- `toBeGreaterThan(number)`
- `toBeGreaterThanOrEqual(number)`
- `toBeLessThan(number)`
- `toBeLessThanOrEqual(number)`
- `toBeCloseTo(number)`: for floating point numbers.

### Strings

`toMatch(/regex/)`: checks if a string matches a regular expression.

### Arrays

`toContain(item)`: checks if an array contains a specific item.

### Exceptions

`toThrow()`: checks if a function throws an error when it's called.
