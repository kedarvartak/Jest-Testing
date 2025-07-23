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