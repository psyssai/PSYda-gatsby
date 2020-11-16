---
title: "[Effective C++] 18. 인터페이스 설계는 제대로 쓰기엔 쉽게, 엉터리로 쓰기엔 어렵게 하자"
category: "C++/EffectiveC++"
date: "2020-09-10"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 인터페이스를 잘못 사용하지 못하도록 고민하자!!
   - 사용자가 저지를만한 실수를 생각하자
   - 새로운 타입을 들이고, 제약을 넣어 실수를 방지하자
2. 특별한 이유가 없다면 기본 타입처럼 사용자 타입을 구현하자
3. 일관성 있는 인터페이스를 제공하자
4. 스마트 포인터를 써서 사용자 오류를 방지하자

# 1. 인터페이스를 잘 못 사용하지 못하도록 하자

1. 사용자가 저지를만한 실수를 미리 생각하자!
   - ex) 날짜를 나타내는 클래스
   - 매개 변수를 잘 못 넣을 수 있음

```cpp
class Date{
public:
  Date(int month, int day, int year);
};

Date d(30, 3, 1995) ; // 3과 30을 잘못씀
Date d(3, 40, 1995); // 30을 넣어야했는데 오타로 40..
```

2. 새로운 타입을 들여와 인터페이스를 강화하자!
   - 일, 월, 연을 구분하는 랩퍼 타입을 만들자.
   - 이 타입을 Date 생성자 안에 두자.

```cpp
// 일 타입
struct Day{
   explicit Day(int d) : val(d) {}
   int val;
};

// 월 타입
struct Month{
   explicit Month(int m) : val(m) {}
   int val;
}

// 년 타입
struct Year {
   explicit Year(int y) : val(y) {}
   int val;
}

// Date 클래스 재정의
class Date{
public:
  Date(const Month& m, const Day& d, const Year& y);
};
Date d(Month(3), Day(30), Year(1995));
```

3. 새로운 타입에 제약을 넣어 오류를 방지하자!
   - 월은 12개 값만 가지므로, 제약을 주자

```cpp
class Month{
public:
   static Month Jan() {return Month(1);}
   ...
   static Month Dec() {return Month(12);}
private:
  explicit Month(int m);
};

Date d(Month::Mar(), Day(30), Year(1995));
```

4. 특별한 이유가 없다면, 사용자 정의 타입은 기본 제공 타입처럼 동작하게 하자!

   - 항목 3의 if(a\*b = c) 의 예제 참고
   - operator\*의 반환타입을 const로 한정하여, 사용자 실수로 인한 c 대입 방지 가능

5. 일관성 있는 인터페이스를 제공하자

   - STL 컨테이너는 대체로 일관성이 있어서 사용하기 편리하다.
   - ex) STL 컨테이너는 size란 멤버 함수를 공통적으로 제공한다.
   - length, size, count 등 혼용하면 헷갈린다.

# 2. 스마트 포인터 사용

1. 사용자가 신경쓰지 않도록 하자(외우지 않도록)
   - Factory 함수에서 포인터를 반환할 때 shared_ptr을 반환하여 메모리 누수 문제를 해결하자.

```cpp
Investment* createInvestment(); // (X)
std::shared_ptr<Investment> createInvestment(); // (O)
```

2. 스마트 포인터의 삭제자를 활용하자
   - Investment\* 포인터를 직접 삭제하지 않고, 별도 삭제자를 통해 삭제하자
   - 하지만 별도 삭제자를 사용하지 않고 직접 delete를 할 가능성이 있다.
   - 또한 실수로 delete를 하고, 삭제자도 호출 할 수도 있다.
   - 아래와 같이 create할 때 삭제자가 포함된 shared_ptr을 반환하도록 구현

```cpp
std::shared_ptr<Investment> createInvestment(){
// 방법 1. 포인터를 null ptr로 초기화 하고 나중에 대입하는 방석
   std::shared<Investment> retVal(static_cast<Investment*>(0), getRidOfInvestment);

// 방법 2. 실제 객체 포인터를 바로 생성자에 넘기는 방법
   std::shared_ptr<Investment> retVal(new Investment, getRidOfInvestment);

   retVal = ...;
   return retVal;
}
```

3. shared_ptr은 '교차DLL 문제' 를 방지한다.
   - 교차 DLL 문제 : 어떤 DLL에서 객체를 생성하고, 다른 DLL에서 소멸하는 문제
   - 객체 생성/삭제가 서로 다른 DLL에서 호출될 때 발생
   - shared_ptr은 생성된 DLL과 동일한 DLL에서 delete를 사용하도록 삭제자가 만들어져 있어서 방지 가능

```cpp
// 아래 함수가 반환하는 shared_ptr은 다른 DLL 사이에 이리저리 넘겨져도 교차 DLL 문제를 걱정하지 않아도 된다.
std::shareD_ptr<Investment> createInvestment(){
   return std::shared_ptr<Investment>(new Stock);
}
```

# 참고

1. Effective C++
