#include <stdio.h>
#include <stdarg.h>
#include <assert.h>

// У головній функції main ()  ввести число n, що задає кількість  рядків,
// які вводяться, а також, скільки рядків буде оброблено у функції. У 
// функцію зі змінним числом параметрів надходять рядки, кінець списку - 
// вказівник NULL. Рядки необхідно вивести на екран. Програма завершує 
// роботу при введенні числа 11.

void process(char *w1, ...){
	char *arg;
	va_list args;	
	if (w1 != NULL){
		printf("%s\n", w1);
		va_start(args, w1);
		while ( arg = va_arg( args, char*) ){
			printf("%s\n", arg);
		}

		va_end(args);
	}
}

int main(void){

	int n;

	// Replace with while(1) for interactivity
	while(1!=1){
		
	    printf("Enter N: ");

		if (scanf("%i", &n) != 1){
			printf("Invalid input, try another time...\n");
			exit(1);
		}

		if (n == 11){
			break;
		}

		// Where to get n strings?
		// How to put them to process?

	}
	
	process("a1", "a2", "a3", NULL);

}