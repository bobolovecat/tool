const { sum, sumForArray } = require('./sum.js')

describe('两数相加', () => {
    test('正数相加', () => {
        expect(sum(1, 2)).toBe(3)
    })

    test('负数相加', () => {
        expect(sum(1, 2)).toBe(3)
    })

    test('两个浮点数字相加', () => {
        // expect(sum(.1, .2)).toBe(.3);    
        expect(sum(.1, .2)).toBeCloseTo(0.3)       
    })
})

test('数组相加', () => {
    expect(sumForArray([1, 2])).toBe(3)
})

// test('正数相加不为零', () => {
//     for (let a = 1; a < 10; a++) {
//         for (let b = 1; b < 10; b++) {
//             expect(sum(a, b)).not.toBe(0)
//         }
//     }
// })