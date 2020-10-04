---
title: "[Effective C++] 12. 객체의 모든 부분을 빠짐없이 복사하자"
category: "C++/EffectiveC++"
date: "2020-08-31"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 객체 복사 시 모든 데이터 멤버가 빠지지 않도록 하자
2. 객체 복사 시 모든 기본 클래스 부분이 빠지지 않도록 하자
3. 복사 생성자와 대입 연산자 구현 시 주의

   - 한쪽을 이용해 다른 한쪽을 구현하려고 하지 말자
   - 필요시 공통된 동작을 제 3의 함수에 분리하자
   - 양쪽에서 이 함수를 호출하도록 구현하자

# 1. 객체 복사 함수

1. 객체 복사 함수의 종류
   - 복사 생성자
   - 복사 대입 연산자
2. 객체 복사 함수 특징
   - 사용자가 만들지 않으면 자동으로 생성된다.
   - 사용자가 만들면 자동으로 생성하지 않는다.
3. 객체 복사 함수를 만드는 경우 및 주의점
   - 컴파일러가 자동으로 생성해준 복사 함수로는 부족할 때
   - 사용자가 일부 데이터 복사를 누락해도 컴파일러는 알려주지 않는다!

# 2. 객체 복사 함수 생성 시 주의점

1. 누락된 멤버 변수가 없도록 해라
   - 누락되어도 컴파일러는 알려주지 않아 부분복사가 될 수 있다.
2. 상속 받은 클래스의 복사도 누락 없도록 해라

```cpp
// 복사 생성자
PriorityCustomer::PriorityCustomer(const PriorityCustomer& rhs)
   : Customer(rhs),  // 부모 클래스의 복사 생성자 호출
   priority(rhs.priority){}   // 데이터 복사

// 대입 연산자
PriorityCustomer& PriorityCustomer::operator=(const PriorityCustomer& rhs){
   Custormer::operator=(rhs); // 부모 클래스의 대입 연산자 호출
   priority=rhs.priority; // 데이터 대입
   return *rhis;
}

```

# 참고

1. Effective C++
