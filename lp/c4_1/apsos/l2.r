library(leaps)

D = read.csv('data.csv')

# Data cleanup
outliers <- (function (d) abs(d - mean(d)) / sd(d) > 2.086)

D = subset(D, !outliers(D$X1) & !outliers(D$X2) & !outliers(D$X3) & !outliers(D$X4))

summary(D)

cat('\n**** Linear *****\n\n')
model = lm(Y ~ X1+X2+X3+X4, data=D)

par(mfrow=c(2,3))
plot(Y ~ X2, data=D)
termplot(model)

summary(model)
coefficients(model)

# Feature selection
subests = regsubsets(Y ~ X1+X2+X3+X4,data=D)
summary(subests)

# Quadratic
cat('\n**** Quadratic *****\n\n')
model2 = lm(Y ~ poly(X1,2)+poly(X2,2)+poly(X3,2)+poly(X4,2), data=D)


par(mfrow=c(2,3))
plot(Y ~ X2, data=D)
termplot(model2)

summary(model2)
coefficients(model2)

# Feature selection
subests2 = regsubsets(Y ~ poly(X1,2)+poly(X2,2)+poly(X3,2)+poly(X4,2),data=D)
summary(subests2)