function gold_max(a, b, f)

  epc=0.0001;
  ax=a;
  bx=b;

  k=(sqrt(5)-1)/2;
  x1=ax+(1-k)*(bx-ax);
  x2=ax+k*(bx-ax);

  n=0; % iterations
  while n<100

    d=abs(x1-x2);
    printf('D: %f; a: %f; b: %f\n', d, ax, bx);

    if d<epc
      break
    end

    n=n+1;

    if f(x1)<f(x2)
        ax=x1;
        x1=x2;
        x2=ax+k*(bx-ax);
    else
        bx=x2;
        x2=x1;
        x1=ax+(1-k)*(bx-ax);
    end
  end
  xs=(x1+x2)/2;
  fs=f(xs);
  printf('x: %f\n', xs);
  printf('f(xs): %f\n', fs);
  printf('n: %d\n', n);

  % Plot
  xx = linspace(a,b,20);
  plot (xx, f(xx), 'r');
end
