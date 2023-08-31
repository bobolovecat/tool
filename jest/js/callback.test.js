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
jest.spyOn(global, 'setTimeout');

test('计时器模拟', () => {
    function callback(data) {
        expect(data).toBe('🧋')
    }

    fetchData(callback);

    // 快进直到所有定时器都执行完毕
    jest.runAllTimers();
});