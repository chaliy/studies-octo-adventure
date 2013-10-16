// Видрукувати 5 студентів Вашої групи, які мають найвищий бал
// по результатах зимової сесії. На друк вивести середній бал 
// групи, прізвище студента і його оцінки.

#include <string>
#include <iostream>
#include <sstream>
#include <vector>
#include <algorithm>

using namespace std;

class Student {
    string _name;
    vector<int> _scores;

public:
    Student (string name, int s1, int s2, int s3, int s4){
        _name = name;  
        _scores.push_back(s1);
        _scores.push_back(s2);
        _scores.push_back(s3);
        _scores.push_back(s4);  
    }

    string get_name(){
        return _name;
    }

    string to_s(){
        ostringstream buff;
        buff << _name << " - ";

        for (auto &x : _scores) {
            buff << x << ", ";
        }

        buff << "average: " << average_score();

        return buff.str();
    }

    int get_weight(){
        return _scores.at(0);
    }

    double average_score(){        
        double a = 0.0;
        for (auto &x : _scores) {
            a += x;            
        }
        return a / _scores.size();    
    }
};

class Group{
    vector<Student> _students;

    bool static compareStudentScore (Student x, Student y) { 
        return (x.average_score() > y.average_score()); 
    }

public:

    void add_student(Student student){
        _students.push_back(student);
    }

    void add_student(string name, int s1, int s2, int s3, int s4){
        add_student(* new Student(name, s1, s2, s3, s4));
    }


    void printAll(){
        cout << "** All students **" << endl;
        for (auto &x : _students){
            cout << x.to_s() << endl;        
        }
    }

    void printPerfomers(){
        cout << "** Top 5 Perfomers **" << endl;

        vector<Student> tmp(_students);

        sort(tmp.begin(), tmp.end(), compareStudentScore);        

        for (auto it = tmp.begin(); it != tmp.begin() + 5; ++it){
            cout << (*it).to_s() << endl;
        }
    }

    void printAverage(){
        double a = 0.0;
        for (auto &x : _students) {
            a += x.average_score();            
        }
        a = a / _students.size();    
        cout << "** Group average score is " << a << " **" << endl;
    }
};

int main(void){

    Group * group = new Group();

    group->add_student("Балагурак Ростислав", 65, 71, 61, 59 );
    group->add_student("Бодак Марія", 67, 59, 59, 61);
    group->add_student("Веклич Назарій", 57, 64, 73, 69);
    group->add_student("Вонс Петро", 80, 59, 73, 59);
    group->add_student("Гаврушенко Юрій", 84, 99, 82, 96);
    group->add_student("Гайдаш Андрій", 57, 92, 73, 90);
    group->add_student("Денис Юрій", 91, 65, 77, 67);
    group->add_student("Зарбєєв Микита", 90, 85, 98, 77);
    group->add_student("Іванів Юрій", 82, 73, 75, 71);
    group->add_student("Каркач Руслан", 56, 94, 78, 92);
    group->add_student("Карпа Юрій", 71, 70, 73, 86);
    group->add_student("Коберник Михайло", 77, 76, 85, 66);
    group->add_student("Кобрій Василь", 72, 73, 84, 86);
    group->add_student("Ловас Андрій", 81, 88, 70, 80);
    group->add_student("Прашко Володимир", 60, 90, 94, 84);
    group->add_student("Рубаненко Олександр", 76, 80, 86, 61);
    group->add_student("Труш Василь", 79, 75, 58, 81);
    group->add_student("Фаринник Микола", 77, 61, 96, 82);
    group->add_student("Цюркало Микола", 68, 84, 99, 73);
    group->add_student("Чалий Михайло", 58, 74, 58, 70);
    group->add_student("Чеховський Павло", 71, 99, 65, 71);
    group->add_student("Чишейко Владислав", 98, 86, 65, 65);
    group->add_student("Яковлєва Світлана", 62, 91, 89, 89);

    group->printPerfomers();
    group->printAverage();
    group->printAll();

    // Cleanup
    delete group;

    return 0;
}