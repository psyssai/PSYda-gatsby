---
title: "[STL-04] 시퀀스 컨테이너3- list"
category: "C++/STL"
date: "2020-05-22"
tags: ["C++", "STL", "list"]
---

# 1. list 컨테이너

## 1.1 list의 주요 특징

1. 원소가 노드 단위로 저장
2. list는 이중 연결 리스트로 구현
3. 앞/뒤 원소 추가/제거 가능
4. 임의 접근 반복자가 아닌 양방향 반복자
   - 원소 탐색을 위해 ++ 또는 -- 사용
   - at, [] 연산자 없음
5. 중간에 원소 추가 제거 시 효율적

   - vector, deque와 다르게 노드만 연결/삭제

6. 다른 리스트와 결합이 용이함
7. 템플릿 형식
   - T 는 list 컨테이너 원소의 형식

```cpp
template<typename T, typename Allocator = allocator<T>>
class list
```

3. **<span style="color:red">생성자</span>**

   | 코드          | 내용                                        |
   | ------------- | ------------------------------------------- |
   | list lt       | lt는 빈 컨테이너                            |
   | list lt(n)    | lt는 기본값으로 초기화된 n개의 원소 가짐    |
   | list lt(n, x) | lt는 x값으로 초기화된 n개의 원소 가짐       |
   | list lt(lt2)  | lt는 lt2컨테이너의 복사본(복사 생성자 호출) |
   | list lt(b,e)  | lt는 반복자 구간 [b,e)로 초기화된 원소 가짐 |

4. **<span style="color:red">멤버 함수</span>**

   | 코드                    | 내용                                                                        |
   | ----------------------- | --------------------------------------------------------------------------- |
   | lt.assign(n,x)          | lt에 x값으로 n개의 원소를 할당                                              |
   | lt.assign(b,e)          | lt를 반복자 구간 [b,e)로 할당                                               |
   | lt.front()              | lt의 첫 번째 원소 참조                                                      |
   | lt.back()               | lt의 마지막 원소 참조                                                       |
   | p=lt.begin()            | p는 lt의 첫원소를 가리키는 반복자                                           |
   | p=lt.end()              | p는 lt의 끝을 나타내는 반복자                                               |
   | lt.clear()              | lt의 모든 원소 제거                                                         |
   | lt.empty()              | lt가 비었는지 조사                                                          |
   | q=lt.erase(p)           | p가 가리키는 원소 제거(q는 다음 원소 가리킴)                                |
   | q=lt.erase(b,e)         | 반복자 구간[b,e)의 모든 원소를 제거(q는 다음 원소)                          |
   | q=lt.insert(p,x)        | p가 가리키는 위치에 x값 삽입(q는 삽입한 원소 가리킴)                        |
   | lt.insert(p,n,x)        | p가 가리키는 위치에 n개의 x값 삽입                                          |
   | lt.insert(p,b,e)        | p가 가리키는 위치에 반복자 구간[b,e)의 원소를 삽입                          |
   | x=lt.max_size()         | x는 lt가 담을 수 있는 최대 원소 개수(메모리 크기)                           |
   | lt.merge(lt2)           | lt2를 lt로 합병 정렬(오름차순 : less)                                       |
   | lt.merge(lt2, pred)     | lt2를 lt로 합병 정렬(pred를 기준으로 합병)                                  |
   | lt.pop_back()           | lt의 마지막 원소 제거                                                       |
   | lt.pop_front()          | lt의 첫 원소 제거                                                           |
   | lt.push_back(x)         | lt의 끝에 x 추가                                                            |
   | lt.push_front(x)        | lt의 앞에 x 추가                                                            |
   | p=lt.rbegin()           | p는 lt의 역 순차열의 첫 원소를 가리키는 반복자                              |
   | p=lt.rend()             | p는 lt의 역 순차열의 끝을 표식하는 반복자                                   |
   | lt.remove(x)            | x 원소를 모두 제거                                                          |
   | lt.remove_if(pred)      | pred(단항조건자)가 참인 모든 원소 제거                                      |
   | lt.resize(n)            | lt의 크기를 n으로 변경(크기가 커지면 기본값으로 초기화)                     |
   | lt.resize(n,x)          | lt의 크기를 n으로 변경(크기가 커지면 x로 초기화)                            |
   | lt.reverse()            | lt 순차열을 뒤집음                                                          |
   | lt.size()               | lt 원소의 개수                                                              |
   | lt.sort()               | lt의 모든 원소를 오름차순으로 정렬                                          |
   | lt.sort(pred)           | lt의 모든 원소를 pred를 기준으로 정렬                                       |
   | lt.splice(p, lt2)       | p가 가리키는 위치에 lt2의 모든 원소를 잘라 붙임                             |
   | lt.splice(p, lt2, q)    | p가 가리키는 위치에 lt2의 q가 가리키는 원소를 잘라 붙임                     |
   | lt.splice(p, lt2, b, e) | p가 가리키는 위치에 lt2의 순차열 [b,e)를 잘라 붙임                          |
   | lt.swap(lt2)            | lt와 lt2를 swap                                                             |
   | lt.unique()             | 인접한 원소의 값이 같다면 유일한 원소의 순차열로 만듦                       |
   | lt.unique(pred)         | 인접한 원소가 pred(이항 조건자)의 기준에 맞다면 유일한 원소의 순차열로 만듦 |

