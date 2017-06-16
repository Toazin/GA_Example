var Chromosome = require('./Chromosome.js');

var Population = function(goal, size) {
    this.members = [];
    this.goal = goal;
    this.generationNumber = 0;

    this.initialize =function () {
        while (size--) {
            var chromosome = new Chromosome();
            chromosome.random(this.goal.length);
            this.members.push(chromosome);
        }
    }

    this.display = function () {
        console.log("");
        console.log("Generation: ", this.generationNumber);
        for (var i = 0; i < this.members.length; i++) {
            console.log("\t " + this.members[i].code + " - Cost: " + this.members[i].cost);
        }
    }

    this.sort = function() {
        this.members.sort(function(a, b) {
            return a.cost - b.cost;
        });
    }

    this.displayObjective = function () {
        console.log("--------------------------------------------");
        console.log("Objetivo encontrado: ", this.members[0].code);
        console.log("--------------------------------------------");
        return;
    }

    this.generation = function() {
        //Calculas Costo de tus cromosomas
        for (var i = 0; i < this.members.length; i++) {
            this.members[i].calcCost(this.goal);
        }

        //Ordenas por fuerza
        this.sort();
        //Imprime
        this.display();
        //Seleccion - Tomas el más cercano
        var children = this.members[0].mate(this.members[1]);
        //Replazamiento basada en Gym, los mas costos mueres.
        this.members.splice(this.members.length - 2, 2, children[0], children[1]);

        for (var i = 0; i < this.members.length; i++) {
            this.members[i].mutate(0.5);
            this.members[i].calcCost(this.goal);
            if (this.members[i].code == this.goal) { //Funcion objetivo
                this.sort();
                this.display();
                this.displayObjective();
                return this.members;
            }
        }
        this.generationNumber++;
        var scope = this;
        setTimeout(function() {
            scope.generation();
        }, 20);
    };

    this.initialize();
};

module.exports = Population;
