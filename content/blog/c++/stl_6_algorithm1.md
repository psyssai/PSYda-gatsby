---
title: "[STL] 알고리즘1-원소를 수정하지 않는 알고리즘"
category: "C++/STL"
date: "2020-06-03"
tags: ["C++", "STL", "algorithm"]
---

# 1. 원소를 수정하지 않는 알고리즘 리스트

| 알고리즘                             | 설명                                                                                                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| p=adjacent_find(b,e)                 | p는 구간 [b,e) 원소 중 _p == _(p+1)인 첫 원소를 가리키는 반복자                                                                                                                       |
| p=adjacent_find(b,e,f)               | p는 구간 [b,e) 원소 중 f(_p, _(p+1))이 참인 첫 원소를 가리키는 반복자                                                                                                                 |
| n=count(b,e,x)                       | n은 구간 [b,e)의 원소 중 x의 개수                                                                                                                                                     |
| n = count_if(b,e,f)                  | n은 구간[b,e)의 원소 중 f(\*p) 가 참인 원소 개수                                                                                                                                      |
| equal(b,e,b2)                        | [b,e) 와 [b2, b2+(e-b)의 모든 원소가 같은가?                                                                                                                                          |
| equal(b,e,b2,f)                      | [b,e) 와 [b2, b2+(e-b)의 모든 원소가 f(*p, *q)가 참인가?                                                                                                                              |
| p=find(b,e,x)                        | p는 구간 [b,e)에서 x와 같은 첫 원소의 반복자                                                                                                                                          |
| p=find_end(b,e,b2,e2)                | p는 구간 [b,e)의 순차열 중 구간[b2,e2)의 순차열과 일치하는 순차열 첫 원소의 반복자. 단 [b2,e2)와 일치하는 순차열이 여러 개 라면 마지막 순차열 첫 원소의 반복자                        |
| p=find_end(b,e,b2,e2,f)              | p는 구간 [b,e)의 순차열 중 구간[b2,e2)의 순차열과 일치하는 순차열 첫 원소의 반복자. 단 [b2,e2)와 일치하는 순차열이 여러 개 라면 마지막 순차열 첫 원소의 반복자. 이 때 비교는 f를 사용 |
| p=find_first_of(b,e,b2,e2)           | p는 구간 [b,e)에서 구간 [b2, e2)의 원소 중 가은 원소가 발견된 첫 원소의 반복자                                                                                                        |
| p=find_first_of(b,e,b2,e2,f)         | p는 구간 [b,e)에서 구간 [b2,e2)의 원소 중 같은 원소가 발견된 첫 원소의 반복자. 이때 비교는 f를 사용                                                                                   |
| p=find_if(b,e,f)                     | p는 구간[b,e)에 f(\*p)가 참인 원소를 가리키는 반복자                                                                                                                                  |
| f=for_each(b,e,f)                    | 구간 [b,e)의 모든 원소에 f(\*p) 동작을 적용한다. f를 다시 되돌려 준다.                                                                                                                |
| lexicographical_compare(b,e,b2,e2)   | 구간 [b,e)의 순차열이 구간 [b2,e2)의 순차열보다 작다면 true, 아니면 false를 반환                                                                                                      |
| lexicographical_compare(b,e,b2,e2,f) | 구간 [b,e)의 순차열이 구간 [b2,e2)의 순차열보다 작다면 true, 아니면 false를 반환한다. 이때 작음은 [b,e)의 반복자 p와 [b2,e2)의 반복자 q에 대해 f(*p, *q)가 참이다.                    |
| k=max(a,b)                           | k는 a와 b 중 더 큰 것                                                                                                                                                                 |
| k=max(a,b,f)                         | k는 a와 b 중 더 큰 것. 이때 큰 것은 f(a,b)를 사용                                                                                                                                     |
| p=max_element(b,e)                   | p는 구간 [b,e)에서 가장 큰 원소의 반복자                                                                                                                                              |
| p=max_element(b,e,f)                 | p는 구간 [b,e)에서 가장 큰 원소의 반복자. 이때 비교는 f를 사용                                                                                                                        |
| k=min(a,b)                           | k는 a와 b중 더 작은 것                                                                                                                                                                |
| k=min(a,b,f)                         | k는 a와 b 중 더 작은 것. 이때 작은 것은 f(a,b)를 사용                                                                                                                                 |
| p=min_element(b,e)                   | p는 구간 [b,e)에서 가장 작은 원소의 반복자                                                                                                                                            |
| p=jmin_element(b,e,f)                | p는 구간 [b,e)에서 가장 작은 원소의 반복자. 이때 비교는 f를 사용                                                                                                                      |
| pair(p,q)=mismatch(b,e,b2)           | (p,q)는 구간 [b,e)와 [b2,b2+(e-b))에서 !(*p=*q)인 첫 원소를 가리키는 반복자의 쌍                                                                                                      |
| pair(p,q)=mismatch(b,e,b2,f)         | (p,q)는 구간 [b,e)와 [b2,b2+(e-b))에서 !f(*p,*q)가 참인 첫 원소를 가리키는 반복자의 쌍                                                                                                |
| p=search(b,e,b2,e2)                  | p는 구간 [b,e)의 순차열 중 구간 [b2,e2)의 순차열과 일치하는 순차열 첫 원소의 반복자(find_end()와 비슷하나 find_end()는 일치하는 순차열의 마지막 순차열의 반복자)                      |
| p=search(b,e,b2,e2,f)                | p는 구간 [b,e)와 순차열 중 구간 [b2,e2)의 순차열과 일치하는 순차열의 첫 원소의 반복자. 이때 비교는 f를 사용                                                                           |
| p=search_n(b,e,n,x)                  | p는 구간 [b,e)의 원소 중 x 값이 n개 연속한 첫 원소의 반복자                                                                                                                           |
| p=search_n(b,e,n,x,f)                | p는 구간 [b,e)의 원소 중 f(\*p,x)가 참인 값이 n개 연속한 첫 원소의 반복자                                                                                                             |

# 2. 범위 내에 순차열 포함 여부 찾기

1. iter = find_end(v1.begin(), v1.end(), v2.begin(), v2.end())
   - v1의 [begin,end) 범위에서 v2의 [begin,end) 순차열을 포함하는 제일 마지막 반복자 반환
   - ex)

```cpp
vector<int> v1 = {30,40,10,30,40};
vector<int> v2 = {30,40};

iter = find_end(v1.begin(), v1.end(), v2.begin(), v2.end());
// iter는 30의 두번째 위치를 반환

iter = search(v1.begin(), v1.end(), v2.begin(), v2.end());
// iter는 30의 첫번째 위치를 반환
```

2. iter = search(v1.begin(), v1.end(), v2.begin(), v2.end())

   - 위와 동일하지만 처음에 위치한 30의 위치 반환

3. iter = find_end(v1,begin(), v2.end(), v2.begin(), v2.end(), Pred)

   - Pred : d이항 함수(인자가 두개)
   - 범위 내에 비교하여 Pred함수가 모두 참인 구간 중 마지막 구간의 첫 원소의 위치를 반환

4. iter = search_n(v,begin(), v.end(), 3, 30)

   - [v.begin(), v.end()) 에서 30이 3번 연속한 첫 원소의 반복자 반환

5. iter = find_first_of(v1.begin(), v1.end(), v2.begin(), v2.end())
   - v1의 구간 [begin, end) 순차열에서 v2의 구간 [begin,end) 원소 중 같은 원소가 처음으로 발견되는 첫 원소의 반복자 반환
   - ex)

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2 = {40,80,20};

