const { fetchUser } = require('./user-service');
const userApi = require('./user-api');

// Tell Jest to mock the entire user-api module
jest.mock('./user-api');

test('fetchUser transforms the user name to uppercase', async () => {
    // Define the mock implementation for userApi.fetch
    const mockUser = { id: 1, name: 'jane doe' };
    userApi.fetch.mockResolvedValue(mockUser);

    // Call the function we're testing
    const user = await fetchUser(1);

    // Assert that our function behaved correctly
    expect(user.name).toBe('JANE DOE');

    // We can also assert that the mock was called
    expect(userApi.fetch).toHaveBeenCalledWith(1);
    expect(userApi.fetch).toHaveBeenCalledTimes(1);
});

test('fetchUser handles errors', async () => {
    // Mock a failure
    const errorMessage = 'Network error';
    userApi.fetch.mockRejectedValue(errorMessage);

    await expect(fetchUser(1)).rejects.toBe(errorMessage);
}); 