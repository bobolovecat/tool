function timer(callback) {
    setTimeout(() => {
        callback && callback('bilibili');
    }, 5000);
}

module.exports = timer;