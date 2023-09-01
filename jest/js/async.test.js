const fetchData = require('./fetch.js')

test('then方式', () => {
    return fetchData().then(data => {
        expect(data).toBe('bilibili')
    })
})

test('async方式', async () => {
    const data = await fetchData();
    expect(data).toBe('bilibili');
});

test('doAsync calls both callbacks', () => {
    // expect.assertions(2);
    return Promise.resolve(123).then(data => {
        expect(data).toBe(123);
        return; 
        // 例如手抖写了return
        // 因为某些原因下面的代码没有执行
        throw new Error('报错了');
    }).catch(err => {
        expect(err).toBe('报错了');
    });
});



