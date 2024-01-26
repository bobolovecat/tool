const fetchData = require('./fetch.js')

test('then方式', () => {
    return fetchData(true).then(data => {
        expect(data).toBe('bilibili')
    })
})

test('async方式', async () => {
    const data = await fetchData(true);
    expect(data).toBe('bilibili');
});

test('错误测试', async () => {
    await expect(fetchData(false)).rejects.toMatch('error');
});




