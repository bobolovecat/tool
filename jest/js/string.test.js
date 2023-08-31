test('邮箱', () => {
    expect('bilibili@qq.com').toMatch(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/)       
})