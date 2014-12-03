10;

function [y] = f(x)
  y = 4*x(1)^2 - x(1)*x(2) + 3*x(2)^2 + x(1);
end

df = [8, -1, 1;
      -1, 6, 0];

plot_mesh(@f);

koshi([0; 0], @f, df)
