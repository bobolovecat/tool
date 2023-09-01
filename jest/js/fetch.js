function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('bilibili'), 10)
    })
}

module.exports = fetchData;