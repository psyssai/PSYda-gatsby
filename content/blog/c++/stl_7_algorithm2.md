---
title: "[STL] 알고리즘2-원소를 수정하는 알고리즘"
category: "C++/STL"
date: "2020-06-10"
tags: ["C++", "STL", "algorithm"]
---

# 1. 원소를 수정하는 알고리즘 리스트

| 알고리즘                                                | 설명                                                                                                                                                |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| p=copy(b,e,t)                                           | 구간 [b,e)의 원소를 [t,p)로 모두 복사                                                                                                               |
| p=copy_backward(b,e,t)                                  | 구간 [b,e)의 원소를 마지막 원소부터 [p,t)로 모두 복사                                                                                               |
| fill(b,e,x)                                             | 구간 [b,e)의 모든 원소를 x로 채움.                                                                                                                  |
| fill_n(b,n,x)                                           | 구간 [b,b+n)의 모든 원소를 x로 채움.                                                                                                                |
| f=for_each(b,e,f)                                       | 구간 [b,e)의 모든 원소에 f(\*p) 동작을 적용한다. f를 다시 되돌려 줌                                                                                 |
| generate(b,e,f)                                         | 구간 [b,e)의 모든 원소를 f()로 채움                                                                                                                 |
| generate_n(b,e,f) 구간 [b,b+n)의 모든 원소를 f()로 채움 |
| iter_swap(p,q)                                          | 반복자 p, q가 가리키는 *p와 *q의 원소를 교환                                                                                                        |
| p=merge(b,e,b2,e2,t)                                    | 정렬된 순차열 [b,e)와 [b2,e2)를 [t,p)로 합병 정렬                                                                                                   |
| p=merge(b,e,b2,e2,t,f)                                  | 정렬된 순차열 [b,e)와 [b2,e2)를 [t,p)로 합병 정렬. 이때 비교는 f를 사용                                                                             |
| replace(b,e,x,x2)                                       | 구간 [b,e)의 x인 원소를 x2로 수정                                                                                                                   |
| replace_if(b,e,f,x2)                                    | 구간 [b,e)의 f(\*p)가 참인 원소를 x2로 수정                                                                                                         |
| p=replace_copy(b,e,t,x,x2)                              | 구간 [b,e)의 x인 원소를 x2로 수정하여 [t,p)로 복사                                                                                                  |
| p=replace\\\_copy_if(b,e,t,f,x2)                        | 구간 [b,e)의 f(\*p)가 참인 원소를 x2로 수정하여 [t,p)로 복사                                                                                        |
| swap(a,b)                                               | a와 b를 교환                                                                                                                                        |
| swap_ranges(b,e,b2)                                     | 구간 [b,e)의 원소와 구간 [b2, b2+(e-b))의 원소를 교환                                                                                               |
| p=transform(b,e,t,f)                                    | 구간 [b,e)의 모든 원소를 f(\*p)하여 [t, t+(e-b))에 저장. p는 저장된 마지막 원소의 반복자 (t+(e-b)) 임                                               |
| p=transform(b,e,b2,t,f)                                 | 구간 [b,e)와 [b2, b2+(e-b))의 두 순차열의 반복자 p,q일 때 모든 원소를 f(*p, *q) 하여 [t,t+(e-b))에 저장. p는저장된 마지막 원소의 반복자(t+(e-b)) 임 |

# 2. 예시

1. copy()

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2(5);

auto iter = copy(v1.begin(), v1.end(), v2.end());
// v2에 v1의 값을 복사
// iter - 1 이 50을 가리킴
```

2. copy_backward()
   - v2의 마지막 위치 부터 데이터를 복사함

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2(10);

auto iter = copy_backward(v1.begin(), v1.end(), v2.end());
// v2 = 0, 0, 0, 0, 0, 10, 20, 30, 40, 50
// iter 는 10의 위치 가리킴
```

3. fill , fill_n
   - fill : 구간 [begin, end) 를 x로 채움
   - fill_n : begin부터 n개 개수만큼 x로 채움

```cpp
vector<int> v = {10,20,30,40,50};
fill(v.begin(), v.end(), 0);
// v를 0으로 채움
fill_n(v.begin(), 3, 55);
// v.begin 부터 3개 만큼을 55로 채움
```

4. for_each()
   - functor의 인자를 &로 줘서 값 변경 가능

```cpp
void Func(int& r){
   r += 5;
}  // 원소값에 5를 더함

vector<int> v = {10,20,30,40,50};

for_each(v.begin(), v.end(), Func);
// v의 모든 원소에 5를 더함
```

5. generate, generate_n
   - 순차열의 모든 원소를 단순한 동작의 값으로 수정
   - for_each와의 차이 => 함수의 매개변수로 순차열의 원소를 전달하지 않음
   - generate(b,e,f) : 구간[b,e)의 모든 원소를 f()로 채움
   - generate(b,n,f) : b부터 n개 만큼 원소를 f()로 채움

```cpp
class Integer{
   int data;
public:
   explicit Integer(int d= 0) : data(d) {}
   int operator()(){
      return data++;
   }
};

vector<int> v = {10,20,30,40,50};

generate(v.begin(), v.end(), Integer(1));
// v를 1,2,3,4,5 로 채움

generate_n(v.begin(), 3, Interger(100));
// v 의 시작부터 3개까지 원소를 100, 101, 102로 채움
```

