// In a real app, this would make a network request.
function fetch(userID) {
    return new Promise((resolve) => {
        // Simulate a network delay
        setTimeout(() => {
            resolve({ id: userID, name: 'John Doe' });
        }, 500);
    });
}

module.exports = { fetch }; 