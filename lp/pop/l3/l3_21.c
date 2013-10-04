// Ввести не більше 3 масивів чисел з плаваючою крапкою. Кількість 
// чисел у масиві задається під час виконання програми введенням з
// клавіатури. Масиви розмістити в динамічній пам'яті. Створити 
// масив вказівників на дані масиви. У функцію зі змінним числом 
// параметрів передати кількість масивів і вказівники на масиви. 
// У функції вивести на екран всі елементи кожного масиву.

#include <stdio.h>
#include <stdlib.h> /* srand, rand */
#include <time.h> /* time */

void print(float **p, int n, int m){	
	int i,j;
	for (i = 0; i < n; ++i)
	{
		printf("Set #%d\n", i);
		for (j = 0; j < m; ++j)
		{
			printf("%f; ", p[i][j]);
		}
		printf("\n");
	}
}

int main(void){

	float **p;
	int i,j;
	int n,m;	

	n = 3; // Кількість масивів
	m = 2; // Кількість чисел у масиві

	srand (time(NULL));	

	// Uncomment for interactivity
	// printf("Enter M: ");
	// if (scanf("%i", &m) != 1){
	// 	printf("Invalid input, try another time...\n");
	// 	exit(1);
	// }

	p = malloc(n * sizeof(float*));

	for (i = 0; i < n; ++i)
	{
		p[i] = malloc(m * sizeof(float));
		for (j = 0; j < m; ++j)
		{
			p[i][j] = rand();
		}
	}

	print(p, n, m);

	// Cleanup	
	for (i = 0; i < n; ++i)
	{
		free(p[i]);
	}
	free(p);


}