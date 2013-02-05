#include <stdio.h>
#include <math.h>

const double e = 2.718281828458;
const double K = 1.601; 

double a(double x){
    //printf("asin %g acos %g \n", asin(1/x), acos(pow(e, x)));
    return asin(1/x) + acos(pow(e, x));
}

double b(double x){
    //printf("log10 %g pow %g \n", log10(pow(K,sqrt(x))), pow(e, x));
    return log10(pow(K,sqrt(x))) * pow(e, x);
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
    printf("x: %g = %g;\n", x, y(x));
}

int main(void){    
    test(2.345);
    test(-4.914);
    test(0.219);
}