iter = find_first_of(v1.begin(), v1.end(), v2.begin(), v2.end())
// 20의 위치를 반환

```

6. iter = find_first_of(v1.begin(), v1.end(), v2.begin(), v2.end(), Pred)
   - Pred : 이항 연산자
   - Pred 함수가 청므으로 참이 나오는 위치 반환
   - ex)

```cpp
bool Pred(int left, int right){
   return left > right;
} // 왼쪽 요소가 오른쪽 요소보다 크면 참

vector<int> v1 = {10,20,30,40,50};
vector<int> v2 = {40,80,20};

iter = find_first_of(v1.begin(), v1.end(), v2.begin(), v2.end(), Pred)
// 30이 처음으로 20보다 크모 30 위치 반환
// 10 < 40, 20 < 80, 30 >20

```

# 3. 기타

1. iter=adjacent(v.begin(),v.end()
   - v의 연속된 원소가 같아지는 첫 원소의 반복자 반환
   - 10,20,30,30인 경우 첫 30의 반복자 반환
   - 못찾으면 v.end()를 반환
   - 이항 조건자를 인자로 줘서 여러 조건으로 판단 가능

```cpp
bool Pred(int a, int b){
   return abs(b-e) > 10;
} // 연속된 두 수의 절대값이 10보다 크면 참

