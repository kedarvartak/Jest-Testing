function createUser(name, age, location) {
    return {
        name,
        age,
        location,
        createdAt: new Date(), // This will be a problem!
        id: Math.floor(Math.random() * 1000), // This will also be a problem.
    };
}

module.exports = { createUser }; 