---
title: "[STL-13] 함수 객체 - 개요"
category: "C++/STL"
date: "2020-07-06"
tags: ["C++", "STL", "function obejct", "함수 객체"]
---

# 1. 용어 정리

1. 함수 객체란?
   - operator() 연산자를 오버로딩한 클래스 객체
   - 다른 이름으로 functor(함수자)라고 불림
2. 함수류 : 함수 객체, 함수, 함수 포인터

# 2. 함수 객체 종류

1. 일반 함수 객체 : 특정 기능을 수행

   - 산술 연산 함수 객체 : 산술 연산 기능 수행
   - 비교 연산 함수 객체 조건자 : 비교 조건자

2. 함수 어댑터 : 함수류를 인자로 받아 다른 함수 객체로 변환
   - 바인더: 이항 함수 객체를 단항 함수 객체로 변환
   - 부정자 : 함수 객체 조건자를 반대로 변환
   - 함수 포인터 어댑터 : 함수 포인터를 STL이 요구하는 함수 객체로 변환
   - 멤버 함수 포인터 어댑터 : 멤버 함수 포인터를 함수 객체로 변환

# 3. 조건자

1. bool 형식을 반환하는 함수류
   - 함수 객체 조건자
   - 함수 조건자
   - 함수 포인터 조건자
2. STL에서 조건자?
   - 모두 함수 객체 조건자
   - 조건자는 객체의 상태값을 변경할 수 없음
   - operator() 연산자 오버로딩 함수는 모두 const

# 4. 어댑터

1. 함수 객체를 다른 함수 객체로 변환할 때 사용
2. 어댑터 인자로 사용되는 단항 함수 필요 조건
   - argument_type 정의 필요
   - result_type 정의 필요
3. 어댑터 인자로 사용되는 이항 함수 필요 조건
   - first_argument_type 정의
   - second_argument_type 정의
   - result_type 정의

```cpp
template<typename T>
struct Plus{
   typedef T first_argument_type;
   typedef T second_argument_type;
   typedef T result_type;

   T operator()(const T& left, const T& right) const{
      return left + right;
   }
};

vector<int> v1 = {10,20,30};
vector<int> v3(3);

// Plus 함수를 단항 함수로 변경
transform(
   v1.begin(),
   v1.end(),
   v3.begin(),
   binder1st<Plus<int>> (Plus<int>(), 100)
   );
// v3 = {110, 120 , 130}
```

4. 단항, 이항 함수 형식 정의 방법
   - 위 조건 정의 대신 아래 클래스 상속
   - unary_function : 단항 함수 정의시
   - binary_function : 이항 함수 정의시

```cpp
template<typename T>
struct Plus: public binary_function<T,T,T>{
   T operator()(const T& left, const T& right) const{
      return left+right;
   }
};

vector<int> v1 = {10,20,30};
vector<int> v3(3);

// Plus 함수를 단항 함수로 변경
transform(
   v1.begin(),
   v1.end(),
   v3.begin(),
   binder1st<Plus<int>> (Plus<int>(), 100)
   );
// v3 = {110, 120 , 130}
```

# 참고

1. 뇌를 자극하는 C++ STL
