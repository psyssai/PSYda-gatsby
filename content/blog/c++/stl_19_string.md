---
title: "[STL-19] string"
category: "C++/STL"
date: "2020-07-30"
tags: ["C++", "STL", "string"]
---

# 1. string의 주요 인터페이스와 특징

1. 시퀀스 컨테이너, 배열 기반 컨테이너
2. string, wstring 제공
   - string : char 형식 문자 관리
   - wstring : wchar_t 형식 문자 관리
3. 멤버 정의 형식

   | 멤버 정의 형식         | 내용                                    |
   | ---------------------- | --------------------------------------- |
   | allocator_type         | 메모리 관리자 형식                      |
   | const_iterator         | const 반복자 형식                       |
   | const_pointer          | const value_type\* 형식                 |
   | const_reference        | const vluae_type& 형식                  |
   | const_reverse_iterator | const 역 반복자 형식                    |
   | difference_type        | 두 반복자 차이의 형식                   |
   | iterator               | 반복자 형식                             |
   | npos                   | 찾기 관련 '실패' 정의 값, 일반적으로 -1 |
   | pointer                | value_type\* 형식                       |
   | reference              | value_type& 형식                        |
   | reverse_iterator       | 역 반복자 형식                          |
   | size_type              | 첨자나 원소 개수 등 형식                |
   | traits_type            | 문자의 특성 형식                        |
   | value_type             | 원소의 형식                             |

4. 생성자

```cpp
string s;              // 기본 생성자
string s(sz);          // sz 문자열로 s 생성
string s(sz,n);        // sz 문자열에서 n개 문자로 s 생성
string s(n,c);         // n개의 c 문자로 s 생성
string s(iter1,iter2); // 반복자 구간 [iter1,iter2)의 문자로 s 생성
string s(p1, p2);      // 포인터 구간 [p1, p2)의 문자로 s 생성
```

5. 멤버 함수

```cpp
s.append(sz)        // s에 sz를 붙임
s.assign(sz)        // s에 sz문자열을 할당
s.at(i)             // s의 i번째 문자를 참조
p=s.begin()         // p는 s의 첫문자를 가리키는 반복자
p=s.end()           // p는 s의 끝을 표식하는 반복자
p=s.rbegin()        // p는 s 역순차열의 첫문자를 가리키는 반복자
p=s.rend()          // p는 s 역순차열의 끝을 표식하는 반복자
s.c_str()           // C 스타일의 문자열 주소 반환(null문자 포함)
n=s.capacity()      // n은 s에 할당된 메모리 공간 크기
s.clear()           // s를 비움
s.compare(s2)       // s와 s2를 비교
s.copy(buf,n)       // buf로 n 개의 문자를 복사
s.data()            // 문자열의 배열 주소를 반환
s.empty()           // s가 비었는지 조사
q=s.erase(p)        // p가 가리키는 문자를 제거, q는 다음 원소 가리킴
q=s.erase(b,e)      // 반복자 구간 [b,e)의 모든 문자 제거, q는 다음 원소
s.find(c)           // c 문자를 검색
s.rfind(c)          // c 문자를 끝부터 찾음
s.insert(n,sz)      // n의 위치에 sz를 삽입
s.length()          // 문자의 개수
n=s.max_size()      // n은 s가 담을 수 있는 최대 문자 개수(메모리 크기)
s.push_back(c)      // s의 끝에 c를 추가
s.replace(pos,n,sz) // pos 위치의 n개 문자를 sz로 바꿈
s.reserve(n)        // b개의 문자를 저장할 공간 예약
s.resize(n)         // s의 크기를 n으로 변경하고 확장되는 공간의 값을 기본값으로 초기화
s.resize(n,c)       // s의 크기를 n으로 변경하고 확장되는 공간의 값을 c로 초기화
s.size()            // s의 원소 개수
s2=s.substr(pos)    // s2는 pos부터 s의 문자열
s.swap(s2)          // s와 s2를 swap
```

6. 연산자

   | 연산자         | 내용                       |
   | -------------- | -------------------------- |
   | s\[i]          | i 번째 위치 문자           |
   | s+=s2          | s와 s2의 합을 s에 할당     |
   | s+s2           | s와 s2를 합한 string 객체  |
   | s=s2           | s2에 s 할당                |
   | out\<<s        | s를 스트림에 씀            |
   | in\>>s         | 스트림에서 s로 읽음        |
   | getline(in,s)  | 스트림에서 s로 한줄을 읽음 |
   | 그 외 비교연산 | ==, !=, <, >, <=, >=       |

