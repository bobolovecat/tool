const fetchData = require('./timer');

// test('回调', () => {
//     function callback(data) {
//         expect(data).toBe('🧋')
//     }

//     fetchData(callback)
// });

// test('done参数', done => {
//     function callback(data) {
//         expect(data).toBe('🧋')
//         done()
//     }

//     fetchData(callback);
// })

jest.useFakeTimers();

test('计时器模拟', () => {
    function callback(data) {
        expect(data).toBe('bilibili')
    }

    fetchData(callback);
    jest.runAllTimers();
});