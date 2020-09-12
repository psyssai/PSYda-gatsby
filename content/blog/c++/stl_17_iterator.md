---
title: "[STL-17] 반복자"
category: "C++/STL"
date: "2020-07-20"
tags: ["C++", "STL", "iterator", "반복자"]
---

# 1. 반복자 개요

1. 반복자란?
   - 포인터를 추상화한 클래스
   - 포인터가 하지 못하는 더 많은 동작 가능
2. 반복자의 종류
   - 입력 반복자 : 전방향 읽기(istream)
   - 출력 반복자 : 전방향 쓰기(ostream)
   - 순방향 반복자 : 전방향 읽기,쓰기
   - 양방향 반복자 : 양방향 읽기, 쓰기(list, set, multiset, map, multimap)
   - 임의 접근 반복자 : 랜덤 읽기, 쓰기(vector, deque)
3. 반복자 종류에 따른 가능 연산

| 반복자           | 가능 연산                                             |
| ---------------- | ----------------------------------------------------- |
| 입력 반복자      | \*iter, ->, ++, ==,!=, iterator(iter)                 |
| 출력 반복자      | \*iter=x, ++, iterator(iter)                          |
| 순방향 반복자    | \*iter, ->, ++, == , =, iterator(), iterator(iter)    |
| 양방향 반복자    | 순방향 반복자 기능 + -\-                              |
| 임의 접근 반복자 | 양방향 반복자 기능 + , [], +=, -=, +, -, <, >, <=, >= |

4. 순차열

   - 순서 있는 원소의 집합

5. 구간
   - 순차열의 시작과 끝을 나타내는 반복자의 쌍으로 표현
   - [begin, end) : begin은 순차열 원소에 포함되지만, end는 포함되지 않음
   - ex) 10, 20, 30, 40, 50, 60
   - iter = 30 일 경우
   - [begin, end) => 10, 20, 30, 40, 50
   - [begin, iter) => 10, 20
   - [iter, end) => 30, 40, 50

# 2. 반복자 상세

| 종류                     | 방향   | 쓰기 |
| ------------------------ | ------ | ---- |
| iterator                 | 정방향 | O    |
| const_iterator           | 정방향 | X    |
| reverse_iterator         | 역방향 | O    |
| const\_ reverse_iterator | 역방향 | X    |

1. const 키워드 + 반복자

   - 반복자가 가리키는 원소의 위치 변경 안할 때 사용

2. 역방향 반복자

   - 반복자가 가리키는 다음 원소의 값을 참조함
   - ex) 10,20,30,40,50 일 때
   - rbegin 은 end()를 가리키고, 50을 참조
   - rend 는 10을 가리키고, 10 한칸 앞을 참조

```cpp
vector<int> v = {10,20,30,40,50};
vector<int>::iterator iter = v.begin();
vector<int>::const_iterator citer = v.begin();
const vector<int>::iterator const_iter = v.begin();
const vector<int>::const_iterator const_citer = v.begin();

// 값 대입
*iter  = 100; *const_iter = 100;   // 가능
*citer = 100; *const_citer = 100;  // 불가능

// 반복자 변경
**iter; ++citer;              // 가능
++const_iter , ++const_citer; // 불가능

// 역방향 반복자
for(vector<int>::reverse_iterator riter v.rbegin(); riter != v.rend(), +riter){
   cout << *riter << " ";
}
cout << endl;
// 50,40,30,20,10 출력됨


```

# 3. 삽입 반복자

1. 순차열에 원소를 삽입 할 수 있게 반복자를 변환하는 어댑터

   - 기본은 덮어쓰기 모드로 동작

2. inserter()

   - insert_iterator 객체 생성
   - 컨테이너의 insert() 멤버 함수 호출
   - 삽입모드로 동작하게 함
   - 모든 컨테이너 사용 가능

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2;
copy(v1.begin(), v1.end(), v2.begin());
// copy 알고리즘은 덮어쓰기 모드로 동작하므로
// v2의 size가 0 이여서 오류 발생함

copy(v1.begin(), v1.end(), inserter<vector<int>>(v2, v2.begin()));
// 삽입 모드로 변경
// v2  = {10,20,30,40,50};
```

3. back_inserter()

   - back_insert \_iterator 객체 생성
   - 컨테이너의 push_back() 멤버 함수 호출
   - 뒤쪽에 삽입함
   - vector, deque, list 만 사용 가능

4. front_inserter()
   - front_insert \_iterator 객체 생성
   - 컨테이너의 push_front() 멤버 함수 호출
   - 앞쪽에 삽입함
   - deque, list만 사용 가능

```cpp
vector<int> v = {10,20,30,40,50};
list<int> lt1 = {1,2,3};
list<int> lt2 = {1,2,3};