# 참고

# 2. 상세 예제

1. 문자열 초기화 예제

```cpp
string t("Hello!");
const char* p1 = "Hello!";
const char* p2 = p1 + 6;

string s1;
string s2("Hello!");
string s3("Hello!", 2);
string s4(5, "H");
string s5(t.begin(), t.end());
string s6(p1, p2);
// s1 =
// s2 = Hello!
// s3 = He
// s4 = HHHHH
// s5 = Hello!
// s6 = Hello!

```

2. 문자열 붙이기 예제
   - append : 부분 또는 전체 붙일 때
   - += : 전체 붙일 때

```cpp
string s("He");
string t("llo!");
const char* p1 = "llo!";
const char* p2 = p1+4;

s.append(t);
// Hello!
s.append(t,0,4);
// Hello! ( [0,4) 구간 합치기 )
s.append("llo!");
// Hello!
s.append("llo!", 4);
// Hello!
s.append(t.begin(), t.end());
// Hello!
s.append(p1,p2);
// Hello!
s.append(5, 'H');
// HeHHHHH
s += t;
// Hello!
s += "llo!"
// Hello!
for(string::iterator iter=t.begin(); iter != t.end(); ++iter){
   s.push_back(*iter);
}
// Hello!
```

3. 문자열 대입 예제
   - assign : 부분 또는 전체 문자열 할당
   - = : 전체 문자열 할당

```cpp
string t("Hello!");
const char* p1 = "Hello!";
const char* p2 = p1 + 6;

string s;

s.assign(t);
// Hello!;
s.assign(t,0,6);
// Hello!(t의 [0,6) 구간 할당)
s.assign("Hello!");
// Hello!;
s.assing("Hello!", 6);
// Hello! ( 앞에서 부터 6개 문자열 할당 )
s.assign(6, 'H');
// HHHHHH ( H 6개 문자열 할당 )
s.assign(t.begin(), t.end());
// Hello!
s.assign(p1, p2)
// Hello!
s = t;
// Hello!
s = "Hello!";
// Hello!
```

4. c_str(), data()
   - c_str : null 문자 포함한 C-style 문자열 반환
   - data : null 문자 포함하지 않는 C-style 문자열 반환

```cpp
string s("Hello!");
const char *sz = s.c_str();
// \0 문자로 끝나는 문자열
const char *buf = s.data();
// \0 문자 포함하지 않는 문자열
```

5. compare()
   - 문자열을 비교(부분 문자열 비교 가능)
   - s1 > s2 이면 1을 반환
   - s1 < s2 이면 -1을 반환
   - s1 == s2 이면 0을 반환

```cpp
string s1("ABCDE");
string s2("AKABC");
const char* sz = "AKABC";

s1.compare(s2);
// -1 반환 ("ABCDE" 와 "AKABC" 비교)
s1.compare(2,3,s2);
// 1 반환 ( s1과 s2의 2 위치부터 3개 비교, "CDE", "ABC" 비교)
s1.compare(0,3,s2,2,3);
// 0 반환 (s1의 0 위치부터 3개["ABC"]와 s2의 2 위치부터 3개["ABC"]를 비교)
s1.compare(sz);
// -1 반환 ( "ABCDE" 와 "AKABC" 비교 )
s1.compare(2,3,sz);
// 1 반환 ( s1과 sz의 2 위치부터 3개 비교, "CDE", "ABC" 비교)
s1.compare(0,1,sz,1)
// 0 반환
```

6. copy()
   - null 문자 없는 문자열 복사

```cpp
string s("Hello!");
char buf[100];

s.copy(buf, s.length());
// buf = Hello!
buf[s.length()] = '\0';
// buf = Hello!\0
s.copy(buf,4,2);
// buf = llo! ( 2위치 부터 4개 복사 )
buf[4] = '\0';
// buf = llo!\0
```

7. find() , rfind()

