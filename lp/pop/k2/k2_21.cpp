// Видрукувати 5 студентів Вашої групи, які мають найвищий бал
// по результатах зимової сесії. На друк вивести середній бал 
// групи, прізвище студента і його оцінки.

#include <string>
#include <iostream>
#include <sstream>
#include <memory>
#include <vector>
#include <algorithm>
#include <numeric>
#include <functional>

using std::vector;
using std::string;
using std::cout;
using std::endl;
using std::ostringstream;

#define TRACE

class Student {
    string name_;
    vector<int> scores_;

    Student(const Student&);

public:
    Student (const string& name, int s1, int s2, int s3, int s4){
        name_ = name;  
        scores_.push_back(s1);
        scores_.push_back(s2);
        scores_.push_back(s3);
        scores_.push_back(s4);  
#ifdef TRACE
        cout << __PRETTY_FUNCTION__  << "Trace: New student " << name << endl;
#endif
    }

#ifdef TRACE
    ~Student(){
        cout << "Trace: Clean student " << name_ << endl;
    }
#endif

    string to_s() const{
        ostringstream buff;
        buff << name_ << " - ";

        for (auto x : scores_) {
            buff << x << ", ";
        }

        buff << "average: " << average_score();

        return buff.str();
    }

    double average_score() const{        

        int a = accumulate(
            scores_.begin(), 
            scores_.end(), int());
        
        return double(a) / scores_.size();    
    }
};

class Group{
    vector<Student *> students_;

    Group(const Group&);

public:

    Group(){        
    }    

    void add_student(const string& name, int s1, int s2, int s3, int s4){
        students_.push_back(new Student(name, s1, s2, s3, s4));
    }


    void print_all(){
        cout << "** All students **" << endl;
        for (auto &x : students_){
            cout << x->to_s() << endl;        
        }
    }

    void print_perfomers(){
        cout << "** Top 5 Perfomers **" << endl;

        vector<Student *> tmp(students_);

        sort(tmp.begin(), tmp.end(), [](Student * x, Student * y) { 
            return (x->average_score() > y->average_score()); 
        });        

        for (auto it = tmp.begin(); it != tmp.begin() + 5; ++it){
            cout << (*it)->to_s() << endl;
        }
    }

    void print_average(){

        double a = accumulate(
            students_.begin(), 
            students_.end(), 
            double(), 
            [](double agr, Student * x){
                return agr + x->average_score();
            });

        // double a(0.0);        
        // for (auto &x : students_) {
        //     a += x->average_score();
        // }
        a = a / students_.size();    
        cout << "** Group average score is " << a << " **" << endl;
    }

    ~Group(){
#ifdef TRACE
        cout << "Trace: Clean students..." << endl;
#endif
        while(!students_.empty()){            
            delete students_.back();
            students_.pop_back();
        }
    }
};

int main(void){

    Group group;

    group.add_student("Балагурак Ростислав", 65, 71, 61, 59 );
    group.add_student("Бодак Марія", 67, 59, 59, 61);
    group.add_student("Веклич Назарій", 57, 64, 73, 69);
    group.add_student("Вонс Петро", 80, 59, 73, 59);
    group.add_student("Гаврушенко Юрій", 84, 99, 82, 96);
    group.add_student("Гайдаш Андрій", 57, 92, 73, 90);
    group.add_student("Денис Юрій", 91, 65, 77, 67);
    group.add_student("Зарбєєв Микита", 90, 85, 98, 77);
    group.add_student("Іванів Юрій", 82, 73, 75, 71);
    group.add_student("Каркач Руслан", 56, 94, 78, 92);
    group.add_student("Карпа Юрій", 71, 70, 73, 86);
    group.add_student("Коберник Михайло", 77, 76, 85, 66);
    group.add_student("Кобрій Василь", 72, 73, 84, 86);
    group.add_student("Ловас Андрій", 81, 88, 70, 80);
    group.add_student("Прашко Володимир", 60, 90, 94, 84);
    group.add_student("Рубаненко Олександр", 76, 80, 86, 61);
    group.add_student("Труш Василь", 79, 75, 58, 81);
    group.add_student("Фаринник Микола", 77, 61, 96, 82);
    group.add_student("Цюркало Микола", 68, 84, 99, 73);
    group.add_student("Чалий Михайло", 58, 74, 58, 70);
    group.add_student("Чеховський Павло", 71, 99, 65, 71);
    group.add_student("Чишейко Владислав", 98, 86, 65, 65);
    group.add_student("Яковлєва Світлана", 62, 91, 89, 89);

    group.print_perfomers();
    group.print_average();
    group.print_all();

    return 0;
}