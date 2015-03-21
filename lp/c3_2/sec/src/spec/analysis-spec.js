require('es6-shim');
var Analysis = require("../js/analysis");

describe("Analysis", function () {

    describe("stats", function () {

        it("should correctly calculate singles", function () {
          var stats = Analysis.calculateStats("test");
          expect(stats.singles.find(function(_){ return _.name == 't';}).val).toBe(2);
          expect(stats.singles.find(function(_){ return _.name == 'e';}).val).toBe(1);
          expect(stats.singles.find(function(_){ return _.name == 's';}).val).toBe(1);          
        });
    });
});
