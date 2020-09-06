---
title: "[STL-12] 알고리즘7-수치 알고리즘"
category: "C++/STL"
date: "2020-07-02"
tags: ["C++", "STL", "algorithm"]
---

# 0. 수치 알고리즘

1. \<numeric> 헤더에 포함됨

# 1. 수치 리스트

| 알고리즘                         | 설명                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| x2=accumulate(b,e,x)             | x2는 x를 초기값으로 시작한 구간 [b,e) 순차열 원소의 합                                                        |
| x2=accumulate(b,e,x,f)           | x2는 x를 초기값으로 시작한 구간 [b,e) 순차열 원소의 누적. f를 누적에 사용                                     |
| x2=inner_product(b,e,b2,x)       | x2는 x를 초기값으로 시작한 구간 [b,e)와 구간 [b2,b2+e-b)의 내적(두 순차열의 곱의 합)                          |
| x2=inner_product(b,e,b2,x,f1,f2) | x2는 x를 초기값으로 시작한 구간 [b,e)와 구간 [b2,b2+e-b)의 모든 원소끼리 f2 연산 후 f1연산으로 총 연산한 결과 |
| p=adjacent_difference(b,e,t)     | 구간 [b,e)의 인접 원소와의 차를 순차열 [t,p)에 저장                                                           |
| p=adjacent_difference(b,e,t,f)   | 구간 [b,e)의 인접 원소와의 연산을 순차열 [t,p)에 저장. f를 연산에 사용                                        |
| p=partial_sum(b,e,t)             | 구간 [b,e)의 현재 원소까지의 합을 순차열 [t,p)에 저장                                                         |
| p=partial_sum(b,e,t,f)           | 구간 [b,e)의 현재 원소까지의 연산을 순차열 [t,p)에 저장. f를 연산에 사용                                      |

# 2. 상세 내용

1. accumulate(b,e,x)
   - 순차열 원소의 합을 구함

```cpp
vector<int> v = {10,20,30,40,50};
int sum = accumulate(v.begin(), v.end(), 0);
// sum = 150 = 0+10+20+30+40+50

int sum2 = accumulate(v.begin(), v.end(), 100);
// sum = 250 = 100+10+20+30+40+50+
```

2. accumulate(b,e,x,f)
   - 순차열 원소에 f함수 적용 가능
   - f는 이항 함수
   - 함수에 따라 누적합,누적곱 등 연산 가능

```cpp
// 1. Functor
template<typename T>
struct Plus{
   T operator() (const T& left, const T& right){
      return left+right;
   }
};

// 2. 클라이언트
void main(){
   vector<int> v = {1,2,3,4,5};
   // 사용자가 정의한 합함수
   int a = accumulate(v.begin(), v.end(), 0, Plus<int>());
   // a = 15 = 0+1+2+3+4+5

   // stl multiplies
   int mul = accumulate(v.begin(), v.end(), 1, multiplies<int>());
   // mul = 120 = 1 * 1 * 2 * 3 * 4 * 5
}
// 3. 서버
T accumulate(Iterator first, Iterator last, T x, Function fun){
   T ret = x;
   for(Iterator p = first; p != last ; ++p){
      ret = fun(ret, *p);
   }
   return ret;
}

```

3. inner_product(b,e,b2,x)
   - 두 순차열의 내적 계산

```cpp
vector<int> v1 = {1,2,3,4,5};
vector<int> v2 = {2,2,2,2,2};

int in = inner_product(v1.begin(), v1.end(), v2.begin(), 100);
// in = 130 = 100 + 1*2 + 2*2 + 3*2 + 4*2 + 5*2
```

4. inner_product(b,2,b2,x,f1,f2)
   - 다양한 원소 간의 연산과 누적 연산 수행 가능
   - 두 순차열의 원소끼리의 차이의 합을 계산하는 예제

```cpp
int Plus(int left, int right){
   return left+right;
}

int Minus(int left, int right){
   return left-right;
}

vector<int> v1 = {10,20,30,40,50};
vector<int> v2 = {2,2,2,2,2};

int a = inner_product(
   v1.begin(), v1.end()
   , v2.begin(), 0, Plus, Minus);
// a = 140 = 0 + 10 -2 + 20 - 2 + 30 -2 + 40 -2 + 50 - 2

//서버 예시
T inner_product(Iter first, Iter first2, T x, Func1 fun1, Func2 fun2){
   T ret = x;
   for(Iter p = first, q = first2; p != last; ++p, ++q){
      ret = fun1(ret, fun2(*p,*q))
   }
   return ret;
}
```

5. adjacent_difference(b,e,t)
   - 순차열에서 연속한 원소 간의 차 계산

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2(5);
auto iter = adjacent_difference(
   v1.begin(), v1.end(), v2.begin()
);
// v2 = {10, 10, 10, 10, 10}
// 1번 10 => 10
// 2번 10 => 20 - 10
// ...
// iter - 1 = > 마지막 10을 가리킴
```

6. adjacent_difference(b,e,t,f)
   - 인접 원소와의 사용자 정의 함수 수행
   - EX) 인접 원소 합을 저장

```cpp
int Plus(int left, int right){
   return left + right;
}

vector<int> v1 = {10,20,30,40,50}
vector<int> v2(5);
auto iter = adjacent_difference(
   v1.begin(), v1.end(), v2.begin(), Plus
);
// v2 = {10, 30, 50, 70, 90}
// 10 => 10
// 30 => 10 + 20
// ...
// iter - 1 = 90을 가리킴
```

7. partial_sum(b,e,t)
   - 순차열에서 시작부터 매 현재 원소까지의 합을 구함

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2(5);

auto iter = partial_sum(
   v1.begin(), v1.end(), v2.begin()
);
// v2 = {10, 30, 60, 100, 150}
// 10 => 10
// 30 => 10 + 20
// 60 => 10 + 20 + 30
// ...
// iter - 1 => 150을 가리킴
```

8. partial_sum(b,e,t,f)
   - 순차열에서 시작부터 매 현재 원소까지의 사용자 정의 연산을 수행함

```cpp
int Multi(int left, int right){
   return left * right;
}

vector<int> v1 = {10,20,30,40,50};
vector<int> v2(5);

auto iter = partial_sum(v1.begin(), v1.end(), v2.begin(), Multi);
// v2 = { 10, 200, 6000, 240000, 12000000}
// 10 => 10
// 200 => 10 * 20
// 6000 => 10 * 20 * 30
// ...
// iter - 1 => 12000000을 가리킴

```

# 참고

1. 뇌를 자극하는 C++ STL
