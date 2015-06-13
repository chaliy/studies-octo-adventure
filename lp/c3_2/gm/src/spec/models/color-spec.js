require('es6-shim');
var assign = Object.assign || require('object-assign');
var color = require('../../lib/models/color');

var E = 0.001;

describe('Colors', function () {

  it('should correctly map drakorange', function () {
    var drakorange = '#ff8c00';
    var rgb = color.hexToRgb(drakorange);
        
    var yiq = color.rgbToYiq(rgb);

    expect(yiq[0]).toBeCloseTo(0.6, 1);
    expect(yiq[1]).toBeCloseTo(0.44, 1);
    expect(yiq[2]).toBeCloseTo(-0.07, 1);
  });


});
