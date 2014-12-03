function plot_mesh(f)

  a1=-2;
  a2=2;
  b1=-2;
  b2=2;
  N = 20;

  x1 = linspace(a1,a2,N);
  x2 = linspace(b1,b2,N);

  for i=1:N
    for j=1:N
      m(i,j)= f([x1(i); x2(j)]);
    end
  end

  [xu1,xu2]=meshgrid(x1,x2);
  figure(1);
  mesh(xu1,xu2,m);
  hold on;

end
