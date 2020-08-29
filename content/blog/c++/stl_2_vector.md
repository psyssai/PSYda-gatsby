---
title: "[STL-02] 시퀀스 컨테이너1- vector"
category: "C++/STL"
date: "2020-05-11"
tags: ["C++", "STL", "vector"]
---

# 1. Vector 컨테이너

1. 템플릿 형식
   - T 는 vector 컨테이너 원소의 형식

```cpp
template<typename T, typename Allocator = allocator<T>>
class vector
```

3. vector의 주요 특징

   - 원소가 메모리 블록에 연속하게 저장됨
   - 조회 속도는 빠름
   - insert, erase 느림

4. **<span style="color:red">생성자</span>**

   | 코드           | 내용                                       |
   | -------------- | ------------------------------------------ |
   | vector v       | v는 빈 컨테이너                            |
   | vector v(n)    | v는 기본값으로 초기화된 n개의 원소 가짐    |
   | vector v(n, x) | v는 x값으로 초기화된 n개의 원소 가짐       |
   | vector v(v2)   | v는 v2컨테이너의 복사본(복사 생성자 호출)  |
   | vector v(b,e)  | v는 반복자 구간 [b,e)로 초기화된 원소 가짐 |

5. **<span style="color:red">멤버 함수</span>**

   | 코드            | 내용                                                   |
   | --------------- | ------------------------------------------------------ |
   | v.assign(n,x)   | v에 x값으로 n개의 원소를 할당                          |
   | v.assign(b,e)   | v를 반복자 구간 [b,e)로 할당                           |
   | v.at(i)         | v의 i번째 원소를 참조                                  |
   | v.front()       | v의 첫 번째 원소 참조                                  |
   | v.back()        | v의 마지막 원소 참조                                   |
   | p=v.begin()     | p는 v의 첫원소를 가리키는 반복자                       |
   | p=v.end()       | p는 v의 끝을 나타내는 반복자                           |
   | x=v.capacity()  | x는 v에 할당된 공간의 크기                             |
   | v.clear()       | v의 모든 원소 제거(할당된 공간은 유지)                 |
   | v.empty()       | v가 비었는지 조사                                      |
   | q=v.erase(p)    | p가 가리키는 원소 제거(q는 다음 원소 가리킴)           |
   | q=v.insert(p.x) | p가 가리키는 위치에 x값 삽입(q는 삽입한 원소 가리킴)   |
   | v.insert(p,n,x) | p가 가리키는 위치이 n개의 x값 삽입                     |
   | v.insert(p,b,e) | p가 가리키는 위치에 반복자 구간[b,e)의 원소를 삽입     |
   | x=v.max_size()  | x는 v가 담을 수 있는 최대 원소 개수(메모리 크기)       |
   | v.pop_back()    | v의 마지막 원소 제거                                   |
   | v.push_back(x)  | v의 끝에 x 추가                                        |
   | p=v.rbegin()    | p는 v의 역 순차열의 첫 원소를 가리키는 반복자          |
   | p=v.rend()      | p는 v의 역 순차열의 끝을 표식하는 반복자               |
   | v.reserve(n)    | n개의 원소를 저장할 공간 예약                          |
   | v.resize(n)     | v의 크기를 n으로 변경(크기가 커지면 기본값으로 초기화) |
   | v.resize(n,x)   | v의 크기를 n으로 변경(크기가 커지면 x로 초기화)        |
   | v.size()        | v 원소의 개수                                          |
   | v.swap(v2)      | v와 v2를 swap                                          |

6. **<span style="color:red">연산자</span>**

   | 코드    | 내용                              |
   | ------- | --------------------------------- |
   | v1==v2  | v1과 v2의 모든 원소가 같은가?     |
   | v1!=v2  | v1과 v2의 원소중 하나라도 다른가? |
   | v1 < v2 | 문자열 비교처럼 v2가 v1보다 큰가? |
   | v[i]    | v의 i 번째 원소를 참조            |

7. **<span style="color:red">멤버 형식</span>**

| 코드                     | 내용                                |
| ------------------------ | ----------------------------------- |
| allocator_type           | 메모리 관리자 형식                  |
| const_iterator           | const 반복자 형식                   |
| const_pointer            | const value_type\* 형식             |
| const_reference          | const value_type& 형식              |
| const\_ reverse_iterator | const 역 반복자 형식                |
| difference_type          | 두 반복자 차이의 형식               |
| iterator                 | 반복자 형식                         |
| pointer                  | value_type\* 형식                   |
| reference                | value_type& 형식                    |
| reverse_iterator         | 역 반복자 형식                      |
| size_type                | 첨자(index)나 원소의 개수 등의 형식 |
| value_type               | 원소의 형식                         |

# 2. 상세 내용

1. vector<type>::size_type

   - 벡터 사이즈, 첨자를 나태내기 위한 typedef 멤버

2. v.reserve(8)

   - 벡터 메모리 크기 설정
   - capacity 를 8로 설정

3. v.resize(10)

   - 벡터의 사이즈 변경
   - 사이즈가 커지면 capacity 같이 커짐
   - 사이즈 작아지면 capacity는 그대로

4. v.resize(10, 100)

   - size변경 시 크기가 커지면 100으로 초기화

5. v.clear()

   - 벡터 원소 삭제
   - capacity는 그대로

6. vector<int>().swap(v)

   - 벡터 원소 삭제
   - capacity도 0으로 초기화

7. 임의의 원소 참조

   - v.at(0) : 벡터 범위 검사, 안정적, 속도 느림
   - v[0] : 벡터 범위 검사 X, 위험, 속도 빠름

8. v.assign(5,2)

   - 사이즈 5로 변경 및 5 요소에 2로 할당
   - 사이즈가 줄어들면 capacity는 그대로

9. vector<int>::iterator iter

```cpp
iter = v.begin() // iter를 시작 위치로 설정
(*iter); // 현재 iter 위치의 원소값
iter +=2; // iter의 위치를 2 이동
```

10. vector<int>::const_iterator citer
    - 원소의 값을 변경하지 않을 때 선언

```cpp
vector<int>::const_iterator citer
(*citer) = 100 // (X) 값 변경 못함
```

11. vector<int>::reverse_iterator
    - 역방향 반복자 선언

```cpp
// 마지막 원소를 가리키는 역방향 반복자 선언
vector<int>::reverse_iterator riter = v.rbegin();
```

12. iter2 = v.insert(iter, 100)

    - iter 위치에 100을 추가
    - iter2는 추가된 위치를 가리킴

13. v.insert(iter, 3, 100)

    - iter위치에 100값 3개 추가

14. iter2 = v.erase(iter)

    - iter 위치 원소를 삭제
    - iter2는 삭제된 원소 다음 위치

15. iter2 = v.erase(v.begin() + 1, v.end())
    - 시작 원소만 두고 모두 삭제
    - v.end()가 iter2에 저장됨

# 참고

뇌를 자극하는 C++ STL
