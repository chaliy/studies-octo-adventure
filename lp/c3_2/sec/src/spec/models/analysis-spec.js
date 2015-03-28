require('es6-shim');
var AnalysisModel = require("../../js/models/analysis-model");

describe("Analysis", function () {

  describe("stats", function () {

    function withName(n){
      return function(_){ return _.name == n;};
    }

    it("should correctly calculate 1gram", function () {
      var stats = AnalysisModel.calculateStats("test");
      expect(stats.onegram.length).toBe(3);
      expect(stats.onegram.find(withName('t')).val).toBe(2);
      expect(stats.onegram.find(withName('e')).val).toBe(1);
      expect(stats.onegram.find(withName('s')).val).toBe(1);
    });

    it("should correctly calculate bigrams", function () {
      var stats = AnalysisModel.calculateStats("teste");
      expect(stats.bigram.length).toBe(3);
      expect(stats.bigram.find(withName('te')).val).toBe(2);
      expect(stats.bigram.find(withName('es')).val).toBe(1);
      expect(stats.bigram.find(withName('st')).val).toBe(1);
    });

    it("should correctly calculate trigrams", function () {
      var stats = AnalysisModel.calculateStats("testes");
      expect(stats.trigram.length).toBe(3);
      expect(stats.trigram.find(withName('tes')).val).toBe(2);
      expect(stats.trigram.find(withName('est')).val).toBe(1);
      expect(stats.trigram.find(withName('ste')).val).toBe(1);
    });
  });
});
