10;

function [y] = f(x)
  x1 = x(1);
  x2 = x(2);
  y = 4*x1^2 - x1*x2 + 3*x2^2 + x1;
end

df = [8, -1, 1;
      -1, 6, 0];

plot_mesh(@f)

koshi([0; 0], @f, df)
