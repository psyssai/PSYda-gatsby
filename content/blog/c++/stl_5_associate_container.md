---
title: "[STL] 연관 컨테이너"
category: "C++/STL"
date: "2020-05-29"
tags: ["C++", "STL", "set"]
---

# 0. 연관 컨테이너

1. 모든 연관 컨테이너는 노드 기반 컨테이너
2. 모든 연관 컨테이너는 균형 이진 트리
3. 모든 연관 컨테이너는 같은 인터페이스 제공
4. 찾기 연산에 뛰어난 성능을 보임(로그 시간)
5. 삽입 또한 로그 시간 복잡도
6. 기본 정렬은 less(오름차순 정렬)
7. 종류
   - set : key값의 집합, 중복 허용 안함
   - multiset : set인데 중복 허용
   - map : key, value쌍의 집합, 중복 허용 안함
   - multimap : map인데 중복된 key값 허용

# 1. set 컨테이너

1. key값의 집합을 가지는 컨테이너
2. 템플릿 형식

```cpp
template<typename key,
         typename Pred=less<Key>,
         typename Allocator=allocator<Key>
>
class set
```

3. **<span style="color:red">생성자</span>**

   | 코드            | 내용                                                                    |
   | --------------- | ----------------------------------------------------------------------- |
   | set s           | s는 빈 컨테이너                                                         |
   | set s(pred)     | s는 빈 컨테이너로 정렬 기준은 pred 조건자 사용                          |
   | set s(s2)       | s는 s2 컨테이너의 복사본(복사 생성자 호출)                              |
   | set s(b,e)      | s는 반복자 구간 [b,e)로 초기화된 원소 가짐                              |
   | set s(b,e,Pred) | s는 반복자 구간[b,e)로 초기화된 원소 가짐(정렬 기준은 pred 조건자 사용) |

4. **<span style="color:red">멤버 함수</span>**

   | 코드                | 내용                                                                                     |
   | ------------------- | ---------------------------------------------------------------------------------------- |
   | p=s.begin()         | p는 s의 첫원소를 가리키는 반복자                                                         |
   | p=s.end()           | p는 s의 끝을 나타내는 반복자                                                             |
   | s.clear()           | s의 모든 원소 제거                                                                       |
   | s.empty()           | s가 비었는지 조사                                                                        |
   | n=s.count(k)        | 원소 k의 개수 반환                                                                       |
   | pr=s.equal_range(k) | pr은 k 원소의 반복자 구간인 pair 객체                                                    |
   | q=s.erase(p)        | p가 가리키는 원소 제거(q는 다음 원소 가리킴)                                             |
   | q=s.erase(b,e)      | 반복자 구간[b,e)의 모든 원소를 제거(q는 다음 원소)                                       |
   | n=s.erase(k)        | k 원소를 모두 제거, n은 제거 개수                                                        |
   | pr=s.insert(k)      | s 컨테이너에 k 삽입. pr은 삽입한 원소를 가리키는 반복자와 성공 여부의 bool값인 pair 객체 |
   | q=s.insert(p,k)     | p가 가리키는 위치부터 빠르게 k를 삽입. q는 삽인한 원소를 가리킴                          |
   | s.insert(b,e)       | 반복자 구간[b,e)의 원소를 삽입                                                           |
   | pred=s.key_comp()   | s의 key 정렬 기준인 조건자 반환(pred)                                                    |
   | pred=s.value_comp() | s의 value 정렬 기준인 조건자 반환(pred)                                                  |
   | p=s.lower_bound(k)  | p는 k의 시작 구간을 나타내는 반복자                                                      |
   | p=s.upper_bound(k)  | p는 k의 끝 구간을 가리키는 반복자                                                        |
   | n=s.max_size()      | n는 s가 담을 수 있는 최대 원소 개수(메모리 크기)                                         |
   | p=s.rbegin()        | p는 s의 역 순차열의 첫 원소를 가리키는 반복자                                            |
   | p=s.rend()          | p는 s의 역 순차열의 끝을 표식하는 반복자                                                 |
   | s.size()            | s 원소의 개수                                                                            |
   | s.swap(s2)          | s와 s2를 swap                                                                            |

5) **<span style="color:red">연산자</span>**

   | 코드    | 내용                              |
   | ------- | --------------------------------- |
   | s1==s2  | s1과 s2의 모든 원소가 같은가?     |
   | s1!=s2  | s1과 s2의 원소중 하나라도 다른가? |
   | s1 < s2 | 문자열 비교처럼 s2가 s1보다 큰가? |

6) **<span style="color:red">멤버 형식</span>**

