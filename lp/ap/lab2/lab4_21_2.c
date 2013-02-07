#include <stdio.h>
#include <math.h>

#define PI 3.14159265

int factorial(int n){
  if (n <= 1)
    return 1;
  else    
    return n * factorial(n - 1);
}

double sin2(double x){    
    return 0.5 * (1 - cos(2 * x));
}

double teilor_item(int k, double x){
    // double u = (pow(2, (2 * k) - 1) * pow(x, 2 * k));
    // double f = factorial(2 * k);
    // printf("%i; %g; %g\n", k, u, f);
    return pow(-1, k + 1) * ((pow(2, (2 * k) - 1) * pow(x, 2 * k)) /  factorial(2 * k) );
} 

double teilor(double x){
    const double E = 0.00001;
    int i = 0;
    double result = 0;    
    double ti;

    if (x > 1){
        printf("Cannot process %g, should be less or equal to 1.0\n", x);
        return 0.0;
    }

    do{
        i++;
        ti = teilor_item(i, x);
        result += ti;
        printf(">> i: %i; res: %g; ti: %g;\n", i, result, ti);
    } while(fabs(ti) > E);

    return result;
}

void test(double x){
    printf("x = %g\n", x);
    printf("sin2 x = %f\n", sin2(x));
    printf("teilor x = %f\n", teilor(x));
}

int main(void){    
    // TODO Why we cannot process x < 1.0?
    test(0.9);
}