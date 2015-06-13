var math = require('mathjs');

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

/**
* Конвертація RGB в YIQ
* Приклад:
*   rgbToYiq([255, 12, 48])
**/
var rgbToYiq = function(rgb){

  var rgb1 = math.multiply(rgb, 1/255);

  var coef = [[0.299, 0.587, 0.114],
        [0.596, -0.274, -0.322],
        [0.211, -0.522, 0.311]];

  return math.multiply(coef, rgb1);
};

module.exports.hexToRgb = hexToRgb;
module.exports.rgbToYiq = rgbToYiq;
