---
title: "[Effective C++] 13. 자원 관리에는 객체가 그만"
category: "C++/EffectiveC++"
date: "2020-09-02"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 자원 관리 객체에서 자원을 관리하자.(RAII 사용)
2. 자원 관리 객체는 소멸자에서 해당 자원을 해제 하자!

# 1. 메모리가 누수될 수 있는 상황 가정

1. 구현한 내용
   - 투자를 모델링한 기본 클래스 Investment
   - Investment 계열의 클래스를 반환하는 팩토리 함수 createInvestment
2. 사용부
   - createInvestment를 이용해 Investment 계열 클래스 생성
   - 사용 후 객체 반환(delete)
3. 문제 사항
   - 삭제 전에 return 문이 있을 경우
   - 삭제 전에 goto문에 의해 루프를 빠져 나갈 경우
   - 삭제 전에 예외가 던져질 경우

```cpp
// 투자를 모델링한 기본 클래스
class Investment{...};

// Invesment를 상속한 클래스를 return하는 팩토리 함수
Invesment* createInvestment();

void f(){
   Invesment *pInv = createInvestment();
   ...
   delete pInv;
}
```

# 2. 해결 방안

1. 자원을 획득한 후에 자원 관리 객체에게 넘기자!
   - createInvestment를 통해 만든 자원을 auto_ptr에게 넘겨 초기화하는데 사용
   - [RAII(Resource Acquisition Is Initialization)](https://en.cppreference.com/w/cpp/language/raii)라고 불림
   - 자원 획득과 자원 관리객체의 초기화가 한문장에서 이루어지는 것이 일상적임
2. 자원 관리 객체는 자신의 소멸자를 사용해 자원이 확실히 해제되도록 하자!
   - 소멸자는 객체가 소멸될 때 자동으로 호출됨
   - 소멸자가 호출될 때 자원을 해제하면 자동으로 확실히 해제됨
   - 단, 예외가 발생하면 꼬이지만 [항목8](../effective_14)에서 해결할 예정
3. 예제(스마트 포인터)

```cpp
void f(){
   std::unique_ptr<Investment> pInv(createInvesment());
   //책에서는 auto_ptr로 예제를 들었으나, C++11에서 unique_ptr로 대체됨
}
```

# 3. 스마트 포인터

1. unique_ptr

   - 자원에 대해 유일한 소유권을 가짐
   - unique_ptr을 복사 또는 대입하면, 기존 unique_ptr은 null로 변경됨

```cpp
std::unique_ptr<Invesment> pInv1(createInvesment());
std::unique_ptr<Invesment> pInv2(pInv1);  // pInv1 = null로 할당됨
pInv1 = pInv2;  // pInv2 는 null로 할당됨
```

2. shared_ptr
   - 참조 카운팅 방식 스마트 포인터(RCSP:Reference-Counting Smart Pointer)
   - 자원을 가리키는 외부 객체 개수를 확인하다가 0이 되면 자원을 자동으로 삭제함

```cpp
std::shared_ptr<Investment> pInv1(createInvestment());
std::shared_ptr<Investment> pInv2(pInv1); // pInv1과 pInv2는 같은 객체를 가리킴
pInv1 = pInv2; // 위와 동일ㅈ
```

# 참고

1. Effective C++