| 코드                   | 내용                                |
| ---------------------- | ----------------------------------- |
| allocator_type         | 메모리 관리자 형식                  |
| const_iterator         | const 반복자 형식                   |
| const_pointer          | const value_type\* 형식             |
| const_reference        | const value_type& 형식              |
| const_reverse_iterator | const 역 반복자 형식                |
| difference_type        | 두 반복자 차이의 형식               |
| iterator               | 반복자 형식                         |
| key_compare            | 키 조건자 형식                      |
| key_type               | key의 형식                          |
| pointer                | value_type\* 형식                   |
| reference              | value_type& 형식                    |
| reverse_iterator       | 역 반복자 형식                      |
| size_type              | 첨자(index)나 원소의 개수 등의 형식 |
| value_compare          | 원소 조건자 형식                    |
| value_type             | 원소의 형식                         |

# 2 상세 내용

1. 원소 추가는 insert() 만 제공
   - push_back, pop_front() 등의 함수 제공 안함
   - 반환값은 pair객체이면 first는 키의 위치를 가리키는 반복자
   - second 는 성공 실패를 나타내는 bool
   - 중복값이 있을 경우 second의 false 리턴
   - 예제

```cpp
set<int> s;
pair<set<int>::iterator, bool> pr;
pr = s.insert(50);
// pr.first : 50이 삽입된 위치를 가리키는 반복자
// pr.second : true
pr = s.insert(50);
// pr.first : 존재하는 50의 위치를 가리키는 반복자
//pr.second : false
```

2. s.insert(pr.first, 85)

   - pr.first 위치부터 탐색 시작하여 85 삽입

3. set<int, greater\<int>> s

   - 정렬 기준을 greater(내림차순)으로 s 생성

4. set의 조건자 반환(정렬 기준 함수 객체)
   - key_compare : 정렬 기준 함수를 담는 형식
   - key_comp() : set의 정렬 기준 함수 반환

```cpp
set<int, less<int>> s_less;
set<int, less<int>>::key_compare l_cmp = s_less.key_comp();
```

5. s.count(50)

   - 50의 원소 개수 반환
   - set은 중복 허용 안하므로 1개

6. s.find(30)

   - 30을 찾아 반복자 반환
   - 찾는게 없으면 s.end() 반환
   - s.find(30) != s.end() 이면 찾은 것!

7. find 원리
   - 정렬 기준 조건자를 이용

```cpp
if(s.key_comp()(a,b)) && !(s.key_comp()(b,a))
// 위의 조건이 참이면 두 원소는 같다고 판단함
// 정렬 기준으로 a가 b보다 앞서있지 않고,
// b도 a보다 앞서 있지 않다면 같다고 판단
```

8. 구간 반복자
   - lower_bound(k) : k의 시작 구간
   - upper_bound(k) : k의 끝 구간
   - equal_range(k) : lower, upper 를 가지는 pair

```cpp
set<int> s = {10, 30, 40, 50, 70};
iter_lower = s.lower_bound(30);
// => 30을 가리킴
iter_upper = s.upper_bound(30)
// => 40을 가리킴
iter_lower = s.lower_bound(55);
// => 70을 가리킴
iter_upper = s.upper_bound(55);
// => 70을 가리킴

if (iter_lower == iter_upper)
   //찾는 원소 없음

s.equal_range(30)
// lower 와 upper 반복자를 pair 객체로 반환
```

# 3. multiset 컨테이너

1. set과의 차이점
   - 중복 원소를 허용
2. ms.count(30)
   - 원소 30의 개수(중복 허용)
3. ms.find(30)
   - 원소 30의 첫 위치(중복일 경우)
4. lower_iter = ms.lower_bound(30)
   - 원소 30이 시작되는 위치
5. upper_iter = ms.uppter_bound(30)
   - 원소 30의 끝 다음 위치
   - 30, 30, 50 의 경우 50

# 4. map 컨테이너

1. set과의 차이점
   - key, value 쌍(pair)으로 객체 저장
2. m.insert(pair\<int, int>(5,100))
   - key : 5, value : 100을 가지는 원소 추가
   - 반복자와 성공여부를 가지는 pair 리턴
3. m[5] = 100
   - 키값 5가 없으면 100 추가, 있으면 값을 100으로 업데이트
4. m.find(5)
   - key값 5를 찾아 그 위치 반복자 반환
   - 반복자가 m.end()이면 key값 없음

# 5. multimap 컨테이너

1. map과의 차이점
   - 중복된 key값을 허용

# 참고

뇌를 자극하는 C++ STL
