0;

function [y] = f(x)
  y = 8*(x(1)^2) + 4*x(1)*x(2) + 5*(x(2)^2);
end

function [y] = df(x)
  y=[16*x(1) + 4*x(2);
     10*x(2) + 4*x(1)];
end

H =[16 4;
    4 10];

% m0=[-5 8]';

% plot_mesh(@f)

newton([10; 10], @f, @df, H)
