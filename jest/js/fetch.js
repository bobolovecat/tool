function fetchData(bool) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { bool ? resolve('bilibili') : reject('error') }, 10)
    })
}

module.exports = fetchData;