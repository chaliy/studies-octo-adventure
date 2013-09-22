#include <stdio.h>
#include <math.h>
#include <assert.h>
#include <float.h>

// _finite is MS extension, C99 defines isinf
#define isinf !_finite

double y(double x){
    return 1 / (1 + pow(x, 2.0));
}

void tabulate(double xs, double xe, double xd, double (*f)(double)){
    double x;
    double y;    
    assert(xs < xe);
    assert(xd != 0.0);

    x = xs;
    while(x <= xe){
        y = (*f)(x);
        if (!isinf(y)){
            printf("%f %lf\n", x, y);
        } else {
            printf("\n");
        }
        x += xd;
    }
    
}

int main(void){
    tabulate(-10.0, 10.0, 0.5, y);
}