var Chromosome = function(code) {
    code ? this.code = code : this.code = '';
    this.cost = 9999;

    this.random = function (length) {
        while (length--) {
            this.code += String.fromCharCode(Math.floor(Math.random() * 255));
        }
    }

    this.mutate = function (chance) {
        //Mutacion poco tiron, Solo cambiamos UN Gen del chromosoma.
        if (Math.random() > chance) return;

        var index = Math.floor(Math.random() * this.code.length);
        var upOrDown = Math.random() <= 0.5 ? -1 : 1;
        var newChar = String.fromCharCode(this.code.charCodeAt(index) + upOrDown);
        var newString = '';
        for (i = 0; i < this.code.length; i++) {
            if (i == index) newString += newChar;
            else newString += this.code[i];
        }

        this.code = newString;
    }

    this.mate = function (chromosome) {
        //Punto de cruce
        var pivot = Math.round(this.code.length / 2) - 1;

        var child1 = this.code.substr(0, pivot) + chromosome.code.substr(pivot);
        var child2 = chromosome.code.substr(0, pivot) + this.code.substr(pivot);

        return [new Chromosome(child1), new Chromosome(child2)];
    }

    this.calcCost = function (compareTo) {
        var total = 0;
        for (i = 0; i < this.code.length; i++) {
            total += (this.code.charCodeAt(i) - compareTo.charCodeAt(i)) * (this.code.charCodeAt(i) - compareTo.charCodeAt(i));
        }
        this.cost = total;
    }

};

module.exports = Chromosome;
