#include <stdio.h>
#include <math.h>

int main(void){
    FILE *ifp;
    char *mode = "r";
    const int n = 5; // Row count
    const int m = 6; // Column count
    int A[5][6];  // Working matrix       
    int t; // Counter
    int i,j; // Column and row counters
    double av; // Average aggregate

    ifp = fopen("l5_21.dat", mode);

    if (ifp == NULL) {
        fprintf(stderr, "Can't open input file l5_21.dat!\n");
        exit(1);
    }

    // Read file
    t = 0;
    while (fscanf(ifp, "%d", &A[t / m][t % m]) == 1) {
        t++;
    }

    fclose(ifp);

    // Print matrix
    // i index of row
    // j index of column
    printf("Input matrix\n");
    for (i = 0; i < n; ++i)
    {
        printf("|");
        for (j = 0; j < m; ++j)
        {
            printf("%4d |", A[i][j]);
        }
        printf("\n");
    }

    printf("Results:\n");
    // Averages of colums    
    for (j = 0; j < m; ++j)
    {
        av = 0;
        for (i = 0; i < n; ++i)
        {
            av += A[i][j];            
        }
        printf("Average of column %d is %f\n", j + 1, av / n);
    }

    // Averages of rows
    for (i = 0; i < n; ++i)
    {
        av = 0;
        for (j = 0; j < m; ++j)
        {
            av += A[i][j];                          
        }
        printf("Average of row %d is %f\n", i + 1, av / m);        
    }
}