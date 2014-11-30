0;

function [y] = f(x)
  x1 = x(1);
  x2 = x(2);
  y = 8*(x1^2) + 4*x1*x2 + 5*(x2^2);
end

df = [16, 4, 0;
      4, 10, 0];

% plot_mesh(@f)

newton([10; 10], @f, df)
