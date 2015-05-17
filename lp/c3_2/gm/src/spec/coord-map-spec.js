require('es6-shim');
var assign = Object.assign || require('object-assign');
var cm = require('../js/coord-map');

describe('Coord map', function () {

  describe('World to Screen', function () {

    var world = assign(cm.CoordSys(), {
      top: 1,
      bottom: -1,
      left: -1,
      right: 1
    });

    var screen = assign(cm.CoordSys(), {
      top: 0,
      bottom: 400,
      left: 0,
      right: 600
    });

    it('should correctly map zero', function () {
      var c = cm.worldToScreen(0, 0, world, screen);

      expect(c.x).toBe(300);
      expect(c.y).toBe(200);
    });

    it('should correctly map world top-left', function () {
      var c = cm.worldToScreen(world.left, world.top, world, screen);

      expect(c.x).toBe(screen.left);
      expect(c.y).toBe(screen.bottom);
    });

  });

});
