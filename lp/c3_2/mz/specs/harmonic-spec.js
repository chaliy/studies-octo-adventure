/* jshint esnext:true */
var hamming = require("../lib/harmonic");

describe("Harmonic", function () {

  describe("harmonic", function () {

    var values = [
      0.0,
      0.5,
      1.0,
      0.5
    ];

    it("should correctly calculate from spectr.doc", function () {

      expect(hamming.harmonic(values, 0).c).toBeCloseTo(0.5, 2);
      expect(hamming.harmonic(values, 0).phi).toBeCloseTo(0, 2);

      expect(hamming.harmonic(values, 1).c).toBeCloseTo(0.25, 2);
      expect(hamming.harmonic(values, 1).phi).toBeCloseTo(-Math.PI, 2);

      expect(hamming.harmonic(values, 2).c).toBeCloseTo(0, 2);
      expect(hamming.harmonic(values, 2).phi).toBeCloseTo(0, 2);

      expect(hamming.harmonic(values, 3).c).toBeCloseTo(0.25, 2);
      expect(hamming.harmonic(values, 3).phi).toBeCloseTo(-Math.PI, 2);

    });

  });


});
