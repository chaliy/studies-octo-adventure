#include <stdio.h>
#include <math.h>
#include <string.h>

int aCount(char* w){
    int count = 0;
    int i;    
    for(i = 0; i < strlen(w); i++){
        if (w[i] == 'a' || w[i] == 'A'){
            count++;
        }
    }
    return count;
}

FILE* openFile(const char* name, const char* m){
    FILE* f = fopen (name, m);
    if (f == NULL) {
        fprintf (stderr, "Can't open file %s!\n", name);
        exit (1);
    }
    return f;
}

int main(void){
    
    const char finName[] = "l9_21_1_in.dat";
    const int INT_MAX = 32767;
    char* input = "";    
    char* maxAInput = "";
    int maxA = 0;    
    FILE* fin = openFile (finName, "r");

    while (fgets(input, INT_MAX, fin)) {        
        int ac = aCount(input);
        if (ac >= maxA){
            maxA = ac;
            maxAInput = input;
        }
    }

    fclose(fin);

    printf ("%d in \"%s\"\n", maxA, maxAInput);
}