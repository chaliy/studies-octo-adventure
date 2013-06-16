#include <stdio.h>
#include <math.h>
#include <string.h>
#include <time.h>

void fillSet(int set[], int len){    
    int i;
    for (i = 0; i < len; i++){
        set[i] = rand();
    }
}

void fillSet(int set[], int len){    
    int i;
    for (i = 0; i < len; i++){
        set[i] = rand();
    }
}

void printSet(int set[], int len){
    int i;    
    for (i = 0; i < len; i++){
        printf("%d ", set[i]);
    }
    printf("\n");
}

int minOfSet(int set[], int len){
    const int INT_MAX = 32767;
    int min = INT_MAX;
    int i;    
    for (i = 0; i < len; i++){
        if (set[i] < min){
            min = set[i];
        }
    }
    return min;
}

int main(void){
    const int SIZE = 5;
    int S1[5];
    int S3[5];

    int min1;
    int min2;

    srand (time(NULL));

    fillSet(S1, SIZE);
    printSet(S1, SIZE);

    fillSet(S3, SIZE);
    printSet(S3, SIZE);

    min1 = minOfSet(S1, SIZE);
    min2 = minOfSet(S3, SIZE);

    printf("Sum of minimal values is %d\n", min1 + min2);
}