5. **<span style="color:red">연산자</span>**

   | 코드      | 내용                                |
   | --------- | ----------------------------------- |
   | lt1==lt2  | lt1과 lt2의 모든 원소가 같은가?     |
   | lt1!=lt2  | lt1과 lt2의 원소중 하나라도 다른가? |
   | lt1 < lt2 | 문자열 비교처럼 lt2가 lt1보다 큰가? |

6. **<span style="color:red">멤버 형식</span>**

| 코드                     | 내용                                |
| ------------------------ | ----------------------------------- |
| allocator_type           | 메모리 관리자 형식                  |
| const_iterator           | const 반복자 형식                   |
| const_pointer            | const value_type\* 형식             |
| const_reference          | const value_type& 형식              |
| const \_reverse_iterator | const 역 반복자 형식                |
| difference_type          | 두 반복자 차이의 형식               |
| iterator                 | 반복자 형식                         |
| pointer                  | value_type\* 형식                   |
| reference                | value_type& 형식                    |
| reverse_iterator         | 역 반복자 형식                      |
| size_type                | 첨자(index)나 원소의 개수 등의 형식 |
| value_type               | 원소의 형식                         |

# 2 상세 내용

1. lt.remove(10)

   - 원소값 10을 가지는 모든 노드 찾아 삭제
   - 값기반 삭제는 list만 보유

2. lt.remove_if(Pred)

   - 모든 원소에 Pred 함수 적용하여 참인 원소 삭제

3. lt1.splice(iter, lt2)

   - iter위치에 lt2의 모든 원소를 lt1에 잘라 붙임
   - 노드를 연결만 하기 때문에 속도 빠름

4. lt1.splice(iter, lt2, iter2)

   - iter 위치에 iter2가 가리키는 lt2 원소 붙임

5. lt1.splice(lt1.end(), lt2, lt2,begin(), lt2.end())

   - lt1의 끝에 lt2를 잘라 붙임

6. lt.unique()

   - 인접한 중복 원소를 하나만 남기고 삭제

7. lt.unique(Pred)
   - Pred(이항 조건자)가 참이면 원소 삭제
   - Ex)

```cpp
bool Pred(int first, int second){
   return second - first <= 0;
}
// 뒤의 원소가 현재 원소보다 작거나 같으면 삭제
```

8. 정렬

   - 알고리즘의 sort는 임의 접근 반복자 지원
   - vector와 deque는 알고리즘 사용하여 정렬 가능
   - 리스트는 양방향 접근 반복자여서 알고리즘 sort 사용 못함
   - 리스트는 멤버 함수로 sort 함수 지원
   - lt.sort() : 오름차순 정렬
   - lt.sort(greater\<int>()) : 내림 차순 정렬

9. lt1.merge(lt2)
   - lt2를 lt1에 합병 정렬
   - 정렬 기준은 less(오름차순)
   - 합병할 리스트가 정렬 안되어 있으면 오류 발생
   - lt1과 lt2의 정렬 기준 다르면 오류 발생
   - Ex) lt1 = {10,20,30,40,50}
   - lt2 = {25, 35, 60}
   - 합병 정렬 하면
   - lt1 = {10,20,25,30,35,40,50,60}

# 참고

뇌를 자극하는 C++ STL
