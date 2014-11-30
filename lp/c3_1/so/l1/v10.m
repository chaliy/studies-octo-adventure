10;

function [y]=f(x)
  y = 20*x - 5*(x.^2) + 8*(x.^(4/5));
return

gold_max(3, 3.5, @f)