6. swap , iter_swap

   - swap(a, b) : a와 b를 교환
   - iter_swap(p,q) : iter p와 q의 값을 교환

7. merge(b,e,b2,e2,t)
   - 정렬된 구간 [b,e) 와 [b2,e2)를 합병 정렬
   - 결과는 [t,t+(e-b)+(e2-b2))의 순차열
   - 반드시 정렬되어 있어야 가능함
   - default는 less(오름차순 정렬)
   - ex)

```cpp
vector<int> v1 = {10,30,50,60,80};
vector<int> v2 = {20,40,70};
vector<int> v3(10);
iter = merge(v1.begin(), v1.end(), v2.begin(), v2.end(), v3.begin());
//v3 = 10,20,30,40,50,60,70,80,0,0
//iter -1 => 80을 가리킴
```

8. merge(b,e,b2,e2,t,f)
   - f는 [b,e), [b2,e2)의 정렬 기준

```cpp
template<typename T>
struct Greater{
   bool operator()(const T& left, const T& right) const{
      return left > right;
   }
};

vector<int> v1 = {80,60,50,30,10};
vector<int> v2 = {70,40,20};
vector<int> v3(10);

iter = merge(v1.begin(), v1.end(), v2.begin(), v2.end(), v3.begin(), Greater<int>());
// v3 = 80,70,60,50,40,30,20,10,0,0
// iter - 1 => 10 가리킴
```

9. replace(b,e,x,x2)
   - 순차열의 특정 원소를 다른 값으로 수정
   - [b,e)구간의 x인 원소를 x2로 수정

```cpp
vector<int> v = {10,20,30,40,30,30,50};

replace(v.begin(), v.end(), 30, 0);
// v 모든 원소 중 30을 0으로 변경
// v = {10,20,0,40,0,0,50};
```

10. replace_if(b,e,f,x2)

    - [b,e) 구간에서 f(\*p)가 참인 원소를 x2로 변경

```cpp
bool Pred(int n){
   return 30 <= n && n <= 50;
} // n이 30~50 인 경우 true

vector<int> v = {10,20,30,40,50,60,70,80};

replace_if(v.begin(), v.end(), Pred, 0);
// v의 모든 원소 중 Pred가 참인 원소를 0으로 변경
// v = {10,20,0,0,0,60,70,80}
```

11. replace\\\_copy, replace\\\_copy_if
    - replace_copy(b,e,t,x,x2) : 구간 [b,e)에서 x를 x2로 변경 후 [t,p)로 복사
    - replace\\\_copy_if(b,e,t,f,x2) : 구간 [b,e)에서 f가 참인 원소를 x2로 변경 후 [t,p)로 복사

```cpp
bool Pred(int n){
   return n <= 30;
} // 30보다 작으면 참

vector<int> v1 = {10,20,30,40,30,50};
vector<int> v2(6);
vector<int> v3(6);

auto iter = replace_copy(v1.begin(), v1.end(), v2.begin(), 30, 0);
// v1의 모든 원소에서 30인 원소를 0으로 변환하여 [v2.begin(), iter) 에 저장

iter = replace_copy_if(v1.begin(), v1.end(), v3.begin(), Pred, 0);
// v1의 모든 원소에서 Pred가 참인 원소를 0으로 변환하여 [v3.begin(), iter) 에 저장
```

12. swap_ranges(b,e,b2)
    - 구간 [b,e)의 순차열과 [b2,b2+e-b)의 모든 원소를 교환

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2 = {11,22,33,44,55};

swap_ranges(v1.begin(), v1.end(), v2.begin());
// v1의 모든 원소와 v2의 원소를 교환
// v1 = {11,22,33,44,55}
// v2 = {10,20,30,40,50}

```

13. transform(b,e,t,f)
    - for_each()와의 차이점
    - => 원본의 순차열 변화 없이 목적지의 순차열로 저장
    - 구간 [b,e) 의 원소를 인자로 하는 함수 f를 호출
    - 반환값을 순차열 [t, t+(e-b))로 저장

```cpp
int FUnc(int n){
   return n+5;
} // n에 5를 더함

vector<int> v = {10,20,30,40,50};
auto iter = transform(v.begin(), v.end(), v.begin(), Func);
// v의 모든 원소에 5를 더함
// v => {15,25,35,45,55}
// iter - 1 => 50을 가리킴
```

14. transform(b,e,b2,t,f)
    - 두 순차열의 원소에 함수 적용
    - 구간 [b-e) 와 [b2, b2+(e-b))의 순차열 반복자를 함수 f에 인자로 전달
    - 그 결과를 순차열[t, t+(e-b))에 저장

```cpp
int Plus(int left, int right){
   return left+right;
}// left와 right를 더하는 함수

vector<int> v1 = {10,20,30,40,50};
vector<int> v2 = {1,2,3,4,5};
vector<int> v3(5);

auto iter = transform(v1.begin(), v1.end(), v2.begin(), v3.begin(), Plus);
// v1와 v2의 원소를 더해서 v3에 저장
// v3 => {11,22,33,44,55}
// iter - 1 => 55의 위치를 가리킴
```

# 참고

뇌를 자극하는 C++ STL