copy(v.begin(), v.end(), back_inserter<list<int>>(lt1));
// lt1 = {1,2,3,10,20,30,40,50}

copy(v.begin(), v.end(), front_inserter<list<int>>(lt2));
// lt2 = {50,40,30,20,10,1,2,3}
```

# 4. 입/출력 스트림 반복자

1. istream_iterator\<T>
   - 입력 스트림과 연결된 반복자
   - T 형식의 값을 스트림에서 읽을 수 있음
2. ostream_iterator\<T>

   - 출력 스트림과 연결된 반복자
   - T 형식의 값을 스트림에 쓸 수 있음

```cpp
vector<int> v = {10,20,30,40,50};
copy(v.begin(), v.end(), ostream_iterator<int>(cout));
// 1020304050 이 출력됨
copy(v.begin(), v.end(), ostream_iterator<int>(cout, ","));
// 10,20,30,40,50 이 출력됨

list<int> lt = {100,200,300};
transform(
   lt.begin(), lt.end(), v.begin(),
   ostream_iterator<int>(cout, " "),
   plus<int>());
// 110 220 330 이 출력됨

//istream_iterator
vector<int> v2;
copy(
   istream_iterator<int>(cin),
   istream_iterator<int>(),
   back_inserter<vector<int>>(v));
// 사용자 입력을 받아 v 에 push_back

copy(
   istream_iterator<int>(cin),
   istream_iterator<int>(),
   ostream_iterator<int>(cout, " "));
// 사용자 입력을 받아 cout으로 출력
// ctrl + D 를 누르면 입력 종료
```

# 5. 반복자 특성과 보조 함수

1. 반복자 특성이란?
   - 각 반복자의 특징을 저장하는 템플릿 클래스
   - 사용자 알고리즘 구현 할 때 STL 알고리즘 처럼 일반화하면서 반복자 종류의 특징에 따라 효율적인 동작을 하는 알고리즘을 구현하려면 STL이 제공하는 반복자 특성 활용 필요
2. iterator_traits
   - 모든 반복자의 공통된 인터페이스
   - 모든 반복자가 제공하는 다섯 정보를 가지고 있음

```cpp
template<class Iter>
struct iterator_traits{
   typedef typename Iter::iterator_category iterator_category
   typedef typename Iter::value_type value_type;
   typedef typename Iter::difference_type difference_type;
   typedef typename Iter::pointer pointer;
   typedef typename Iter::reference reference;
}
```

3. 반복자 태그(5개)
   - 반복자의 종류를 구분하기 위해 사용

```cpp
struct input_iterator_tag {...};
struct output_iterator_tag{...};
struct forward_iterator_tag
   :public input_iterator_tag{...};
struct bidirectional_iterator_tag
   :public forward_iterator_tag{...};
struct random_access_iterator_tag
   :public bidirectional_iterator_tag{...};
```

4. 사용자 함수 구현 예시

```cpp
//vector
template<typename T>
class Vector{
public:
   class Iterator{
      typedef random_access_iterator_tag iterator_category;
      typedef T value_type;
      typedef int difference_type;
      typedef T* pointer;
      typedef T& reference;
      void operator+=(int) { }
   }
      Iterator Begin() {
      return Iterator();
   }
}

//list
template<typename T>
class List{
public:
   class Iterator{
      typedef bidirectional_iterator_tag iterator_category;
      typedef T value_type;
      typedef int difference_type;
      typedef T* pointer;
      typedef T& reference;
      void operator++() { }
   }
   Iterator Begin() {
      return Iterator();
   }
}

// advance(양방향 반복자) 오버로딩
template<typename Iter>
void _Advance(Iter& iter,
            int n,
            bidirectional_iterator_tag category_tag){
   for(int i = 0; i < n; i++){
      ++iter;
   }
}

// advance(임의 접근 반복자) 오버로딩
template<typename Iter>
void _Advance(Iter& iter,
            int n,
            random_access_iterator_tag category_tag){
   iter += n;
}

// Advance() 반복자 보조 함수
template<typename Iter>
void Advance(Iter& iter, int n){
   _Advance(iter, n, iterator_traits<Iter>::iterator_category());
}

// 사용 예시
Vector<int> v = {10,20,30};
List<int> v = {10,20,30};

Vector<int>::Iterator viter(v.Begin());
List<int>::Iterator liter(lt.Begin());

Advance(viter, 2);
Advance(liter, 2);
```

# 6. 보조 함수

1. advance(p, n)

   - p 반복자를 p += n의 위치로 이동

2. n=distance(p1, p2)
   - n은 p2 - p1
   - distance(v.begin(),v.end()) = 원소 개수

# 참고

1. 뇌를 자극하는 C++ STL
