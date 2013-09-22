system "l1_21.exe > l1_21_o.dat"

set yrange [-10:10]
plot 'l1_21_o.dat' with lines

set terminal png
set output "l1_21_o.png"
replot