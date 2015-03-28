require('es6-shim');
var CaesarModel = require('../../js/models/caesar-model');

describe('Caesar', function () {

  describe('decode text with dictionary', function () {

    var ABC =  ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var CODE = 'VZHLANQRCWDXFOUSPBTIELGM KY';

    it('should correctly decode', function () {
      var resutl = CaesarModel.decodeTextDictionary('MNVUNNAVOSTNVIUSMVQSTVHNEENTVIXWWUR', ABC, CODE);
      expect(resutl).toBe('WE NEED MORE SNOW FOR BETTER SKIING');
    });

  });

  describe('decode text with formula', function () {

    it('should correctly decode', function () {
      var resutl = CaesarModel.decodeText('YGBPGGFBOQTGBUPQYBHQTBDGVVGTBUMKKPI', true, CaesarModel.ABC);
      expect(resutl).toBe('WE NEED MORE SNOW FOR BETTER SKIING');
    });

    it('should correctly decode nayuki', function () {
      var resutl = CaesarModel.decodeText('VJG SWKEM DTQYP HQZ LWORGF QXGT VJG NCBA FQI.', true, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      expect(resutl).toBe('THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG.');
    });

  });
});
