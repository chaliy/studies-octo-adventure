n = 14;

A = 3/n;

# Hack to ensure we have k-1 and k+1 values
ks = [1:102];
xs = A * sin((2 * pi * n * (ks-1)) / 100);

k = ks(2:end-1);
x = xs(2:end-1);

xt = xs(1+2:end);
xl = xs(1:end-2);

dx = (xt - xl) / 2;
d2x = xt - x * 2 + xl;


y = (x .* dx) ./ sqrt(0.148 * (abs(dx) .^ 2) - 0.148 .* d2x);

z = 1.3 * A * sin((4 * pi * n * (k-1)) / 100);

plot(k, x, '-b', k, y, '-r', k, z, '-g')
ylabel('K')
legend('X', 'Y', 'Z')

err = y-z;
ma_err = mean(abs(err))
rms_err = sqrt(mean(err .^ 2))
