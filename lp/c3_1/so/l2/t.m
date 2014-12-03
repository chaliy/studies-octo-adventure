0;

function [y] = f(x)  
  y = 8*(x(1)^2) + 4*x(1)*x(2) + 5*(x(2)^2);
end

df = [16, 4, 0;
      4, 10, 0];

% plot_mesh(@f)

koshi([10; 10], @f, df)
