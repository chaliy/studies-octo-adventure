require('es6-shim');
var VigenereModel = require('../../js/models/vigenere-model');

describe('VigenereModel', function () {

  describe('decode text with formula', function () {

    it('should correctly decode', function () {
      var resutl = VigenereModel.decodeText('TIG QVKCL DRPYN GQX KWMQU OWGR UJE MCZZ FOH.', 'ABC', true, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      expect(resutl).toBe('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.');
    });
  });
});