```cpp
const char *sz = "Be careful in Uncle Randy's new car";
string t("Randy");
string s = sz;

s.find("e");
// 1 출력( e가 처음 발견된 위치 )
s.find("e", 10);
// 18 (10위치 부터 검색하여 e가 처음 발견된 위치)
s.find("new car");
// 28 (new car 가 처음 발견된 n의 위치)
s.find("new car", 10);
// 28 (10위치 부터 new car 가 처음 발견된 n의 위치)
s.find("new car", 0, 1);
// 12 (0 위치 부터 new car의 1개 값(n)이 처음 발견된 위치)
s.find(t, 0);
// 20 ( 0위치 부터 t("Randy")가 발견된 첫 위치)
```

8. insert()
   - 문자열 삽입

```cpp
string t("ABC");
string s("Hello");

s.insert(1, "ABC");
// "HABCeelo"(S의 1위치에 ABC 삽입)
s.insert(1, "ABC", 2);
// "HABeelo"(S의 1위치에 ABC에서 2개문자[AB] 삽입)
s.insert(1, t);
// "HABCello" ( s의 1위치에 t["ABC"] 삽입)
s.insert(1, t, 0, 2);
// "HABeelo" ( s의 1위치에 t의 0번째 위치 부터 2개 문자["AB"] 삽입)
s.insert(1, 3, "A");
// "HAAAello" ( s의 1위치에 "A"를 3개 삽입)
s.insert(s.begin() + 1);
// "H ello" ( s의 1위치에 공백 삽입 )
s.insert(s.begin() + 1, 'A');
// "HAello" ( s의 1위치에 'A' 삽입)
s.insert(s.begin() + 1, 3, 'A');
// "HAAAello" ( s의 1위치에 'A'를 3개 삽입)
s.insert(s.begin() + 1, t.begin(), t.end());
// "HABCello" ( s의 1위치에 t[begin,end) 삽입)

```

9. replace()

   - 문자열을 교체

```cpp
string t("ABC");
string s("Hello!");

s.replace(0,3,"ABC");
// "ABClo!" (s의 0번째 부터 3개 문자를 "ABC" 로 변경)
s.replace(0,3,t);
// "ABClo!" (s의 0번째부터 3개 문자를 t["ABC"]로 변경)
s.replace(0,3,"ABC",2);
// "ABlo! ( s의 0번째부터 3개 문자를 "ABC"의 앞 2개 문자로 변경)
s.replace(0,3,t,0,2);
// "ABlo! ( s의 0번째부터 3개 문자를 t의 0번째부터 2개 문자["AB"]로 변경)
s.replace(0,3,2,'A');
// "AAlo!" ( s의 0번째부터 3개 문자를 'A' 2개로 변경)
s.replace(s.begin(), s.begin()+3, "ABC");
// "ABClo!" (s의 0번째 부터 3개 문자를 "ABC" 로 변경)
s.replace(s.begin(), s.begin()+3, t);
// "ABClo!" (s의 0번째부터 3개 문자를 t["ABC"]로 변경)
s.replace(s.begin(), s.begin()+3, "ABC", 2);
// "ABlo! ( s의 0번째부터 3개 문자를 "ABC"의 앞 2개 문자로 변경)
s.replace(s.begin(), s.begin()+3, 3, 'A');
// "AAAlo!" ( s의 0번째부터 3개 문자를 "A" 3개로 변경)
s.replace(s.begin(), s.end(), t.begin(), t.end());
// "ABC" (s의 문자를 t의 [begin,end) 구간 문자["ABC"]로 변경)
```

10. substr()

- 일부 문자열을 추출할 때 사용

```cpp
string t("Hello!");
string s;

s = t.substr(0);
// "Hello!" ( 0 부터 끝까지 )
s = t.substr(0, string::npos);
// "Hello!" ( 0 부터 끝까지 )
s = t.substr(0, 2);
// "He" ( 0부터 2개 )
s = t.substr(2,3);
// "llo" ( 2부터 3개 )
s = t.substr(2, string::npos);
// "llo!" ( 2부터 끝까지)
```

11. 스트림으로 부터 입력

```cpp
string s;
getline(cin, s);
// 문자열을 입력 받는다.
getline(cin, s ,'\n');
// 문자열을 입력 받는다. 종료 문자열 저장 가능
```

1. 뇌를 자극하는 C++ STL
