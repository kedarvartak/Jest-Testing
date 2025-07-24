# Advanced Jest Testing: Code Coverage

This guide explains what code coverage is, how to generate a coverage report with Jest, and how to interpret it.

## What is Code Coverage?

Code coverage is a metric that shows what percentage of your codebase is executed by your tests. It's a valuable tool for identifying untested code paths, but it's not a measure of test quality. High coverage doesn't mean your tests are good, but low coverage definitely means they are incomplete.

A coverage report will tell you:
- **Statement coverage**: What percentage of statements (lines of code) have been executed.
- **Branch coverage**: What percentage of conditional branches (e.g., `if`/`else` blocks) have been taken.
- **Function coverage**: What percentage of functions have been called.
- **Line coverage**: A line-by-line view of what was and wasn't tested.

## Generating a Coverage Report

Jest has built-in support for code coverage. To generate a report, run Jest with the `--coverage` flag:

```bash
npm test -- --coverage
```
*(Note: The first `--` is to pass flags to the npm script, the second is for Jest itself.)*

This command will run your tests and, upon completion, generate a `coverage` directory in your project root. Inside, you'll find an interactive HTML report in `coverage/lcov-report/index.html`.

### The Code We're Testing

Let's look at a function with several conditional branches.

`credit-score.js`:
```javascript
function getCreditScore(customer) {
    let score = 500;

    if (customer.income > 50000) {
        score += 100;
    }

    if (customer.hasGoodStanding) {
        score += 100;
    } else {
        score -= 200;
    }

    if (customer.age > 60) {
        score += 50;
    }

    return score;
}
```

### The Incomplete Tests

Our tests only check a few of the possible paths.

`credit-score.test.js`:
```javascript
describe('getCreditScore', () => {
    test('gives a base score for a standard customer', () => {
        const customer = { income: 40000, hasGoodStanding: true, age: 45 };
        expect(getCreditScore(customer)).toBe(600);
    });

    test('penalizes customers with bad standing', () => {
        const customer = { income: 40000, hasGoodStanding: false, age: 45 };
        expect(getCreditScore(customer)).toBe(300);
    });
});
```

## Reading the Coverage Report

When you open the HTML report, you will see a table summarizing coverage for each file. If you click on `credit-score.js`, you'll see the source code annotated.

- Lines highlighted in **green** were executed.
- Lines highlighted in **red** were **not** executed.
- A yellow box with an "I" indicates that an `if` branch was not taken.
- A yellow box with an "E" indicates that an `else` branch was not taken.

For our example, the report will show:
- The `if (customer.income > 50000)` block is **red** because we never tested a customer with a high income.
- The `if (customer.age > 60)` block is **red** because we never tested a senior customer.
- The `if/else` for `hasGoodStanding` will be **green**, but the branch coverage will be 100% because both the `if` and `else` paths were tested.

This immediately tells us where our tests are lacking. We need to add tests for high-income and senior customers to achieve better coverage and have more confidence in our code. 