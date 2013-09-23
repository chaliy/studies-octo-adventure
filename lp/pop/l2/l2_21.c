#include <stdio.h>
#include <stdarg.h>
#include <math.h>
#include <assert.h>
#include <float.h>

void f(char *w1, ...){
	char *arg;
	va_list args;	
	if (w1 != NULL){
		printf("%s\n", w1);
		va_start(args, w1);		
		while ( arg = va_arg( args, char*)  ){
			printf("%s\n", arg);
		}

		va_end(args);
	}
}

int main(void){
	int n;
    //printf("Enter N: "); 
	//scanf("%d", &n); 

	f("a1", "a2", "a3", NULL);

}