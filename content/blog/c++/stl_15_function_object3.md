---
title: "[STL-15] 함수 객체 - 비교/논리 연산 조건자"
category: "C++/STL"
date: "2020-07-12"
tags: ["C++", "STL", "function obejct", "함수 객체"]
---

# 1. STL에서 제공하는 연산 조건자

1. 비교 연산 조건자
   - 아래 함수 객체는 모두 이항 조건자

| 함수명             | 내용 |
| ------------------ | ---- |
| equal_to\<T>       | ==   |
| not \_equal_to\<T> | !=   |
| less\<T>           | <    |
| less_equal\<T>     | <=   |
| greater\<T>        | >    |
| greater_equal\<T>  | >=   |

2. 논리 연산 조건자

| 함수명          | 내용 | 인자 |
| --------------- | ---- | ---- |
| logical_and\<T> | &&   | 이항 |
| logical_or\<T>  | \|\| | 이항 |
| logical_not\<T> | !    | 단항 |

# 2. 연산 조건자 사용 법

1. less\<T>
   - 헤더 추가 : \<functional>
   - 일반적으로 아래 방법 사용
   - less\<int>()(10, 20);

```cpp
less<int> oLess;   // 객체 생성

// 1. 암묵적 호출
oLess(10, 20);

// 2. 명시적 호출
oLess.operator()(10,20);

// 3. 임시 객체로 암묵적 호출(일반적인 사용)
less<int>()(10,20);

// 4. 임시 객체로 명시적 호출
less<int>().operator()(10,20);
```

2. logical_and
   - 헤더 추가 : \<functional>

```cpp
int n = 30;
logical_and<bool> oAnd;

// 1. 암묵적 호출
oAnd(
   greator<int>()(n,10),
   less<int>()(n, 50)
);
// n이 10보다 크고, 50 보다 작은가? true

// 2. 명시적 호출
oAnd.operator()(
   greator<int>()(n,10),
   less<int>()(n, 50)
);

// 3. 임시 객체로 암묵적 호출(일반적 사용)
logical_and<bool>()(
   greator<int>()(n,10),
   less<int>()(n, 50)
);

// 4. 임시 객체로 명시적 호출
logical_and<bool>().operator()(
   greator<int>()(n,10),
   less<int>()(n, 50)
);
```

# 3. 사용자 정의 구현

1. less
   - binary_function 상속
   - 첫번째 , 두번째 인자 : T
   - 리턴 인자 : bool
   - operator 함수는 const

````cpp
template<typename T>
struct Less: public binary_function<T,T,bool>{
   bool operator()(const T& left, const T& right) const{
      return left < right;
   }
};

2. logical_and
```cpp
template<typename T>
struct Logical_and: public binary_function<T,T,bool>{
   bool operator()(const T& left, const T& right) const{
      return left && right;
   }
}
````

# 4. 알고리즘과 같이 사용하는 예

1. count_if 로 같이 사용 예
   - count_if는 단항 조건자를 요구
   - bind2nd\<T> 어댑터 사용하여 이항 조건자를 단항 조건자로 변경

```cpp
vector<int> v = {10,20,30,40,50};
// 1. 20보다 작은 원소 개수
count_if(
   v.begin(),
   v.end(),
   bind2nd<less<int>>(
      less<int>(), 20
      )
);
// 1개

// 2. 20보다 작거나 같은 원소 개수
count_if(
   v.begin(),
   v.end(),
   bind2nd<less_equal<int>>(
      less_equal<int>(), 20
      )
);
// 2 개

// 3. 20보다 큰 원소 개수
count_if(
   v.begin(),
   v.end(),
   bind2nd<greater<int>>(
      greater<int>(), 20
      )
);
// 3개

// 4. 20보다 크거나 같은 원소 개수
count_if(
   v.begin(),
   v.end(),
   bind2nd<greater_equal<int>>(
      greater_equal<int>(), 20
      )
);
// 4개

// 5. 20과 같은 원소 개수
count_if(
   v.begin(),
   v.end(),
   bind2nd<equal_to<int>>(
      equal_to<int>(), 20
      )
);
// 1 개

// 5. 20과 다른 원소 개수
count_if(
   v.begin(),
   v.end(),
   bind2nd<not_equal_to<int>>(
      not_equal_to<int>(), 20
      )
);
// 4 개

```

# 참고

1. 뇌를 자극하는 C++ STL
