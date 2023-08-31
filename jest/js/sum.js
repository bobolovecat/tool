function sum(a, b) {
    return a + b
}

function sumForArray(nums) {
    return nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

module.exports = {
    sum,
    sumForArray
}










