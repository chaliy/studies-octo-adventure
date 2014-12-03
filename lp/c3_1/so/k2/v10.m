10;

function [y] = f(x)
  y = 3*(x(1)^2) - 2*x(1)*x(2) + 5*(x(2)^2) + 3*(x(2));
end

function [y] = df(x)
  y = [6*x(1) - 2*x(2);
       10*x(2) + 2*x(1) + 3];
end

H =[6 -2;
    2 10];

% H0 = [0; 3];

plot_mesh(@f);

newton([2; 5], @f, @df, H)
