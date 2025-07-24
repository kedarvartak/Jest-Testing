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

### `toBe`: For Exact Equality (and Primitives)

The `toBe` matcher is used for strict equality, checking if two values are the exact same. It uses `Object.is` for comparison, which is similar to the `===` operator.

This is best for primitive types like `string`, `number`, or `boolean`.

```javascript
test('demonstrating toBe with primitives', () => {
    expect(1 + 1).toBe(2);
    expect('hello').toBe('hello');
    expect(true).toBe(true);
});
```

When you use `toBe` with objects, it checks for *referential identity*. This means it checks if two variables point to the *exact same object in memory*, not just if they have the same properties.

```javascript
test('demonstrating toBe with objects', () => {
    const user1 = { name: 'John' };
    const user2 = { name: 'John' };
    const user3 = user1;

    // This will FAIL because user1 and user2 are different objects in memory.
    // expect(user1).toBe(user2);

    // This will PASS because user1 and user3 point to the same object.
    expect(user1).toBe(user3);
});
```

### `toEqual`: For Deep Object & Array Equality

The `toEqual` matcher is used to compare the *values* of two objects or arrays. It recursively checks every field to ensure they are equivalent. This is often called "deep equality".

Use `toEqual` whenever you want to check that two objects or arrays have the same content, regardless of whether they are the same instance.

```javascript
test('demonstrating toEqual with objects and arrays', () => {
    const user1 = { name: 'John', address: { city: 'New York' } };
    const user2 = { name: 'John', address: { city: 'New York' } };
    
    // This will PASS because they have the same content.
    expect(user1).toEqual(user2);

    const list1 = [1, 2, { a: 3 }];
    const list2 = [1, 2, { a: 3 }];

    // This will PASS as well.
    expect(list1).toEqual(list2);
});
```

### `toBe` vs. `toEqual`: Key Differences and When to Use Which

| Matcher   | Compares With | Use Case                                               | Example                                     |
| --------- | ------------- | ------------------------------------------------------ | ------------------------------------------- |
| `toBe`      | `Object.is` (`===`) | Primitives (`number`, `string`, `boolean`) or referential identity. | `expect(2).toBe(2);`                        |
| `toEqual`   | Deep Equality | Objects and arrays, comparing property values.       | `expect({a: 1}).toEqual({a: 1});` |

**Can they be exchanged?**
- For primitive values, `toBe` and `toEqual` often behave identically. So, `expect(5).toBe(5)` and `expect(5).toEqual(5)` both pass. However, it's conventional to use `toBe` for primitives to make the intention clear (checking for a simple, direct value).
- For objects and arrays, **they cannot be used interchangeably**. You almost always want `toEqual` to check if two objects have the same data. Use `toBe` only in the rare case where you need to ensure two variables are referencing the exact same object instance.

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
