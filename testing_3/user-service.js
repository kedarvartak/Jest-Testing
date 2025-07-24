const userApi = require('./user-api');

function fetchUser(userID) {
    return userApi.fetch(userID).then(user => {
        user.name = user.name.toUpperCase();
        return user;
    });
}

module.exports = { fetchUser }; 