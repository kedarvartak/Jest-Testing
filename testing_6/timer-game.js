function timerGame(callback) {
    console.log('Ready....go!');
    setTimeout(() => {
        console.log("Time's up -> stop!");
        callback && callback();
    }, 1000); // 1 second delay
}

module.exports = { timerGame }; 