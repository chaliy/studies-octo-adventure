// Видрукувати 5 студентів Вашої групи, які мають найвищий бал
// по результатах зимової сесії. На друк вивести середній бал 
// групи, прізвище студента і його оцінки.

#include <stdio.h>
#include <math.h>
#include <string.h>
#include <stdlib.h>

typedef struct {
    char *name;
    int score;
} Student;

Student *createStudent(char *name, int score){
    Student *student = (Student *)malloc(sizeof(Student));
    student->name = name;
    student->score = score;    
    return student;
}

void printPerfomers(int n, Student *students){
	Student *perfomers[5];
	int i;

	for (i = 0; i < n; ++i)
	{
		printf("%s\n", students[i]);
	}
}

int main(void){

	int n = 23;
	Student *students;

	students = malloc(n * sizeof(Student*));

	// struct students Student[23] =
	// {
	// 	{"asdasd", 65}		
	// }

	//Student students[23];

	//students[0].name = "Бодак Марія";
	//students[0].score = 67;
	//students[0] -> {"sdfdsf", 67};
	students[1] = createStudent("Бодак Марія", 67);
	// students[2] = createStudent("Веклич Назарій", 57);
	// students[3] = createStudent("Вонс Петро", 80);
	// students[4] = createStudent("Гаврушенко Юрій", 84);
	// students[5] = createStudent("Гайдаш Андрій", 57);
	// students[6] = createStudent("Денис Юрій", 91);
	// students[7] = createStudent("Зарбєєв Микита", 90);
	// students[8] = createStudent("Іванів Юрій", 82);
	// students[9] = createStudent("Каркач Руслан", 56);
	// students[10] = createStudent("Карпа Юрій", 71);
	// students[11] = createStudent("Коберник Михайло", 77);
	// students[12] = createStudent("Кобрій Василь", 72);
	// students[13] = createStudent("Ловас Андрій", 81);
	// students[14] = createStudent("Прашко Володимир", 60);
	// students[15] = createStudent("Рубаненко Олександр", 76);
	// students[16] = createStudent("Труш Василь", 79);
	// students[17] = createStudent("Фаринник Микола", 77);
	// students[18] = createStudent("Цюркало Микола", 68);
	// students[19] = createStudent("Чалий Михайло", 58);
	// students[20] = createStudent("Чеховський Павло", 71);
	// students[21] = createStudent("Чишейко Владислав", 98);
	// students[22] = createStudent("Яковлєва Світлана", 62);


	printPerfomers(1, students);

}