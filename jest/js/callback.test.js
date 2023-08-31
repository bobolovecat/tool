function fetchData(callback) {
    setTimeout(() => {
        callback && callback('bilibili')
    }, 1000)
}

// test('回调', () => {
//     function callback(data) {
//         expect(data).toBe('🧋')
//     }

//     fetchData(callback)
// });

test('done参数', done => {
    function callback(data) {
        expect(data).toBe('🧋')
        done()
    }

    fetchData(callback);
})
