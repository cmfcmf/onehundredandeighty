class CartesianProduct {
    constructor(arrayOfDimensions) {
        this.arrayOfDimensions = arrayOfDimensions;
        this.reset();
        if (this.arrayOfDimensions.length === 0) {
            this.done = true;
        }
    }
    totalAmount() {
        if (this.arrayOfDimensions.length === 0) {
            return 0;
        }
        return this.arrayOfDimensions.map((a) => a.length).reduce(((a, b) => a * b));
    }
    next() {
        if (this.done) return;
        const result = this.current();
        this.increaseCounter();
        return result;
    }
    reset() {
        this.currentPosition = new Array(this.dimensions());
        for (let d = 0; d < this.currentPosition.length; d++) {
            this.currentPosition[d] = 0;
        }
        this.done = false;
    }
    dimensions() {
        return this.arrayOfDimensions.length;
    }
    current() {
        let result = [];
        for (let d = 0; d < this.dimensions(); d++) {
            result.push(this.arrayOfDimensions[d][this.currentPosition[d]]);
        }
        return result;
    }
    increaseCounter() {
        const increaseAtDigit = (function(digit) {
            this.currentPosition[digit]++;
            if (this.currentPosition[digit] >= this.arrayOfDimensions[digit].length) {
                this.currentPosition[digit] = 0;
                if (digit > 0) {
                    increaseAtDigit(digit - 1);
                } else {
                    this.done = true;
                }
            }
        }).bind(this);
        increaseAtDigit(this.dimensions() - 1);
    }
}

module.exports = CartesianProduct;