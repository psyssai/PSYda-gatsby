---
title: "[STL-14] 함수 객체 - 산술 연산 함수 객체"
category: "C++/STL"
date: "2020-07-10"
tags: ["C++", "STL", "function obejct", "함수 객체"]
---

# 1. STL에서 제공하는 산술 연산 함수 객체

| 함수명         | 내용      | 인자 |
| -------------- | --------- | ---- |
| plus\<T>       | 더하기    | 이항 |
| minus\<T>      | 빼기      | 이항 |
| multiplies\<T> | 곱하기    | 이항 |
| divides\<T>    | 나누기    | 이항 |
| modulus\<T>    | 나머지    | 이항 |
| negate\<T>     | 부호 변경 | 단항 |

# 2. 사용 법

1. plus\<T>
   - 헤더 추가 : \<functional>
   - 일반적으로 아래 방법 사용
   - plus\<int>()(10, 20);

```cpp
plus<int> Plus;   // 객체 생성

// 1. 암묵적 호출
oPlus(10, 20);

// 2. 명시적 호출
oPlus.operator()(10,20);

// 3. 임시 객체로 암묵적 호출(일반적인 사용)
plus<int>()(10,20);

// 4. 임시 객체로 명시적 호출
plus<int>().operator()(10,20);
```

# 3. 알고리즘과 같이 사용하는 예

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2 = {1,2,3,4,5};
vector<int> v3(5);

//1. plus<int>()
transform(v1.begin(), v1.end(), v2.begin(), v3.begin(), plus<int>());
// v3 = {11,22,33,44,55}

//2. multiplies<int>()
transform(v1.begin(), v1.end(), v2.begin(), v3.begin(), multiplies<int>());
// v3= {10, 40, 90,  160, 250}

//3. negate<int>() : 부호 변경
transform(v1.begin(), v1.end(), v3.begin(), negate<int>());
// v3 = {-10, -20, -30, -40, -50}

// 4. minus<int>() + 인접 원소와의 차이
adjacent_difference(
   v1.begin(),
   v1.end(),
   v3,begin(),
   minus<int>()
);
// v3 = {10, 10, 10, 10, 10}

// 5.multiplies<int>() + 곱 누적
partial_sum(
   v1.begin(),
   v1.end(),
   v3.begin(),
   multiplies<int>()
);
// v3 = {10, 200, 6000, 240000, 12000000}

// 6.multiplies<int>() + 모든 원소 곱
int mul = accumulate(
   v1.begin(),
   v1.end(),
   1,
   muliplies<int>()
);
// mul = 12000000
```

# 참고

1. 뇌를 자극하는 C++ STL
