function [x] = koshi(x0, f, df)
  %   x0: initial point
  %   f: objective function
  %   df: matrix with second deriviation coefficients
  %     df = [16, 4, 0;
  %           4, 10, 0];
  eps = 0.001;

  a = 0.0;
  r = f(x0);
  k = 0;
  x = x0;

  fm = @(a, x) x - a * (df * [x;1]);

  while r > eps

    % Mimimaze current alpha
    a = fminsearch(@(a) f(fm(a, x)), a);

    % Do next gradient move
    x = fm(a, x);

    r=f(x);
    k=k+1;
  end


  printf('Result: %f\n', r);
  printf('Num of iterations: %d\n', k);

end
