#include <stdio.h>
#include <math.h>

void sort(int ar[], int size){
    // Insertion sort
    int i,j;
    int t;
    for (i = 0; i < size; ++i)
    {
        j = i;
        // > - descend (100..0)
        // < - ascend (0..100)
        while(j > 0 && ar[j] > ar[j - 1]){
            // Swap
            t = ar[j];
            ar[j] = ar[j - 1]; 
            ar[j - 1] = t;
            j -= 1;
        }        
    }    
}

void print_matrix(const char *title, int *A, int n, int m){
    int i,j;

    printf("%s\n", title);    
    // i index of row
    // j index of column
    for (i = 0; i < m; ++i)
    {
        printf("|");
        for (j = 0; j < n; ++j)
        {
            printf("%4d |", A[(j * m) + i]);
        }
        printf("\n");
    }
}

int main(void){
    FILE *ifp;
    char *mode = "r";
    const int n = 14; // Column count
    const int m = 10; // Row count
    int A[14][10];  // Working matrix           
    int i,j; // Counter    

    ifp = fopen("l7_21_f.dat", mode);

    if (ifp == NULL) {
        fprintf(stderr, "Can't open input file l7_21_f.dat!\n");
        exit(1);
    }

    // Read file
    i = 0;
    while (fscanf(ifp, "%d", &A[i / m][i % m]) == 1) {  
        i++;
    }

    fclose(ifp);

    print_matrix("Input matrix\n", &A[0][0], n, m);

    for (i = 0; i < n; ++i)
    {
        sort(A[i], m);
    }

    print_matrix("Output matrix\n", &A[0][0], n, m);
}