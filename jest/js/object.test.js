const cloneObject = require('./object')

test('拷贝对象', () => {
    const data = { one: 1 }
    const dataCloned = cloneObject(data)
    // expect(dataCloned).toBe(data)
    expect(dataCloned).toEqual(data)
    expect(dataCloned).not.toBe(data)
});