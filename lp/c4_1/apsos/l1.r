library(moments)

D = read.csv('data.csv')
cat('Table 0: Summary', '\n')
summary(D)

cat('Table 1: Outliers', '\n')
outliers <- function (d) {
  abs(d - mean(d)) / sd(d) > 2.086
}

for (v in names(D)) {
  cat(v, ':', which(outliers(D[,v])), '\n')
}

D = subset(D, !outliers(D$X1) & !outliers(D$X2) & !outliers(D$X3) & !outliers(D$X4))

cat('Table 2: Min, Max, Mean', '\n')
# summary(D)
cat('-', 'Min', 'Max', 'Mean', '\n')
for (v in names(D)) {
  cat(v, ':', min(D[,v]), max(D[,v]), mean(D[,v]), '\n')
}

cat('Table 3: Var, SD, Median, Mode', '\n')
mode <- function(x) {
  ux <- unique(x)
  ux[which.max(tabulate(match(x, ux)))]
}

cat('-', 'Var', 'SD', 'Median', 'Mode', '\n')
for (v in names(D)) {
  cat(v, ':', var(D[,v]), sd(D[,v]), median(D[,v]), mode(D[,v]), '\n')
}

cat('Table 4: Normal distribution', '\n')
cat('Y p-value:', shapiro.test(D$Y)$p.value, '\n')

hist(D$Y)

cat('Table 5: skewness and kurtosis', '\n')
skewness(D$Y)
kurtosis(D$Y)
