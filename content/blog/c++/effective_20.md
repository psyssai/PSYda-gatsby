---
title: "[Effective C++] 20. 값에 의한 전달보다는 상수객체 참조자에 의한 전달 방식을 선택하는 편이 대개 낫다"
category: "C++/EffectiveC++"
date: "2020-09-12"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 값에 의한 전달 방식이 유리한 경우
   - 기본 자료형(int 등)
   - STL 반복자
   - STL 함수 객체 타입
2. 위의 경우를 제외하고 모두 상수 객체에 대한 참조자로 전달하자
   - 생성자/소멸자를 호출하지 않기 때문에 효율적
   - const를 사용하여 전달되는 객체가 변경되지 않음을 보장
   - 복사 손실 문제가 없어짐

# 1. 값에 의한 전달 방식

1. 함수로부터 객체를 전달 받거나, 함수에 객체를 전달할 때 값에 의한 전달 방식을 사용
   - 함수 매개 변수는 실제 인자의 '사본'을 통해 초기화
   - 함수 호출 시 : 함수가 반환한 값의 '사본'을 전달 받음
   - 이들 사본을 만들어내는 것은 복사 생성자
2. 복사 생성자는 고비용 연산!

   - 아래 예제 참고
   - plato를 인자로 전달하면 매개 변수 s를 초기화 하기 위해 student의 복사 생성자 호출!
   - validateStudent 함수가 끝나면 Student의 소멸자 호출!
   - Student에는 총 4개의 string이 있기 때문에 4개의 생성/소멸자 호출됨

```cpp
class Person{
public:
   Person();
   virtual ~Person();
private:
   std::string name;
   std::string address;
};

class Student: public Person{
public:
   Student();
   ~Student();
private:
   std::string schoolName;
   std::string schoolAddres;
};

bool validateStudent(Student s);
Student plato;
bool platoIsOk = validateStudent(plato);

```

# 2. 상수객체에 대한 참조자로 전달

```cpp
bool validateStudent(const Student& s);
```

1. 새로운 객체가 만들어지지 않는다.
   - 생성자/소멸자가 호출되지 않는다.
2. const를 사용
   - Student 객체 s는 변경되지 않음을 보장한다!
3. 복사 손실 문제가 없어지는 장점
   - 상속받은 객체 생성 시 부모 객체의 멤버만 있는 문제
   - 참조자는 보통 포인터를 써서 구현됨(C++ 컴파일러 동작 원리)
   - 즉, 참조자를 전달한다는 것은 포인터를 전달한다는 것

```cpp
class Window {
public:
   std::string name() const;
   virtual void display() const;
};

class WindowWithScrollBars: public Window{
public:
   virtual void display() const;
};

void printNameAndDisplay(Window w){
   std::cout << w.name();
   w.display(); // Window의 display 함수만 호출
}

// 위 함수에 WindowWithScrollBars 객체를 전달
WindowWithScrollBars wwsb;
// Window 객체 부분만 있고,
// WindowWithScrollBars 부분은 초기화 되지 않음
printNameAndDisplay(wwsb);

// 상수 객체 참조자로 전달하여 문제 해결
// 어떤 종류의 Window가 전달되더라도 복사 손실 문제 없어짐
void printNameAndDisplay(const Window& w){
   std::cout<< w.name();
   w.display();   // 전달되는 타입에 따라 다른 display 호출됨
}
```

# 3. 값에 의한 전달이 상수 객체에 대한 참조자 전달보다 효율적인 때도 있다

1. 기본 자료형(int 등)일 경우
2. STL의 반복자와 함수 객체의 경우
   - 반복자와 함수 객체 구현시 반드시 아래 2가지 고려하여 만들어야함
   - 복사 효율을 높여야함
   - 복사 손실 문제에 노출되지 않도록 해야함

# 4. 사용자 타입은 가급적 참조자 전달을 사용하자

1. 위에서 언급한 상황을 제외하고는 참조자 전달을 사용하자!
2. 타입의 크기가 작으면 값에 의한 전달이 효율적일까?
   - 꼭 그렇지는 않다.
   - 멤버 데이터로 포인터 변수 하나만 가지고 있더라도, 복사 시에 해당 포인터 값을 모두 복사하기 때문에(깊은 복사) 비효율적일 수 있다.
3. 지금은 크기가 작더라도 나중에 커질 수 있다.

# 참고

1. Effective C++
