system "l4_21_1.exe > l4_21_1_o.dat"

set yrange [-0.1:100]
plot 'l4_21_1_o.dat' with lines

set terminal png
set output "l4_21_1_o.png"
replot