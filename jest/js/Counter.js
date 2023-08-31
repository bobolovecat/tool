class Counter {
    constructor(number) {
        this.number = number;
    }
    add(num) {
        this.number = this.number + num;
        return this.number
    }
    minus(num) {
        this.number = this.number - num;
        return this.number;
    }
    multiply(num) {
        this.number = this.number * num;
        return this.number
    }
    divide(num) {
        this.number = this.number / num;
        return this.number
    }
}

module.exports = Counter