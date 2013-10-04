// В заданій стрічці, використовуючи вказівник, 
// перевірити, чи входить в неї комбінація символів “01”.

#include <stdio.h>
#include <math.h>
#include <string.h>
#include <stdlib.h>

int test(char *text){
	int size = strlen(text);
	int i;

	for (i = 0; i < (size-1); ++i)
	{
		if (text[i] == '0' && text[i+1] == '1')
		{
			return 1;
		}
	}
	return 0;
}

int main(void){

    char *text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    char *text2 = "Call 001 if something is wrong.";
    
    printf("%s - %s\n", text1, test(text1) ? "yes" : "no");
    printf("%s - %s\n", text2, test(text2) ? "yes" : "no");
}