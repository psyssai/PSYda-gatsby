---
title: "[STL-11] 알고리즘6-정렬된 범위 알고리즘"
category: "C++/STL"
date: "2020-06-28"
tags: ["C++", "STL", "algorithm"]
---

# 0. 정렬된 범위 알고리즘

1. 정렬된 구간에서만 동작하는 알고리즘
2. 원소가 같음 비교시 a==b 연산 사용 안함
3. 원소가 같은 비교시 !(a\<b) && !(b\<a) 사용

# 1. 정렬 알고리즘 리스트

| 알고리즘                                    | 설명                                                                                                                 |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| binary_search(b,e,x)                        | 구간 [b,e)의 순차열에 x와 같은 원소가 있는가?                                                                        |
| binary_search(b,e,x,f)                      | 구간 [b,e)의 순차열에 x와 같은 원소가 있는가? f를 비교에 사용                                                        |
| includes(b,e,b2,e2)                         | 구간 [b2,e2)의 모든 원소가 구간 [b,e)에도 있는가?                                                                    |
| includes(b,e,b2,e2,f)                       | 구간 [b2,e2)의 모든 원소가 구간 [b,e)에도 있는가? f를 비교에 사용                                                    |
| p=lower_bound(b,e,x)                        | p는 구간 [b,e) 순차열에서 x와 같은 첫 원소의 반복자                                                                  |
| p=lower_bound(b,e,x,f)                      | p는 구간 [b,e) 순차열에서 x와 같은 첫 원소의 반복자. f는 비교에 사용                                                 |
| p=upper_bound(b,e,x)                        | p는 구간 [b,e) 순차열에서 x 보다 큰 첫 원소의 반복자                                                                 |
| p=upper_bound(b,e,x,f)                      | p는 구간 [b,e) 순차열에서 x 보다 큰 첫 원소의 반복자. f를 비교에 사용                                                |
| pair(p1,p2)=equal_range(b,e,x)              | 구간 [p1,p2)의 순차열은 구간 [b,e)의 순차열에서 x와 같은 원소의 구간. [lower_bound(), upper_bound())의 순차열과 같음 |
| pair(p1,p2)=equal_range(b,e,x,f)            | equal_range(b,e,x)와 동일. f를 비교에 사용                                                                           |
| p=merge(b,e,b2,e2,t)                        | 구간[b,e)의 순차열과 구간 [b2,e2)의 순차열을 합병해 [t,p)에 저장                                                     |
| p=merge(b,e,b2,e2,t,f)                      | merge(b,e,b2,e2,t)과 동일. f를 비교에 사용                                                                           |
| inplace_merge(b,m,e)                        | 정렬된 [b,m) 순차열과 [m,e) 순차열을 [b,e)순차열로 합병                                                              |
| inplace_merge(b,m,e,f)                      | inplace_merge(b,m,e,f)와 동일. f를 비교에 사용                                                                       |
| p=set_union(b,e,b2,e2,t)                    | 구간 [b,e)의 순차열과 [b2,e2)의 순차열을 정렬된 합집합으로 [t,p)에 저장                                              |
| p=set_union(b,e,b2,e2,t,f)                  | set_union(b,e,b2,e2,t)와 동일. f를 비교에 사용                                                                       |
| p=set_intersection(b,e,b2,e2,t)             | 구간 [b,e)의 순차열과 [b2,e2)의 순차열을 정렬된 교집합으로 [t,p)에 저장                                              |
| p=set_intersection(b,e,b2,e2,t,f)           | set_intersection(b,e,b2,e2,t)과 동일. f를 비교에 사용                                                                |
| p=set_difference(b,e,b2,e2,t)               | 구간 [b,e)의 순차열과 [b2,e2)의 순차열을 정렬된 차집합 [t,p)에 저장                                                  |
| p=set_difference(b,e,b2,e2,t,f)             | set_difference(b,e,b2,e2,t)과 동일. f를 비교에 사용                                                                  |
| p=set \_symmetric_difference(b,e,b2,e2,t)   | 구간 [b,e)의 순차열과 [b2,e2)의 순차열을 정렬된 대칭 차집합으로 [t,p)에 저장                                         |
| p=set \_symmetric_difference(b,e,b2,e2,t,f) | set \_symmetric_difference(b,e,b2,e2,t)와 동일. f를 비교에 사용                                                      |

# 2. 상세 예시

1. binary_search(b,e,x)

   - 구간 [b,e)에서 x와 같은 원소가 있음 true

```cpp
vector<int> v = {10,20,30,40,50};
bool b = binary_search(v.begin(), v.end(), 20);
// b = true
```

2. binary_search(b,e,x,f)
   - f를 조건자(이항 함수)로 사용하여 찾음

