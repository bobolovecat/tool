const subtract = require('./subtract.js')

test('正数相减', () => {
    expect(subtract(1, 2)).toBe(-1)
})

test('负数相减', () => {
    expect(subtract(-1, -2)).toBe(1)
})

