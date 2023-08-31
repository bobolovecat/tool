const Counter = require('./Counter.js')

let counter = null

beforeEach(() => {
    counter = new Counter(1)
})

test('加方法', () => {
    counter.add(1)
    expect(counter.number).toBe(2)
});

test('减方法', () => {
    counter.minus(1)
    expect(counter.number).toBe(0)
});

test('乘方法', () => {
    counter.multiply(2)
    expect(counter.number).toBe(2)
});

test('除方法', () => {
    counter.divide(2)
    expect(counter.number).toBe(.5)
});