// Видрукувати 5 студентів Вашої групи, які мають найвищий бал
// по результатах зимової сесії. На друк вивести середній бал 
// групи, прізвище студента і його оцінки.

import std.stdio;
import std.container;
import std.conv;
import std.algorithm;

extern(Windows) int SetConsoleOutputCP(uint);

class Student {
    private string name;
    private int[] scores;

    this (string n, int s1, int s2, int s3, int s4){        
        name = n;  
        scores = [s1, s2, s3, s4];
    }

    override string toString(){
        auto output = name;
        output ~= " - ";        
        
        foreach (s; scores){
            output ~= text(s);
            output ~= ", ";
        }

        output ~= "average: ";
        output ~= text(averageScore());

        return output;
    }

    double averageScore(){
        return reduce!((a,b) => a + b)(0.0, scores) / scores.length;
    }
};

class Group{
    private Array!Student students;

    void addStudent(string name, int s1, int s2, int s3, int s4){
        students.insert(new Student(name, s1, s2, s3, s4));
    }

    void printAll(){
        writeln("** All students **");
        foreach (s; students){
            writeln(s);
        }
    }

    //void print_perfomers(){
    //    cout << "** Top 5 Perfomers **" << endl;

    //    vector<Student *> tmp(students_);

    //    sort(tmp.begin(), tmp.end(), [](Student * x, Student * y) { 
    //        return (x->average_score() > y->average_score()); 
    //    });        

    //    for (auto it = tmp.begin(); it != tmp.begin() + 5; ++it){
    //        cout << (*it)->to_s() << endl;
    //    }
    //}

    void printAverage(){

        auto scores = map!(s => s.averageScore())(students[]);
        auto average = reduce!((a,b) => a + b)(0.0, scores) / students.length();
  
        writeln("** Group average score is ", average, " **");
    }
};

int main(){

    if(SetConsoleOutputCP(65001) == 0)
        throw new Exception("Failure to set console output");

    Group group = new Group();

    group.addStudent("Балагурак Ростислав", 65, 71, 61, 59 );
    group.addStudent("Бодак Марія", 67, 59, 59, 61);
    group.addStudent("Веклич Назарій", 57, 64, 73, 69);
    group.addStudent("Вонс Петро", 80, 59, 73, 59);
    group.addStudent("Гаврушенко Юрій", 84, 99, 82, 96);
    group.addStudent("Гайдаш Андрій", 57, 92, 73, 90);
    group.addStudent("Денис Юрій", 91, 65, 77, 67);
    group.addStudent("Зарбєєв Микита", 90, 85, 98, 77);
    group.addStudent("Іванів Юрій", 82, 73, 75, 71);
    group.addStudent("Каркач Руслан", 56, 94, 78, 92);
    group.addStudent("Карпа Юрій", 71, 70, 73, 86);
    group.addStudent("Коберник Михайло", 77, 76, 85, 66);
    group.addStudent("Кобрій Василь", 72, 73, 84, 86);
    group.addStudent("Ловас Андрій", 81, 88, 70, 80);
    group.addStudent("Прашко Володимир", 60, 90, 94, 84);
    group.addStudent("Рубаненко Олександр", 76, 80, 86, 61);
    group.addStudent("Труш Василь", 79, 75, 58, 81);
    group.addStudent("Фаринник Микола", 77, 61, 96, 82);
    group.addStudent("Цюркало Микола", 68, 84, 99, 73);
    group.addStudent("Чалий Михайло", 58, 74, 58, 70);
    group.addStudent("Чеховський Павло", 71, 99, 65, 71);
    group.addStudent("Чишейко Владислав", 98, 86, 65, 65);
    group.addStudent("Яковлєва Світлана", 62, 91, 89, 89);

    //group.printPerfomers();
    group.printAverage();
    group.printAll();

    return 0;
}