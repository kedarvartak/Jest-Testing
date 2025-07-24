const { createUser } = require('./user-generator');

test('createUser returns a user object', () => {
    const user = createUser('Alice', 30, 'New York');

    // This will create a snapshot file the first time.
    // On subsequent runs, it will compare the new object to the snapshot.
    // This test will fail on the second run because createdAt and id will be different.
    expect(user).toMatchSnapshot();
});

test('createUser returns a consistent user object structure', () => {
    const user = createUser('Bob', 25, 'London');

    // Here's how we fix the problem of dynamic data.
    // We can tell Jest to expect a specific type for certain properties.
    expect(user).toMatchSnapshot({
        createdAt: expect.any(Date),
        id: expect.any(Number),
    });
}); 