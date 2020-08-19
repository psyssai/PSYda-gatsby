---
title: "[STL] 시퀀스 컨테이너2- deque"
category: "C++/STL"
date: "2020-05-18"
tags: ["C++", "STL", "deque"]
---

# 1. deque 컨테이너

1. 벡터와의 차이

   - 여러 개의 메모리 블록을 할당
   - 사용자에게는 하나의 블록처럼 보이게 함 -원소 추가시 메모리 부족해도 이전 메모리 제거 및 원소 복사 안함

2. deque의 주요 특징

   - 여러 메모리 블록에 나뉘어 원소 저장
   - 앞/뒤 모두 원소 추가/제거 가능
   - vector보다 원소 추가/제거 시에 성능 효율적

3. 템플릿 형식
   - T 는 deque 컨테이너 원소의 형식

```cpp
template<typename T, typename Allocator = allocator<T>>
class deque
```

3. **<span style="color:red">생성자</span>**

   | 코드           | 내용                                        |
   | -------------- | ------------------------------------------- |
   | deque dq       | dq는 빈 컨테이너                            |
   | deque dq(n)    | dq는 기본값으로 초기화된 n개의 원소 가짐    |
   | deque dq(n, x) | dq는 x값으로 초기화된 n개의 원소 가짐       |
   | deque dq(dq2)  | dq는 dq2컨테이너의 복사본(복사 생성자 호출) |
   | deque dq(b,e)  | dq는 반복자 구간 [b,e)로 초기화된 원소 가짐 |

4. **<span style="color:red">멤버 함수</span>**

   | 코드             | 내용                                                    |
   | ---------------- | ------------------------------------------------------- |
   | dq.assign(n,x)   | dq에 x값으로 n개의 원소를 할당                          |
   | dq.assign(b,e)   | dq를 반복자 구간 [b,e)로 할당                           |
   | dq.at(i)         | dq의 i번째 원소를 참조                                  |
   | dq.front()       | dq의 첫 번째 원소 참조                                  |
   | dq.back()        | dq의 마지막 원소 참조                                   |
   | p=dq.begin()     | p는 dq의 첫원소를 가리키는 반복자                       |
   | p=dq.end()       | p는 dq의 끝을 나타내는 반복자                           |
   | dq.clear()       | dq의 모든 원소 제거                                     |
   | dq.empty()       | dq가 비었는지 조사                                      |
   | q=dq.erase(p)    | p가 가리키는 원소 제거(q는 다음 원소 가리킴)            |
   | q=dq.erase(b,e)  | 반복자 구간[b,e)의 모든 원소를 제거(q는 다음 원소)      |
   | q=dq.insert(p.x) | dq가 가리키는 위치에 x값 삽입(q는 삽입한 원소 가리킴)   |
   | dq.insert(p,n,x) | p가 가리키는 위치이 n개의 x값 삽입                      |
   | dq.insert(p,b,e) | p가 가리키는 위치에 반복자 구간[b,e)의 원소를 삽입      |
   | x=dq.max_size()  | x는 dq가 담을 수 있는 최대 원소 개수(메모리 크기)       |
   | dq.pop_back()    | dq의 마지막 원소 제거                                   |
   | dq.pop_front()   | dq의 첫 원소 제거                                       |
   | dq.push_back(x)  | dq의 끝에 x 추가                                        |
   | dq.push_front(x) | dq의 앞에 x 추가                                        |
   | p=dq.rbegin()    | p는 dq의 역 순차열의 첫 원소를 가리키는 반복자          |
   | p=dq.rend()      | p는 dq의 역 순차열의 끝을 표식하는 반복자               |
   | dq.resize(n)     | dq의 크기를 n으로 변경(크기가 커지면 기본값으로 초기화) |
   | dq.resize(n,x)   | dq의 크기를 n으로 변경(크기가 커지면 x로 초기화)        |
   | dq.size()        | dq 원소의 개수                                          |
   | dq.swap(dq2)     | dq와 dq2를 swap                                         |

5. **<span style="color:red">연산자</span>**

   | 코드      | 내용                                |
   | --------- | ----------------------------------- |
   | dq1==dq2  | dq1과 dq2의 모든 원소가 같은가?     |
   | dq1!=dq2  | dq1과 dq2의 원소중 하나라도 다른가? |
   | dq1 < dq2 | 문자열 비교처럼 dq2가 dq1보다 큰가? |
   | dq[i]     | dq의 i 번째 원소를 참조             |

6. **<span style="color:red">멤버 형식</span>**

| 코드                   | 내용                                |
| ---------------------- | ----------------------------------- |
| allocator_type         | 메모리 관리자 형식                  |
| const_iterator         | const 반복자 형식                   |
| const_pointer          | const value_type\* 형식             |
| const_reference        | const value_type& 형식              |
| const_reverse_iterator | const 역 반복자 형식                |
| difference_type        | 두 반복자 차이의 형식               |
| iterator               | 반복자 형식                         |
| pointer                | value_type\* 형식                   |
| reference              | value_type& 형식                    |
| reverse_iterator       | 역 반복자 형식                      |
| size_type              | 첨자(index)나 원소의 개수 등의 형식 |
| value_type             | 원소의 형식                         |

# 2 상세 내용

1. dq.push_front(100)
   - deque 앞에 100을 원소로 추가
2. 삽입 제거 사용 방법 벡터와 동일
   - vector 보다 효율적으로 동작
   - 삽입, 제거 시 원소가 적은 쪽으로 밀어냄
   - ex)10, 20, 30, 40, 50, 60 원소
   - 30의 위치에 50을 추가시에
   - 앞쪽으로 밀어냄

# 참고

뇌를 자극하는 C++ STL
