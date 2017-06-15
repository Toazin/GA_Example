var Gene = require('./Gene.js');

var Population = function(goal, size) {
    this.members = [];
    this.goal = goal;
    this.generationNumber = 0;
    while (size--) {
        var gene = new Gene();
        gene.random(this.goal.length);
        this.members.push(gene);
    }

    this.display = function () {
        console.log("");
        console.log("Generation: ", this.generationNumber);
        for (var i = 0; i < this.members.length; i++) {
            console.log("\t " + this.members[i].code + " (" + this.members[i].cost + ")");
        }
    }

    this.sort = function() {
        this.members.sort(function(a, b) {
            return a.cost - b.cost;
        });
    }

    this.generation = function() {
        for (var i = 0; i < this.members.length; i++) {
            this.members[i].calcCost(this.goal);

        }

        this.sort();
        this.display();
        var children = this.members[0].mate(this.members[1]);
        this.members.splice(this.members.length - 2, 2, children[0], children[1]);

        for (var i = 0; i < this.members.length; i++) {
            this.members[i].mutate(0.5);
            this.members[i].calcCost(this.goal);
            if (this.members[i].code == this.goal) {
                this.sort();
                this.display();
                return true;
            }
        }
        this.generationNumber++;
        var scope = this;
        setTimeout(function() {
            scope.generation();
        }, 20);
    };
};

module.exports = Population;
