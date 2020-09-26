---
title: "[Effective C++] 3. 낌새만 보이면 const를 들이대 보자"
category: "C++/EffectiveC++"
date: "2020-08-08"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. const는 무조건 쓰고 보자.
   - const 함수, 함수의 매개변수(인자,리턴) 등
2. 포인터에서 \* 기호 기준 const의 위치로 상수 대상 판단
3. mutable 키워드
   - 상수 멤버 함수에서 멤버 변수 변경 필요 시 사용
   - 가급적이면 사용하지 말자
4. 상수 멤버 & 비상수 멤버 코드 중복 피하는 방법
   - 비상수 멤버함수에서 Casting 두 번 하여 상수 멤버를 호출하자

# 1. const 기초

1. const의 장점
   - 어떤 값이 불가능 해야 한다는 개발자의 의도를 컴파일러 및 다른 프로그래머와 나눌 수 있다.
2. 포인터에서 const 이해
   - 포인터가 가리키는 대상이 상수 : const가 \* 왼쪽에 위치
   - 포인터가 상수 : const가 \* 오른쪽에 위치

```cpp
char greeting[] = "Hello";

char *p = greeting;              // 비상수 포인터, 비상수 데이터
const char *p = greeting;         // 비상수 포인터,    상수 데이터
char * const p = greeting;        //    상수 포인터, 비상수 데이터
const char * const p = greeting;   //   상수 포인터,     상수 데이터
```

3. 포인터가 가리키는 대상을 상수로 정의하는 스타일

```cpp
// 아래 둘 다 pw가 가리키는 대상을 상수로 정의
void f1(const Widget *pw);
void f2(Widget const *pw);
```

# 2. STL iterator에서 const

```cpp
// iter 는 T* const 처럼 동작
const std::vector<int>::iterator iter = vec.begin();
*iter= 10;  //(O) => 가리키는 대상 변경 가능
++iter;     //(X) => 포인터 위치 변경 불가

// cIter는 const T* 처럼 동작
std::vector<int>::const_iterator cIter = vec.begin();
*cIter = 10;   //(X) => 가리키는 대상 변경 불가
++cIter;       //(O) => 포인터 위치 변경 가능
```

# 3. 함수 선언에서 const

1. 함수 반환값을 const로 정의하는 경우

```cpp
class Rational {...};
const Rational operator*(const Rational& lhs, const Rational& rhs);

// const로 정의하지 않으면,
Rational a,b,c;
// 사용자가 오타가 났을 뿐인데,
if ((a * b) = c) // a*b의 결과에 operator= 호출 가능해짐.
```

2. 매개변수에 가능한한 const를 항상 사용!

# 4. 상수 멤버 함수

1. 멤버 함수에 붙는 const의 역할?
   - 해당 멤버 함수가 상수 객체에 대해 호출될 함수임을 알려줌
2. 상수 멤버 함수가 중요한 이유
   - 객체를 변경 가능한 함수와 아닌 함수를 알려줄 수 있음
   - 상수 객체를 사용할 수 있게 하자
   - C++ 성능 향상 핵심 기법 중 하나가 '객체 전달을 reference-to-const로 진행하자' 이기 때문에 상수 객체를 많이 써야함
3. 상수 멤버 함수 사용 예제
   - operator[]의 반환값은 char& 임을 주의
   - 만약 char 라면 tb[0] = 'x' 는 컴파일 에러 발생함

```cpp
class TextBlock {
public:
   //const 멤버 함수
   const char& operator[](std::size_t position) const{
      return text[position];
   }
   //비const 멤버 함수
   char& operator[](std::size_t position){
      return text[position];
   }
private:
   std::string text;
}

// 상수 객체 생성
void print(const TextBlock& ctb){
   std::cout << ctb[0]; // 상수 멤버 함수 operator[] 호출
   }


// 비상수 vs 상수 함수
TextBlock tb("Hello");
TextBlock ctb("Hello");

std::cout << tb[0];   // (O) => 비상수 멤버 함수 호출
std::cout << ctb[0]; // (O) => 상수 멤버 함수 호출
tb[0] = 'x'; // (O) => 비상수 멤버 함수 호출
ctb[0] = 'x'; // (X) => 비상수 멤버 함수 호출
// 반환값이 const char& 이기 때문에 값 할당 안됨
```

4. 상수 멤버 함수의 의미
   - 비트 수준의 상수성(물리적 상수성)
   - 논리적 상수성

# 5. 비트 수준의 상수성(bitwise constness), 물리적 상수성(physical constness)

1. const 멤버 함수는 객체의 멤버 변수를 건드리지 않는다.
   - 객체를 구성하는 비트들 중 어떤 것도 변경하지 않는다.
2. 멤버 변수가 포인터인 경우 const의 역할을 잘 하지 못하는 경우 존재
   - 실제 비트 수준의 상수성은 통과함
   - 하지만 포인터를 통해 멤버 변수가 변경될 수 있음
   - 예제

```cpp
class CTextBlock {
public:
   char& operator[](std::size_t position) const{
      return pText[position];
   }
private:
   char* pText;
};
// 개발자는 변수를 허락하지 않는 의도로 상수 객체 생성
const CTextBlock cctb("Hello");
char* pc = &cctb[0];
// 하지만 변경됨
*pc = 'J';

```

# 6. 논리적 상수성(logical constness)

1. const 멤버 함수는 멤버 변수 일부는 변경 가능하지만, 사용자 측에서만 모르게 하자.
2. mutable 키워드를 이용

```cpp
class CTextBlock{
public:
   std::sizt_t length() const;
private:
   char* pText;
   mutable std::size_t textlength;
   mutable bool lengthIsVaild;
};
std::size_t CTextBlock::length() const{
   if(!lengthIsValid){
      textLength = std::strlen(pText); // 변경 가능함
      lengthIsVaild = true;   // 변경 가능함
   }

   return textlength;
}

```

# 7. 상수 멤버 & 비상수 멤버 함수에서 코드 중복 피하는 방법

1. 비상수 멤버 함수가 상수 버전을 호출하도록 구현
   - 두 번 캐스팅 수행
   - this에 const를 붙이는 casting(static_cast)
   - const를 제거하는 casting(const_cast)
2. static_cast<const TextBlock&>(\*this)[position]
   - \*this 를 const 객체로 변환
   - 변한 후 const 멤버 함수 호출(operator[] const)
3. const_cast<char&>()
   - 위에서 반환된 const char& 를 char&로 변환

```cpp
class TextBlock{
public:
   const char& operator[](std::size_t position) const{
      return text[position];
   }

   char& operator[](std::size_t position) {
      return const_cast<char&>(
         static_cast<const TextBlock&>(*this)[position]
      );
   }
}
```

4. 상수 버전에서 비상수 멤버를 호출하게는 안되나요?
   - 상수 멤버 함수는 멤버 변수를 변경하지 않겠다고 약속됨
   - 따라서 비상수 멤버를 호출하면 안됨

# 참고

1. Effective C++