```cpp
bool Pred(int left, int right){
   return 3 < right - left;
} // 오른쪽이 왼쪽보다 3보다 크면 참

vector<int> v = {40,46,12,80,10,47,30,55,90,53};
sort(v.begin(), v.end(), Pred);
// 조건자에 의한 정렬
// v = {12,10,30,40,46,47,55,53,80,90}
// 12와 10의 차이가 3보다 작기 때문에 12가 앞
// 55와 53의 차이가 3보다 작기 때문에 55가 앞

bool b = binary_search(v.begin(), v.end(), 32, Pred);
// b = true
// !Pred(30,32) => true 이고,
// !Pred(32,30) => true 이므로,
// 참조건 (!Pred(30,32)&&!Pred(32,30)) = true
```

3. includes(b,e,b2,e2)
   - [b,e) 에 [b2,e2)가 포함되면 true

```cpp
vector<int> v = {10,20,30,40,50};
vector<int> v2 = {10,20,40};
vector<int> v3 = {10,20,60};

bool b1 = includes(v1.begin(), v1.end()
                  ,v2.begin(), v2.end());
// b1 = true
// v2는 v에 포함되므로

bool b2 = includes(v1.begin(), v1.end(), v2.begin(), v2.end());
// b2 = false
// v3의 60은 v에 포함되지 않으므로

//조건자 사용
sort(v1.begin(), v1.end(), greater<int>());
sort(v2.begin(), v2.end(), greater<int>());
b1 = includes(v1.begin(), v1.end()
            , v2.begin(), v2.end()
            , greater<int>())
```

4. lower \_bound, upper \_bound, equal_range
   - 찾는 원소가 여러 개 일 때 반복자 반환
   - lower_bound : 첫 원소의 반복자 반환
   - upper_bound : 마지막 다음 원소 반복자 반환
   - equal_range : [lower_bound, upper_bound) pair 반환

```cpp
vector<int> v = {10,20,30,30,30,40,50};

auto lower = lower_bound(v.begin(), v.end(), 30);
auto upper = upper_bound(v.begin(), v.end(), 30);
auto eual = equal_range(v.begin(), v.end(), 30);
// lower = 첫 30을 가리킴
// upper = 마지막 30의 다음 40을 가리킴
// eqaul = (lower,upper)의 pair 형태

```

5. merge(b,e,b2,e2,t)
   - 정렬된 두 순차열을 목적지 순차열로 병합

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2 = {20,30,60};
vector<int> v3(10);

auto iter = merge(v1.begin(), v1.end()
                 ,v2.begin(), v2.end()
                 ,v3.begin());
// v3 = {10,20,20,30,30,40,50,60,0,0};
// iter -1 => 60을 가리킴
```

6. inplace_merge(b,m,e)
   - 하나의 순차열이 두 구간으로 정렬되어 있을 때
   - 하나의 구간으로 정렬 가능

```cpp
vector<int> v = {10,20,30,40,50,20,30,60};
// v => 10,20,30,40,50 과
// 20,30,60 의 두 개의 구간으로 정렬되어 있음

inplace_merge(v.begin(), v.begin()+5, v.end());
// v = {10,20,20,30,30,40,50,60} 으로 정렬됨
```

# 3. 집합 관련 알고리즘

1. set_union(b,e,b2,e2,t)
   - 두 순차열의 합집합을 구함
2. set_intersection(b,e,b2,e2,t)
   - 두 순차열의 교집합을 구함
3. set_difference(b,e,b2,e2,t)
   - 두 순차열의 차집합을 구함
4. set\_ symmetric_difference(b,e,b2,e2,t)
   - 두 순차열의 대칭 차집합을 구함

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2 = {20,30,60};
vector<int> v3(10);

// 1. 합집합
auto iter = set_union(
   v1.begin(), v1.end()
  ,v2.begin(), v2.end()
  ,v3.begin());
// v3 = {10,20,30,40,50,60,0,0,0,0}
// iter - 1 => 60을 가리킴

// 2. 교집합
auto iter = set_intersection(
   v1.begin(), v1.end()
  ,v2.begin(), v2.end()
  ,v3.begin());
// v3 = {20,30,0,0,0,0,0,0,0,0}
// iter - 1 => 30을 가리킴

// 3.차집합
auto iter = set_difference(
   v1.begin(), v1.end()
  ,v2.begin(), v2.end()
  ,v3.begin());
// v3 = {10,40,50,0,0,0,0,0,0,0}
// iter - 1 => 50을 가리킴

// 4. 대칭 차집합
auto iter = set_symmetric_difference(
   v1.begin(), v1.end()
  ,v2.begin(), v2.end()
  ,v3.begin());
// v3 = {10,40,50,60,0,0,0,0,0,0}
// iter - 1 => 60을 가리킴
```

# 참고

1. 뇌를 자극하는 C++ STL
