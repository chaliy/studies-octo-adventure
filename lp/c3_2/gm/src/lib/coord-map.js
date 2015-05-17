/* jshint esnext: true */
var CoordSys = function(){

  return {
    getWidth: function(){
      return Math.abs(this.right - this.left);
    },
    getHeight: function(){
      return Math.abs(this.top - this.bottom);
    }
  };
};

var Point = function(x, y){
  return {
    move: function(dx, dy){
      return new Point(this.x + dx, this.y + dy);
    },
    x: x,
    y: y
  };
};

var worldToScreen = function(x, y, world, screen){

  // http://web.cse.ohio-state.edu/~parent/classes/581/Lectures/4.2DviewingHandout.pdf

  var worldWidth = world.getWidth();
  var worldHeight = world.getHeight();

  var screenWidth = screen.getWidth();
  var screenHeight = screen.getHeight();

  return new Point(
    (x * (screenWidth)/(worldWidth)  - world.left *  (screenWidth)/(worldWidth) + screen.left),
    (y * (screenHeight)/(worldHeight) - world.bottom * (screenHeight)/(worldHeight)  + screen.bottom) - screenHeight
  );
};

module.exports.worldToScreen = worldToScreen;
module.exports.Point = Point;
module.exports.CoordSys = CoordSys;
