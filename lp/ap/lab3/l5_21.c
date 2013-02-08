#include <stdio.h>
#include <math.h>

int main(void){
    FILE *ifp;
    char *mode = "r";
    const int is = 5;
    const int js = 6;
    int A[5][6];    
    double B [5 * 6]; 
    int t; // Counter
    int i,j;
    
    ifp = fopen("l5_21.dat", mode);

    if (ifp == NULL) {
        fprintf(stderr, "Can't open input file l5_21.dat!\n");
        exit(1);
    }

    // Read file
    t = 0;
    while (fscanf(ifp, "%d", &A[t / js][t % js]) == 1) {
        t++;
    }

    fclose(ifp);

    // Print matrix
    // i index of row
    // j index of column
    for (i = 0; i < is; ++i)
    {
        printf("|");
        for (j = 0; j < js; ++j)
        {
            printf("%4d |", A[i][j]);
        }
        printf("\n");
    }

    // Averages of colums    
    for (j = 0; j < js; ++j)
    {
        B[j] = 0;
        for (i = 0; i < is; ++i)
        {
            B[j] += A[i][j];
        }
        B[j] = B[j] / is;
    }

    // Averages of colums
    for (i = 0; i < is; ++i)
    {
        B[i + js] = 0;
        for (j = 0; j < js; ++j)
        {
            B[i + js] += A[i][j];                          
        }
        B[i + js] = B[i + js] / js;
    }

    // Print averages
    for (j = 0; j < js; ++j)
    {
        printf("Average of column %d is %f\n", j + 1, B[j]);
    }
    for (i = 0; i < is; ++i)
    {
        printf("Average of row %d is %f\n", i + 1, B[i + js]);
    }
    
}