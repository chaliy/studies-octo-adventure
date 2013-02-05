#include <stdio.h>
#include <math.h>

const double K = 1.601; 

double a(double x){
    //printf("asin %g acos %g \n", asin(1/x), acos(exp(x)));
    return asin(1/x) + exp(x);
}

double b(double x){
    //printf("log10 %g pow %g \n", log10(pow(K,sqrt(x))), exp(x));
    return log10(pow(K,sqrt(x))) * exp(x);
}

double y(double x){
    double pi = acos(-1.0);
    double ab = a(x) - b(x);
    double p2 = pi/2;

    if (ab > p2){
        return sin(x); 
    } else if (ab == p2){ // TODO: compare delta to epsilone
        return 1.0;
    } else {
        return cos(ab);
    }
}

void test(double x){    
    if (x == 0){
        printf("X could not be %g, because of 1/x\n", x);
        return;
    }
    if (1/x > 1 || 1/x < -1){
        printf("X couls not be %g, because 1/x should be -1...1\n", x);
        return;
    }
    if (exp(x) > 1 || exp(x) < -1){
        printf("X couls not be %g, because e^x should be -1...1\n", x);
        return;
    }
    if (x < 0){
        printf("X couls not be %g, because sqrt(x) should be >= 0\n", x);
        return;
    }
    printf("x: %g = %g;\n", x, y(x));
}

int main(void){    
    test(2.345);
    test(-4.914);
    test(0.219);
}