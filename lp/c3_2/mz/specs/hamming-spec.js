/* jshint esnext:true */
var hamming = require("../lib/hamming");

describe("Hamming", function () {

  describe("isParityBit", function () {

    it("should correctly flag parity bit", function () {

      var parityBits = [1, 2, 4, 8];
      for(var pb of parityBits){
        expect(hamming.isParityBit(pb)).toBe(true, `bit #${pb}`);
      }

      var nonParityBits = [3, 5, 7, 9, 99];
      for(var nb of nonParityBits){
        expect(hamming.isParityBit(nb)).toBe(false, `bit #${nb}`);
      }

    });

  });

  describe("encode", function () {

    it("should correctly encode from http://users.cs.fiu.edu/~downeyt/cop3402/hamming.html", function () {

      var input = [1,0,0,1,1,0,1,0];

      var result = hamming.encode(input);

      expect(result).toEqual([0,1,1,1,0,0,1,0,1,0,1,0]);

    });

  });

  describe("decode", function () {

    it("should correctly decode encoded", function () {


      var input = [1,0,0,1,1,0,1,0];
      var encoded = hamming.encode(input);
      var result = hamming.decode(encoded).result;

      expect(result).toEqual(input);

    });

    it("should correctly decode with error", function () {

      var result = hamming.decode([0,1,1,1,0,0,1,0,1,1,1,0]);

      expect(result.errorParities).toEqual([2,4]);

    });

  });
});
