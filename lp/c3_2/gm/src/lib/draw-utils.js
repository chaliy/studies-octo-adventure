var fix = function(p){
  return {x: p.x - 0.5, y: p.y - 0.5 };
};

// TODO CanvasRenderingContext2D.prototype.drawLines = function(points) {
var drawLines = function(ctx, points){
  if (points.length > 1) {
    var start = fix(points[0]);
    ctx.moveTo(start.x, start.y);
    for(var i = 1; i < points.length; i++){
      var next = fix(points[i]);
      ctx.lineTo(next.x, next.y);
    }
  }
};


module.exports.drawLines = drawLines;
