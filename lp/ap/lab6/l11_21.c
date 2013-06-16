#include <stdio.h>
#include <math.h>
#include <string.h>
#include <stdlib.h>

typedef struct{
    char *Name;
    int Score;
    char *Birthday;    
} Student;

FILE *openFile(const char *name, const char *m){
    FILE *f = fopen (name, m);
    if (f == NULL) {
        fprintf (stderr, "Can't open file %s!\n", name);
        exit (1);
    }
    return f;
}

int readStudent(FILE *fin, Student *st){
    // char* name = "";
    // char* birthday = "";
    // // TODO: Why st->Name does not work instead of name (st->Name is uninitialized?)    
    // if (fscanf(fin, "%[^,],%d,%[^,]\n", name, &st->Score, birthday) == 3){
    //     st->Name = name;
    //     st->Birthday = birthday;
    //     return 1;
    // }
    
    const char SPL[] = ",\n";
    char *line = "";
    char *token = "";

    if (fgets(line, INT_MAX, fin)){

        st->Name = strtok (line, SPL);
        st->Score = atoi(strtok (NULL, SPL));
        st->Birthday = strtok (NULL, SPL);
        // while (token != NULL)
        // {
        //     printf ("%s\n", token);
        //     token = strtok (NULL, SPL);
        // }

        return 1;
    }

    return 0;
}

int averageScore(Student *students, int count){
    int scoreSum = 0;
    int i;
    for (i = 0; i < count; ++i)
    {
        scoreSum += students[i].Score;
    }
    return scoreSum / count;
}

int main(void){
    
    const char finName[] = "l11_21_in.dat";    
    char *a = "";    
    int b = 0;
    FILE *fin = openFile (finName, "r");
    const int SIZE = 96;
    Student *students = malloc (SIZE * sizeof (Student));
    int count = 0;
    int scoreAverage;
    int i;

    Student st;
    while (readStudent(fin, &st)) {
        students[count] = st;
        count++;
        //printf("%s - %d - %s\n", st.Name, st.Score, st.Birthday);
    }

    scoreAverage = averageScore(students, count);

    printf("Students %d, score average: %d\n", count, scoreAverage);

    for (i = 0; i < count; ++i)
    {
        if (students[i].Score <= scoreAverage){
            printf("Student %s\n\tScore: %d\n\tBirthday: %s\n\tGroup: CSr-11, 2012", 
                students[i].Name, students[i].Score, students[i].Birthday
                );
        }
    }

    fclose(fin);    
}