const fetchData = require('./fetch-data');

// testing Promises
test('the data is peanut butter', () => {
    return fetchData().then(data => {
        expect(data).toBe('peanut butter');
    });
});

test('the fetch fails with an error', () => {
    expect.assertions(1);
    return fetchData(true).catch(e => expect(e).toMatch('error'));
});

// async/await
test('the data is peanut butter with async/await', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
});

test('the fetch fails with an error with async/await', async () => {
    expect.assertions(1);
    try {
        await fetchData(true);
    } catch (e) {
        expect(e).toMatch('error');
    }
}); 