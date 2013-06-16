#include <stdio.h>
#include <math.h>
#include <string.h>

void outIfLong(FILE* fout, char* w){
    int len = strlen(w);
    printf ("%s - %d\n", w, len);
    if (len > 9){
        fprintf (fout, "%s\n", w);
    }
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

    const char separator[] = " .,\n";
    const char finName[] = "l8_21_1_in.dat";
    const char foutName[] = "l8_21_1_out.dat";
    const int INT_MAX = 32767;
    char* input = "";
    char* pch;
    FILE* fin = openFile (finName, "r");
    FILE* fout = openFile (foutName, "wt");

    while (fgets(input, INT_MAX, fin)) {  
        pch = strtok (input, separator);
        while (pch != NULL)
        {
            outIfLong (fout, pch);

            pch = strtok (NULL, separator);
        }
    }

    fclose(fin);
    fclose(fout);
}