iter = adjacent_find(v.begin(), v.end(), Pred)
// Pred 함수가 처음으로 참인 반복자 반환
```

2. int n = count(v.begin(), v.end(), 30)

   - [v.begin(),v.end()) 범위에서 30의 개수 리턴

3. int n = count_if(v.begin(), v.end(), Pred)

   - [v.begin(),v.end()) 범위에서 Pred 함수가 참인 개수 리턴

4. equal(v1.begin(),v1.end(),v2.begin())

   - v1의 begin~end 범위의 데이터가 v2와 같으면 참

5. eqaul(v1.begin(),v1.end(),v2.begin(),Pred)
   - v1의 begin~end 범위의 데이터와 v2의 데이터가 Pred 함수 인자로 들어가서 모두 참이면 참

```cpp
bool Pred(int left, int right){
   return abs(right-left) < 5;
} // 두 원소의 차이가 5보다 작으면 참

vector<int> v1 = {10,21,30};
vector<int> v2 = {10,20,33};

bool b = equal(v1.begin(), v1.end(), v2.begin(), Pred)
// b는 true
```

6. for_each(v.begin(), v.end(), Print)
   - Print : 요소와 같은 형태의 인자를 가지는 단항 함수
   - v의 [begin,end) 범위의 요소를 Print 함수에 전달하여 함수 수행
   - 함수 객체를 전달하면 다양한 형태로 사용 가능
   - ex)

```cpp
struct PrintFunctor{
   char fmt;
   explicit PrintFunctor(char c='') : fmt(c){}
   void operator()(int n)const {
      cout<<n<<fmt;
   }
}

for_each(v.begin(), v.end(), PrintFunctor());
// 원소 구분을 ''로 하여 출력
for_each(v.begin(), v.end(), PrintFunctor(,));
// 원소 구분을 ,로 하여 출력
```

7. 순차열 사전순 비교

   - lexicographical_compare(v1.begin(), v1.end(), v2.begin(), v2.end())
   - => v1과 v2의 순차열 비교하여 v2가 크면 true 반환
   - ex) v1 = [10,20,30], c2=[10,20,50]
   - => true 반환
   - greater<int>() 를 인자로 추가하여 비교 기준 변경

8. max(pt1, pt2, XCompare)

   - Xcompare는 Point의 x좌표를 비교하는 이항 함수
   - Point 객체의 x좌표를 비교해 큰 객체 반환

9. iter = max_element(v.begin(), v.end())

   - v의 구간 [begin,end)에서 max값의 위치 반환

10. iter = min_element(v.begin(), v.end())

    - v의 구간 [begin,end)에서 min값의 위치 반환

11. iter = max_element(v.begin(), v.end(), Comp)

    - 벡터의 원소가 객체일 경우 비교 방법 Com 함수(이항 함수) 정의

12. iter_p = mismatch(v1.begin(), v1.end(), v2.begin())

    - v1과 v2의 원소가 다른 첫 위치를 반환
    - 반환값은 v1과 v2의 위치를 담은 pair 객체

# 참고

뇌를 자극하는 C++ STL
