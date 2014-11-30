function [x] = newtone(x0, f, df)
  eps = 0.001;

  a = 0.0;
  r = f(x0);
  k = 0;
  x = x0;

  while r > eps

    a = fminsearch(@(a) f(x - a * (df * [x;1])), a);

    x = x - a * (df * [x;1]);

    r=f(x);
    k=k+1;
  end


  printf('Rezultat: %f\n', r);
  printf('Kilkist iteracij: %d\n', k);

end
