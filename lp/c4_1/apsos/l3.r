library(leaps)

D = read.csv('data.csv')

# Data cleanup
outliers <- (function (d) abs(d - mean(d)) / sd(d) > 2.086)

D = subset(D, !outliers(D$X1) & !outliers(D$X2) & !outliers(D$X3) & !outliers(D$X4))

summary(D)

# Feature selection
subests = regsubsets(Y ~ X1+X2+X3+X4,data=D)
summary(subests)

# Plot correlation X2
plot(Y ~ X2, data=D)
abline(lm(Y ~ X2, data=D), col='red')

# Plot correlation for X3
plot(Y ~ X3, data=D)
abline(lm(Y ~ X3, data=D), col='red')
