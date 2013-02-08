#include <stdio.h>
#include <math.h>

#define PI 3.14159265

double factorial(double n){
  if (n <= 1)
    return 1;
  else    
    return n * factorial(n - 1);
}

double sin2(double x){    
    return 0.5 * (1 - cos(2 * x));
}

double taylor_item(int k, double x){
    double u = (pow(2.0, (2 * k) - 1) * pow(x, 2 * k));
    double f = factorial(2 * k);
    double s = pow(-1.0, k + 1) * u /  f;
    //printf("%i; %g; %g; %g\n", k, u, f, s);
    return s;
} 

double taylor(double x){
    const double E = 0.00001;
    int i = 0;
    double result = 0;    
    double ti;

    do{
        i++;
        ti = taylor_item(i, x);
        result += ti;
        printf(">> i: %i; res: %f; ti: %f;\n", i, result, ti);
    } while(fabs(ti) > E);

    return result;
}

void test(double x){
    printf("x = %g\n", x);
    printf("sin2 x = %f\n", sin2(x));
    printf("taylor x = %f\n", taylor(x));
}

int main(void){
    test(4.0);
}