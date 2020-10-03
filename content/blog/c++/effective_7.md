---
title: "[Effective C++] 7. 다형성을 가진 기본 클래스에서는 소멸자를 반드시 가상 소멸자로 선언하자."
category: "C++/EffectiveC++"
date: "2020-08-20"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 가상 함수를 하나라도 가진 클래스는 가상 소멸자를 가져야한다.!
2. STL 컨테이너, string 타입은 다형성을 갖도록 설계 되어 있지 않다.
   - 상속해서 사용시 주의가 필요하다!
3. 추상 클래스를 만들 때 마땅한 순수 가상함수가 없으면, 소멸자를 순수 가상함수로 만들자!

4. 기본 클래스로 설계되지 않거나, 다형성을 갖지 않도록 하려면 가상 소멸자를 만들지 말라!

# 1. 가상 소멸자의 필요성

1. 예시 상황
   - TimerKeeper라는 인터페이스(기본 클래스)를 만듦
   - 각 시계를 TimerKeeper를 상속받아 구현
   - 팩토리 함수(getTimeKeeper)를 만들어 다양한 시계를 기본 클래스로 반환(TimeKeeper)
   - 모두 사용 후 메모리 반환(delete)

```cpp
//시계 인터페이스
class TimeKeeper {
public:
   TimeKeeper();
   ~TimeKeeper();
}

// 시계 구현
class AtomicClock: public TimeKeeper {...};
class WaterClock: public TimeKeeper {...};
class WristClock: public TimeKeeper {...};

// 팩토리 함수
TimeKeeper* getTimeKeeper();


//사용 부
TimeKeeper *ptk = getTimeKeeper();
...(사용)
delete ptk; // 메모리 삭제
```

2. 문제 사항(부분 소멸 문제 발생)
   - 메모리 해제 시 각 시계(Atomic, Water, Wrist 등)의 소멸자 호출되지 않음
   - 메모리 해제시 기본 클래스 부분(TimeKeeper) 만 삭제됨
3. 해결 방법
   - 기본 클래스에 가상 소멸자를 붙여라!

```cpp
class TimeKeeper {
public:
   TimeKeeper();
   virtual ~TimeKeeper();
};
```

4. 원리

   - 아래 가상 함수 테이블 참고
   - 소멸자를 virtual 선언하면, 가상함수 테이블 생성됨
   - 메모리가 해제 될 때 가상함수 테이블을 참고하여 알맞은 크기 만큼 메모리가 해제됨

5. 간단한 적용 방법
   - 가상 함수를 하나라도 가진 클래스의 소멸자는 가상 소멸자로 정의!
   - 가상 소멸자가 없는 클래스는 기본 클래스 의지 없음!

# 2. 가상 함수 테이블

1. 가상 함수 테이블(vtbl, virtual table)
   - 가상 함수를 가리키는 함수 포인터를 저장하는 공간
   - 각 클래스가 가지고 있음
2. 가상 함수 테이블 포인터(vptr, virtual table pointer)
   - 객체가 생성 될 때 가상 함수 테이블을 가리킴
3. 가상 함수를 가지고 있는 클래스는 가상 함수 테이블을 가짐
   - 아키텍처(32,64bit)에 따라 클래스 타입의 크기가 커진다.
   - 아래 예에서 Point의 크기는 원래 8byte(int가 4byte라면)
   - 하지만 가상 함수를 가졌다면 16byte가 된다(64bit 운영체제에서 포인터는 8bytef)

```cpp
class Base
{
public:
    FunctionPointer *__vptr;
    virtual void function1() {};
    virtual void function2() {};
};

class D1: public Base
{
public:
    virtual void function1() {};
};

class D2: public Base
{
public:
    virtual void function2() {};
};
```

4. 예시
   - Base는 \_\_vptr 포인터를 가지고, D1,D2는 상속받는다.
   - 각 클래스는 아래 그림과 같이 각각 vTable을 가진다.
   - 객체가 생성 될 때 각자에 맞는 vTable을 가리킨다.

![가상 함수 테이블](./img/VTable.gif)

# 3. 가상 소멸자가 없는 클래스를 조심하자

1. STL 컨테이너 타입, string 타입은 가상 소멸자가 없다.
   - 아래와 같이 구현 시 메모리 누수 발생
   - string쪽은 메모리 해제 되지만, SpecialString 자원 누수됨
   - SpecialString의 소멸자가 호출되지 않음!

```cpp
class SpecialString: public std::string{...};

SpecialString *pss = new SpecialString("Impending Doom");
std::string *ps;
ps = pss;
delete ps;
```

2. STL 컨테이너 타입, string 타입은 다형성을 갖도록 설계되지 않았다!
3. 나만의 컨테이너를 만들 때 자제하자!

# 4. 순수 가상 소멸자의 용도

1. 추상 클래스 만드는데 마땅한 순수 가상 함수가 없을 때
   - 어차피 추상 클래스는 기본 클래스로 사용하기 위한 목적
   - 기본 클래스는 가상 소멸자를 가져야함
   - 그러므로 가상 소멸자를 순수 가상 함수로 만들자!

```cpp
class AWOV{
public:
   virtual ~AWOV() = 0;
}

// 순수 가상 소멸자 정의 반드시 필요!
AWOV::~AWOV() {}
```

2. 주의 할 점

   - 순수 가상 소멸자의 정의가 필요함
   - 없으면 링킹 에러 발생!
   - 이유는 아래 소멸자 호출 순서 참고!

3. 소멸자 호출 순서

   - 파생 클래스 소멸자 호출
   - 기본 클래스쪽으로 올라오면서 각 소멸자가 호출됨
   - 컴파일러는 ~AWOV 호출 코드를 만들기 위해 파생 클래스의 소멸자를 사용

# 참고

1. Effective C++
2. https://www.learncpp.com/cpp-tutorial/125-the-virtual-table/
