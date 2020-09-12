---
title: "[STL-18] 컨테이너 어댑터"
category: "C++/STL"
date: "2020-07-24"
tags: ["C++", "STL", "adapter", "container adapter"]
---

# 1.stack

1. 기본 컨테이너는 deque
2. 템플릿 형식
   - T : 원소 형식
   - Conatiner : stack에 사용될 컨테이너

```cpp
template<typename T,
         typename Container=deque<T>>
class stack
```

3. 멤버 형식

| 멤버 형식      | 내용                                                |
| -------------- | --------------------------------------------------- |
| value_type     | Container::value_type, T형식                        |
| size_type      | Container::size_type, 첨자 또는 원소 개수 등의 형식 |
| container_type | Container 형식, 기본 deque                          |

4. 생성자

```cpp
explicit stack(const Container& = Container())
// 컨테이너 기본 생성자 호출해 stack을 생성하거나
//인자로 받아 stack을 생성
```

5. 멤버 함수

```cpp
bool empty() const             // 원소가 없는가?
size_type size() const         // 원소의 개수
void push(const vluae_type& x) // 원소 추가
void pop()                     // 원소 제거
value_type& top()              // Top 원소의 참조
const value_type& top() const  // const 객체 Top 원소 참조
```

6. 예제

```cpp
#include<stack>
stack<int> st;
st.push(10);   // 원소 추가
st.push(20);
st.push(30);

while(!st.empty()){
   cout<< st.top() << endl; // Top 원소 꺼내기
   st.pop(); // 원소 제거
}
```

# 2. queue 컨테이너

1. 기본 컨테이너는 deque
2. 템플릿 형식
   - T : 원소 형식
   - Conatiner : queue에 사용될 컨테이너

```cpp
template<typename T,
         typename Container=deque<T>>
class queue
```

3. 멤버 형식

| 멤버 형식      | 내용                                                |
| -------------- | --------------------------------------------------- |
| value_type     | Container::value_type, T형식                        |
| size_type      | Container::size_type, 첨자 또는 원소 개수 등의 형식 |
| container_type | Container 형식, 기본 deque                          |

4. 생성자

```cpp
explicit queue(const Container& = Container())
// 컨테이너 기본 생성자 호출해 queue을 생성하거나
//인자로 받아 queue를 생성
```

5. 멤버 함수

```cpp
bool empty() const             // 원소가 없는가?
size_type size() const         // 원소의 개수
void push(const vluae_type& x) // 원소 추가
void pop()                     // 원소 제거
value_type& front()            // 첫 원소 참조
value_type& back()              // 마지막 원소의 참조
const value_type& front() const // const 객체 첫 원소 참조
const value_type& back() const   // const 객체 마지막 원소 참조
```

6. 예제

```cpp
#include<queue>
queue<int, list<int>> q;
q.push(10);   // 원소 추가
q.push(20);
q.push(30);

while(!q.empty()){
   cout<< q.front() << endl; // Top 원소 꺼내기
   q.pop(); // 원소 제거
}
```

# 3. priority_queue 컨테이너

1. 들어간 순서에 상관없이 우선순위가 높은 데이터나 나옴

2. STL에서 priority_queue
   - STL의 힙 알고리즘(make_heap, push_heap, pop_heap)을 사용해 구현
   - 임의 접근 반복자를 제공해야함(vector 또는 deque)
3. 기본 컨테이너는 vector
4. 템플릿 형식
   - T : 원소 형식
   - Conatiner : priority_queue에 사용될 컨테이너, 기본 vector
   - Comp : 우선순위를 결정할 정렬 기준, 기본 less

```cpp
template<typename T,
         typename Container=deque<T>,
         typename Comp=less<typename Container::value_type>>
class priority_queue
```

5. 멤버 형식

| 멤버 형식      | 내용                                                |
| -------------- | --------------------------------------------------- |
| value_type     | Container::value_type, T형식                        |
| size_type      | Container::size_type, 첨자 또는 원소 개수 등의 형식 |
| container_type | Container 형식, 기본 vector                         |

6. 생성자

```cpp
explicit priority_queue(
   const Comp& = Comp(),
   const Container& = Container())
// 컨테이너 기본 생성자 호출해 queue을 생성하거나
//인자로 받아 priority_queue를 생성
```

7. 멤버 함수

```cpp
bool empty() const             // 원소가 없는가?
size_type size() const         // 원소의 개수
void push(const vluae_type& x) // 원소 추가
void pop()                     // 원소 제거
value_type& top()              // Top 원소의 참조
const value_type& top() const   // const 객체 Top 원소 참조
```

8. 예제

```cpp
#include<queue>
priority_queue<int> pq1;
pq1.push(40);   // 원소 추가
pq1.push(20);
pq1.push(30);
pq1.push(50);
pq1.push(10);

while(!pq1.empty()){
   cout<< pq1.top() << endl; // Top 원소 꺼내기
   // 50 40 30 20 10 (less)
   pq1.pop(); // 원소 제거
}

priority_queue<int, deque<int>, greater<int>> pq2;
pq2.push(40);   // 원소 추가
pq2.push(20);
pq2.push(30);
pq2.push(50);
pq2.push(10);

while(!pq2.empty()){
   cout<< pq2.top() << endl; // Top 원소 꺼내기
   // 10 20 30 40 50 (greater)
   pq2.pop(); // 원소 제거
}

```

# 참고

1. 뇌를 자극하는 C++ STL
