test('真值判断', () => {
    const str = 'Bilibili'
    var n = null

    // 通过：n 为 null
    expect(n).toBeNull()

    // 是否为空字符串
    expect(str).toBeTruthy()

    // 失败 - null 不为 true
    // expect(n).toBeTruthy()

    // 通过 - null 为 false
    expect(n).toBeFalsy()
})