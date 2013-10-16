// Видрукувати 5 студентів Вашої групи, які мають найвищий бал
// по результатах зимової сесії. На друк вивести середній бал 
// групи, прізвище студента і його оцінки.

#include <string>
#include <iostream>
#include <sstream>
#include <vector>

using namespace std;

class Student {
    string _name;
    vector<int> _scores;

    public:
	    Student (string,int, int, int, int);
	    string get_name(){
	    	return _name;
	    }

	    string to_s(){
	    	ostringstream buff;
  			buff << _name << " - ";
  			for (auto iter = _scores.begin(); iter != _scores.end(); iter++){
  				buff << *iter << ", ";      			
      		}

			return buff.str();
	    }
};

Student::Student (string name, int s1, int s2, int s3, int s4) {
  _name = name;  
  _scores.push_back(s1);
  _scores.push_back(s2);
  _scores.push_back(s3);
  _scores.push_back(s4);  
}

void printAll(Student * students[]){
	int i,j;

	for (i = 0; i < 23; ++i)
	{
		cout << students[i]->to_s() << endl;		
	}
}

int main(void){

	Student  * students[23];
	
	students[0] = new Student("Балагурак Ростислав", 65, 71, 61, 59 );
	students[1] = new Student("Бодак Марія", 67, 59, 59, 61);
	students[2] = new Student("Веклич Назарій", 57, 64, 73, 69);
	students[3] = new Student("Вонс Петро", 80, 59, 73, 59);
	students[4] = new Student("Гаврушенко Юрій", 84, 99, 82, 96);
	students[5] = new Student("Гайдаш Андрій", 57, 92, 73, 90);
	students[6] = new Student("Денис Юрій", 91, 65, 77, 67);
	students[7] = new Student("Зарбєєв Микита", 90, 85, 98, 77);
	students[8] = new Student("Іванів Юрій", 82, 73, 75, 71);
	students[9] = new Student("Каркач Руслан", 56, 94, 78, 92);
	students[10] = new Student("Карпа Юрій", 71, 70, 73, 86);
	students[11] = new Student("Коберник Михайло", 77, 76, 85, 66);
	students[12] = new Student("Кобрій Василь", 72, 73, 84, 86);
	students[13] = new Student("Ловас Андрій", 81, 88, 70, 80);
	students[14] = new Student("Прашко Володимир", 60, 90, 94, 84);
	students[15] = new Student("Рубаненко Олександр", 76, 80, 86, 61);
	students[16] = new Student("Труш Василь", 79, 75, 58, 81);
	students[17] = new Student("Фаринник Микола", 77, 61, 96, 82);
	students[18] = new Student("Цюркало Микола", 68, 84, 99, 73);
	students[19] = new Student("Чалий Михайло", 58, 74, 58, 70);
	students[20] = new Student("Чеховський Павло", 71, 99, 65, 71);
	students[21] = new Student("Чишейко Владислав", 98, 86, 65, 65);
	students[22] = new Student("Яковлєва Світлана", 62, 91, 89, 89);

	printAll(students);

	return 0;
}