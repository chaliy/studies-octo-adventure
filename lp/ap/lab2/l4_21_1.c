#include <stdio.h>
#include <math.h>
#include <assert.h>
#include <float.h>

// _finite is MS extension, C99 defines isinf
#define isinf !_finite

double f(double x){
    // x should not be -1 (devide to zere)
    // in this case f will return inf number
    // tabulte function handles this :)
    return pow(2.0, (1 - x) / (1 + x));
}

void tabulate(double xs, double xe, double xd, double (*f)(double)){
    double x;
    double y;    
    assert(xs < xe);
    assert(xd != 0.0);

    x = xs;
    while(x <= xe){
        y = (*f)(x);
        if (isinf(y)){
            printf("%lf; N/A\n", x);
        } else {
            printf("%lf; %lf\n", x, y);
        }
        x += xd;
    }
    
}

int main(void){
    tabulate(-1.1, 1.0, 0.05, f);
}