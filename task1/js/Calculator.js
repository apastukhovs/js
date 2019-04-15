function Calc(a, b) {
    if (isNaN(a) || isNaN(b)) {
        return (console.log('ERROR!', a , 'or', b, 'is not a number'));
    }
    else {
        this.a = a;
        this.b = b;
    }
}

Calc.prototype.multiple = function(multiple) {
    return this.a * this.b;
}

Calc.prototype.divide = function(devide) {
    return this.a / this.b;
}

Calc.prototype.min = function(min) {
    return this.a - this.b;
}

Calc.prototype.sum = function(sum) {
    return this.a + this.b;
}

var result = new Calc(8,2);
console.log(result.multiple());
console.log(result.divide());
console.log(result.min());
console.log(result.sum());