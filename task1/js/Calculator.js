function Calc() {
    var a = 0;
    var b = 0;
    var result = 0;


Calc.prototype.setA = function(a) {
    this.a = a;
}

Calc.prototype.setB = function(b) {
    this.b = b;
<<<<<<< HEAD
}


Calc.prototype.multiple = function() {
    return this.result = this.a * this.b;
}

=======
}


Calc.prototype.multiple = function() {
    return this.result = this.a * this.b;
}

>>>>>>> d3f1dde6e03b0367eb0f0907fe11ed964fd7dc7e
Calc.prototype.divide = function() {
    return this.result = this.a / this.b;
}

Calc.prototype.min = function() {
    return this.result = this.a - this.b;
}

Calc.prototype.sum = function() {
    return this.result = this.a + this.b;
}

Calc.prototype.show = function() {
    console.log(this.result);
 }
}

var res = new Calc();
res.setA(8);
res.setB(5);
res.min();
res.show();
<<<<<<< HEAD

=======
>>>>>>> d3f1dde6e03b0367eb0f0907fe11ed964fd7dc7e
