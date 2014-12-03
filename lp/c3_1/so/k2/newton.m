function [x] = newton(x0, f, df, H)
  %   x0: initial point
  %   f: objective function
  %   df: Second deriviatives
  %   H: Guassian matrix
  %     H = [16, 4;
  %          4, 10];

  eps = 0.001;

  x = x0;
  r = f(x);
  k = 0;

  while r > eps

    grd = df(x);
    x = x - inv(H) * grd;

    r=f(x);
    k=k+1;
  end

  printf('Result: %f\n', r);
  printf('Num of iterations: %d\n', k);

end
